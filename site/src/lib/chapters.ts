import data from '../content/chapters.json';
import { url } from './url';
export interface Beat { id: string; phase: string; text: string }
export interface Chapter { id: string; no: string; en: string; vi: string; level: string; minutes: string; goals: string; myth: string; question: string; beats: Beat[]; sources: string }
export const chapters = data as Chapter[];
export const PARTS: Record<string, string> = { c00: 'Mở đầu', c01: 'Phần I', c02: 'Phần I', c03: 'Phần II', c04: 'Phần II', c05: 'Phần III', c05b: 'Phần III', c06: 'Phần III', c07: 'Phần III', c08: 'Phần IV', c09: 'Phần IV', c10: 'Kết' };
export const href = (id: string) => url(`${id}/`);
export const indexOf = (id: string) => chapters.findIndex((c) => c.id === id);
