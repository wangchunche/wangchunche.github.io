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
      en: "为什么是 NeoJuliet 呢？",
      zh: "为什么是 NeoJuliet 呢？",
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