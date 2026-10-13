import type { ApiResponse } from "@guiderplan/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export class ApiError extends Error {
  readonly status: number;
  readonly code: string | undefined;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  let body: ApiResponse<T>;
  try {
    body = await res.json();
  } catch {
    throw new ApiError(res.status, `Unexpected response from ${path} (${res.status})`);
  }

  if (!body.ok) {
    throw new ApiError(res.status, body.error.message, body.error.code);
  }
  return body.data;
}
