
// ── CURSOR ──
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});
(function animRing(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing)})();

// ── SPOTLIGHT MOUSE FOLLOW ──
const sf=document.getElementById('spotlightFollow');
const heroEl=document.getElementById('hero');
if(sf&&heroEl){
  sf.style.opacity='0';
  heroEl.addEventListener('mousemove',e=>{
    const r=heroEl.getBoundingClientRect();
    sf.style.left=(e.clientX-r.left)+'px';
    sf.style.top=(e.clientY-r.top)+'px';
    sf.style.opacity='1';
  });
  heroEl.addEventListener('mouseleave',()=>{sf.style.opacity='0'});
}

// ── NAV SCROLL + ACTIVE ──
const nav=document.getElementById('nav');
const navLinks=document.querySelectorAll('.nav-links a');
const sections=document.querySelectorAll('section[id]');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',window.scrollY>50);
  let cur='';
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id});
  navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
});

// ── MOBILE MENU ──
const ham=document.getElementById('hamburger');
const mMenu=document.getElementById('mobileMenu');
ham.addEventListener('click',()=>{ham.classList.toggle('open');mMenu.classList.toggle('open');document.body.style.overflow=mMenu.classList.contains('open')?'hidden':''});
document.querySelectorAll('.mm-link').forEach(l=>l.addEventListener('click',()=>{ham.classList.remove('open');mMenu.classList.remove('open');document.body.style.overflow=''}));

// ── TYPING ──
const roles=['AI Engineer','Web Developer','Problem Solver','Fast Learner'];
let ri=0,ci=0,deleting=false;
const typed=document.getElementById('typed-text');
function typeLoop(){
  const word=roles[ri];
  if(!deleting){typed.textContent=word.slice(0,++ci);if(ci===word.length){deleting=true;setTimeout(typeLoop,1600);return}}
  else{typed.textContent=word.slice(0,--ci);if(ci===0){deleting=false;ri=(ri+1)%roles.length;setTimeout(typeLoop,300);return}}
  setTimeout(typeLoop,deleting?55:90);
}
typeLoop();

// ── PARTICLES ──
const pCont=document.getElementById('particles');
for(let i=0;i<28;i++){const d=document.createElement('div');d.className='p-dot';d.style.cssText=`left:${Math.random()*100}%;--dur:${7+Math.random()*10}s;--delay:${Math.random()*10}s;opacity:0`;pCont.appendChild(d)}

// ── REVEAL ──
const revealObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObs.observe(el));

// ── SKILL BARS ──
const barObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.skill-bar-fill,.learn-fill').forEach(b=>{b.style.width=b.dataset.width+'%'});barObs.unobserve(e.target)}})},{threshold:.3});
document.querySelectorAll('#skills,#learning').forEach(s=>barObs.observe(s));

// ── COUNTERS ──
const counterObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('[data-target]').forEach(el=>{const t=+el.dataset.target;if(t===0)return;let cur=0;const step=()=>{cur=Math.min(cur+1,t);el.textContent=cur+'+';if(cur<t)setTimeout(step,120);else el.textContent=t+'+'};step()});counterObs.unobserve(e.target)}})},{threshold:.4});
document.querySelectorAll('#about').forEach(s=>counterObs.observe(s));

// ── SOCIAL HOVER ──
document.querySelectorAll('.social-btn').forEach(btn=>{
  btn.addEventListener('mouseenter',function(){this.style.boxShadow='0 8px 30px rgba(0,212,255,0.2)';this.style.borderColor='rgba(0,212,255,0.35)';this.style.color='#e2e8f0'});
  btn.addEventListener('mouseleave',function(){this.style.boxShadow='';this.style.borderColor='';this.style.color=''});
});


//Email copy section

function copyEmailToClipboard(event) {
    event.preventDefault();
    const email = "muktader.saif@gmail.com";
    const tooltip = document.getElementById("email-tooltip");

    // Attempt modern copy
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            showFeedback(tooltip);
        });
    } else {
        // FALLBACK: Manual copy for non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showFeedback(tooltip);
        } catch (err) {
            console.error('Fallback copy failed', err);
        }
        document.body.removeChild(textArea);
    }
}

function showFeedback(tooltip) {
    if (tooltip) {
        const originalText = tooltip.innerHTML;
        tooltip.innerHTML = "Copied!";
        setTimeout(() => {
            tooltip.innerHTML = originalText;
        }, 2000);
    }
}
