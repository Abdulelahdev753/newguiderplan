import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { commercialRegistration, socialLinks } from "@/lib/site";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "./social-icons";

const heading = "text-base/6 font-medium text-brand-ink";

const link =
  "rounded-sm text-base/6 text-ink outline-none transition-colors duration-150 ease-out hover:text-ink-muted focus-visible:ring-4 focus-visible:ring-brand/50";

// The emblem leads on both sites: on the right in Arabic, on the left in English.
const ministryLogo: Record<Locale, string> = {
  en: "/images/ministry-of-commerce-ltr.svg",
  ar: "/images/ministry-of-commerce.svg",
};

// The site is a static export, so this is the year of the last build.
const year = String(new Date().getFullYear());

type Props = {
  lang: Locale;
  dict: Dictionary;
};

export function SiteFooter({ lang, dict }: Props) {
  const copy = dict.footer;

  const explore = [
    { href: `/${lang}#products`, label: dict.nav.products },
    { href: `/${lang}#how-it-works`, label: dict.nav.howItWorks },
    { href: `/${lang}#faqs`, label: dict.nav.faqs },
    { href: `/${lang}#about`, label: dict.nav.about },
  ];

  const guides = Object.entries(dict.products.items).map(([id, item]) => ({
    id,
    label: item.name,
  }));

  const socials = [
    { href: socialLinks.tiktok, label: copy.tiktok, Icon: TikTokIcon },
    { href: socialLinks.instagram, label: copy.instagram, Icon: InstagramIcon },
    { href: socialLinks.whatsapp, label: copy.whatsapp, Icon: WhatsAppIcon },
  ];

  return (
    <footer className="border-t-2 border-black/10 px-5 pt-10 pb-10 lg:px-8 lg:pt-12 lg:pb-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.8fr_1fr_1fr_1fr] lg:gap-x-8">
          <div className="col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-1">
            {/* lang="en" keeps the wordmark in the system font on the Arabic site too. */}
            <p
              lang="en"
              dir="ltr"
              className="text-2xl font-black tracking-tight text-ink rtl:text-end"
            >
              GuiderPlan
            </p>
            <p className="mt-6 max-w-[32ch] text-base/7 text-pretty text-ink-muted">{copy.blurb}</p>
            <div className="mt-6 flex items-center gap-4">
              <img
                src={ministryLogo[lang]}
                alt={copy.ministryOfCommerce}
                width={135}
                height={48}
                loading="lazy"
                decoding="async"
                className="h-12 w-auto shrink-0 select-none"
              />
              <p className="border-s border-black/10 ps-4 text-sm/5 text-ink-muted">
                {copy.commercialRegistration}
                <span className="block text-base/6 font-semibold text-ink tabular-nums">
                  {commercialRegistration}
                </span>
              </p>
            </div>
          </div>

          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className={heading}>
              {copy.explore}
            </h2>
            <ul className="mt-5 space-y-4">
              {explore.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={link}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-guides">
            <h2 id="footer-guides" className={heading}>
              {copy.guides}
            </h2>
            <ul className="mt-5 space-y-4">
              {guides.map(({ id, label }) => (
                <li key={id}>
                  <Link href={`/${lang}#products`} className={link}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-1">
            <h2 className={heading}>{copy.followUs}</h2>
            <ul className="mt-5 space-y-4">
              {socials.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-3 ${link}`}
                  >
                    <Icon className="size-5 shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* On desktop this shares the brand column's cell and sits at its bottom edge. */}
          <p className="col-span-2 -mt-9 text-sm/6 text-ink-muted lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:self-end">
            {copy.copyright.replace("{year}", year)}
          </p>
        </div>
      </div>
    </footer>
  );
}
