/* What is actually live, so every number on the site can be honest (docs/08 · §2, content integrity).
   Update this when a chapter, simulator or Library batch ships. */
export const LIVE = {
  chapters: ['c02'] as string[],      // chapters written in full; the rest are skeletons from the script
  simulators: ['S1'] as string[],     // simulators that run
  librarySamples: 14,                 // sample entries in FilterBar until the real ingest (K3)
};
export const isLive = (id: string) => LIVE.chapters.includes(id);
