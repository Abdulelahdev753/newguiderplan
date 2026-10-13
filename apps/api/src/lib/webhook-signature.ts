import { createHmac, timingSafeEqual } from "node:crypto";

// StreamPay retries a failed delivery for about 21 hours, so a signature has to stay
// acceptable that long. Replays are harmless: every handler changes an order at most once.
const MAX_AGE_SECONDS = 24 * 60 * 60;
const MAX_FUTURE_SECONDS = 5 * 60;

type Input = {
  secret: string;
  rawBody: Buffer;
  /** The X-Webhook-Signature header: "t=<unix seconds>,v1=<hex hmac>". */
  header: string | undefined;
  now?: Date;
};

/** Checks that a webhook was signed by StreamPay: HMAC-SHA256 of "<t>.<raw body>". */
export function verifyWebhookSignature({
  secret,
  rawBody,
  header,
  now = new Date(),
}: Input): boolean {
  if (!secret || !header) return false;

  const parts = new Map<string, string>();
  for (const part of header.split(",")) {
    const separator = part.indexOf("=");
    if (separator > 0) parts.set(part.slice(0, separator).trim(), part.slice(separator + 1).trim());
  }

  const timestamp = parts.get("t");
  const signature = parts.get("v1");
  if (
    !timestamp ||
    !signature ||
    !/^\d{1,13}$/.test(timestamp) ||
    !/^[0-9a-f]{64}$/i.test(signature)
  ) {
    return false;
  }

  const age = Math.floor(now.getTime() / 1000) - Number(timestamp);
  if (age > MAX_AGE_SECONDS || age < -MAX_FUTURE_SECONDS) return false;

  const expected = createHmac("sha256", secret).update(`${timestamp}.`).update(rawBody).digest();
  return timingSafeEqual(expected, Buffer.from(signature, "hex"));
}
