# Header texture, compact stories and Worker startup fix

The reported Cloudflare error 10021 was caused by `worker.mjs` importing `data.mjs` for its route list. That module also read `content/albums.json` at module initialization. The JSON belongs to the build environment and was not present in the deployed Worker filesystem. A successful build or Wrangler dry-run did not execute that startup code.

The Worker now imports a small, filesystem-free `routes.mjs`. Album reads remain exclusively in the static build. No account changes, extra bindings or credentials are required. Keep the Cloudflare commands `npm run build` and `npx wrangler deploy`.

Verification now includes an isolated-module regression test without any content directory and `npm run test:worker`, which actually starts Wrangler/workerd and requests all five pages, an asset, redirects, sitemap, canonical URLs and a missing route. GitHub Actions runs this startup test in addition to the package dry-run. The Windows sandbox prevents local subprocess startup (`EPERM`), so the workerd test runs in the Linux CI environment.

Cloudflare reference: [Worker virtual filesystem](https://developers.cloudflare.com/workers/runtime-apis/nodejs/fs/).

## Visual changes

- The shared header and breadcrumb have an explicit aged-paper layer; masthead lettering blends with that paper.
- Program uses three compact photo-and-copy cards on desktop, balanced horizontal cards on tablet and stacked cards on phones. Tablet photos no longer force cards to inherit their original portrait height.
- Returns has contextual archive copy and a more balanced text/photo ratio.
- International support combines its heading, country labels, story and gallery link in one column beside the photos.
- The Fuji feature has a short contextual caption and editorial footer, with a shorter photo area.

Reviewed at 1440px, 834px and 390px. Source event photos and dates remain unchanged. New screenshots are in `docs/visual/followup-*`.
