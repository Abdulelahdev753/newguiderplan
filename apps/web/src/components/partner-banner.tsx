import type { Dictionary } from "@/i18n/dictionaries";
import { socialLinks } from "@/lib/site";

type Props = {
  dict: Dictionary;
};

/** A wide card announcing the partnership with Travel Stars, as wide as the products grid. */
export function PartnerBanner({ dict }: Props) {
  const copy = dict.partner;
  const whatsappHref = `${socialLinks.whatsapp}?text=${encodeURIComponent(copy.whatsappMessage)}`;

  return (
    <section aria-labelledby="partner-title" className="px-5 pb-20 lg:px-8 lg:pb-28">
      {/* On a phone the logo sits on top of the copy. From tablet up it takes the end side,
          on a warm panel in the logo's own gold that melts into the white of the copy. */}
      <div className="relative isolate mx-auto flex max-w-5xl flex-col overflow-clip rounded-[26px] bg-white shadow-card outline outline-black/16 sm:min-h-80 sm:flex-row-reverse sm:items-stretch lg:min-h-96">
        <div className="flex items-center justify-center bg-linear-to-b from-[#d1af6c]/16 to-white px-6 pt-10 pb-4 sm:w-1/2 sm:py-10 sm:ltr:bg-linear-to-l sm:rtl:bg-linear-to-r">
          <img
            src="/images/travel-stars-logo.svg"
            alt={copy.logoAlt}
            width={2081}
            height={807}
            loading="lazy"
            decoding="async"
            className="h-auto w-56 select-none sm:w-72 lg:w-80"
          />
        </div>

        <div className="flex flex-col justify-center p-6 pt-4 text-center sm:w-1/2 sm:p-10 sm:text-start lg:p-12">
          <h2
            id="partner-title"
            className="text-3xl/[1.25] font-extrabold text-balance text-ink lg:text-4xl/[1.25] ltr:tracking-tight"
          >
            {copy.title}
          </h2>
          <p className="mt-3 text-base/7 text-pretty text-ink-muted lg:text-lg/8">{copy.body}</p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-6 flex h-12 w-fit items-center rounded-full bg-brand px-6 text-base/[22px] font-semibold whitespace-nowrap text-white shadow-cta outline-none transition-colors ease-out hover:bg-brand-hover focus-visible:ring-4 focus-visible:ring-brand/50 sm:mx-0 ltr:tracking-[0.2px]"
          >
            {copy.button}
          </a>
        </div>
      </div>
    </section>
  );
}
