import { randomInt } from "node:crypto";

// No 0/O, 1/I/L or U, so a number read out over WhatsApp can't be misheard.
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTVWXYZ";

export const ORDER_NUMBER_PATTERN = /^GP-[2-9A-HJKMNP-TV-Z]{4}-[2-9A-HJKMNP-TV-Z]{4}$/;

/** A random order number such as GP-7K2M-9QXT. Random, so one can't be guessed from another. */
export function createOrderNumber(): string {
  let code = "";
  for (let i = 0; i < 8; i++) code += ALPHABET[randomInt(ALPHABET.length)];
  return `GP-${code.slice(0, 4)}-${code.slice(4)}`;
}
