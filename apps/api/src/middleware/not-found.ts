import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../lib/http-error.ts";

export function notFound(req: Request, _res: Response, next: NextFunction): void {
  next(new HttpError(404, `Route not found: ${req.method} ${req.originalUrl}`, "NOT_FOUND"));
}
