import type { RequestHandler } from "express";
import { rateLimit } from "express-rate-limit";
import { HttpError } from "../lib/http-error.ts";

/** Allows `limit` requests per visitor IP in each window, then answers 429. */
export function limitRequests(limit: number, windowMs: number): RequestHandler {
  return rateLimit({
    limit,
    windowMs,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler: (_req, _res, next) => {
      next(new HttpError(429, "Too many requests. Please try again shortly.", "RATE_LIMITED"));
    },
  });
}
