"use client";

import type { HealthStatus } from "@guiderplan/shared";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-client";

type State = "loading" | "online" | "offline";

const LABELS: Record<State, string> = {
  loading: "Checking API…",
  online: "API is online",
  offline: "API is unreachable",
};

export function ApiStatus() {
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    const controller = new AbortController();

    apiFetch<HealthStatus>("/health", { signal: controller.signal })
      .then(() => setState("online"))
      .catch(() => {
        if (!controller.signal.aborted) setState("offline");
      });

    return () => controller.abort();
  }, []);

  return <p className="text-neutral-600 dark:text-neutral-400">{LABELS[state]}</p>;
}
