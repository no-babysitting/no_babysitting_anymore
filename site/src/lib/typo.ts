/* Typography helpers (docs/11-typography.md). */

/* Joins the last two words with a no-break space, so a heading never ends on one stranded word.
   For headings split by SplitText, where text-wrap: balance is off (DS · Chữ/Tiếng Việt). */
export const bindLast = (s: string) => s.replace(/\s+(\S+)$/, '\u00a0$1');
