const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const capturing=document.documentElement.dataset.capture==='true';
const states=[];
const lightbox=$('#lightbox');
let opened=null;
function openPhoto(state){opened=state;renderLightbox();lightbox.showModal();}
function renderLightbox(){
 if(!opened)return;
 const photo=opened.photos[opened.index];
 $('#lightbox-image').src=photo.src;$('#lightbox-image').alt=photo.alt;
 $('#lightbox-caption').textContent=`${opened.index+1} / ${opened.photos.length} — ${photo.caption}`;
}
$('.lightbox-prev')?.addEventListener('click',()=>{opened?.show(opened.index-1);renderLightbox();});
$('.lightbox-next')?.addEventListener('click',()=>{opened?.show(opened.index+1);renderLightbox();});
lightbox?.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();opened?.show(opened.index+(e.key==='ArrowRight'?1:-1));renderLightbox();}});
lightbox?.addEventListener('close',()=>{opened=null;});

for(const root of $$('[data-carousel]')){
 const photos=JSON.parse($('.album-data',root).textContent), image=$('.album-image',root), thumbs=$$('.album-thumb',root), rail=$('.album-thumbnails',root);
 const state={root,photos,index:0,playing:false,visible:false,show(index,user=false){
  this.index=(index+photos.length)%photos.length;
  const photo=photos[this.index];image.src=photo.src;image.alt=photo.alt;
  $('.album-caption',root).textContent=photo.caption;
  $('.album-counter',root).textContent=`${String(this.index+1).padStart(2,'0')} / ${String(photos.length).padStart(2,'0')}`;
  $('.album-open',root).setAttribute('aria-label','Besarkan foto: '+photo.caption);
  $('.album-seek',root).value=this.index+1;
  thumbs.forEach((t,i)=>t.setAttribute('aria-current',String(i===this.index)));
  const target=thumbs[this.index];rail.scrollTo({left:target.offsetLeft-rail.offsetLeft-rail.clientWidth/2+target.clientWidth/2,behavior:reduced.matches?'instant':'smooth'});
  if(user){this.playing=false;updatePlay();}
  // Only prefetch the adjacent original, never load an entire 80-photo album at once.
  const next=new Image();next.src=photos[(this.index+1)%photos.length].src;
 }};
 states.push(state);
 const play=$('.album-play',root);
 function updatePlay(){play.setAttribute('aria-pressed',String(state.playing));play.setAttribute('aria-label',state.playing?'Jeda slideshow':'Mainkan slideshow');play.innerHTML=state.playing?'Ⅱ <span>Jeda</span>':'▶ <span>Slideshow</span>';}
 $('.album-prev',root).addEventListener('click',()=>state.show(state.index-1,true));
 $('.album-next',root).addEventListener('click',()=>state.show(state.index+1,true));
 $('.album-open',root).addEventListener('click',()=>{state.playing=false;updatePlay();openPhoto(state);});
 $('.album-seek',root).addEventListener('input',e=>state.show(Number(e.target.value)-1,true));
 thumbs.forEach((t,i)=>t.addEventListener('click',()=>state.show(i,true)));
 play.addEventListener('click',()=>{state.playing=!state.playing;updatePlay();});
 const stage=$('.album-stage',root);
 stage.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();state.show(e.key==='Home'?0:e.key==='End'?photos.length-1:state.index+(e.key==='ArrowRight'?1:-1),true);}});
 let down=null,suppressClick=false;
 stage.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')down={x:e.clientX,y:e.clientY};});
 stage.addEventListener('pointerup',e=>{if(down){const dx=e.clientX-down.x,dy=e.clientY-down.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){state.show(state.index+(dx<0?1:-1),true);suppressClick=true;}down=null;}});
 stage.addEventListener('pointercancel',()=>{down=null;});
 stage.addEventListener('click',e=>{if(suppressClick){e.preventDefault();e.stopImmediatePropagation();suppressClick=false;}},true);
 new IntersectionObserver(entries=>{state.visible=entries[0].isIntersecting;},{threshold:.2}).observe(root);
 setInterval(()=>{if(state.playing&&state.visible&&!document.hidden&&!root.closest('[data-album]').hidden&&!lightbox?.open&&!reduced.matches&&!root.matches(':hover'))state.show(state.index+1);},5000);
}
document.addEventListener('albumschange',()=>{for(const state of states)if(state.root.closest('[data-album]').hidden){state.playing=false;const play=$('.album-play',state.root);play.setAttribute('aria-pressed','false');play.setAttribute('aria-label','Mainkan slideshow');play.innerHTML='▶ <span>Slideshow</span>';}});

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
