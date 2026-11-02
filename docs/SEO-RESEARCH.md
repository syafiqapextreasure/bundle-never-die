# SEO and AEO research

Research date: 2 November 2026. This document records implementation recommendations and evidence, not a claim of measured search demand or guaranteed rankings.

## Confirmed content boundaries

- Owner-confirmed upcoming event: **Bundle Neverdie Festival Vol. 09**, **1 & 2 Mei 2027**, **Kompleks Sukan KHTP, Kulim, Kedah**.
- Purpose: help bundle and vintage traders market their goods, meet customers and collectors, and build community. Use **Acara bersama Bundle Group (Brotherhood)** and describe community collaboration. The owner states there are no sponsors.
- Opening hours, admission prices, ticket arrangements, performers and a detailed timetable have not been confirmed. Do not invent them in visible content, metadata or structured data.
- The supplied vendor directory is **2026**, not 2027. The owner requested removal of the 2026 floor plan.
- Keep the December 2025 Alor Setar tour, earlier promotional imagery in Japan, and the 2026 festival as distinct archive items. Do not imply that the Mount Fuji photo documents a festival held in Japan.
- The owner identifies supporters from Thailand, Indonesia, Japan and other countries. This supports a collective international-community section, not nationality labels inferred for individual people in photographs.
- The header should contain Utama, Tentang, Program and Sorotan. Gallery is reached through a normal link on Sorotan, not a header item. Do not add a Media header item.

## Keyword strategy and metadata

The following phrases are selected for relevance, location and visitor intent. No paid keyword-volume, difficulty or competitor-traffic dataset was available. These are recommendations, not a volume-ranked list.

| Route | Main intent | Recommended title |
| --- | --- | --- |
| `/` | Bundle Neverdie Festival 2027; festival bundle Kulim | Bundle Neverdie Festival 2027 · Vol. 09 · Kulim, Kedah |
| `/tentang` | Komuniti bundle dan vintage; Bundle Never Die Brotherhood | Tentang Komuniti & Brotherhood · Bundle Neverdie Festival |
| `/program` | Program festival bundle 2027; event bundle Kedah | Program 2027 · 1–2 Mei · Bundle Neverdie Festival Kulim |
| `/sorotan` | Acara terdahulu; tour bundle Alor Setar 2025 | Sorotan Acara & Tour · Bundle Neverdie Festival |
| `/galeri` | Gambar festival bundle; galeri komuniti | Galeri Komuniti & Tour Alor Setar · Bundle Neverdie Festival |

Recommended homepage description:

> Bundle Neverdie Festival Vol. 09 kembali pada 1 & 2 Mei 2027 di Kompleks Sukan KHTP, Kulim, Kedah. Pertemuan komuniti bundle, vintage dan brotherhood.

Supporting phrases to use naturally where relevant: **festival bundle Kedah**, **event vintage Kulim**, **jualan bundle dan vintage**, **pakaian vintaj**, **komuniti peniaga bundle**, **kolektor vintage Malaysia**, **bundle festival Malaysia**. Maintain the current brand spelling; use historic “Bundle Never Die” naturally for the supplied group and archive names. Avoid keyword stuffing and obsolete meta-keywords tags.

## Comparable events

These are verified category or audience comparators. They are not claims about market share, current rivalry or ranking position. Keep this research in implementation notes rather than adding competitor names to the public marketing pages.

| Comparable | Relevance and limits | Source |
| --- | --- | --- |
| Pahang Vintage Festival | Direct vintage/thrift audience. The venue lists a 6–10 November 2026 edition. | [Kuantan 188 event listings](https://kuantan188.com.my/events/) |
| Darul Aman Retro (DARE), Sungai Petani | Kedah audience; Selam Fest includes bundle/preloved alongside a broader retro and automotive event. Coverage describes the eighth edition held 2–3 May 2026. | [Refleks coverage](https://refleks.my/ribuan-serbu-dataran-jam-besar-dare-edisi-ke-8-hidupkan-semula-nostalgia-kedah-tua/) |
| Santai Anak Utara, Langkawi 2025 | Northern community and brotherhood event with bundle/streetwear relevance, broader than a vintage festival. | [Official Langkawi tourism listing](https://naturallylangkawi.my/mega-gathering-santai-anak-utara-sau-edisi-langkawi-2025/) |
| Kuala Lumpur Vintage Festival | Historical category comparator for collectors and vintage sellers. The cited article concerns 2017; no forthcoming edition is established by this source. | [Vocket historical coverage](https://thevocket.com/kuala-lumpur-vintage-festival-kembali-tahun-ini-dengan-lebih-rare-dan-meriah/) |
| Kuching Vintage Festival 2025 | Comparable community of collectors and vendors. Coverage concerns the August 2025 edition, not a currently scheduled edition. | [Sarawak Tribune coverage](https://www.sarawaktribune.com/kuching-vintage-festival-returns-bigger-and-livelier-this-weekend/) |

The practical opportunity is a clear, readable website with the current year, exact local venue, owner-confirmed event facts, original photos, and a properly separated archive. This is a recommendation inferred from the event category, not an audited gap across every competitor website.

## Answer-focused content and structured data

Use semantic HTML and readable text, rather than baking important information into images. Place short, visible answers near the event details. Google states that ordinary search best practices remain applicable to AI features; there is no additional special AI markup requirement. [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features)

Suggested visible FAQ:

1. **Bilakah Bundle Neverdie Festival 2027 berlangsung?** Pada 1 & 2 Mei 2027, untuk Vol. 09.
2. **Di manakah lokasi festival?** Kompleks Sukan KHTP, Kulim, Kedah.
3. **Apakah tujuan festival ini?** Membantu peniaga memasarkan barangan bundle dan vintage serta menghubungkan peniaga, pelanggan dan pengumpul.
4. **Bagaimanakah acara ini digerakkan?** Melalui kerjasama Bundle Group (Brotherhood) dan usaha komuniti, tanpa penaja.
5. **Adakah jadual penuh sudah tersedia?** Maklumat program dan waktu terperinci akan diumumkan melalui saluran rasmi.
6. **Di mana boleh melihat acara terdahulu?** Halaman Sorotan menyediakan cerita acara terdahulu serta pautan ke galeri.

Use Event JSON-LD on the page focused on the upcoming event. Include the exact name, `startDate: 2027-05-01`, `endDate: 2027-05-02`, `eventStatus: https://schema.org/EventScheduled`, and a Place with the confirmed venue, locality Kulim, region Kedah, country MY. Use date-only values while hours are unknown; do not create midnight times. Omit unconfirmed offers, price, street address, postcode and performers. Archive cards must not masquerade as the current 2027 Event. [Google Event guidance](https://developers.google.com/search/docs/appearance/structured-data/event?hl=en)

Visible FAQs are useful to visitors, but do not promise FAQ rich results: Google generally limits that feature to authoritative government and health sites. [Google FAQ rich-result changes](https://developers.google.com/search/blog/2023/08/howto-faq-changes)

Other implementation recommendations:

- Use a real final deployment domain for canonical URLs, Open Graph URLs and the sitemap. Do not invent a production hostname.
- Supply unique titles/descriptions, `lang="ms"`, meaningful image alt text, robots.txt and a sitemap of public pages.
- Link to `/galeri` from `/sorotan` using a normal anchor so that the no-header-gallery requirement does not make the page inaccessible to crawlers.
- Keep descriptive headings, visible focus states, sufficient text contrast and comfortable body-text sizing. These also support older readers.
- Link directly to verified editorial sources. Do not present a publisher homepage as though it were a specific article.

## Community and editorial sources

Owner-supplied Facebook destinations:

- [Bundle Never Die (brotherhood) group](https://www.facebook.com/groups/296109614676375/)
- [Kulim bundle never die page](https://www.facebook.com/profile.php?id=100063553256783)

The screenshots establish a private group and a Facebook page. Their displayed membership and follower counts are snapshots, not verified current counts; omit those numbers from evergreen copy. Do not claim access to private posts or infer organizational history from the screenshots.

[Mynewshub, 28 July 2024](https://www.mynewshub.tv/2024/07/trend-festival-pakaian-bundle-vintaj-semakin-popular-angkat-nama-malaysia-di-mata-dunia/) provides public historical coverage of the bundle/vintage festival, including international interest. Use it as an archive source, not as evidence of a confirmed 2027 programme.

### Kita Reporters article URL status

The owner supplied a screenshot of an article titled **“Perlukan festival bundle peringkat kebangsaan! Peniaga semakin ramai di Bundle Never Die Returns!”**, dated **22 August 2025**, attributed to **Abdul Aziz Itar**. These details are screenshot-derived. The visible address is truncated to a `/niaga/` path and does not establish a usable complete URL.

Exact-headline, shortened-headline, event-name and publisher-specific searches did not locate a verifiable article URL in this research session. Attempts to consult the publisher's public sitemap/robots endpoints and a Telegram search did not resolve it. **Do not fabricate the opaque article ID.** Until the full link is supplied or independently recovered, show a clearly labelled screenshot/archive preview without a misleading “read article” link. The [publisher homepage](https://kitareporters.com/) is only a general publisher destination, not the article URL.

## Cloudflare Workers static hosting and clean routes

For a static build output in `dist`, Cloudflare supports static asset hosting without a Worker script. A suitable Wrangler configuration is:

```json
{
  "name": "bundle-never-die",
  "compatibility_date": "2026-11-02",
  "assets": {
    "directory": "./dist",
    "html_handling": "drop-trailing-slash",
    "not_found_handling": "404-page"
  }
}
```

With this mode, `/tentang` can resolve a corresponding HTML asset and `.html`/trailing-slash variants redirect to the clean route. Produce a genuine `404.html`; do not use a universal SPA fallback for an ordinary multi-page static site. Test clean URLs, direct navigation and missing routes with Wrangler before deployment. [Cloudflare HTML handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/)

Use the current `assets` configuration rather than the older Workers Sites `site.bucket` approach. Confirm the actual output directory against the implementation. [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/), [Static assets getting started](https://developers.cloudflare.com/workers/static-assets/get-started/)
