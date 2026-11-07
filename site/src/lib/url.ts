/* Every internal link goes through url(): the site is served from a sub-path on GitHub Pages
   (NB_BASE=/no_babysitting_anymore/) and from / everywhere else. */
export const BASE = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
export const url = (p = '') => BASE + p.replace(/^\//, '');
