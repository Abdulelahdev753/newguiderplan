import type { Request, Response } from "express";
import { z } from "zod";
import { env } from "../config/env.ts";
import { HttpError } from "../lib/http-error.ts";
import { verifyWebhookSignature } from "../lib/webhook-signature.ts";
import { confirmPayment, recordWebhookEvent, refundPayment } from "../services/orders.service.ts";

const reference = z.object({ id: z.uuid() });

const eventSchema = z.object({
  event_type: z.string().max(100),
  entity_id: z.uuid(),
  data: z
    .object({
      invoice: reference.nullish(),
      payment_link: reference.nullish(),
    })
    .nullish(),
});

/** Receives StreamPay's webhooks. The body is the raw bytes, which the signature covers. */
export async function streamWebhook(req: Request, res: Response): Promise<void> {
  if (!env.streamWebhookSecret) {
    throw new HttpError(503, "Webhooks are not configured", "NOT_CONFIGURED");
  }

  const rawBody: unknown = req.body;
  if (
    !Buffer.isBuffer(rawBody) ||
    !verifyWebhookSignature({
      secret: env.streamWebhookSecret,
      rawBody,
      header: req.get("x-webhook-signature"),
    })
  ) {
    throw new HttpError(401, "Invalid signature", "INVALID_SIGNATURE");
  }

  let json: unknown;
  try {
    json = JSON.parse(rawBody.toString("utf8"));
  } catch {
    throw new HttpError(400, "Invalid payload", "INVALID_REQUEST");
  }
  const parsed = eventSchema.safeParse(json);
  // A signed event in a shape this site doesn't use: acknowledge it so it isn't retried.
  if (!parsed.success) {
    res.json({ ok: true });
    return;
  }

  const event = parsed.data;
  await recordWebhookEvent(event.event_type, event.entity_id, json);

  const paymentLinkId = event.data?.payment_link?.id ?? null;
  const invoiceId = event.data?.invoice?.id ?? null;

  // A failure below answers 5xx, and StreamPay delivers the event again later.
  if (event.event_type === "PAYMENT_SUCCEEDED" && paymentLinkId && invoiceId) {
    await confirmPayment({ paymentId: event.entity_id, invoiceId, paymentLinkId });
  } else if (event.event_type === "PAYMENT_REFUNDED") {
    await refundPayment(event.entity_id, paymentLinkId);
  }

  res.json({ ok: true });
}
