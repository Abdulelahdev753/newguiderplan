import { BuyButton } from "@/features/checkout/buy-button";
import { DetailsButton } from "@/features/guide-details/details-button";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { FadeCard } from "./fade-card";

type ProductId = keyof Dictionary["products"]["items"];

type Product = {
  id: ProductId;
  image?: string;
  price: string;
  /** The price before a discount; shown struck through beside the current one. */
  oldPrice?: string;
};

const products: Product[] = [
  { id: "london", image: "/images/products/london.webp", price: "39.99" },
  {
    id: "bali",
    image: "/images/products/bali.webp",
    price: "89.99",
    oldPrice: "118.99",
  },
  {
    id: "barcelona",
    image: "/images/products/barcelona.webp",
    price: "29.99",
    oldPrice: "34.99",
  },
  {
    id: "amsterdam",
    image: "/images/products/amsterdam.webp",
    price: "29.99",
    oldPrice: "34.99",
  },
  {
    id: "northItaly",
    image: "/images/products/north-italy.webp",
    price: "29.99",
    oldPrice: "34.99",
  },
  {
    id: "prague",
    image: "/images/products/prague.webp",
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

      <ul className="mx-auto grid max-w-md gap-6 sm:max-w-6xl sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {products.map(({ id, image, price, oldPrice }) => {
          const item = copy.items[id];

          return (
            <li key={id}>
              <FadeCard
                image={image}
                imageAlt={item.imageAlt}
                className="h-[35rem] [--fade-from:14%] [--fade-to:72%]"
              >
                <h3 className="text-[2.75rem]/[0.95] font-medium text-balance text-ink ltr:font-serif ltr:tracking-[-0.045em] rtl:text-4xl/[1.3] rtl:font-extrabold">
                  {item.name}
                </h3>
                <p className="mt-3 max-w-[34ch] text-sm/[1.55] text-pretty text-ink-muted">
                  {item.description}
                </p>

                <div
                  className={`mt-5 flex items-center justify-between gap-3 border-t border-black/10 pt-3 text-ink-muted ${smallCaps}`}
                >
                  <span>{item.country}</span>
                  <span className="flex items-baseline gap-2 ltr:tracking-normal">
                    {oldPrice ? (
                      <s className="text-sm/none font-semibold">
                        {copy.price.replace("{amount}", oldPrice)}
                      </s>
                    ) : null}
                    <span className="text-xl/7 text-ink">
                      {copy.price.replace("{amount}", price)}
                    </span>
                  </span>
                </div>

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
              </FadeCard>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
