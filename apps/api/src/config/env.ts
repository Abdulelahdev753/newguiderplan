import path from "node:path";

const nodeEnv = process.env.NODE_ENV ?? "development";
const isProduction = nodeEnv === "production";

function parsePort(value: string | undefined, fallback: number): number {
  if (value === undefined || value === "") return fallback;
  const port = Number(value);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error(`Invalid PORT: "${value}"`);
  }
  return port;
}

function parseList(value: string | undefined, fallback: string[]): string[] {
  if (value === undefined) return fallback;
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/** A secret the checkout needs. Production refuses to start without it. */
function secret(name: string): string {
  const value = process.env[name]?.trim() ?? "";
  if (value === "" && isProduction) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parseSiteUrl(value: string | undefined, fallback: string): string {
  const raw = value?.trim() || fallback;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`Invalid PUBLIC_SITE_URL: "${raw}"`);
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`Invalid PUBLIC_SITE_URL: "${raw}"`);
  }
  return url.origin;
}

/** Express's "trust proxy" setting: a hop count, a boolean, or a preset such as "loopback". */
function parseTrustProxy(value: string | undefined): boolean | number | string {
  const raw = value?.trim() ?? "";
  if (raw === "" || raw === "false") return false;
  if (raw === "true") return true;
  return /^\d+$/.test(raw) ? Number(raw) : raw;
}

export const env = {
  nodeEnv,
  isProduction,
  port: parsePort(process.env.PORT, 4000),
  corsOrigins: parseList(process.env.CORS_ORIGIN, isProduction ? [] : ["http://localhost:3000"]),
  // Resolves to apps/web/out from both src/config and dist/config.
  webDistDir: process.env.WEB_DIST_DIR
    ? path.resolve(process.env.WEB_DIST_DIR)
    : path.resolve(import.meta.dirname, "../../../web/out"),
  trustProxy: parseTrustProxy(process.env.TRUST_PROXY),
  // Where buyers return to after paying.
  publicSiteUrl: parseSiteUrl(
    isProduction ? secret("PUBLIC_SITE_URL") : process.env.PUBLIC_SITE_URL,
    "http://localhost:3000",
  ),
  supabaseUrl: secret("SUPABASE_URL"),
  supabaseSecretKey: secret("SUPABASE_SECRET_KEY"),
  streamApiKey: secret("STREAM_API_KEY"),
  streamWebhookSecret: secret("STREAM_WEBHOOK_SECRET"),
};
