import type { ApiResponse, DownloadFileResponse, DownloadStatus } from "@guiderplan/shared";
import type { Request, Response } from "express";
import { z } from "zod";
import { DOWNLOAD_TOKEN_PATTERN } from "../lib/tokens.ts";
import { HttpError } from "../lib/http-error.ts";
import { claimDownload, getDownloadStatus } from "../services/orders.service.ts";

const tokenSchema = z.object({ token: z.string().regex(DOWNLOAD_TOKEN_PATTERN) });

export async function downloadStatus(
  req: Request,
  res: Response<ApiResponse<DownloadStatus>>,
): Promise<void> {
  const parsed = tokenSchema.safeParse(req.body);
  // A malformed token gets the same answer as an unknown one.
  const data: DownloadStatus = parsed.success
    ? await getDownloadStatus(parsed.data.token)
    : { state: "invalid" };
  res.json({ ok: true, data });
}

export async function downloadFile(
  req: Request,
  res: Response<ApiResponse<DownloadFileResponse>>,
): Promise<void> {
  const parsed = tokenSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new HttpError(410, "This download link is no longer available", "DOWNLOAD_UNAVAILABLE");
  }
  res.json({ ok: true, data: { url: await claimDownload(parsed.data.token) } });
}
