const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const capturing=document.documentElement.dataset.capture==='true';
const lightbox=$('#lightbox');let opened=null,returnFocus=null;
function showPhoto(index){if(!opened)return;opened.index=(index+opened.photos.length)%opened.photos.length;const p=opened.photos[opened.index];$('#lightbox-image').src=p.src;$('#lightbox-image').alt=p.alt;$('#lightbox-caption').textContent=(opened.index+1)+' / '+opened.photos.length+' — '+p.caption;}
$('.lightbox-prev')?.addEventListener('click',()=>showPhoto(opened.index-1));
$('.lightbox-next')?.addEventListener('click',()=>showPhoto(opened.index+1));
lightbox?.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();showPhoto(opened.index+(e.key==='ArrowRight'?1:-1));}});
lightbox?.addEventListener('close',()=>{opened=null;returnFocus?.focus({preventScroll:true});});
for(const root of $$('[data-collection]')){
 const state={photos:JSON.parse($('.album-data',root).textContent),index:0};
 const cards=$$('.photo-card',root),more=$('.collection-more',root),count=$('.collection-count',root);let shown=Math.min(12,cards.length);
 function update(){cards.forEach((c,i)=>{c.hidden=i>=shown;});more.hidden=shown>=cards.length;count.textContent=shown+' daripada '+cards.length+' foto';}
 update();
 more.addEventListener('click',()=>{const firstNew=shown;shown=Math.min(shown+12,cards.length);update();cards[firstNew]?.focus({preventScroll:true});});
 cards.forEach((card,i)=>card.addEventListener('click',e=>{if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();opened=state;returnFocus=card;showPhoto(i);lightbox.showModal();}));
}
const hero=$('.hero-carousel');
if(hero){
 const slides=$$('.hero-slide',hero);let index=1,paused=false,visible=false,lastY=scrollY,travel=0,lastChange=0;
 function show(next){index=(next+slides.length)%slides.length;slides.forEach((s,i)=>{s.dataset.position=i===index?'center':i===(index+slides.length-1)%slides.length?'left':'right';});$('.hero-status',hero).textContent=`${String(index+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;lastChange=performance.now();}
 $('.hero-prev',hero).addEventListener('click',()=>show(index-1));$('.hero-next',hero).addEventListener('click',()=>show(index+1));
 $('.hero-pause',hero).addEventListener('click',e=>{paused=!paused;e.currentTarget.setAttribute('aria-pressed',String(paused));e.currentTarget.textContent=paused?'Sambung gerakan':'Jeda gerakan';});
 new IntersectionObserver(e=>{visible=e[0].isIntersecting;},{threshold:.2}).observe(hero);
 addEventListener('scroll',()=>{const delta=scrollY-lastY;lastY=scrollY;if(capturing||!visible||paused||reduced.matches||hero.matches(':focus-within')){travel=0;return;}travel+=delta;if(Math.abs(travel)>180&&performance.now()-lastChange>750){show(index+(travel>0?1:-1));travel=0;}},{passive:true});
 setInterval(()=>{if(!capturing&&visible&&!paused&&!reduced.matches&&!document.hidden&&!hero.matches(':hover,:focus-within')&&performance.now()-lastChange>5500)show(index+1);},6000);
}
