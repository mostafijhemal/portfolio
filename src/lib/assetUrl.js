/**
 * Resolves content-managed asset paths.
 *
 * Sveltia CMS writes uploads with Sveltia's PUBLIC_FOLDER value, which must be
 * an absolute path (`/portfolio/uploads/...`). The app is built with a relative
 * base so it works on GitHub Pages and in local preview, so strip that deployed
 * prefix and re-attach the current base URL.
 */
const deployedPrefix = '/portfolio/';

export function assetUrl(path) {
  if (!path || typeof path !== 'string') return path;

  // External, protocol-relative, in-page and data URLs are already complete.
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path)) return path;

  const base = import.meta.env.BASE_URL || './';

  if (path.startsWith(deployedPrefix)) {
    return `${base}${path.slice(deployedPrefix.length)}`;
  }

  if (path.startsWith('/')) {
    return `${base}${path.replace(/^\/+/, '')}`;
  }

  return path;
}
