import type { ProductId } from "@guiderplan/shared";

export interface CatalogEntry {
  /** The product in StreamPay that the buyer is charged for. */
  streamProductId: string;
  /** The price shown on the site, in halalas. Checkout stops if StreamPay disagrees. */
  amountHalalas: number;
  /** The private Supabase bucket and the PDF inside it. */
  bucket: string;
  objectPath: string;
  /** The file name the buyer's browser saves. */
  downloadName: string;
  /** The title on StreamPay's checkout page. */
  linkName: string;
}

// The browser only ever sends a product id; everything else is looked up here.
export const catalog: Record<ProductId, CatalogEntry> = {
  london: {
    streamProductId: "a0951f24-c17f-4add-885f-f89b3db4fbcd",
    amountHalalas: 3999,
    bucket: "united-kingdom",
    objectPath: "London.pdf",
    downloadName: "Guiderplan-London.pdf",
    linkName: "Guiderplan London Guide",
  },
  bali: {
    streamProductId: "ed09fff0-a83c-466e-aeec-111e79a34d27",
    amountHalalas: 8999,
    bucket: "indonesia",
    objectPath: "bali.pdf",
    downloadName: "Guiderplan-Bali.pdf",
    linkName: "Guiderplan Bali Guide",
  },
  barcelona: {
    streamProductId: "8bf6f2e6-475b-4bb0-9fa2-f91409bb48eb",
    amountHalalas: 2999,
    bucket: "spain",
    objectPath: "barcelona.pdf",
    downloadName: "Guiderplan-Barcelona.pdf",
    linkName: "Guiderplan Barcelona Guide",
  },
  amsterdam: {
    streamProductId: "f9282c34-fd47-403f-8737-addbed1077c4",
    amountHalalas: 2999,
    bucket: "netherlands",
    objectPath: "amsterdam.pdf",
    downloadName: "Guiderplan-Amsterdam.pdf",
    linkName: "Guiderplan Amsterdam Guide",
  },
  northItaly: {
    streamProductId: "34cfae07-da91-4435-ad04-42f05bf4851f",
    amountHalalas: 2999,
    bucket: "italy",
    objectPath: "northern-italy.pdf",
    downloadName: "Guiderplan-Northern-Italy.pdf",
    linkName: "Guiderplan Northern Italy Guide",
  },
  prague: {
    streamProductId: "d15010ea-2468-4e55-9d5c-a46ccdeb5717",
    amountHalalas: 2999,
    bucket: "czech-republic",
    objectPath: "prague.pdf",
    downloadName: "Guiderplan-Prague.pdf",
    linkName: "Guiderplan Prague Guide",
  },
};

export const isProductId = (value: string): value is ProductId => Object.hasOwn(catalog, value);
