import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { test } from "node:test";
import { createOrderNumber, ORDER_NUMBER_PATTERN } from "./order-number.ts";
import { normalizePhone } from "./phone.ts";
import { createDownloadToken, DOWNLOAD_TOKEN_PATTERN, hashDownloadToken } from "./tokens.ts";
import { verifyWebhookSignature } from "./webhook-signature.ts";

const secret = "whsec_test";
const rawBody = Buffer.from('{"event_type":"PAYMENT_SUCCEEDED"}');
const now = new Date("2026-10-13T12:00:00Z");
const nowSeconds = Math.floor(now.getTime() / 1000);

function sign(timestamp: number, body: Buffer = rawBody, key: string = secret): string {
  const signature = createHmac("sha256", key).update(`${timestamp}.`).update(body).digest("hex");
  return `t=${timestamp},v1=${signature}`;
}

test("accepts a webhook signed with the secret", () => {
  assert.equal(verifyWebhookSignature({ secret, rawBody, header: sign(nowSeconds), now }), true);
});

test("rejects a missing, malformed or wrong signature", () => {
  assert.equal(verifyWebhookSignature({ secret, rawBody, header: undefined, now }), false);
  assert.equal(verifyWebhookSignature({ secret, rawBody, header: "t=abc,v1=zz", now }), false);
  assert.equal(
    verifyWebhookSignature({ secret, rawBody, header: sign(nowSeconds, rawBody, "other"), now }),
    false,
  );
  assert.equal(
    verifyWebhookSignature({ secret: "", rawBody, header: sign(nowSeconds), now }),
    false,
  );
});

test("rejects a body changed after signing", () => {
  const tampered = Buffer.from('{"event_type":"PAYMENT_SUCCEEDED","x":1}');
  assert.equal(
    verifyWebhookSignature({ secret, rawBody: tampered, header: sign(nowSeconds), now }),
    false,
  );
});

test("rejects a signature older than a day or from the future", () => {
  const twoDaysAgo = nowSeconds - 2 * 24 * 60 * 60;
  const inAnHour = nowSeconds + 60 * 60;
  assert.equal(verifyWebhookSignature({ secret, rawBody, header: sign(twoDaysAgo), now }), false);
  assert.equal(verifyWebhookSignature({ secret, rawBody, header: sign(inAnHour), now }), false);
});

test("download tokens are unique and stored only as a hash", () => {
  const first = createDownloadToken();
  const second = createDownloadToken();
  assert.match(first.token, DOWNLOAD_TOKEN_PATTERN);
  assert.notEqual(first.token, second.token);
  assert.equal(first.hash, hashDownloadToken(first.token));
  assert.match(first.hash, /^[0-9a-f]{64}$/);
  assert.notEqual(first.hash, first.token);
});

test("order numbers follow GP-XXXX-XXXX", () => {
  for (let i = 0; i < 200; i++) assert.match(createOrderNumber(), ORDER_NUMBER_PATTERN);
});

test("phone numbers are normalised to E.164 or refused", () => {
  assert.equal(normalizePhone("+966 51 234 5678"), "+966512345678");
  assert.equal(normalizePhone("+44 7400 123456"), "+447400123456");
  assert.equal(normalizePhone("0512345678"), null);
  assert.equal(normalizePhone("+966 12"), null);
  assert.equal(normalizePhone("hello"), null);
});
