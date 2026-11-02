# Gallery grid and vector masthead — 3 November 2026

The gallery now opens with a responsive photograph list rather than a large single-photo viewer. Desktop uses three columns, tablet and phone use two, and very narrow screens use one. Album headings are more compact; cream photo frames, numbered previews and readable captions retain the newspaper theme. Full native-resolution photographs open only after selection.

Albums reveal 12 previews at a time through Paparkan lagi. Existing albums each have six supplied photographs. An 80-entry temporary fixture verified progressive disclosure through all 80 items, the final photograph, and wraparound to the first. The fixture is not published as real event content.

The masthead previously enlarged a 672 × 144 raster crop. The replacement SVG traces the original arched lettering and stars into navy and red paths, preserving the composition while eliminating raster enlargement blur. Its lightly irregular source outlines remain; it is not a newly typeset font. The source WebP is retained. Vector tracing used the official VTracer Python package (https://github.com/visioncortex/vtracer); no runtime dependency is added.

Verified locally: desktop 1440 px, tablet 834 px, phone 390 px, masthead at 2560 px; selecting photo 2, next-photo control, Escape, focus return, 80-entry reveal, and keyboard wraparound. Full photographs use contain sizing inside the dialog, while previews use deliberate crops. Header navigation remains Utama, Tentang, Program, Sorotan.

Screenshots: [desktop grid](visual/gallery-grid-desktop.jpg), [phone grid](visual/gallery-grid-phone.jpg), [large-screen masthead](visual/masthead-vector.jpg).

The shared inner-page event strip previously left a 1.2rem bottom margin before the breadcrumb (about 32 px at 1440 px). That empty band is removed on all inner pages, with compact spacing before introductory headings on Sorotan and Galeri.
