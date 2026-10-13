import type { CheckoutLocale, DownloadStatus, ProductId } from "@guiderplan/shared";
import { catalog, isProductId } from "../config/catalog.ts";
import { env } from "../config/env.ts";
import { HttpError } from "../lib/http-error.ts";
import { createOrderNumber } from "../lib/order-number.ts";
import {
  createPaymentLink,
  getInvoice,
  getPayment,
  getPaymentLink,
  type StreamInvoice,
} from "../lib/stream.ts";
import { supabase } from "../lib/supabase.ts";
import { createDownloadToken, hashDownloadToken } from "../lib/tokens.ts";

const MAX_DOWNLOADS = 3;
const PAYMENT_LINK_LIFETIME_MS = 24 * 60 * 60 * 1000;
const SIGNED_URL_SECONDS = 60;
// Postgres' unique_violation.
const UNIQUE_VIOLATION = "23505";

interface OrderRow {
  id: string;
  status: "pending" | "paid" | "refunded";
  product_id: string;
  amount_halalas: number;
  currency: string;
  stream_payment_link_id: string | null;
  stream_payment_id: string | null;
  order_number: string | null;
  download_expires_at: string | null;
  download_count: number;
}

const ORDER_COLUMNS =
  "id, status, product_id, amount_halalas, currency, stream_payment_link_id, stream_payment_id, order_number, download_expires_at, download_count";

interface StreamCustomer {
  paymentId: string;
  invoiceId: string;
  consumerId: string | null;
  name: string | null;
  phone: string | null;
}

type CheckoutInput = {
  productId: ProductId;
  name: string;
  phone: string;
  lang: CheckoutLocale;
};

/** Saves the buyer's details, then creates the StreamPay page they pay on. */
export async function createCheckout(input: CheckoutInput): Promise<string> {
  const entry = catalog[input.productId];
  const { token, hash } = createDownloadToken();

  const { data: order, error } = await supabase()
    .from("orders")
    .insert({
      product_id: input.productId,
      locale: input.lang,
      amount_halalas: entry.amountHalalas,
      customer_name: input.name,
      customer_phone: input.phone,
      download_token_hash: hash,
    })
    .select("id")
    .single();
  if (error) throw new Error(`Could not save the order: ${error.message}`);

  const downloadPage = `${env.publicSiteUrl}/${input.lang}/download`;
  const link = await createPaymentLink({
    name: entry.linkName,
    productId: entry.streamProductId,
    validUntil: new Date(Date.now() + PAYMENT_LINK_LIFETIME_MS),
    // Knowing the token before paying unlocks nothing: downloads need a confirmed payment.
    successUrl: `${downloadPage}?token=${token}`,
    failureUrl: `${downloadPage}?payment=failed`,
    metadata: { order_id: order.id },
  });

  // The site and StreamPay must agree on the price before anyone is sent to pay.
  if (link.amount_in_smallest_unit !== entry.amountHalalas || link.currency !== "SAR") {
    throw new Error(
      `Price mismatch for ${input.productId}: site ${entry.amountHalalas}, StreamPay ${link.amount_in_smallest_unit} ${link.currency}`,
    );
  }
  if (!link.url.startsWith("https://")) {
    throw new Error(`Unexpected StreamPay checkout address for order ${order.id}`);
  }

  const { error: updateError } = await supabase()
    .from("orders")
    .update({ stream_payment_link_id: link.id })
    .eq("id", order.id);
  if (updateError) throw new Error(`Could not save the payment link: ${updateError.message}`);

  return link.url;
}

async function findOrder(column: string, value: string): Promise<OrderRow | null> {
  const { data, error } = await supabase()
    .from("orders")
    .select(ORDER_COLUMNS)
    .eq(column, value)
    .maybeSingle<OrderRow>();
  if (error) throw new Error(`Could not load the order: ${error.message}`);
  return data;
}

/** Marks a pending order as paid and starts its download window. Safe to call twice. */
async function markOrderPaid(orderId: string, customer: StreamCustomer | null): Promise<void> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const { error } = await supabase().rpc("mark_order_paid", {
      p_order_id: orderId,
      p_order_number: createOrderNumber(),
      p_payment_id: customer?.paymentId ?? null,
      p_invoice_id: customer?.invoiceId ?? null,
      p_consumer_id: customer?.consumerId ?? null,
      p_customer_name: customer?.name ?? null,
      p_customer_phone: customer?.phone ?? null,
    });
    if (!error) return;
    // Another order already has this number: draw again.
    if (error.code === UNIQUE_VIOLATION && error.message.includes("order_number")) continue;
    throw new Error(`Could not confirm the order: ${error.message}`);
  }
  throw new Error(`Could not find a free order number for ${orderId}`);
}

function customerFrom(paymentId: string, invoice: StreamInvoice): StreamCustomer {
  return {
    paymentId,
    invoiceId: invoice.id,
    consumerId: invoice.organization_consumer?.id ?? invoice.organization_consumer_id,
    name: invoice.organization_consumer?.name ?? null,
    phone: invoice.organization_consumer?.phone_number ?? null,
  };
}

type PaymentEvent = {
  paymentId: string;
  invoiceId: string;
  paymentLinkId: string;
};

/**
 * Handles StreamPay's PAYMENT_SUCCEEDED. The webhook body only names the payment; the
 * amount, status and buyer are read back from StreamPay before the order is confirmed.
 */
export async function confirmPayment(event: PaymentEvent): Promise<void> {
  const order = await findOrder("stream_payment_link_id", event.paymentLinkId);
  // The StreamPay account also sells things this site knows nothing about.
  if (!order) return;
  if (order.status === "refunded" || order.stream_payment_id) return;

  const [payment, invoice] = await Promise.all([
    getPayment(event.paymentId),
    getInvoice(event.invoiceId),
  ]);

  const paid = payment.current_status === "SUCCEEDED" || payment.current_status === "SETTLED";
  const belongsToOrder =
    invoice.payment_link_id === order.stream_payment_link_id &&
    (invoice.payments === undefined || invoice.payments.some((item) => item.id === payment.id));
  const rightAmount =
    payment.amount_in_smallest_unit === order.amount_halalas && payment.currency === order.currency;

  if (!paid || !belongsToOrder || !rightAmount) {
    console.error(
      `Rejected payment ${event.paymentId} for order ${order.id}: status=${payment.current_status} amount=${payment.amount_in_smallest_unit} ${payment.currency} linkMatches=${belongsToOrder}`,
    );
    return;
  }

  const customer = customerFrom(payment.id, invoice);
  if (order.status === "pending") {
    await markOrderPaid(order.id, customer);
  }

  // The download page may have confirmed the order first, without the buyer's details.
  const { error } = await supabase()
    .from("orders")
    .update({
      stream_payment_id: customer.paymentId,
      stream_invoice_id: customer.invoiceId,
      stream_consumer_id: customer.consumerId,
      stream_customer_name: customer.name,
      stream_customer_phone: customer.phone,
    })
    .eq("id", order.id)
    .is("stream_payment_id", null);
  if (error) throw new Error(`Could not save the buyer's StreamPay details: ${error.message}`);
}

/** Handles StreamPay's PAYMENT_REFUNDED: a refunded order can no longer be downloaded. */
export async function refundPayment(
  paymentId: string,
  paymentLinkId: string | null,
): Promise<void> {
  const order =
    (await findOrder("stream_payment_id", paymentId)) ??
    (paymentLinkId ? await findOrder("stream_payment_link_id", paymentLinkId) : null);
  if (!order || order.status === "refunded") return;

  const payment = await getPayment(paymentId);
  if (payment.current_status !== "REFUNDED") {
    console.error(`Ignored refund of payment ${paymentId}: status=${payment.current_status}`);
    return;
  }

  const { error } = await supabase()
    .from("orders")
    .update({ status: "refunded", refunded_at: new Date().toISOString() })
    .eq("id", order.id);
  if (error) throw new Error(`Could not mark the order refunded: ${error.message}`);
}

// When each pending order was last checked with StreamPay, so page polling can't flood it.
const lastLinkCheck = new Map<string, number>();
const LINK_CHECK_INTERVAL_MS = 10_000;

/**
 * The webhook normally confirms a payment. If it is late, ask StreamPay whether the
 * order's single-use payment link has collected its money.
 */
async function confirmFromPaymentLink(order: OrderRow): Promise<boolean> {
  if (!order.stream_payment_link_id) return false;

  const now = Date.now();
  if (now - (lastLinkCheck.get(order.id) ?? 0) < LINK_CHECK_INTERVAL_MS) return false;
  if (lastLinkCheck.size > 5000) lastLinkCheck.clear();
  lastLinkCheck.set(order.id, now);

  let collected: number;
  try {
    collected = (await getPaymentLink(order.stream_payment_link_id))
      .amount_collected_in_smallest_unit;
  } catch (error) {
    console.error(error);
    return false;
  }
  if (!Number.isInteger(collected) || collected < order.amount_halalas) return false;

  await markOrderPaid(order.id, null);
  lastLinkCheck.delete(order.id);
  return true;
}

export async function getDownloadStatus(token: string): Promise<DownloadStatus> {
  const hash = hashDownloadToken(token);
  let order = await findOrder("download_token_hash", hash);
  if (!order) return { state: "invalid" };

  if (order.status === "pending" && (await confirmFromPaymentLink(order))) {
    order = await findOrder("download_token_hash", hash);
    if (!order) return { state: "invalid" };
  }

  if (order.status === "pending") return { state: "pending" };
  if (
    order.status !== "paid" ||
    !order.order_number ||
    !order.download_expires_at ||
    !isProductId(order.product_id)
  ) {
    return { state: "invalid" };
  }

  if (Date.now() >= Date.parse(order.download_expires_at)) {
    return { state: "expired", orderNumber: order.order_number };
  }
  if (order.download_count >= MAX_DOWNLOADS) {
    return { state: "used_up", orderNumber: order.order_number };
  }
  return {
    state: "ready",
    orderNumber: order.order_number,
    productId: order.product_id,
    expiresAt: order.download_expires_at,
    downloadsLeft: MAX_DOWNLOADS - order.download_count,
  };
}

/** Counts one download and returns a link to the PDF that works for a minute. */
export async function claimDownload(token: string): Promise<string> {
  const { data, error } = await supabase()
    .rpc("claim_download", { p_token_hash: hashDownloadToken(token) })
    .select(ORDER_COLUMNS);
  if (error) throw new Error(`Could not claim the download: ${error.message}`);

  const order = (data as OrderRow[] | null)?.[0];
  if (!order || !isProductId(order.product_id)) {
    throw new HttpError(410, "This download link is no longer available", "DOWNLOAD_UNAVAILABLE");
  }

  const entry = catalog[order.product_id];
  const signed = await supabase()
    .storage.from(entry.bucket)
    .createSignedUrl(entry.objectPath, SIGNED_URL_SECONDS, { download: entry.downloadName });

  if (signed.error || !signed.data) {
    console.error(
      `Could not sign ${entry.bucket}/${entry.objectPath} for order ${order.id}: ${signed.error?.message}`,
    );
    // The buyer got nothing, so hand the download back.
    await supabase()
      .from("orders")
      .update({ download_count: order.download_count - 1 })
      .eq("id", order.id)
      .eq("download_count", order.download_count);
    throw new HttpError(503, "The guide is temporarily unavailable", "FILE_UNAVAILABLE");
  }
  return signed.data.signedUrl;
}

/** Keeps a copy of every verified webhook for auditing. A repeat delivery is stored once. */
export async function recordWebhookEvent(
  eventType: string,
  entityId: string,
  payload: unknown,
): Promise<void> {
  const { error } = await supabase()
    .from("webhook_events")
    .upsert(
      { event_type: eventType, entity_id: entityId, payload },
      { onConflict: "event_type,entity_id", ignoreDuplicates: true },
    );
  if (error) console.error(`Could not record webhook ${eventType} ${entityId}: ${error.message}`);
}
