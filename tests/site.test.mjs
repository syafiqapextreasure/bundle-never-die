import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import worker from '../src/worker.mjs';
import {routes} from '../src/data.mjs';
import {albumCarousel} from '../src/carousels.mjs';
const env={ASSETS:{async fetch(request){const url=new URL(request.url);const file='dist/'+(url.pathname==='/'?'index.html':url.pathname.slice(1)+(url.pathname.includes('.')?'':'.html'));try{return new Response(request.method==='HEAD'?null:await readFile(file),{headers:{'content-type':file.endsWith('.html')?'text/html':'application/octet-stream'}});}catch{return new Response(await readFile('dist/404.html'),{status:404,headers:{'content-type':'text/html'}});}}}};
const request=(path,options={})=>worker.fetch(new Request('https://festival.example'+path,options),env);
test('five pages have unique metadata, one H1 and runtime canonical URLs',async()=>{const titles=new Set();for(const route of routes){const res=await request(route);assert.equal(res.status,200);const html=await res.text();assert.equal((html.match(/<h1\b/g)||[]).length,1);assert.ok(html.includes(`rel="canonical" href="https://festival.example${route}"`));assert.ok(!html.includes('__SITE_ORIGIN__'));assert.ok(html.includes('lang="ms"'));titles.add(html.match(/<title>(.*?)<\/title>/)[1]);}assert.equal(titles.size,5);});
test('header has only four intended links; galleries entered through Sorotan',async()=>{for(const route of routes){const html=await (await request(route)).text();const nav=html.match(/<nav id="main-nav"[\s\S]*?<\/nav>/)[0];assert.deepEqual([...nav.matchAll(/href="([^"]+)"/g)].map(m=>m[1]),['/','/tentang','/program','/sorotan']);if(!['/sorotan','/galeri'].includes(route))assert.ok(!/href="\/galeri/.test(html));}assert.match(await (await request('/sorotan')).text(),/href="\/galeri\?album=komuniti"/);});
test('old html and slash URLs redirect without losing query parameters',async()=>{for(const path of ['/tentang.html','/tentang/','/index.html']){const res=await request(path+'?x=1');assert.equal(res.status,301);assert.equal(new URL(res.headers.get('location')).pathname,path==='/index.html'?'/':'/tentang');assert.equal(new URL(res.headers.get('location')).search,'?x=1');}});
test('all referenced local HTML and CSS resources exist',async()=>{const refs=new Set();for(const file of ['index.html','tentang.html','program.html','sorotan.html','galeri.html']){const html=await readFile('dist/'+file,'utf8');for(const match of html.matchAll(/(?:src|href|poster)="(\/[^"#?]*)(?:[^" ]*)"/g))refs.add(match[1]);for(const match of html.matchAll(/(\/assets\/[^ ,"<>]+\.webp)/g))refs.add(match[1]);}for(const file of ['styles.css','refinements.css','fonts/fonts.css']){const css=await readFile('dist/'+file,'utf8');for(const match of css.matchAll(/url\(['"]?(\/[^)'" ]+)/g))refs.add(match[1]);}for(const path of refs){if(routes.includes(path))continue;await assert.doesNotReject(stat('dist'+path),path);}});
test('sitemap lists every clean route and robots names sitemap',async()=>{const xml=await (await request('/sitemap.xml')).text();assert.equal((xml.match(/<url>/g)||[]).length,5);assert.ok(!xml.includes('.html'));assert.match(await(await request('/robots.txt')).text(),/Sitemap: https:\/\/festival.example\/sitemap.xml/);});
test('event facts, date-only schema and calendar are consistent',async()=>{const html=await(await request('/program')).text();const schemas=JSON.parse(html.match(/application\/ld\+json">(.*?)<\/script>/)[1]);const e=schemas.find(s=>s['@type']==='Event');assert.equal(e.startDate,'2027-05-01');assert.equal(e.endDate,'2027-05-02');assert.match(e.name,/09/);assert.equal(e.location.address.addressLocality,'Kulim');assert.ok(!e.offers);const ics=await readFile('dist/downloads/bundle-neverdie-2027.ics','utf8');assert.match(ics,/DTEND;VALUE=DATE:20270503/);assert.match(ics,/DTSTART;VALUE=DATE:20270501/);});
test('404, unsupported methods and HEAD have correct behavior',async()=>{assert.equal((await request('/missing')).status,404);assert.equal((await request('/',{method:'POST'})).status,405);const res=await request('/tentang',{method:'HEAD'});assert.equal(res.status,200);assert.equal(await res.text(),'');assert.equal(res.headers.get('x-content-type-options'),'nosniff');});
test('custom domain overrides canonical origin and archive year is 2026',async()=>{const res=await worker.fetch(new Request('https://preview.workers.dev/tentang'),{...env,SITE_URL:'https://custom.example'});const html=await res.text();assert.match(html,/rel="canonical" href="https:\/\/custom.example\/tentang"/);assert.match(html,/KOMUNITI VENDOR 2026/);assert.ok(!html.includes('pelan tapak'));});

test('80-photo albums keep a single main image and address every thumbnail',()=>{
 const photos=Array.from({length:80},(_,i)=>['international-01',`Foto ${i+1}`,`Keterangan ${i+1}`]);
 const html=albumCarousel(photos,'test');
 const data=JSON.parse(html.match(/class="album-data">(.*?)<\/script>/)[1]);
 assert.equal(data.length,80);assert.equal((html.match(/class="album-image"/g)||[]).length,1);
 assert.equal((html.match(/class="album-thumb"/g)||[]).length,80);
 assert.match(html,/max="80"/);assert.match(html,/data-index="79"/);
 assert.equal(data[79].caption,'Foto 80');
});
test('documentary photographs are not repeated across sections on the same page',async()=>{
 const photoNames=new Set(['home-vendors','home-denim','home-hunt','community-2026','program-racks','program-caps','press-2024','press-2025',...Array.from({length:6},(_,i)=>`international-0${i+1}`),...Array.from({length:6},(_,i)=>`tour-0${i+1}`)]);
 for(const name of ['index','tentang','program','sorotan']){
  const html=await readFile(`dist/${name}.html`,'utf8');
  const photos=[...html.matchAll(/<img[^>]*\bsrc="\/assets\/([^"/]+)\.webp"/g)].map(x=>x[1]).filter(x=>photoNames.has(x));
  assert.equal(photos.length,new Set(photos).size,`${name} repeats a photograph`);
 }
});
test('album manifest contains unique photos with captions and existing native images',async()=>{
 const albums=JSON.parse(await readFile('content/albums.json','utf8'));
 for(const photos of Object.values(albums)){
  assert.equal(new Set(photos.map(p=>p[0])).size,photos.length);
  for(const [name,caption,alt] of photos){assert.ok(caption&&alt);assert.match(name,/^[a-z0-9-]+$/);await stat(`public/assets/${name}.webp`);}
 }
});
