import type { Chapter } from './chapters';
import { PARTS, indexOf } from './chapters';
export const openerProps = (c: Chapter) => ({
  id: c.id, no: c.no, pos: String(indexOf(c.id) + 1).padStart(2, '0'), en: c.en, vi: c.vi, beats: c.beats.length,
  part: PARTS[c.id] + (c.level && c.level !== 'Kết' ? ' · ' + c.level.toUpperCase() : ''),
  ghost: c.en.split(/\s+/).pop(), mins: c.minutes.split('/')[0].replace("'", ''),
});
