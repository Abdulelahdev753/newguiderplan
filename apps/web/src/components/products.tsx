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

      {/* Two to a row on a phone, so the whole range is a short scroll. */}
      <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {products.map(({ id, image, focus, price, oldPrice }) => {
          const item = copy.items[id];

          return (
            <li key={id}>
              <FadeCard
                image={image}
                imageAlt={item.imageAlt}
                imagePosition={focus}
                className="h-[22.5rem] [--fade-from:18%] [--fade-to:50%] [--image-height:50%] max-sm:rounded-[20px] max-sm:p-3.5 sm:h-[30rem]"
              >
                <h3 className="text-2xl/[1.05] font-medium text-balance text-ink sm:text-4xl/[0.95] ltr:font-serif ltr:tracking-[-0.045em] rtl:text-xl/[1.4] rtl:font-extrabold sm:rtl:text-3xl/[1.3]">
                  {item.name}
                </h3>
                {/* The phone card is too narrow for it; "Read more" carries it there. */}
                <p className="mt-3 max-w-[34ch] text-sm/[1.55] text-pretty text-ink-muted max-sm:hidden">
                  {item.description}
                </p>

                <div
                  className={`mt-2.5 flex flex-col gap-1 border-t border-black/10 pt-2 text-ink-muted sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:pt-3 ${smallCaps}`}
                >
                  <span>{item.country}</span>
                  <span className="flex flex-wrap items-baseline gap-x-2 whitespace-nowrap sm:shrink-0 sm:flex-nowrap ltr:tracking-normal">
                    <span className="text-base/6 text-ink sm:order-last sm:text-lg/7">
                      {copy.price.replace("{amount}", price)}
                    </span>
                    {oldPrice ? (
                      <s className="text-xs/none font-semibold">
                        {copy.price.replace("{amount}", oldPrice)}
                      </s>
                    ) : null}
                  </span>
                </div>

                <div className="max-sm:[&>button]:text-sm/[22px] max-sm:[&>button]:first:mt-3 max-sm:[&>button]:last:mt-2">
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
