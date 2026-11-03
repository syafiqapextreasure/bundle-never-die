import { routes } from './routes.mjs';

const productionOrigin = 'https://www.bundleneverdie.com';
const productionHosts = new Set(['bundleneverdie.com', 'www.bundleneverdie.com']);
const googleTag = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ZWP1RDB3S9"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ZWP1RDB3S9');
</script>`;

export default {
 async fetch(request, env) {
  const url = new URL(request.url);
  if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', {status:405, headers:{Allow:'GET, HEAD'}});
  const isProduction = productionHosts.has(url.hostname);
  if (isProduction && url.origin !== productionOrigin) {
   const destination = new URL(url.pathname + url.search, productionOrigin);
   return Response.redirect(destination.toString(), 301);
  }
  const origin = isProduction ? productionOrigin : (env.SITE_URL ? new URL(env.SITE_URL).origin : url.origin);
  if (url.pathname === '/sitemap.xml') {
   const xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + routes.map(p=>`<url><loc>${origin}${p}</loc></url>`).join('') + '</urlset>';
   return new Response(request.method==='HEAD'?null:xml,{headers:{'content-type':'application/xml; charset=utf-8','cache-control':'public,max-age=3600'}});
  }
  if (url.pathname === '/robots.txt') return new Response(request.method==='HEAD'?null:`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`, {headers:{'content-type':'text/plain; charset=utf-8'}});
  const normalized = url.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '') || '/';
  if (normalized !== url.pathname && routes.includes(normalized)) {
   url.pathname = normalized; return Response.redirect(url.toString(),301);
  }
  const asset = await env.ASSETS.fetch(request);
  if (!(asset.headers.get('content-type') || '').includes('text/html')) return asset;
  // Inject only on the public domain so local previews and QA do not send GA events.
  const body = request.method==='HEAD' ? null : (await asset.text())
   .replaceAll('__SITE_ORIGIN__', origin)
   .replace('<head>', '<head>' + (isProduction ? googleTag : ''));
  const headers = new Headers(asset.headers);
  headers.delete('content-length'); headers.delete('etag');
  headers.set('content-type','text/html; charset=utf-8');
  headers.set('x-content-type-options','nosniff');
  headers.set('referrer-policy','strict-origin-when-cross-origin');
  headers.set('permissions-policy','camera=(), microphone=(), geolocation=()');
  headers.set('cache-control','public,max-age=0,must-revalidate');
  return new Response(body,{status:asset.status,headers});
 }
};
