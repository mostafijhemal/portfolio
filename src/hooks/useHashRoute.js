import { useEffect, useState } from 'react';

/**
 * Tiny hash router.
 *
 * The portfolio already uses hash anchors (`#about`, `#projects`), so blog
 * routes use a leading slash (`#/blog`, `#/blog/my-post`) to stay out of the
 * way. That also keeps the site working on GitHub Pages project subpaths,
 * where path-based SPA routing would need server rewrites.
 */
export function parseHash(hash = window.location.hash) {
  if (!hash || hash === '#' || !hash.startsWith('#/')) {
    return { name: 'home', path: '/', hash };
  }

  const path = hash.slice(1);
  const segments = path.split('/').filter(Boolean);

  if (segments[0] === 'blog') {
    if (segments.length === 1) return { name: 'blog', path, hash };

    try {
      return { name: 'post', slug: decodeURIComponent(segments.slice(1).join('/')), path, hash };
    } catch {
      return { name: 'notFound', path, hash };
    }
  }

  return { name: 'notFound', path, hash };
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash());

  useEffect(() => {
    const onChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
