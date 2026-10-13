import { parsePhoneNumberFromString } from "libphonenumber-js/max";

/** Returns the number in E.164 form (+966512345678), or null if it isn't a real number. */
export function normalizePhone(input: string): string | null {
  const phone = parsePhoneNumberFromString(input.trim());
  return phone?.isValid() ? phone.number : null;
}
