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
  q('fill').forEach((el) => splitText(el, { type: 'words', autoSplit: true, onSplit: (s: any) =>
    gsap.fromTo(s.words, { opacity: 0.16 }, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 45%', scrub: true } }) }));
  q('rule').forEach((el) => gsap.to(el, { scaleX: 1, duration: 1.1, ease: 'power2.inOut', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }));
  q('count').forEach((el) => {
    const end = parseFloat(el.textContent || '0'), pad = (el.textContent || '').trim().length, o = { v: 0 };
    el.textContent = '0'.padStart(pad, '0');
    gsap.to(o, { v: end, duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => { el.textContent = String(Math.round(o.v)).padStart(pad, '0'); } });
  });
  root.classList.add('motion-ready');
}

document.fonts.ready.then(() => {
  reveals();
  document.dispatchEvent(new Event('nb:gsap'));
  ScrollTrigger.refresh();
});
