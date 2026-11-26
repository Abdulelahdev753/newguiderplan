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
    streamProductId: "275ec7bd-38f7-436e-a04c-b9f0e6a5c4e7",
    amountHalalas: 4499,
    bucket: "united-kingdom",
    objectPath: "London.pdf",
    downloadName: "Guiderplan-London.pdf",
    linkName: "Guiderplan London Guide",
  },
  bali: {
    streamProductId: "8bf88f8a-1b50-45db-ac28-b607493ed383",
    amountHalalas: 6749,
    bucket: "indonesia",
    objectPath: "bali.pdf",
    downloadName: "Guiderplan-Bali.pdf",
    linkName: "Guiderplan Bali Guide",
  },
  barcelona: {
    streamProductId: "f6c467f4-3807-49fd-b107-28de2db44268",
    amountHalalas: 2249,
    bucket: "spain",
    objectPath: "barcelona.pdf",
    downloadName: "Guiderplan-Barcelona.pdf",
    linkName: "Guiderplan Barcelona Guide",
  },
  amsterdam: {
    streamProductId: "8a041005-6957-44ca-802d-ce26b5fb7d00",
    amountHalalas: 2249,
    bucket: "netherlands",
    objectPath: "amsterdam.pdf",
    downloadName: "Guiderplan-Amsterdam.pdf",
    linkName: "Guiderplan Amsterdam Guide",
  },
  northItaly: {
    streamProductId: "6285eb6b-94b9-4325-8cea-7d7295cee762",
    amountHalalas: 2249,
    bucket: "italy",
    objectPath: "northern-italy.pdf",
    downloadName: "Guiderplan-Northern-Italy.pdf",
    linkName: "Guiderplan Northern Italy Guide",
  },
  prague: {
    streamProductId: "a4e83fa2-4513-401e-9fe3-948077a5f464",
    amountHalalas: 3749,
    bucket: "czech-republic",
    objectPath: "prague.pdf",
    downloadName: "Guiderplan-Prague.pdf",
    linkName: "Guiderplan Prague Guide",
  },
};

export const isProductId = (value: string): value is ProductId => Object.hasOwn(catalog, value);
