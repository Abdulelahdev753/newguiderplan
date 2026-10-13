import Link from "next/link";
import type { Locale } from "@/i18n/config";

const sizes = {
  nav: "h-10 px-3.5 text-[15px]/[22px] lg:h-11 lg:px-4 lg:text-base/[22px]",
  hero: "h-13 px-6 text-lg/[26px]",
};

type Props = {
  lang: Locale;
  label: string;
  size: keyof typeof sizes;
};

/** The primary call to action, shared by the navbar and the hero. */
export function GuideLink({ lang, label, size }: Props) {
  return (
    <Link
      href={`/${lang}#guide`}
      className={`flex w-fit items-center rounded-full bg-brand font-semibold whitespace-nowrap text-white shadow-cta outline-none transition-colors ease-out hover:bg-brand-hover focus-visible:ring-4 focus-visible:ring-brand/50 ltr:tracking-[0.2px] ${sizes[size]}`}
    >
      {label}
    </Link>
  );
}
