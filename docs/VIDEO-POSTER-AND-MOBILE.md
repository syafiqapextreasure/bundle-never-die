# Video poster and mobile refinement — 3 November 2026

- Added an illustrative ImageGen video cover, saved as `public/assets/throwback-cover.webp` (1672 × 941, lossless WebP). It is a designed cover, not a documentary photograph. The real supplied video remains unchanged.
- Play button reveals native controls and starts playback. No autoplay; native poster/controls remain usable without JavaScript.
- Community purpose cards use two columns followed by a full-width third card at widths up to 1000 px. Desktop keeps three cards. Sponsorship copy explains community work without inventing financial arrangements.
- The no-sponsor card now has a separate star-shield vector badge. Brotherhood retains its handshake.
- Mobile gallery introduction places live heading text and description on the left and the existing still-life artwork on the right.

## Image generation

Built-in ImageGen was used; no exact underlying model is asserted. The original generated PNG is retained in the local generated_images folder. Final web asset uses lossless compression.

Prompt:

Use case: ads-marketing. Create a polished widescreen 16:9 video cover BACKGROUND for Bundle Neverdie Festival, a Malaysian community vintage and secondhand clothing festival. This is an illustrative cover, not documentary event photography. Style: tactile vintage newspaper collage with aged cream paper, deep ink navy #091d2a, oxblood red #86221e, worn denim fabric, subtle printed halftone, distressed screen-print details. Arrange a close-up faded denim jacket, folded vintage graphic t-shirts with abstract unbranded prints, wooden hangers and an old blank admission ticket along the left and right lower edges. Add narrow photographic film-strip edges and fine offset-print border details. The central 50% must be uncluttered dark navy with subtle paper grain, allowing a white play button and crisp HTML title to be overlaid later. Restrained warm directional lighting, rich sharp fabric detail, refined editorial composition consistent with an antique newspaper festival website. Full bleed, high quality, landscape. NO words, letters, numbers, logos, people, flags, watermark, UI controls, or play icon. Do not invent an event photograph.

## Validation

Reviewed 390 px and 625 px mobile layouts and 1440 px desktop. Click-to-play verified with readyState 4, paused false and native controls enabled. Existing 12 automated site tests pass.
