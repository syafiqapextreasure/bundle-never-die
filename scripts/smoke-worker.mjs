import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';
import { routes } from '../src/routes.mjs';

// Unlike deploy --dry-run, this boots workerd and catches startup side effects.
const origin='http://127.0.0.1:8788';
const child=spawn(process.execPath,['node_modules/wrangler/bin/wrangler.js','dev','--local','--ip','127.0.0.1','--port','8788'],{
 env:{...process.env,CI:'true',WRANGLER_SEND_METRICS:'false'},stdio:['ignore','pipe','pipe']
});
let logs='',failure;
child.stdout.on('data',b=>{logs+=b;});child.stderr.on('data',b=>{logs+=b;});
child.on('error',e=>{failure=e;});
try {
 let ready=false;
 for(let i=0;i<90;i++){
  if(failure)throw failure;
  if(child.exitCode!==null)throw new Error('Worker exited before startup.\n'+logs);
  try {const r=await fetch(origin+'/robots.txt',{signal:AbortSignal.timeout(1000)});if(r.ok){ready=true;break;}}catch{}
  await delay(500);
 }
 assert.ok(ready,'Worker failed to start.\n'+logs);
 for(const route of routes){
  const r=await fetch(origin+route);assert.equal(r.status,200,route);
  const html=await r.text();assert.ok(html.includes('<h1'),route);
  assert.ok(!html.includes('__SITE_ORIGIN__'),route+' canonical placeholder');
 }
 assert.equal((await fetch(origin+'/tentang.html',{redirect:'manual'})).status,301);
 assert.equal((await fetch(origin+'/not-a-page')).status,404);
 for(const asset of ['/refinements.css','/assets/newspaper-paper.webp'])assert.equal((await fetch(origin+asset)).status,200,asset);
 assert.match(await (await fetch(origin+'/sitemap.xml')).text(),/<loc>http:\/\/127.0.0.1:8788\/galeri<\/loc>/);
 console.log('Cloudflare runtime startup, five pages, assets, redirects, canonical URLs, sitemap and 404 passed.');
} finally {
 child.kill('SIGTERM');
}
