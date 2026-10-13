export type ProductId = "london" | "bali" | "barcelona" | "amsterdam" | "northItaly" | "prague";

export type CheckoutLocale = "en" | "ar";

export interface CheckoutRequest {
  productId: ProductId;
  name: string;
  /** International format, e.g. +966512345678. */
  phone: string;
  lang: CheckoutLocale;
  /** A field real visitors never see or fill; bots do. */
  website?: string;
}

export interface CheckoutResponse {
  /** The StreamPay page to send the buyer to. */
  url: string;
}

export interface DownloadTokenRequest {
  token: string;
}

export type DownloadStatus =
  /** The payment has not been confirmed yet. */
  | { state: "pending" }
  | {
      state: "ready";
      orderNumber: string;
      productId: ProductId;
      expiresAt: string;
      downloadsLeft: number;
    }
  | { state: "expired"; orderNumber: string }
  | { state: "used_up"; orderNumber: string }
  | { state: "invalid" };

export interface DownloadFileResponse {
  /** A short-lived link to the PDF. */
  url: string;
}
