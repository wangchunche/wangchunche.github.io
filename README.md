# Personal blog

Bilingual (English / Chinese) static blog built with [Astro](https://astro.build) and the [Yukina](https://github.com/WhitePaper233/yukina) theme, deployed to GitHub Pages by GitHub Actions.

- English: https://wangchunche.github.io/
- Chinese: https://wangchunche.github.io/zh/
- Package manager: **pnpm**, Node **>= 22**

```sh
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Writing posts

Posts live in `src/contents/posts/<locale>/`, where `<locale>` is `en` or `zh`.

- `src/contents/posts/en/hello.md` and `src/contents/posts/zh/hello.md` are the same post in two languages: the language switcher pairs them by file name.
- If one language is missing, its URL is still generated and shows a "translation in progress" page that links to the available versions.
- Frontmatter: `title`, `published`, `draft`, `description`, `cover`, `tags`, `category`.

The About page uses `src/contents/specs/<locale>/about.md`.

Adding another language means adding one entry to `LOCALES` in `src/locales/translation.ts`, one file in `src/locales/languages/`, and one content folder per collection.

## Configuration

- Site metadata, navigation, banners, slug mode, license: `yukina.config.ts`
- UI strings and the locale list: `src/locales/`
- Pages and routing: `src/pages/[...lang]/`
- Deployment: `.github/workflows/deploy.yml`

## Publishing

`git push` builds the site and deploys it automatically.
