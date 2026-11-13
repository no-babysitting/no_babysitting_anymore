/* Draws article art in the browser (issue #44, slice 3). Pieces are data (src/lib/article-art.ts); the drawing is the design system's
   NB.ascii and NB.sources (bundle.js, loaded in the page head). Two uses:
   - banner: one live canvas above the title. It converges from noise in 2.4 s, then breathes. NB.ascii pauses it off screen and in a
     hidden tab, and draws the final frame at once under reduced motion.
   - thumbnail: one still frame on an index card, drawn the first time the card is near the viewport, with at most 1,500 cells and no loop. */
type W = any;
const w = window as W;
const CELL: [number, number] = [9, 16];
const MAX_THUMB_CELLS = 1500;

const sourceOf = (piece: any) => w.NoBabysitting.sources[piece.source](piece.options || {});

function mountBanner(host: HTMLElement) {
  const NB = w.NoBabysitting, piece = JSON.parse(host.dataset.artPiece || '{}'), canvas = host.querySelector('canvas');
  if (!NB || !canvas || !NB.sources[piece.source]) return;
  const reduce = NB.reduce(), field = sourceOf(piece);
  const api = NB.ascii(canvas, {
    cell: CELL, order: reduce ? 1 : 0, sweep: 0.3, noiseFill: 0.3, pointer: false, breathe: piece.breathe || 0,
    source: field, ...(piece.mode === 'color' ? { mode: 'color' } : { tone: piece.tone || 'fg-muted', frontColor: 'fg' }),
    ...(piece.flow && field.at ? { flow: field.at, flowFps: 7, flowShare: 0.55, ramp: ' .·:/\\+*' } : {}),
  });
  if (reduce) return;
  const go = () => w.gsap.to(api.state, { order: 1, duration: 2.4, ease: 'power2.out', onUpdate: api.redraw });
  if (w.gsap) go(); else document.addEventListener('nb:gsap', go, { once: true });
}

function drawStill(canvas: HTMLCanvasElement) {
  const NB = w.NoBabysitting, piece = JSON.parse(canvas.dataset.artPiece || '{}');
  const cw = canvas.clientWidth, chh = canvas.clientHeight;
  if (!NB || !NB.sources[piece.source] || !cw || !chh) return;
  /* 6 x 10 px cells, larger when the card is big enough to go over the cap */
  const grow = Math.max(1, Math.sqrt((cw / 6) * (chh / 10) / MAX_THUMB_CELLS)), CW = 6 * grow, CH = 10 * grow;
  const cols = Math.floor(cw / CW), rows = Math.floor(chh / CH), dpr = Math.min(2, devicePixelRatio || 1);
  canvas.width = Math.round(cw * dpr); canvas.height = Math.round(chh * dpr);
  const g = canvas.getContext('2d')!; g.scale(dpr, dpr);
  const src = sourceOf(piece)(cols, rows, CW, CH), ramp: string = NB.RAMP, tone = getComputedStyle(canvas).color;
  g.font = `500 ${Math.round(CH * 0.8)}px "JetBrains Mono", ui-monospace, monospace`; g.textAlign = 'center'; g.textBaseline = 'middle';
  for (let i = 0; i < cols * rows; i++) {
    const c = src.cov[i]; if (c <= 0.02) continue;
    const glyph = ramp[Math.min(ramp.length - 1, Math.round(c * (ramp.length - 1)))]; if (glyph === ' ') continue;
    g.fillStyle = src.rgb && piece.mode === 'color' ? `rgb(${src.rgb[i * 3]},${src.rgb[i * 3 + 1]},${src.rgb[i * 3 + 2]})` : tone;
    g.fillText(glyph, (i % cols) * CW + CW / 2, Math.floor(i / cols) * CH + CH / 2 + 1);
  }
}

export function initArtBanners() { document.querySelectorAll<HTMLElement>('[data-art-banner]').forEach(mountBanner); }

export function initArtThumbs() {
  const thumbs = document.querySelectorAll<HTMLCanvasElement>('canvas[data-art-thumb]');
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting) { io.unobserve(e.target); drawStill(e.target as HTMLCanvasElement); } }, { rootMargin: '200px' });
  thumbs.forEach((t) => io.observe(t));
}
