import { load } from 'js-yaml';
import raw from '../content/matrix.yml?raw';

export type Avail = 'yes' | 'partial' | 'no' | 'unknown';
export interface SurfaceEntry {
  title: string;
  availability: Record<'cowork' | 'desktop' | 'web' | 'mobile' | 'cli', Avail>;
  status: 'ga' | 'beta' | 'research-preview' | 'experimental' | 'unknown';
  plans?: string[];
  tabs: {
    cowork?: { steps?: string[]; missing?: string; fallback?: { text: string; interpretation: boolean } };
    codeApp?: { steps?: string[]; missing?: string; fallback?: { text: string; interpretation: boolean } };
    cli?: { steps?: string[]; missing?: string; fallback?: { text: string; interpretation: boolean } };
  };
  docs: string[];
  verifiedAt: string;
}

const matrix = load(raw) as Record<string, SurfaceEntry>;

export function getFeature(id: string): SurfaceEntry {
  const f = matrix[id];
  if (!f) throw new Error(`matrix.yml: no feature "${id}"`);
  if (!f.docs?.length) throw new Error(`matrix.yml: "${id}" has no docs link (source rule)`);
  /* YAML reads an unquoted 2026-11-06 as a Date; keep verifiedAt as 'YYYY-MM-DD' */
  const v = f.verifiedAt as unknown;
  if (v instanceof Date) f.verifiedAt = v.toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(f.verifiedAt))) throw new Error(`matrix.yml: "${id}" verifiedAt must be YYYY-MM-DD`);
  return f;
}

/** days since verification; > 30 means "Cần kiểm chứng lại" */
export function ageDays(verifiedAt: string, now = new Date()): number {
  return Math.floor((now.getTime() - new Date(verifiedAt + 'T00:00:00Z').getTime()) / 86400000);
}

/** tiny inline markdown for step text: **bold** and `code`, everything else escaped */
export function inline(s: string): string {
  const esc = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
