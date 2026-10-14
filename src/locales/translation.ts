import type I18nKeys from "./keys";
import { en } from "./languages/en";
import { zh_CN } from "./languages/zh_cn";

export type Translation = {
  [K in I18nKeys]: string;
};

const translations: { [key: string]: Translation } = {
  en: en,
  zh: zh_CN,
};

export const LOCALES = ["en", "zh"];
export const DEFAULT_LOCALE = "en";

export const LOCALE_LABELS: { [key: string]: string } = {
  en: "EN",
  zh: "中文",
};

export function isLocale(value: string): boolean {
  return Object.prototype.hasOwnProperty.call(translations, value.toLowerCase());
}

export function localePrefix(locale: string): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

export function localeFromPath(pathname: string): string {
  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  const locale = segment.toLowerCase();
  return isLocale(locale) ? locale : DEFAULT_LOCALE;
}

export function localeSwitchUrl(pathname: string, locale: string): string {
  const current = localeFromPath(pathname);
  let rest = pathname;
  if (current !== DEFAULT_LOCALE) {
    rest = pathname.slice(localePrefix(current).length);
  }
  if (rest === "") {
    rest = "/";
  }
  const prefix = localePrefix(locale);
  if (prefix === "") {
    return rest;
  }
  return rest === "/" ? `${prefix}/` : `${prefix}${rest}`;
}

export function getTranslation(locale: string): Translation {
  return translations[locale.toLowerCase()] ?? translations[DEFAULT_LOCALE];
}

export function i18n(
  locale: string,
  key: I18nKeys,
  ...interpolations: string[]
): string {
  let translation = getTranslation(locale)[key];
  interpolations.forEach((interpolation) => {
    translation = translation.replace("{{}}", interpolation);
  });
  return translation;
}

export function useI18n(pathname: string) {
  const locale = localeFromPath(pathname);
  return (key: I18nKeys, ...interpolations: string[]) =>
    i18n(locale, key, ...interpolations);
}
