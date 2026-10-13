import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "../config/env.ts";
import { HttpError } from "./http-error.ts";

let client: SupabaseClient | undefined;

/** The server-side Supabase client. It uses the secret key, so it must never reach the browser. */
export function supabase(): SupabaseClient {
  if (!env.supabaseUrl || !env.supabaseSecretKey) {
    throw new HttpError(503, "Checkout is not configured", "NOT_CONFIGURED");
  }
  client ??= createClient(env.supabaseUrl, env.supabaseSecretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
