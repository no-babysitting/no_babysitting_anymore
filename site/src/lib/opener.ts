import type { Chapter } from './chapters';
import { PARTS } from './chapters';
export const openerProps = (c: Chapter) => ({
  id: c.id, no: c.no, en: c.en, vi: c.vi, beats: c.beats.length,
  part: PARTS[c.id] + (c.level && c.level !== 'Kết' ? ' · ' + c.level.toUpperCase() : ''),
  ghost: c.en.split(/\s+/).pop(), mins: c.minutes.split('/')[0].replace("'", ''),
});
