# Visual audit and verification

Reviewed against the five approved raster designs on 2 November 2026. Visual corrections preceded functional tests.

## Page-by-page review

| Page | Reference | Mismatches found and corrected |
|---|---|---|
| Utama | 06-homepage-vol09.png | Removed Media/Galeri navigation; cleaned stray volume text from the extracted masthead; restored Vol. 09; adjusted header date spacing, triptych crop, original display lettering, program illustrations and wide Fuji artwork; removed repeated lines from texture tiles; stacked mobile program cards for readable descriptions. |
| Tentang | 12-tentang-brotherhood-international.png | Replaced incorrect wide heading proportions with original display lettering; retained narrative/photo split, two Facebook channels, international strip, vendor 2026 and December tour; removed floor plan; links now go through Sorotan; corrected tablet closing-date wrapping. |
| Program | 08-program-new-photos.png | Preserved new photo set, corrected hero crop to keep the standing visitor's face, restored the third row's proper event photo, original still-life and postcard decoration; added compact FAQ below the archive link. |
| Sorotan | 14-sorotan-with-december-tour.png | Separated 2026, December 2025 and August 2025 events; constrained archive image heights to prevent empty sidebar space; preserved international support and separate Japan-promotion section; original wide Fuji crop restored. |
| Galeri | 13-galeri-international-alor-setar.png | Replaced compact gallery header with the shared header as requested; restored the decorative still-life below it and removed stray menu text from its crop; corrected portrait crop positions, mobile caption sizes and clipped December label; added photo lightbox and archive album selection. |

## Deliberate adaptations and limits

- Navigation follows the latest request: only Utama, Tentang, Program and Sorotan. Gallery entry links exist only on Sorotan. Media remains a section, not a header item.
- Responsive layouts preserve section order and artwork while reflowing columns. Primary body text is 18px or larger on phones; the root size grows up to 27px on large screens. Compact utility labels/captions are smaller.
- The original wordmark and key display lettering are image assets with real accessible HTML heading text. Other live typography uses licensed self-hosted serif and condensed fonts. Generated designs do not specify an identifiable font file, so live typography is a visual approximation, not a claim of an exact licensed typeface match.
- Real event photography is used for documentary gallery albums. Some approved promotional-card artwork and decorative still-life remain generated imagery.
- Native-resolution assets are retained losslessly. Smaller responsive variants intentionally resize pixels. Small approved raster crops cannot supply detail that was absent from their source; no claim of 100% pixel equivalence or lossless resolution enlargement is made.
- The program FAQ, functional controls, readable mobile reflow and common gallery header are intentional differences from the raster compositions.
- Timetable, hours and ticket price are not invented. Historical vendor text remains marked for spelling review.
- The Kita Reporters title/date are from the supplied clipping. Exact-title and author searches did not establish the article URL; the publisher fetch failed TLS hostname validation. Its card opens the supplied clipping, not an unrelated publisher homepage.

## Screenshots

All five pages captured at **1440×1000**, **834×1112**, and **390×844**. An additional homepage check used **2560×1440**. No horizontal document overflow or missing visible images was found in final captures. Local screenshot mode loads all images eagerly; production lazy loading remains enabled.

Side-by-side comparisons (approved design left, implementation right):

- [Utama](visual/home-comparison.jpg)
- [Tentang](visual/tentang-comparison.jpg)
- [Program](visual/program-comparison.jpg)
- [Sorotan](visual/sorotan-comparison.jpg)
- [Galeri](visual/galeri-comparison.jpg)

## Functional verification

- Eight automated checks pass: all page metadata and H1s, header restrictions, clean-route redirects, local asset references, sitemap/robots, event/ICS dates, 404/method/HEAD behavior and canonical-domain override.
- Browser checks passed: phone menu expansion/collapse; vendor dialog, search and close; gallery album query selection; image enlargement, next image and Escape close; filter URL updates.
- Reduced-motion behavior is implemented in CSS and JavaScript. Native page transitions progressively enhance supported browsers.
- Local Wrangler dry-run could not finish because this managed Windows environment rejects subprocess creation (`spawn EPERM`). The repository includes GitHub Actions to run build, tests and the Wrangler dry-run in Linux. Actual Cloudflare account deployment is not performed by this delivery.
- GitHub Actions subsequently passed installation, build, all eight tests and the Cloudflare Wrangler dry-run: [verified run](https://github.com/syafiqapextreasure/bundle-never-die/actions/runs/41479187683). The uploaded source tree and local reviewed source tree have identical Git tree hashes.
