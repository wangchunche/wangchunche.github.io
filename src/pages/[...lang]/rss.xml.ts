import rss from "@astrojs/rss";
import YukinaConfig from "../../../yukina.config";
import {
  DEFAULT_LOCALE,
  LOCALES,
  localeFromPath,
  localePrefix,
} from "../../locales/translation";
import { GetSortedPosts, SlugOf } from "../../utils/content";
import { IdToSlug } from "../../utils/hash";

export function getStaticPaths() {
  return LOCALES.map((locale) => ({
    params: { lang: locale === DEFAULT_LOCALE ? undefined : locale },
  }));
}

export async function GET(context: { site: string; url: URL }) {
  const locale = localeFromPath(context.url.pathname);
  const posts = await GetSortedPosts(locale);
  return rss({
    title: YukinaConfig.title,
    description: YukinaConfig.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published,
      link: `${localePrefix(locale)}/posts/${IdToSlug(SlugOf(post.id))}/`,
    })),
  });
}
