import type { Dictionary } from "@/i18n/dictionaries";
import { socialLinks } from "@/lib/site";

type Props = {
  dict: Dictionary;
};

export function Faqs({ dict }: Props) {
  const copy = dict.faqs;
  const whatsappHref = `${socialLinks.whatsapp}?text=${encodeURIComponent(copy.whatsappMessage)}`;

  return (
    <section id="faqs" className="scroll-mt-25 px-5 pb-20 lg:scroll-mt-33 lg:px-8 lg:pb-28">
      <div className="mb-8 text-center lg:mb-12">
        <h2 className="text-3xl/[1.3] font-extrabold text-ink lg:text-4xl/[1.3] ltr:tracking-tight">
          {copy.title}
        </h2>
        <p className="mx-auto mt-3 max-w-[52ch] text-base/7 text-pretty text-ink-muted">
          {copy.subtitle}
        </p>
      </div>

      {/* One card of rows, like the product cards. Each row is a native disclosure, so it
          opens with a tap or the keyboard and needs no script. */}
      <div className="mx-auto max-w-3xl divide-y divide-black/10 overflow-clip rounded-[26px] bg-white shadow-card outline outline-black/16">
        {copy.items.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-start text-base/6 font-semibold text-ink outline-none select-none focus-visible:ring-4 focus-visible:ring-brand/50 focus-visible:ring-inset sm:px-6 sm:py-5 sm:text-lg/7 [&::-webkit-details-marker]:hidden">
              {item.question}
              {/* A plus that turns into a cross while the answer is open. */}
              <svg
                viewBox="0 0 20 20"
                className="size-5 shrink-0 text-brand transition-transform duration-200 ease-out group-open:rotate-45"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M10 4v12M4 10h12" />
              </svg>
            </summary>
            <p className="-mt-1 px-5 pb-5 text-base/7 text-pretty text-ink-muted sm:px-6 sm:pb-6">
              {item.answer}
            </p>
          </details>
        ))}
      </div>

      <p className="mt-6 text-center text-base/7 text-ink-muted">
        {copy.more}{" "}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm font-semibold text-brand-ink underline underline-offset-4 outline-none hover:text-brand focus-visible:ring-4 focus-visible:ring-brand/50"
        >
          {copy.whatsapp}
        </a>
      </p>
    </section>
  );
}
