import { readFileSync } from 'node:fs';
const manifest=JSON.parse(readFileSync('public/assets/asset-manifest.json','utf8'));
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
export function albumCarousel(photos,id){
 const data=photos.map(([name,caption,alt])=>({src:`/assets/${name}.webp`,thumb:manifest[name]?.variants?.[0]?.src||`/assets/${name}.webp`,caption,alt}));
 const first=data[0];
 if(!first)return '<p>Foto album akan ditambah.</p>';
 return `<div class="album-carousel" data-carousel="${id}" role="region" aria-roledescription="karusel" aria-label="Album foto ${id}">
 <script type="application/json" class="album-data">${JSON.stringify(data).replaceAll('<','\\u003c')}</script>
 <div class="album-stage" tabindex="0" aria-label="Foto album. Gunakan anak panah untuk menukar foto."><button class="album-open" aria-label="Besarkan foto: ${escape(first.caption)}"><img class="album-image" src="${first.src}" alt="${escape(first.alt)}" loading="lazy" decoding="async"><span class="expand-icon" aria-hidden="true">⤢</span></button><button class="album-prev round-control" aria-label="Foto sebelumnya">←</button><button class="album-next round-control" aria-label="Foto seterusnya">→</button></div>
 <div class="album-toolbar"><div><p class="album-kicker">ARKIB FOTO <span class="album-counter">01 / ${String(data.length).padStart(2,'0')}</span></p><h3 class="album-caption">${escape(first.caption)}</h3></div><button class="album-play" aria-pressed="false" aria-label="Mainkan slideshow">▶ <span>Slideshow</span></button></div>
 <label class="album-seek-label">Pilih foto <input class="album-seek" type="range" min="1" max="${data.length}" value="1" aria-label="Pilih nombor foto"></label>
 <div class="album-thumbnails" aria-label="Thumbnail album">${data.map((photo,i)=>`<button class="album-thumb" data-index="${i}" aria-current="${i===0?'true':'false'}" aria-label="Foto ${i+1}: ${escape(photo.caption)}"><img src="${photo.thumb}" alt="" loading="lazy" decoding="async"><span>${String(i+1).padStart(2,'0')}</span></button>`).join('')}</div>
 <noscript><p>Semua foto: ${data.map((p,i)=>`<a href="${p.src}">${i+1}. ${escape(p.caption)}</a>`).join(' · ')}</p></noscript></div>`;
}
export function heroCarousel(){
 const photos=[['home-hunt','Pengunjung mencari pakaian bundle','BARANG LAMA. JIWA BARU.'],['home-vendors','Tiga peniaga bersama koleksi vintage','KOMUNITI TETAP HIDUP.'],['home-denim','Dua peniaga denim dan vintage','GAYA TIADA TARIKH LUPUT.']];
 return `<section class="hero-carousel" aria-label="Wajah komuniti bundle dan vintage" aria-roledescription="karusel"><div class="hero-carousel-stage">${photos.map(([name,alt,caption],i)=>`<figure class="hero-slide" data-position="${['left','center','right'][i]}"><img src="/assets/${name}.webp" alt="${alt}" loading="eager" decoding="async" ${i===1?'fetchpriority="high"':''}><figcaption>${caption}</figcaption></figure>`).join('')}</div><div class="hero-controls"><button class="hero-prev" aria-label="Foto hero sebelumnya">←</button><span class="hero-status" aria-live="polite">02 / 03</span><button class="hero-next" aria-label="Foto hero seterusnya">→</button><button class="hero-pause" aria-pressed="false">Jeda gerakan</button></div></section>`;
}
