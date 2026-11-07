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
Object.assign(window as any, P, { gsap });

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
    if (t) { e.preventDefault(); lenis.scrollTo(t as HTMLElement, { offset: -56 }); }
  });
}

function reveals() {
  if (reduce) { root.classList.remove('motion'); return; }
  const q = (k: string) => gsap.utils.toArray<HTMLElement>(`[data-reveal="${k}"]`);
  gsap.set(q('up'), { y: 32, autoAlpha: 0 });
  gsap.set(q('rule'), { scaleX: 0, transformOrigin: 'left center' });
  ScrollTrigger.batch(q('up'), {
    start: 'top 88%', once: true,
    onEnter: (els) => gsap.to(els, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, overwrite: true }),
  });
  q('lines').forEach((el) => SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true, onSplit: (s: any) =>
    gsap.fromTo(s.lines, { yPercent: 105 }, { yPercent: 0, duration: 0.9, stagger: 0.07, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }) }));
  q('words').forEach((el) => SplitText.create(el, { type: 'words', mask: 'words', aria: 'auto', autoSplit: true, onSplit: (s: any) =>
    gsap.fromTo(s.words, { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.035, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 80%', once: true } }) }));
  q('fill').forEach((el) => SplitText.create(el, { type: 'words', aria: 'auto', autoSplit: true, onSplit: (s: any) =>
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
