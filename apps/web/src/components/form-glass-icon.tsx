/** A frosted-glass form with a glass pencil: two fields and a send button over a blue card. */
export function FormGlassIcon() {
  const label = "h-1 rounded-full bg-white";
  const field =
    "h-5 w-full rounded-md border border-white/70 bg-white/45 shadow-[inset_0_1px_2px_rgb(22_103_217/0.18)]";

  return (
    <div className="relative size-36">
      {/* What the glass blurs: a solid blue card with a few written lines. */}
      <div className="absolute inset-s-1 top-3 flex h-28 w-24 -rotate-12 flex-col items-start gap-2 rounded-3xl bg-linear-to-br from-sky-300 via-brand to-brand-ink ps-3 pt-7 shadow-[0_10px_24px_rgb(22_103_217/0.35)]">
        <span className="h-1 w-5 rounded-full bg-white/90" />
        <span className="h-1 w-7 rounded-full bg-white/90" />
        <span className="h-1 w-4 rounded-full bg-white/90" />
        <span className="h-1 w-6 rounded-full bg-white/90" />
      </div>

      <div className="absolute inset-s-9 top-1 flex h-32 w-25 rotate-6 flex-col items-start gap-1.5 rounded-3xl border border-white/80 bg-linear-to-br from-white/60 to-white/20 p-3.5 shadow-[0_14px_30px_rgb(22_103_217/0.28),inset_0_1px_1px_rgb(255_255_255/0.9)] backdrop-blur-md">
        <span className={`w-8 ${label}`} />
        <span className={field} />
        <span className={`mt-1 w-11 ${label}`} />
        <span className={field} />
        <span className="mt-auto flex h-5 w-full items-center justify-center rounded-full bg-brand shadow-cta">
          <svg
            viewBox="0 0 12 12"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3"
          >
            <path d="m2.5 6.5 2.5 2.5 4.5-5.5" />
          </svg>
        </span>
      </div>
      {/* A glass pencil, writing on the form. It stays left-to-right inside and is mirrored
          whole in Arabic, where the form sits on the other side. */}
      <div dir="ltr" className="absolute inset-s-9 top-[57px] w-28 rtl:-scale-x-100">
        <div className="relative flex h-3.5 rotate-45 items-stretch">
          {/* One soft shadow for the whole pencil. */}
          <span className="absolute inset-x-3 top-2.5 h-2.5 rounded-full bg-black/25 blur-[5px]" />
          <span className="relative w-4 rounded-s-md border border-e-0 border-white/70 bg-linear-to-b from-pink-200/85 to-pink-400/75 shadow-[inset_0_1px_1px_rgb(255_255_255/0.8)] backdrop-blur-sm" />
          <span className="relative w-3 border-y border-white/40 bg-ink/80 shadow-[inset_0_1px_1px_rgb(255_255_255/0.35)] backdrop-blur-sm" />
          <span className="relative flex flex-1 items-center border-y border-white/70 bg-linear-to-b from-yellow-200/80 via-yellow-400/70 to-amber-500/80 shadow-[inset_0_1px_1px_rgb(255_255_255/0.8)] backdrop-blur-sm">
            <span className="h-[3px] w-full bg-ink/75" />
          </span>
          {/* The sharpened wood and the graphite point. */}
          <svg viewBox="0 0 20 14" className="relative h-full w-5">
            <path d="M0 0 20 7 0 14Z" fill="#fef3c7" fillOpacity="0.92" />
            <path d="M13 4.55 20 7l-7 2.45Z" fill="#141414" />
          </svg>
        </div>
      </div>
    </div>
  );
}
