/* Article art registry (issue #44, slice 3, D77). An article names one piece in its `art` field. A piece is plain data: which source of the
   design system draws it (NB.sources.<source> in design-system/components/bundle.js), with which options, and how it is coloured.
   The build reads the ids from here (an unknown id fails the build, src/lib/articles.ts); the browser gets the piece as JSON on the
   banner and the thumbnail (src/scripts/article-art.ts).

   To add a piece: add an entry below; a piece that needs a new kind of drawing adds a source to bundle.js first (as `dawn` did).
   Show the owner a picture of it and have the direction approved (D55). Pieces are NOT in art-lock.json (D77); the gate is the measured
   budget that site/scripts/check.cjs enforces on /articles/sample/: at most 12,000 cells on a desktop and 4,000 on a phone, at most 2 live
   canvases, idle cost under the home page's budget (and at most 8% of the main thread) once the picture has converged, a final frame
   straight away with reduced motion, and no drawing while it is off screen.

   Palette: the brand sunset (docs/15 §5) is the default. A piece may override it through its options, e.g. for `dawn`:
   { sky: [[0, [r, g, b]], ..., [1, [r, g, b]]], sun: [r, g, b], ridges: [far, ..., near], water: [at the horizon, at the bottom] }. */
export interface ArtPiece {
  /* the NB.sources function that draws it */
  source: 'dawn' | 'terrain' | 'scene' | 'sculpture';
  options: Record<string, unknown>;
  /* 'color' uses the source's own colours; 'tone' draws in one design token (`tone`), e.g. 'fg-muted' */
  mode?: 'color' | 'tone';
  tone?: string;
  /* share of cells that drift each second once the picture has settled (docs/15 §5 uses 0.02) */
  breathe?: number;
  /* terrain only: makes the field move like water; options of NB.sources.terrain's `flow` */
  flow?: boolean;
}

/* Colour stops below are the brand sunset of docs/15 §5 (sky #0e1034 > #3a2668 > #b24868 > #f6a058, glow #ffbe78, lake #2e1e4a > #0a0914);
   each piece moves the sun, the hour or the number of ridges and stays within the hues of that sunset (night is the same sky, darker). */
const NIGHT = [[0, [5, 6, 26]], [0.5, [14, 16, 52]], [0.82, [58, 38, 104]], [1, [178, 72, 104]]];
const NOON = [[0, [58, 38, 104]], [0.4, [178, 72, 104]], [0.75, [246, 160, 88]], [1, [255, 206, 138]]];

export const PIECES: Record<string, ArtPiece> = {
  /* the brand dawn: sun right of centre */
  default: { source: 'dawn', options: {}, mode: 'color', breathe: 0.02 },
  /* low sun on the left, a wide lake: "less, in the right place" (system prompt) */
  dusk: { source: 'dawn', options: { sunX: 0.22, horizon: 0.56, seed: 9 }, mode: 'color', breathe: 0.02 },
  /* night, a small warm sun low in the middle: what is kept when the session ends (memory) */
  night: { source: 'dawn', options: { sky: NIGHT, sun: [255, 206, 138], sunX: 0.5, horizon: 0.7, seed: 13 }, mode: 'color', breathe: 0.02 },
  /* high bright sky, sun left of centre: more light for more effort (model and effort) */
  noon: { source: 'dawn', options: { sky: NOON, sun: [255, 206, 138], sunX: 0.36, horizon: 0.66, seed: 21, ridges: [[120, 70, 110], [74, 46, 104], [50, 32, 84]] }, mode: 'color', breathe: 0.02 },
  /* five ridges, one behind the other: many readers of one thing (one writer, many readers) */
  ridges: { source: 'dawn', options: { sunX: 0.84, horizon: 0.6, seed: 17, ridges: [[96, 60, 112], [74, 46, 104], [58, 36, 92], [44, 28, 74], [30, 22, 60]] }, mode: 'color', breathe: 0.02 },
};

export const ART_IDS: readonly string[] = Object.keys(PIECES);
