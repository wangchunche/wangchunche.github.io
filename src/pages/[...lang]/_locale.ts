import { DEFAULT_LOCALE, LOCALES } from "../../locales/translation";

export function localeParams(locale: string) {
  return locale === DEFAULT_LOCALE ? undefined : locale;
}

export function getLocalePaths() {
  return LOCALES.map((locale) => ({ params: { lang: localeParams(locale) } }));
}
