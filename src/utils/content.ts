import { getCollection } from "astro:content";
import { IdToSlug } from "./hash";
import { localePrefix } from "../locales/translation";

export interface Archive {
  title: string;
  id: string;
  date: Date;
  tags?: string[];
}

export interface Tag {
  name: string;
  slug: string;
  posts: Archive[];
}

export interface Category {
  name: string;
  slug: string;
  posts: Archive[];
}

/** "en/hello-world" -> "hello-world" */
export function SlugOf(id: string): string {
  const parts = id.split("/");
  return parts[parts.length - 1];
}

/** "en/hello-world" -> "en" */
export function LocaleOf(id: string): string {
  const parts = id.split("/");
  return parts.length > 1 ? parts[0] : "";
}

async function GetPublishedPosts() {
  return getCollection("posts", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
}

async function GetPostsOfLocale(locale: string) {
  const allPosts = await GetPublishedPosts();
  return allPosts.filter((post) => LocaleOf(post.id) === locale);
}

/** Every translated slug and the locales it exists in. */
export async function GetTranslationIndex() {
  const allPosts = await GetPublishedPosts();
  const index = new Map<string, string[]>();
  for (const post of allPosts) {
    const slug = SlugOf(post.id);
    const locale = LocaleOf(post.id);
    if (!index.has(slug)) {
      index.set(slug, []);
    }
    index.get(slug)!.push(locale);
  }
  return index;
}

export async function GetSortedPosts(locale: string) {
  const sorted = (await GetPostsOfLocale(locale)).sort((a, b) => {
    const dateA = new Date(a.data.published);
    const dateB = new Date(b.data.published);
    return dateA > dateB ? -1 : 1;
  });

  for (let i = 1; i < sorted.length; i++) {
    (sorted[i].data as any).nextSlug = SlugOf(sorted[i - 1].id);
    (sorted[i].data as any).nextTitle = sorted[i - 1].data.title;
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    (sorted[i].data as any).prevSlug = SlugOf(sorted[i + 1].id);
    (sorted[i].data as any).prevTitle = sorted[i + 1].data.title;
  }

  return sorted;
}

export async function GetArchives(locale: string) {
  const archives = new Map<number, Archive[]>();

  for (const post of await GetPostsOfLocale(locale)) {
    const date = new Date(post.data.published);
    const year = date.getFullYear();
    if (!archives.has(year)) {
      archives.set(year, []);
    }
    archives.get(year)!.push({
      title: post.data.title,
      id: `${localePrefix(locale)}/posts/${IdToSlug(SlugOf(post.id))}`,
      date: date,
      tags: post.data.tags,
    });
  }

  const sortedArchives = new Map(
    [...archives.entries()].sort((a, b) => b[0] - a[0]),
  );
  sortedArchives.forEach((value) => {
    value.sort((a, b) => (a.date > b.date ? -1 : 1));
  });

  return sortedArchives;
}

export async function GetTags(locale: string) {
  const tags = new Map<string, Tag>();

  for (const post of await GetPostsOfLocale(locale)) {
    post.data.tags?.forEach((tag: string) => {
      const tagSlug = IdToSlug(tag);
      if (!tags.has(tagSlug)) {
        tags.set(tagSlug, {
          name: tag,
          slug: `${localePrefix(locale)}/tags/${tagSlug}`,
          posts: [],
        });
      }
      tags.get(tagSlug)!.posts.push({
        title: post.data.title,
        id: `${localePrefix(locale)}/posts/${IdToSlug(SlugOf(post.id))}`,
        date: new Date(post.data.published),
        tags: post.data.tags,
      });
    });
  }

  return tags;
}

export async function GetCategories(locale: string) {
  const categories = new Map<string, Category>();

  for (const post of await GetPostsOfLocale(locale)) {
    if (!post.data.category) continue;
    const categorySlug = IdToSlug(post.data.category);

    if (!categories.has(categorySlug)) {
      categories.set(categorySlug, {
        name: post.data.category,
        slug: `${localePrefix(locale)}/categories/${categorySlug}`,
        posts: [],
      });
    }
    categories.get(categorySlug)!.posts.push({
      title: post.data.title,
      id: `${localePrefix(locale)}/posts/${IdToSlug(SlugOf(post.id))}`,
      date: new Date(post.data.published),
      tags: post.data.tags,
    });
  }

  return categories;
}
