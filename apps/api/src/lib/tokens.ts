import { createHash, randomBytes } from "node:crypto";

/** 32 random bytes in base64url are always 43 characters. */
export const DOWNLOAD_TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;

export function hashDownloadToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** The token goes to the buyer; only its hash is stored, so a database leak reveals no links. */
export function createDownloadToken(): { token: string; hash: string } {
  const token = randomBytes(32).toString("base64url");
  return { token, hash: hashDownloadToken(token) };
}
