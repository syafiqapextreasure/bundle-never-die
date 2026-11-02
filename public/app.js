import './carousels.js';
const $=(s,p=document)=>p.querySelector(s);
const $$=(s,p=document)=>[...p.querySelectorAll(s)];
const menu=$('.menu-toggle'),nav=$('#main-nav');
function closeMenu(){nav?.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.addEventListener('click',e=>{if(!e.target.closest('.nav-row'))closeMenu();});
for(const dialog of $$('dialog')){
 $('.close-dialog',dialog)?.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
}
const vendors=$('#vendor-dialog');
$('[data-vendors]')?.addEventListener('click',()=>vendors.showModal());
$('#vendor-search')?.addEventListener('input',e=>{const term=e.target.value.trim().toLocaleLowerCase('ms');let count=0;for(const item of $$('.vendor-full li')){item.hidden=!item.textContent.toLocaleLowerCase('ms').includes(term);if(!item.hidden)count++;}$('#vendor-empty').hidden=count>0;});
const filters=$$('[data-filter]');
function filterAlbum(value,update=false){
 if(!filters.length)return;
 if(!filters.some(b=>b.dataset.filter===value))value='semua';
 for(const b of filters)b.setAttribute('aria-pressed',String(b.dataset.filter===value));
 for(const album of $$('[data-album]')){album.hidden=value!=='semua'&&album.dataset.album!==value; if(album.hidden)$('video',album)?.pause();}
 $('#filter-status').textContent=`Album: ${filters.find(b=>b.dataset.filter===value).textContent}`;
 document.dispatchEvent(new Event('albumschange'));
 if(update){const url=new URL(location.href);if(value==='semua')url.searchParams.delete('album');else url.searchParams.set('album',value);history.pushState(null,'',url);}
}
filters.forEach(b=>b.addEventListener('click',()=>filterAlbum(b.dataset.filter,true)));
filterAlbum(new URL(location.href).searchParams.get('album')||'semua');
addEventListener('popstate',()=>filterAlbum(new URL(location.href).searchParams.get('album')||'semua'));
const motion=matchMedia('(prefers-reduced-motion: reduce)');let scheduled=false;
function parallax(){scheduled=false;for(const el of $$('.parallax-image')){const rect=el.parentElement.getBoundingClientRect();const offset=motion.matches?0:Math.max(-14,Math.min(14,(innerHeight/2-rect.top-rect.height/2)*.035));el.style.setProperty('--parallax',`${offset}px`);}}
addEventListener('scroll',()=>{if(!scheduled&&!motion.matches){scheduled=true;requestAnimationFrame(parallax);}},{passive:true});
motion.addEventListener('change',parallax);parallax();

for(const player of $$('.video-player')){const video=$('video',player),cover=$('.video-cover',player);if(!video||!cover)continue;cover.hidden=false;video.controls=false;cover.addEventListener('click',async()=>{cover.hidden=true;video.controls=true;try{await video.play();video.focus();}catch{video.controls=false;cover.hidden=false;}});video.addEventListener('play',()=>{cover.hidden=true;video.controls=true;});video.addEventListener('ended',()=>{video.controls=false;video.load();cover.hidden=false;});}
