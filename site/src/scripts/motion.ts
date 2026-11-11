/* Motion core for every page.
   - one GSAP (npm 3.15.0) with every plugin the grammar uses, exposed on window for bundle.js and ported components
   - Lenis smooth scroll driving ScrollTrigger (off for reduced motion)
   - [data-reveal] kinds, each tied to a grammar entry:
       up     element rises in              (HIỂU: ScrollTrigger.batch)
       lines  SplitText lines under a mask  (HIỂU)
       words  SplitText words under a mask  (M5 · câu hỏi bước vào)
       fill   words light up with scroll    (scrub; statements only)
       rule   hairline draws left to right  (M1 · dẫn tới)
       count  number counts up to its text  (M2 · tiêu hao/tích luỹ)
   - [data-hold="<screens>"]: a block that has to be read (a question, a statement) stays pinned in the middle of the screen while the page
     scrolls on for that many screens, then lets go. A [data-reveal="fill"] inside it lights its words up during the hold.
     Skipped when the block is taller than the screen, so nothing is ever cut off.
   Without JS or with reduced motion nothing is hidden: html.motion is what hides the start states. */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { Flip } from 'gsap/Flip';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { CustomEase } from 'gsap/CustomEase';
import Lenis from 'lenis';

const P = { ScrollTrigger, ScrambleTextPlugin, Flip, SplitText, DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin, CustomEase };
gsap.registerPlugin(...Object.values(P));
gsap.defaults({ duration: 0.48, ease: 'power3.out' });
CustomEase.create('nb-settle', '0.22,1,0.36,1');
Object.assign(window as any, P, { gsap, nbSplit: splitText });

/* one decision for the whole page: OS setting or the in-page Motion switch (bundle.js NB.reduce) */
const reduce = (window as any).NoBabysitting ? (window as any).NoBabysitting.reduce() : matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

if (!reduce) {
  const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  (window as any).lenis = lenis;
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!a || a.getAttribute('href') === '#') return;
    const t = document.querySelector(a.getAttribute('href')!);
    if (t) { e.preventDefault(); lenis.scrollTo(t as HTMLElement, { offset: -56 }); (t as HTMLElement).focus?.({ preventScroll: true }); }
  });
}

/* Scenes that play themselves (owner's decision 11/11: a visitor does not know the page has to be scrolled, and the
   pinned scenes were a very long scroll). A scene still reads its state from the scroll position, so scrubbing forward
   and back works exactly as before; what is new is that the page moves itself through the scene at the pace of its
   content once the visitor stops inside it. Rules:
   - it starts only after the visitor has scrolled DOWN into the scene and paused (the hero also starts by itself on load);
   - any input (wheel, touch, key, pointer) hands control back at once and it does not start again until the visitor
     has left the scene upward and come back;
   - it ends at the end of the scene, never carries on into the plain reading sections;
   - with motion off there is no Lenis, no pin, and none of this. */
type Leg = { to: () => number; dur: number; wait?: number; ease?: (t: number) => number };
type Auto = { from: () => number; legs: Leg[]; played?: boolean };
const autos: Auto[] = [];
let token = 0, running = false, lastUser = -1, userDir = 0, prevY = 0;
const linear = (t: number) => t;
function stopAuto() { if (!running) return; running = false; token++; const l = (window as any).lenis; l.scrollTo(l.scroll, { immediate: true }); }
function playAuto(a: Auto) {
  const l = (window as any).lenis; if (!l) return;
  a.played = true; running = true; const my = ++token;
  const step = (i: number) => {
    if (my !== token) return;
    if (i >= a.legs.length) { running = false; return; }
    const leg = a.legs[i], target = leg.to(), begin = i ? a.legs[i - 1].to() : a.from(), left = target - l.scroll;
    const next = () => { if (my !== token) return; if (leg.wait) setTimeout(() => step(i + 1), leg.wait * 1000); else step(i + 1); };
    if (left < 2) return left > -2 ? next() : step(i + 1);   /* already resting on this stop: rest here too */
    l.scrollTo(target, { duration: Math.max(0.3, leg.dur * Math.min(1, left / Math.max(1, target - begin))), easing: leg.ease || linear, onComplete: next });
  };
  step(0);
}
function autoplay() {
  if (reduce) return;
  const user = () => { stopAuto(); lastUser = performance.now(); };
  addEventListener('wheel', (e) => { userDir = e.deltaY >= 0 ? 1 : -1; if (running) { running = false; token++; } lastUser = performance.now(); }, { passive: true });
  ['touchstart', 'pointerdown', 'keydown'].forEach((t) => addEventListener(t, user, { passive: true }));
  addEventListener('scroll', () => { const y = scrollY; if (!running) { if (y !== prevY) userDir = y > prevY ? 1 : -1; if (lastUser >= 0) lastUser = performance.now(); } prevY = y; }, { passive: true });
  gsap.ticker.add(() => {
    const y = scrollY, idle = lastUser >= 0 && performance.now() - lastUser > 500;
    for (const a of autos) {
      if (y < a.from() - 2) { a.played = false; continue; }
      if (!running && idle && userDir > 0 && !a.played && y < a.legs[a.legs.length - 1].to() - 4) { playAuto(a); break; }
    }
  });
}
(window as any).nbAuto = (a: Auto) => { autos.push(a); return { play: () => { if (!reduce && !running && lastUser < 0 && scrollY < 4) playAuto(a); } }; };

/* SplitText without taking the words away from assistive technology.
   SplitText's own 'auto' puts aria-label on the element and aria-hidden on every piece. aria-label is not allowed on a <p>
   (axe: aria-prohibited-attr) and screen readers then read the paragraph as empty (Playwright's ARIA snapshot shows
   "- paragraph" with no text). Here the real text stays in a visually hidden copy and only the picture is split. */
function splitText(el: HTMLElement, vars: Record<string, any>) {
  const copy = document.createElement('span');
  copy.className = 'nb-sr'; copy.textContent = (el.textContent || '').replace(/\s+/g, ' ').trim();
  const pic = document.createElement('span');
  pic.className = 'nb-split'; pic.setAttribute('aria-hidden', 'true');
  while (el.firstChild) pic.appendChild(el.firstChild);
  el.append(copy, pic);
  return SplitText.create(pic, { ...vars, aria: 'none' });
}

/* the hold: pinned from the moment the block is centred in the visible area, for `len` screens of scroll */
const HOLD_START = 'center center+=28';
const holdEnd = (el: HTMLElement) => () => '+=' + Math.round(innerHeight * (parseFloat(el.dataset.hold || '') || 0.7));
const holdFits = (el: HTMLElement) => el.offsetHeight <= innerHeight - 56 - 32;
function holds() {
  if (reduce) return;
  document.querySelectorAll<HTMLElement>('[data-hold]').forEach((el) => {
    if (!holdFits(el)) return;
    el.dataset.held = '1';
    (el as any).nbHold = ScrollTrigger.create({ trigger: el, start: HOLD_START, end: holdEnd(el), pin: true, anticipatePin: 1, invalidateOnRefresh: true });
  });
}

function reveals() {
  if (reduce) { root.classList.remove('motion'); return; }
  const q = (k: string) => gsap.utils.toArray<HTMLElement>(`[data-reveal="${k}"]`);
  /* opacity, never visibility: a hidden-until-scrolled text must still be in the accessibility tree.
     (GSAP warns "target not found" for an empty list, so every set is guarded.) */
  const ups = q('up'), rules = q('rule');
  if (ups.length) gsap.set(ups, { y: 32, opacity: 0 });
  if (rules.length) gsap.set(rules, { scaleX: 0, transformOrigin: 'left center' });
  if (ups.length) ScrollTrigger.batch(ups, {
    start: 'top 88%', once: true,
    onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, overwrite: true }),
  });
  q('lines').forEach((el) => splitText(el, { type: 'lines', mask: 'lines', autoSplit: true, onSplit: (s: any) =>
    gsap.fromTo(s.lines, { yPercent: 105 }, { yPercent: 0, duration: 0.9, stagger: 0.07, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }) }));
  q('words').forEach((el) => splitText(el, { type: 'words', mask: 'words', autoSplit: true, onSplit: (s: any) =>
    gsap.fromTo(s.words, { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.035, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } }) }));
  q('fill').forEach((el) => splitText(el, { type: 'words', autoSplit: true, onSplit: (s: any) => {
    const hold = el.closest<HTMLElement>('[data-held]');   /* inside a hold the words light up while the block stays put */
    return gsap.fromTo(s.words, { opacity: 0.16 }, { opacity: 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { ...(hold ? { trigger: hold, start: HOLD_START, end: holdEnd(hold) } : { trigger: el, start: 'top 78%', end: 'bottom 45%' }), scrub: true, invalidateOnRefresh: true,
        onUpdate: (st: any) => light(el, st.progress > 0.9) } });
  } }));
  q('rule').forEach((el) => gsap.to(el, { scaleX: 1, duration: 1.1, ease: 'power2.inOut', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }));
  q('count').forEach((el) => {
    const end = parseFloat(el.textContent || '0'), pad = (el.textContent || '').trim().length, o = { v: 0 };
    el.textContent = '0'.padStart(pad, '0');
    gsap.to(o, { v: end, duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => { el.textContent = String(Math.round(o.v)).padStart(pad, '0'); } });
  });
  root.classList.add('motion-ready');
}

/* .nb-hl: the key phrases of a statement turn accent one after another, after the sentence itself has been shown.
   Inside a [data-reveal="fill"] the fill decides when; a scene that shows its words itself calls nbLight; everywhere else
   it happens shortly after the sentence comes on screen. */
function light(el: Element, on = true) {
  el.querySelectorAll<HTMLElement>('.nb-hl').forEach((m, i) => { m.style.transitionDelay = on ? i * 0.22 + 's' : '0s'; m.classList.toggle('is-lit', on); });
}
(window as any).nbLight = light;
function highlights() {
  if (reduce) return;
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return; io.unobserve(e.target); setTimeout(() => light(e.target), 900);
  }), { threshold: 0.9 });
  document.querySelectorAll<HTMLElement>('[data-hl-auto]').forEach((el) => io.observe(el));
}

/* [data-sweep]: a slow band of block characters crosses the button (NB.sweep, ambient tier N; not at all with motion off) */
function sweeps() {
  const NB = (window as any).NoBabysitting;
  if (!NB || !NB.sweep || reduce) return;
  document.querySelectorAll<HTMLElement>('[data-sweep]').forEach((el) => NB.sweep(el, { solid: el.classList.contains('is-solid') }));
}

document.fonts.ready.then(() => {
  holds();
  reveals();
  sweeps();
  highlights();
  autoplay();
  document.dispatchEvent(new Event('nb:gsap'));
  /* triggers were created in the order the scripts ran, not the order of the page; pins push everything below them down,
     so they must refresh top to bottom (a hold under the hero was computed before the hero's own pin existed) */
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
});
