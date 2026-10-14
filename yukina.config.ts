import I18nKeys from "./src/locales/keys";
import type { Configuration } from "./src/types/config";

const YukinaConfig: Configuration = {
  title: "Wang Chün-Chê",
  subTitle: "My footprints in the Universe",
  brandTitle: "J.Z. Wang",

  description: "Chün-Chê's personal blog",

  site: "https://wangchunche.github.io",

  navigators: [
    {
      nameKey: I18nKeys.nav_bar_home,
      href: "/",
    },
    {
      nameKey: I18nKeys.nav_bar_archive,
      href: "/archive",
    },
    {
      nameKey: I18nKeys.pages_tags_title,
      href: "/tags",
    },
    {
      nameKey: I18nKeys.nav_bar_links,
      href: "/links",
    },
    {
      nameKey: I18nKeys.nav_bar_github,
      href: "https://github.com/wangchunche",
    },
  ],

  username: "Wang Chün-Chê",
  sign: "Why, 35 years ago, fly the Atlantic?",
  avatarUrl: "/avatar.jpg",
  socialLinks: [
    {
      icon: "line-md:github-loop",
      link: "https://github.com/wangchunche",
    },
    {
      icon: "line-md:email",
      link: "mailto:uangjiunje@gmail.com",
    },
  ],
  maxSidebarCategoryChip: 6,
  maxSidebarTagChip: 12,
  maxFooterCategoryChip: 6,
  maxFooterTagChip: 24,

  banners: ["/banner.jpg"],

  slugMode: "RAW",

  license: {
    name: "",
    url: "",
  },

  bannerStyle: "STATIC",
};

export default YukinaConfig;
