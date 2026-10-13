import { BuyButton } from "@/features/checkout/buy-button";
import { DetailsButton } from "@/features/guide-details/details-button";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { FadeCard } from "./fade-card";

type ProductId = keyof Dictionary["products"]["items"];

type Product = {
  id: ProductId;
  image?: string;
  /** Where the landmark sits in the picture, so the crop keeps it in view. */
  focus?: string;
  price: string;
  /** The price before a discount; shown struck through beside the current one. */
  oldPrice?: string;
};

const products: Product[] = [
  { id: "london", image: "/images/products/london.webp", focus: "30% 40%", price: "39.99" },
  {
    id: "bali",
    image: "/images/products/bali.webp",
    focus: "50% 60%",
    price: "89.99",
    oldPrice: "118.99",
  },
  {
    id: "barcelona",
    image: "/images/products/barcelona.webp",
    focus: "45% 25%",
    price: "29.99",
    oldPrice: "34.99",
  },
  {
    id: "amsterdam",
    image: "/images/products/amsterdam.webp",
    focus: "50% 40%",
    price: "29.99",
    oldPrice: "34.99",
  },
  {
    id: "northItaly",
    image: "/images/products/north-italy.webp",
    focus: "40% 45%",
    price: "29.99",
    oldPrice: "34.99",
  },
  {
    id: "prague",
    image: "/images/products/prague.webp",
    focus: "70% 28%",
    price: "29.99",
    oldPrice: "34.99",
  },
];

// Arabic script is joined, so letter-spacing and uppercase are Latin-only.
const smallCaps = "text-[11px]/4 font-extrabold ltr:tracking-[0.1em] ltr:uppercase rtl:text-xs/5";

// The two buttons on a phone card. Each is drawn smaller than a fingertip, so an unseen
// margin (the ::before) widens what a tap can land on: up from "Buy", down from "Read more".
const phoneButtons = [
  "max-sm:[&>button]:relative max-sm:[&>button]:whitespace-nowrap",
  "max-sm:[&>button]:before:absolute max-sm:[&>button]:before:inset-x-0",
  "max-sm:[&>button:first-of-type]:mt-2 max-sm:[&>button:first-of-type]:h-9",
  "max-sm:[&>button:first-of-type]:text-xs/[18px] max-[22.4rem]:[&>button:first-of-type]:text-[11px]/[18px]",
  "max-sm:[&>button:first-of-type]:before:-top-2 max-sm:[&>button:first-of-type]:before:bottom-0",
  // "Read more" drops to a plain text link, so the card has one clear main action.
  "max-sm:[&>button:last-of-type]:mt-1 max-sm:[&>button:last-of-type]:h-7",
  "max-sm:[&>button:last-of-type]:bg-transparent max-sm:[&>button:last-of-type]:shadow-none",
  "max-sm:[&>button:last-of-type]:outline-0 max-sm:[&>button:last-of-type]:text-[11px]/[18px]",
  "max-sm:[&>button:last-of-type]:text-ink-muted max-sm:[&>button:last-of-type]:underline",
  "max-sm:[&>button:last-of-type]:underline-offset-2",
  "max-sm:[&>button:last-of-type]:before:top-0 max-sm:[&>button:last-of-type]:before:-bottom-1.5",
].join(" ");

type Props = {
  lang: Locale;
  dict: Dictionary;
};

export function Products({ lang, dict }: Props) {
  const copy = dict.products;

  return (
    <section id="products" className="scroll-mt-25 px-5 pb-20 lg:scroll-mt-33 lg:px-8 lg:pb-28">
      <div className="mb-8 text-center lg:mb-12">
        <h2 className="text-3xl/[1.3] font-extrabold text-ink lg:text-4xl/[1.3] ltr:tracking-tight">
          {copy.title}
        </h2>
        <p className="mx-auto mt-3 max-w-[52ch] text-base/7 text-pretty text-ink-muted">
          {copy.subtitle}
        </p>
      </div>

      {/* Three to a row on a phone, so the whole range fits in one screen. The row reaches
          a little into the page margin to give each picture more room. */}
      <ul className="mx-auto grid max-w-5xl grid-cols-3 gap-2 max-sm:-mx-2 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {products.map(({ id, image, focus, price, oldPrice }) => {
          const item = copy.items[id];

          return (
            <li key={id}>
              <FadeCard
                image={image}
                imageAlt={item.imageAlt}
                imagePosition={focus}
                className="h-[14.75rem] [--fade-from:18%] [--fade-to:50%] [--image-height:50%] max-sm:rounded-2xl max-sm:p-2 max-sm:pb-1.5 max-sm:[--fade-from:5.25rem] max-sm:[--fade-to:7.25rem] max-sm:[--image-height:7.5rem] sm:h-[30rem]"
              >
                <h3 className="text-base/[1.1] font-medium text-balance text-ink sm:text-4xl/[0.95] ltr:font-serif ltr:tracking-[-0.045em] rtl:text-sm/[1.4] rtl:font-extrabold sm:rtl:text-3xl/[1.3]">
                  {item.name}
                </h3>
                {/* The phone card is too small for it and the country; "Read more" carries them. */}
                <p className="mt-3 max-w-[34ch] text-sm/[1.55] text-pretty text-ink-muted max-sm:hidden">
                  {item.description}
                </p>

                <div
                  className={`mt-1 flex flex-col border-black/10 text-ink-muted sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:border-t sm:pt-3 ${smallCaps}`}
                >
                  <span className="max-sm:hidden">{item.country}</span>
                  {/* On a phone the old price sits under the new one; guides without one keep the
                      line, so every card's picture ends at the same height. */}
                  <span className="flex flex-wrap content-start items-baseline gap-x-2 whitespace-nowrap max-sm:min-h-7.5 sm:shrink-0 sm:flex-nowrap ltr:tracking-normal">
                    <span className="text-sm/5 text-ink sm:order-last sm:text-lg/7">
                      {copy.price.replace("{amount}", price)}
                    </span>
                    {oldPrice ? (
                      <s className="text-[10px]/none font-semibold sm:text-xs/none">
                        {copy.price.replace("{amount}", oldPrice)}
                      </s>
                    ) : null}
                  </span>
                </div>

                <div className={phoneButtons}>
                  <BuyButton
                    lang={lang}
                    productId={id}
                    productName={item.name}
                    label={copy.buy}
                    copy={dict.checkout}
                  />
                  <DetailsButton
                    productId={id}
                    label={copy.moreInfo}
                    name={item.name}
                    country={item.country}
                    description={item.description}
                    image={image}
                    imageAlt={item.imageAlt}
                    price={copy.price.replace("{amount}", price)}
                    copy={dict.details}
                    action={
                      <BuyButton
                        lang={lang}
                        productId={id}
                        productName={item.name}
                        label={copy.buy}
                        copy={dict.checkout}
                      />
                    }
                  />
                </div>
              </FadeCard>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
