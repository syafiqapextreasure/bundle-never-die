import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import worker from '../src/worker.mjs';
const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.ttf':'font/ttf','.json':'application/json','.txt':'text/plain; charset=utf-8','.ics':'text/calendar; charset=utf-8','.mp4':'video/mp4'};
const env={ASSETS:{async fetch(req){
 const url=new URL(req.url); let path=decodeURIComponent(url.pathname);
 if(path==='/')path='/index.html'; else if(!extname(path))path+='.html';
 let full=resolve(root,'.'+path);if(!full.startsWith(root+sep))return new Response('Forbidden',{status:403});
 let status=200;try{await stat(full);}catch{full=resolve(root,'404.html');status=404;}
 try {let data=await readFile(full);if(extname(full)==='.html'&&url.searchParams.has('capture'))data=Buffer.from(data.toString().replaceAll('loading="lazy"','loading="eager"').replace('<html lang="ms">','<html lang="ms" data-capture="true">').replace('</head>',`<style>html{scroll-behavior:auto!important}*{animation:none!important;transition:none!important}</style><script>addEventListener('load',async()=>{await document.fonts.ready;const height=document.documentElement.scrollHeight;for(let y=0;y<height;y+=700){const marker=document.createElement('span');marker.id='capture-'+y;marker.setAttribute('aria-hidden','true');marker.style.cssText='position:absolute;left:0;top:'+y+'px;width:0;height:0;pointer-events:none';document.body.append(marker);}});</script></head>`));return new Response(req.method==='HEAD'?null:data,{status,headers:{'content-type':types[extname(full)]||'application/octet-stream'}});}catch{return new Response('Run npm run build first',{status:503});}
}}};
const server=http.createServer(async(req,res)=>{
 try{const request=new Request(`http://${req.headers.host}${req.url}`,{method:req.method});const response=await worker.fetch(request,env);res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));}catch(err){res.writeHead(500);res.end(String(err));}
});
server.listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
