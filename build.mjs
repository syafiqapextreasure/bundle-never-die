import { mkdir, rm, cp, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { event, routes, meta } from './src/data.mjs';
import { header, footer, home, about, program, highlights, gallery, esc } from './src/pages.mjs';
await mkdir('dist',{recursive:true});
await cp('public','dist',{recursive:true});
const pageFns={'/':home,'/tentang':about,'/program':program,'/sorotan':highlights,'/galeri':gallery};
let article='/assets/media-2025-clip.webp';
if(existsSync('content/kita-article-url.txt'))article=(await readFile('content/kita-article-url.txt','utf8')).trim();
for(const path of routes){
 const [title,description]=meta[path];
 const schema=[{'@context':'https://schema.org','@type':'Organization',name:event.name,url:'__SITE_ORIGIN__/',logo:'__SITE_ORIGIN__/assets/logo-skull.webp',sameAs:[event.page,event.group]}, {'@context':'https://schema.org','@type':'WebPage',name:title,description,url:'__SITE_ORIGIN__'+path,inLanguage:'ms'}];
 if(path!=='/')schema.push({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Utama',item:'__SITE_ORIGIN__/'},{'@type':'ListItem',position:2,name:path.slice(1),item:'__SITE_ORIGIN__'+path}]});
 if(path==='/program')schema.push({'@context':'https://schema.org','@type':'Event',name:'Bundle Neverdie Festival Vol. 09',description:meta['/'][1],startDate:'2027-05-01',endDate:'2027-05-02',eventStatus:'https://schema.org/EventScheduled',eventAttendanceMode:'https://schema.org/OfflineEventAttendanceMode',location:{'@type':'Place',name:'Kompleks Sukan KHTP',address:{'@type':'PostalAddress',addressLocality:'Kulim',addressRegion:'Kedah',addressCountry:'MY'}},image:['__SITE_ORIGIN__/assets/community-2026.webp'],url:'__SITE_ORIGIN__/program',organizer:{'@type':'Organization',name:event.name,url:'__SITE_ORIGIN__/tentang'}});
 const html=`<!doctype html><html lang="ms"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="theme-color" content="#f4e9d2"><link rel="canonical" href="__SITE_ORIGIN__${path}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="__SITE_ORIGIN__${path}"><meta property="og:image" content="__SITE_ORIGIN__/assets/community-2026.webp"><meta property="og:locale" content="ms_MY"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/assets/logo-skull.webp"><link rel="stylesheet" href="/fonts/fonts.css"><link rel="stylesheet" href="/styles.css"><script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script><script type="module" src="/app.js"></script></head><body id="top" class="route-${path==='/'?'home':path.slice(1)}"><div class="page-shell">${header(path)}${pageFns[path]()}${footer()}</div></body></html>`;
 await writeFile('dist/'+(path==='/'?'index':path.slice(1))+'.html',html.replaceAll('__KITA_ARTICLE__',article).replaceAll('<br>','<br> '));
}
await writeFile('dist/404.html',`<!doctype html><html lang="ms"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Halaman tidak ditemui · Bundle Neverdie</title><meta name="robots" content="noindex"><link rel="stylesheet" href="/fonts/fonts.css"><link rel="stylesheet" href="/styles.css"></head><body><main class="not-found"><span class="tag">404</span><h1>JALAN INI BELUM ADA.</h1><p>Jom kembali ke komuniti Bundle Neverdie.</p><a class="button" href="/">Kembali ke Utama →</a></main></body></html>`);
console.log('Built five crawlable pages, 404 and static assets.');

