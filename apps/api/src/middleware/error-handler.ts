import type { ApiFailure } from "@guiderplan/shared";
import type { ErrorRequestHandler } from "express";
import { env } from "../config/env.ts";
import { HttpError } from "../lib/http-error.ts";

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof HttpError) {
    const body: ApiFailure = { ok: false, error: { message: err.message, code: err.code } };
    res.status(err.status).json(body);
    return;
  }

  // Errors raised by Express itself (malformed JSON, payload too large, ...) carry a status.
  const status = typeof err?.status === "number" ? err.status : 500;
  if (status >= 500) console.error(err);

  const message =
    status < 500 || !env.isProduction ? String(err?.message ?? err) : "Internal server error";
  const body: ApiFailure = { ok: false, error: { message } };
  res.status(status).json(body);
};
