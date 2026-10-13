import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { socialLinks } from "@/lib/site";
import { GuideLink } from "./guide-link";
import { LanguageSwitch } from "./language-switch";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "./social-icons";

const focusRing = "outline-none focus-visible:ring-4 focus-visible:ring-brand/50";

// Arabic script is joined, so letter-spacing is Latin-only.
const navText = "text-base/[22px] font-semibold ltr:tracking-[0.2px]";

const navLink = `flex h-11 items-center rounded-full px-3 text-ink transition-colors duration-150 ease-out hover:text-ink-muted ${navText} ${focusRing}`;

const iconLink = `flex size-11 items-center justify-center rounded-full text-ink transition-colors duration-150 ease-out hover:text-ink-muted ${focusRing}`;

type Props = {
  lang: Locale;
  dict: Dictionary;
};

export function SiteHeader({ lang, dict }: Props) {
  const links = [
    { href: `/${lang}#products`, label: dict.nav.products },
    { href: `/${lang}#how-it-works`, label: dict.nav.howItWorks },
    { href: `/${lang}#faqs`, label: dict.nav.faqs },
    { href: `/${lang}#about`, label: dict.nav.about },
  ];

  const socials = [
    { href: socialLinks.tiktok, label: dict.social.tiktok, Icon: TikTokIcon },
    { href: socialLinks.instagram, label: dict.social.instagram, Icon: InstagramIcon },
    { href: socialLinks.whatsapp, label: dict.social.whatsapp, Icon: WhatsAppIcon },
  ];

  const socialIcons = socials.map(({ href, label, Icon }) => (
    <a
      key={href}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={iconLink}
    >
      <Icon className="size-5" />
    </a>
  ));

  return (
    <header className="sticky top-0 z-50 border-b border-black/6 bg-canvas/90 backdrop-blur-xl">
      <nav
        aria-label={dict.nav.label}
        className="relative flex h-17 items-center justify-between gap-2 px-5 lg:h-23 lg:px-8"
      >
        <div className="flex items-center gap-5">
          <Link
            href={`/${lang}`}
            aria-label={dict.nav.home}
            className={`-mx-2 flex h-11 items-center gap-2 rounded-full px-2 transition-opacity ease-out hover:opacity-80 ${focusRing}`}
          >
            <Logo className="size-8 shrink-0" />
            {/* lang="en" keeps the wordmark in the system font on the Arabic site too. */}
            <span
              lang="en"
              dir="ltr"
              className="text-xl font-black tracking-tight text-ink max-[359px]:hidden"
            >
              GuiderPlan
            </span>
          </Link>

          <ul className="hidden items-center lg:flex">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={navLink}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-1 lg:gap-2">
          <div className="hidden items-center xl:flex">
            {socialIcons}
            <span aria-hidden="true" className="mx-3 h-7 w-px bg-black/8" />
          </div>

          <LanguageSwitch
            to={dict.switchLanguage.lang as Locale}
            label={dict.switchLanguage.label}
            className={`hidden lg:flex ${navLink}`}
          />

          <GuideLink lang={lang} label={dict.nav.getTheGuide} size="nav" />

          <MobileMenu openLabel={dict.nav.openMenu} closeLabel={dict.nav.closeMenu}>
            <ul>
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={`-mx-3 ${navLink}`}>
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <LanguageSwitch
                  to={dict.switchLanguage.lang as Locale}
                  label={dict.switchLanguage.label}
                  className={`-mx-3 ${navLink}`}
                />
              </li>
            </ul>
            <div className="-mx-3 mt-2 flex items-center">{socialIcons}</div>
          </MobileMenu>
        </div>
      </nav>
    </header>
  );
}
