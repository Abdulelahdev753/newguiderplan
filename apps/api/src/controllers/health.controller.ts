import type { ApiResponse, HealthStatus } from "@guiderplan/shared";
import type { Request, Response } from "express";
import { getHealth } from "../services/health.service.ts";

export function healthCheck(_req: Request, res: Response<ApiResponse<HealthStatus>>): void {
  res.json({ ok: true, data: getHealth() });
}
