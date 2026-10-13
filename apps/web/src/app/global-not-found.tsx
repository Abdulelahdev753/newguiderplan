import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found · GuiderPlan",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-canvas text-ink antialiased">
        <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-4 px-6">
          <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
          <a href="/" className="underline underline-offset-4">
            Back to home
          </a>
        </main>
      </body>
    </html>
  );
}
