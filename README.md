# Bundle Neverdie Festival

Five responsive, static-first pages for **Vol. 09 · 1 & 2 Mei 2027 · Kompleks Sukan KHTP, Kulim, Kedah**. A small Cloudflare Worker supplies canonical URLs, sitemap, redirects and security headers. No framework or client-side routing dependency.

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run build
npm run dev
```

Open `http://127.0.0.1:4173`. The local preview accepts `?capture=1` to load all images eagerly for full-page screenshot comparison; production keeps normal lazy loading.

## Deploy to Cloudflare Workers

Connect this repository in **Workers & Pages → Create → Import a repository**.

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: repository root
- Configuration: `wrangler.jsonc`

Or deploy from your own machine:

```sh
npm ci
npm run deploy
```

Wrangler prompts for your Cloudflare login. The repository contains no Cloudflare or OpenAI credentials. No API key or image generation is needed to build the website.

The canonical domain defaults to the incoming request origin, so the assigned `workers.dev` URL works immediately. When using a custom domain, optionally add Worker variable `SITE_URL=https://your-domain.example` in Cloudflare settings. `/sitemap.xml` and `/robots.txt` follow that domain automatically. `.html` and trailing-slash page URLs redirect to clean paths; unknown paths return a genuine 404.

## Pages and editing

- `/` — Utama
- `/tentang` — community story, Facebook channels and searchable 2026 vendor archive
- `/program` — 2027 overview, pending timetable, calendar download and FAQ
- `/sorotan` — separate past events, international support and media
- `/galeri` — photo albums, keyboard-accessible lightbox and original 2026 video; linked only from Sorotan

Edit content in `src/data.mjs` and `src/pages.mjs`; edit styles in `public/styles.css`. `content/vendors.txt` is the 2026 spelling-review list. The full transcription is also downloadable. This is **not** a confirmed 2027 vendor list.

Article hours, admission fees and the detailed 2027 schedule remain unannounced. The Kita Reporters card opens the supplied clipping because an original article URL could not be verified. If a verified URL becomes available, save it in `content/kita-article-url.txt` and change that card's label to “Baca artikel”.

## Assets and quality

Owner-supplied event photos are retained at native resolution with lossless WebP compression and separately resized responsive variants. Generated approved artwork supplies the masthead, key display lettering, icons, paper, still-life and promotional-card imagery. Real HTML heading text accompanies display lettering for accessibility and search. Body text uses self-hosted licensed fonts; font license files are included.

The new red background was made with the authorized built-in ImageGen tool. Its exact underlying model is not selectable or asserted as GPT Image 2. Small crops retain the resolution limits of their approved source art; lossless compression does not invent new detail. Generated promotional images are not used as documentary gallery photos.

See [visual audit](docs/VISUAL-AUDIT.md), [SEO research](docs/SEO-RESEARCH.md) and [asset provenance](docs/ASSETS.md).

## Checks

```sh
npm test
npx wrangler deploy --dry-run
```

The visual review covers 390px phone, 834px tablet, 1440px desktop and a 2560px homepage check. Native dialog controls, album filters, navigation and vendor search are verified in the browser. Parallax, hover zoom, animated icon feedback and native view transitions respect `prefers-reduced-motion`. Native page transitions progressively enhance browsers that support them.
