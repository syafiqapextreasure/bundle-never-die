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

The production domain is `https://www.bundleneverdie.com`. Requests to the apex domain or HTTP production URLs redirect permanently to HTTPS www, preserving paths and query parameters. Both domain hostnames must remain attached to this Worker in Cloudflare. Production canonical URLs, `/sitemap.xml` and `/robots.txt` consistently use HTTPS www. Preview hosts default to their incoming origin, with an optional `SITE_URL` override. `.html` and trailing-slash page URLs redirect to clean paths; unknown paths return a genuine 404.

## Google Analytics and Search Console

GA4 measurement ID **G-ZWP1RDB3S9** is installed in `src/worker.mjs`. The Worker injects the owner's Google tag immediately after `<head>` on every production HTML page, including the 404 page. Local previews and `workers.dev` URLs do not send analytics, even when `SITE_URL` is set to the production domain. Do not add a second copy in the page templates or Google Tag Manager. Normal page navigation lets the Google tag send its default page-view event.

After deployment, visit the public website and check **Google Analytics → Reports → Realtime**, or use Google Tag Assistant. A successful build or the presence of the tag alone does not confirm that Google has received events. Browser blockers and consent settings can affect collection.

In Search Console, verify the Domain property `bundleneverdie.com` using Google's DNS TXT record, then submit `https://www.bundleneverdie.com/sitemap.xml`. Search Console verification and its optional GA4 product link are separate account setup steps; the Analytics tag does not complete them automatically.

## Pages and editing

- `/` — Utama
- `/tentang` — community story, Facebook channels and searchable 2026 vendor archive
- `/program` — 2027 overview, pending timetable, calendar download and FAQ
- `/sorotan` — separate past events, international support and media
- `/galeri` — photo albums, keyboard-accessible lightbox and original 2026 video; linked only from Sorotan

Edit content in `src/data.mjs` and `src/pages.mjs`; edit styles in `public/styles.css`. `content/vendors.txt` is the 2026 spelling-review list. The full transcription is also downloadable. This is **not** a confirmed 2027 vendor list.

Article hours, admission fees and the detailed 2027 schedule remain unannounced. The Kita Reporters card opens the supplied clipping because an original article URL could not be verified. If a verified URL becomes available, save it in `content/kita-article-url.txt` and change that card's label to “Baca artikel”.

## Assets and quality

### Adding album photographs

Edit `content/albums.json`. Its keys are `antarabangsa`, `tour` and `komuniti`. Each photo entry is `["asset-name", "Visible caption", "Accessible photo description"]`. Put the corresponding native-resolution, optimized WebP at `public/assets/asset-name.webp`. Optional smaller variants can be added to `public/assets/asset-manifest.json` for thumbnail delivery. Run `npm run build` and `npm test` afterward.

The gallery presents a responsive photograph grid first. Clicking a preview opens the original-resolution photograph in a lightbox with previous/next controls, keyboard arrows and Escape to close. Albums initially show 12 previews; “Paparkan lagi” reveals the next 12. This supports 80 photographs per album without showing a large detail image before the visitor chooses one. Existing albums contain the actual supplied photos only. Keep names unique within each album and preserve the correct event/year.

See the [3 November visual revision](docs/REVIEW-2026-11-03.md) for the larger typography, paper layers, restored banner details and carousel changes.

Owner-supplied event photos are retained at native resolution with lossless WebP compression and separately resized responsive variants. Generated approved artwork supplies the masthead, key display lettering, icons, paper and still-life. Small promotional-card crops have been replaced with original event photographs. Real HTML heading text accompanies display lettering for accessibility and search. Body text uses self-hosted licensed fonts; font license files are included.

The new red background was made with the authorized built-in ImageGen tool. Its exact underlying model is not selectable or asserted as GPT Image 2. Small crops retain the resolution limits of their approved source art; lossless compression does not invent new detail. Generated promotional images are not used as documentary gallery photos.

See [visual audit](docs/VISUAL-AUDIT.md), [SEO research](docs/SEO-RESEARCH.md) and [asset provenance](docs/ASSETS.md).

## Checks

```sh
npm test
npm run test:worker
npx wrangler deploy --dry-run
```

The visual review covers 390px phone, 834px tablet, 1440px desktop and a 2560px homepage check. Native dialog controls, album filters, navigation and vendor search are verified in the browser. Parallax, hover zoom, animated icon feedback and native view transitions respect `prefers-reduced-motion`. Native page transitions progressively enhance browsers that support them.

`test:worker` starts the actual local Cloudflare runtime to catch initialization failures that a dry-run cannot detect. See [the startup fix and compact-layout revision](docs/FOLLOWUP-DEPLOYMENT-AND-LAYOUT.md). The Worker imports only the filesystem-free route list; album JSON is consumed during the static build.
