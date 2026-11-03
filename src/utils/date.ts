/**
 * The blog displays all calendar dates in Beijing time, independent of the
 * machine that runs the build.
 */
export const SITE_TIME_ZONE = "Asia/Shanghai";

/**
 * Formats a Date object to a string in Beijing time.
 *
 * @param date - The Date object to format.
 * @param locales - A string representing the locales to use; defaults to 'en'.
 * @param options - Intl.DateTimeFormatOptions; defaults to year, month, and day.
 * @returns A formatted date string with slashes replaced by ' - '.
 */
export function formatDate(
  date: Date,
  locales: string = "en",
  options?: Intl.DateTimeFormatOptions,
) {
  return date
    .toLocaleDateString(locales, {
      timeZone: SITE_TIME_ZONE,
      ...(options ?? { year: "numeric", month: "2-digit", day: "2-digit" }),
    })
    .replaceAll("/", " - ");
}

/** Returns the calendar year of a Date in Beijing time. */
export function yearInSiteTimeZone(date: Date): number {
  return Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: SITE_TIME_ZONE,
      year: "numeric",
    }).format(date),
  );
}
