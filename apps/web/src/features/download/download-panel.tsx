"use client";

import type { DownloadFileResponse, DownloadStatus, ProductId } from "@guiderplan/shared";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { apiFetch } from "@/lib/api-client";
import { socialLinks } from "@/lib/site";

const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;
/** sessionStorage key holding the token once it has been taken out of the address bar. */
const TOKEN_STORAGE_KEY = "guiderplan.download";
const POLL_INTERVAL_MS = 3000;
// After this long without a confirmation, point the buyer at WhatsApp as well.
const SLOW_AFTER_MS = 45_000;

type View = { state: "loading" } | { state: "failed" } | DownloadStatus;

type Props = {
  lang: Locale;
  copy: Dictionary["download"];
  guideNames: Record<ProductId, string>;
};

/** Reads the token from the address once, then hides it from the address bar and history. */
function takeToken(): string | null {
  const fromUrl = new URLSearchParams(window.location.search).get("token");
  try {
    if (fromUrl && TOKEN_PATTERN.test(fromUrl)) {
      sessionStorage.setItem(TOKEN_STORAGE_KEY, fromUrl);
      window.history.replaceState(null, "", window.location.pathname);
      return fromUrl;
    }
    return sessionStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    // Storage can be blocked; the token in the address still works.
    return fromUrl && TOKEN_PATTERN.test(fromUrl) ? fromUrl : null;
  }
}

function formatTimeLeft(ms: number): string {
  const seconds = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export function DownloadPanel({ lang, copy, guideNames }: Props) {
  const [view, setView] = useState<View>({ state: "loading" });
  const [now, setNow] = useState(() => Date.now());
  const [slow, setSlow] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const tokenRef = useRef<string | null>(null);

  const refresh = useCallback(async () => {
    const token = tokenRef.current;
    if (!token) {
      setView({ state: "invalid" });
      return;
    }
    try {
      setView(
        await apiFetch<DownloadStatus>("/downloads/status", {
          method: "POST",
          body: JSON.stringify({ token }),
        }),
      );
    } catch {
      // A dropped request is retried by the next poll; anything else keeps the current view.
    }
  }, []);

  useEffect(() => {
    const failed = new URLSearchParams(window.location.search).get("payment") === "failed";
    tokenRef.current = takeToken();

    const start = window.setTimeout(() => {
      if (failed) setView({ state: "failed" });
      else void refresh();
    }, 0);
    return () => window.clearTimeout(start);
  }, [refresh]);

  // Until the payment is confirmed, keep asking.
  const waiting = view.state === "loading" || view.state === "pending";
  useEffect(() => {
    if (!waiting) return;
    const poll = window.setInterval(() => void refresh(), POLL_INTERVAL_MS);
    const slowTimer = window.setTimeout(() => setSlow(true), SLOW_AFTER_MS);
    return () => {
      window.clearInterval(poll);
      window.clearTimeout(slowTimer);
    };
  }, [waiting, refresh]);

  const expiresAt = view.state === "ready" ? Date.parse(view.expiresAt) : null;
  useEffect(() => {
    if (expiresAt === null) return;
    const tick = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(tick);
  }, [expiresAt]);

  async function download() {
    const token = tokenRef.current;
    if (!token || downloading) return;
    setDownloading(true);
    setDownloadError(false);
    try {
      const { url } = await apiFetch<DownloadFileResponse>("/downloads/file", {
        method: "POST",
        body: JSON.stringify({ token }),
      });
      // The file is served as an attachment, so the browser saves it and stays on this page.
      window.location.assign(url);
    } catch {
      setDownloadError(true);
    }
    await refresh();
    setDownloading(false);
  }

  const orderNumber = "orderNumber" in view ? view.orderNumber : null;
  const whatsappText = orderNumber
    ? copy.whatsappOrderMessage.replace("{orderNumber}", orderNumber)
    : copy.whatsappMessage;
  const whatsappHref = `${socialLinks.whatsapp}?text=${encodeURIComponent(whatsappText)}`;

  const whatsappLink = (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 items-center justify-center rounded-full bg-brand px-6 text-base/[22px] font-semibold text-white shadow-cta outline-none transition-colors ease-out hover:bg-brand-hover focus-visible:ring-4 focus-visible:ring-brand/50 ltr:tracking-[0.2px]"
    >
      {copy.whatsapp}
    </a>
  );
  const backLink = (
    <Link
      href={`/${lang}#products`}
      className="flex h-12 items-center justify-center rounded-full bg-neutral-200/80 px-6 text-base/[22px] font-semibold text-ink shadow-cta-light outline outline-black/16 transition-colors ease-out hover:bg-neutral-200 focus-visible:ring-4 focus-visible:ring-brand/50 ltr:tracking-[0.2px]"
    >
      {copy.backToGuides}
    </Link>
  );
  const orderLine = orderNumber ? (
    <p className="text-sm/6 text-ink-muted">
      {copy.orderNumber}:{" "}
      <span dir="ltr" className="font-bold text-ink select-all">
        {orderNumber}
      </span>
    </p>
  ) : null;

  let title: string;
  let body: string;
  let actions: React.ReactNode;

  // The countdown can run out before the next answer from the server arrives.
  const timeLeft = expiresAt === null ? 0 : expiresAt - now;

  if (view.state === "ready" && timeLeft > 0) {
    title = copy.readyTitle;
    body = copy.readyBody.replace("{name}", guideNames[view.productId]);
    actions = (
      <>
        <dl className="grid grid-cols-2 gap-3 text-start">
          <div className="rounded-2xl bg-neutral-100 p-4">
            <dt className="text-xs/5 text-ink-muted">{copy.timeLeft}</dt>
            <dd dir="ltr" className="text-2xl/8 font-extrabold tabular-nums rtl:text-end">
              {formatTimeLeft(timeLeft)}
            </dd>
          </div>
          <div className="rounded-2xl bg-neutral-100 p-4">
            <dt className="text-xs/5 text-ink-muted">{copy.downloadsLeft}</dt>
            <dd className="text-2xl/8 font-extrabold tabular-nums">{view.downloadsLeft}</dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={download}
          disabled={downloading}
          className="flex h-13 cursor-pointer items-center justify-center rounded-full bg-brand px-6 text-lg/[26px] font-semibold text-white shadow-cta outline-none transition-colors ease-out hover:bg-brand-hover focus-visible:ring-4 focus-visible:ring-brand/50 disabled:cursor-wait disabled:opacity-70 ltr:tracking-[0.2px]"
        >
          {downloading ? copy.preparing : copy.button}
        </button>
        {downloadError ? (
          <p role="alert" className="text-sm/5 text-red-700">
            {copy.downloadError}
          </p>
        ) : null}
      </>
    );
  } else if (view.state === "ready" || view.state === "expired") {
    title = copy.expiredTitle;
    body = copy.expiredBody;
    actions = whatsappLink;
  } else if (view.state === "used_up") {
    title = copy.usedUpTitle;
    body = copy.usedUpBody;
    actions = whatsappLink;
  } else if (view.state === "invalid") {
    title = copy.invalidTitle;
    body = copy.invalidBody;
    actions = (
      <>
        {whatsappLink}
        {backLink}
      </>
    );
  } else if (view.state === "failed") {
    title = copy.failedTitle;
    body = copy.failedBody;
    actions = backLink;
  } else {
    title = copy.pendingTitle;
    body = copy.pendingBody;
    actions = slow ? (
      <>
        <p className="text-sm/6 text-ink-muted">{copy.pendingHelp}</p>
        {whatsappLink}
      </>
    ) : null;
  }

  return (
    <section
      aria-live="polite"
      className="mx-auto flex max-w-md flex-col gap-5 rounded-[26px] bg-white p-6 text-center shadow-card outline outline-black/16 lg:p-8"
    >
      <div>
        <h1 className="text-3xl/[1.3] font-extrabold text-balance text-ink ltr:tracking-tight">
          {title}
        </h1>
        <p className="mt-3 text-base/7 text-pretty text-ink-muted">{body}</p>
      </div>
      {orderLine}
      {actions}
    </section>
  );
}
