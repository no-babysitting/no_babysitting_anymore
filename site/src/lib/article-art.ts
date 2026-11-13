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

export const PIECES: Record<string, ArtPiece> = {
  default: { source: 'dawn', options: {}, mode: 'color', breathe: 0.02 },
};

export const ART_IDS: readonly string[] = Object.keys(PIECES);
