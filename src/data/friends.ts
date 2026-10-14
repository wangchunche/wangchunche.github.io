export interface FriendLink {
  name: string;
  url: string;
  avatar?: string;
  description?: Record<string, string>;
}

export const friends: FriendLink[] = [
  {
    name: "NeoJuliet",
    url: "https://neojulietblog.netlify.app",
    avatar: "/images/friends/neojulietavatar.jpeg",
    description: {
      en: "似乎来到了没有知识存在的荒原？？",
      zh: "似乎来到了没有知识存在的荒原？？",
    },
  },
  {
    name: "Mike Ogilvy",
    url: "https://mikeogilvy.github.io",
    avatar: "/images/friends/mikeogilvyavatar.jpg",
    description: {
      en: "Recording life, technology and essays",
      zh: "Recording life, technology and essays",
    },
  }
];