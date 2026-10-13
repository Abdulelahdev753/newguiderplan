import type { HealthStatus } from "@guiderplan/shared";

export function getHealth(): HealthStatus {
  return {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
}
