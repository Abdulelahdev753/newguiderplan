import type { ApiResponse, CheckoutResponse } from "@guiderplan/shared";
import type { Request, Response } from "express";
import { z } from "zod";
import { isProductId } from "../config/catalog.ts";
import { env } from "../config/env.ts";
import { HttpError } from "../lib/http-error.ts";
import { normalizePhone } from "../lib/phone.ts";
import { createCheckout } from "../services/orders.service.ts";

const checkoutSchema = z.object({
  productId: z.string().refine(isProductId),
  // Letters of any script, then letters, spaces and the punctuation names use.
  name: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u)
    .transform((value) => value.replace(/ {2,}/g, " ")),
  phone: z.string().max(32),
  lang: z.enum(["en", "ar"]),
  website: z.string().max(200).optional(),
});

const fieldCodes: Record<string, string> = { name: "INVALID_NAME", phone: "INVALID_PHONE" };

export async function startCheckout(
  req: Request,
  res: Response<ApiResponse<CheckoutResponse>>,
): Promise<void> {
  const parsed = checkoutSchema.safeParse(req.body);
  if (!parsed.success) {
    const field = String(parsed.error.issues[0]?.path[0] ?? "");
    throw new HttpError(400, "Invalid request", fieldCodes[field] ?? "INVALID_REQUEST");
  }
  const { productId, name, lang, website } = parsed.data;

  // Only a bot fills the hidden field. Answer as if it worked, and do nothing.
  if (website) {
    res.json({ ok: true, data: { url: `${env.publicSiteUrl}/${lang}` } });
    return;
  }

  const phone = normalizePhone(parsed.data.phone);
  if (!phone) throw new HttpError(400, "Invalid phone number", "INVALID_PHONE");

  const url = await createCheckout({ productId, name, phone, lang });
  res.json({ ok: true, data: { url } });
}
