"use client";

import { useEffect, useId, useState } from "react";

type Props = {
  openLabel: string;
  closeLabel: string;
  children: React.ReactNode;
};

export function MobileMenu({ openLabel, closeLabel, children }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((value) => !value)}
        className="-me-2.5 flex size-11 items-center justify-center rounded-full text-ink outline-none focus-visible:ring-4 focus-visible:ring-brand/50"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
        </svg>
      </button>

      <div
        id={panelId}
        hidden={!open}
        // Any link inside the panel navigates, so a click on one closes the menu.
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpen(false);
        }}
        className="absolute inset-x-0 top-full border-b border-black/6 bg-canvas px-5 pt-2 pb-6"
      >
        {children}
      </div>
    </div>
  );
}
