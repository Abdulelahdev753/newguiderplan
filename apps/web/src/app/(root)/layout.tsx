import type { Metadata } from "next";
import { defaultLocale } from "@/i18n/config";
import "../globals.css";

export const metadata: Metadata = {
  title: "GuiderPlan",
};

export default function RootRedirectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <body className="min-h-dvh bg-canvas text-ink antialiased">{children}</body>
    </html>
  );
}
