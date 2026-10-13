import { env } from "../config/env.ts";
import { HttpError } from "./http-error.ts";

const BASE_URL = "https://stream-app-service.streampay.sa/api/v2";
const TIMEOUT_MS = 10_000;

export interface StreamPaymentLink {
  id: string;
  url: string;
  status: string;
  currency: string;
  amount_in_smallest_unit: number;
  amount_collected_in_smallest_unit: number;
}

export interface StreamPayment {
  id: string;
  current_status: string;
  currency: string;
  amount_in_smallest_unit: number;
}

export interface StreamInvoice {
  id: string;
  payment_link_id: string | null;
  organization_consumer_id: string | null;
  organization_consumer: { id: string; name: string | null; phone_number: string | null } | null;
  payments?: { id: string }[];
}

export interface CreatePaymentLinkInput {
  name: string;
  productId: string;
  validUntil: Date;
  successUrl: string;
  failureUrl: string;
  metadata: Record<string, string>;
}

/** StreamPay answered with an error, or did not answer at all. */
export class StreamError extends Error {
  readonly status: number | undefined;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "StreamError";
    this.status = status;
  }
}

async function streamFetch<T>(path: string, init?: { method: string; body: unknown }): Promise<T> {
  if (!env.streamApiKey) {
    throw new HttpError(503, "Checkout is not configured", "NOT_CONFIGURED");
  }

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method: init?.method ?? "GET",
      headers: {
        "x-api-key": env.streamApiKey,
        ...(init ? { "Content-Type": "application/json" } : {}),
      },
      body: init ? JSON.stringify(init.body) : undefined,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (cause) {
    throw new StreamError(`StreamPay request failed: ${String(cause)}`);
  }

  if (!res.ok) {
    // The body explains the failure; keep it in the server log, never in a response.
    const detail = (await res.text().catch(() => "")).slice(0, 500);
    throw new StreamError(`StreamPay responded ${res.status} for ${path}: ${detail}`, res.status);
  }
  return (await res.json()) as T;
}

export function createPaymentLink(input: CreatePaymentLinkInput): Promise<StreamPaymentLink> {
  return streamFetch<StreamPaymentLink>("/payment_links", {
    method: "POST",
    body: {
      name: input.name,
      currency: "SAR",
      items: [{ product_id: input.productId, quantity: 1 }],
      max_number_of_payments: 1,
      valid_until: input.validUntil.toISOString(),
      success_redirect_url: input.successUrl,
      failure_redirect_url: input.failureUrl,
      custom_metadata: input.metadata,
      contact_information_type: "PHONE",
    },
  });
}

export function getPaymentLink(id: string): Promise<StreamPaymentLink> {
  return streamFetch<StreamPaymentLink>(`/payment_links/${encodeURIComponent(id)}`);
}

export function getPayment(id: string): Promise<StreamPayment> {
  return streamFetch<StreamPayment>(`/payments/${encodeURIComponent(id)}`);
}

export function getInvoice(id: string): Promise<StreamInvoice> {
  return streamFetch<StreamInvoice>(`/invoices/${encodeURIComponent(id)}`);
}
