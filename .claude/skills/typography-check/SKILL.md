---
name: typography-check
description: Checks the typography of the No Babysitting UI (the rendered Astro site and the design system) for contrast, minimum sizes, Vietnamese stacked diacritics, text spacing, zoom, fonts, line length and leading. Use when you change CSS, fonts, components, page layout, headings or copy that changes line breaks, when you add a page or chapter, or when asked to review typography, readability, legibility or fonts.
---

# Typography check

The rules, thresholds and sources are in `docs/11-typography.md`. Thresholds live in `design-system/type-rules.json`. Role table (which family, size, weight is allowed where): `design-system/SOURCE-OF-TRUTH.md` §2.

## 1. Run the automatic check

```bash
cd site
NB_BASE=/no_babysitting_anymore/ npm run build      # same build as production
node scripts/type-check.cjs                          # every page, desktop 1440 and phone 390
```

- Needs Chromium through Playwright (preinstalled in cloud sessions; in CI: `npm i --no-save playwright@1.63.0 && npx playwright install --with-deps chromium`).
- Output groups findings by rule: element, what was measured, how to fix, where. Full detail: `site/type-report/report.json`; PR-ready table: `site/type-report/summary.md`.
- Exit code 0 means no **errors**. Warnings never fail the run.
- One page or one viewport while iterating: `--pages ,c02/ --only phone`. Any live page: `--url https://example.com/`.

## 2. Act on the result

1. **Errors** (contrast, min-size, collision, ink-clip, glyph-fallback, text-spacing, zoom, stray-markup): fix the cause. Never raise a threshold, delete a rule or add an exception just to get green. A real exception goes in `exceptions` of `type-rules.json` with `rule`, `selector` and a `reason`; say so in the PR.
2. **Warnings:** fix the cheap and in-scope ones. List the rest in the PR; do not leave them unmentioned.
3. **A threshold that is wrong** (for example `--measure` produced 90 characters per line): change `type-rules.json` or the token, explain it in the commit, and tell the owner. Design-system changes need the owner to see them.
4. After any change to `scripts/type-check.cjs`, `type-rules.json` or `scripts/fixtures/`, run `node scripts/type-check.cjs --selftest`. The bad fixture must trip every rule on its own block; the good fixture must trip none.

## 3. Review by eye what the machine cannot judge

Take screenshots at 1440 and 390 (`deviceScaleFactor: 2` for anything a person will look at) and check:

- **Hierarchy:** at most three visibly different levels on a screen. Each level differs from the next in size and one more thing (weight, family or color).
- **Pairing:** only the four DS families. Serif (Newsreader) is for questions, quotes and headings; body and UI are Be Vietnam Pro; labels, buttons and agent actions are JetBrains Mono at 12px or more; chapter names and giant numbers are Archivo.
- **Vietnamese marks:** the largest headings and the smallest labels, especially capitals with stacked marks (Ệ Ế Ổ Ữ Ậ). No mark touches the line above or below, none is cut at a box edge. Read the tone marks themselves, not only the layout.
- **Line breaks:** no heading ends on a lone word; no line starts with a closing mark; short words are not stranded before a long one.
- **Rhythm:** vertical gaps come from the spacing scale (`space-1` to `space-10`); a heading sits closer to the text it introduces than to the text above it.
- **Numbers:** columns and counters use `font-variant-numeric: tabular-nums`.
- **Alignment:** left-aligned, never justified (browsers do not hyphenate Vietnamese).

## 4. Report

In the reply or the PR: errors found and fixed, warnings left and why, and anything the owner has to decide (design-system changes, new roles). Paste the table from `summary.md`.
