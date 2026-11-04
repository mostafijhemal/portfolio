import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in the middle of the viewport.
 * `ids` should be a stable, module-level array.
 *
 * The sections below the hero are loaded lazily, so this hook waits for them
 * to appear and then attaches the observer instead of giving up on first run.
 * Pass `enabled: false` on non-portfolio routes so it does not watch for
 * sections that will never render.
 */
export function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState(ids[0] ?? '');
  const key = ids.join('|');

  useEffect(() => {
    if (!enabled) return undefined;

    let observer;
    let mutation;
    let onScroll;

    const connect = () => {
      const sectionIds = key.split('|');
      const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

      if (sections.length < sectionIds.length) return false;

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (visible[0]) setActive(visible[0].target.id);
        },
        { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.15, 0.4, 0.75] },
      );

      sections.forEach((section) => observer.observe(section));

      // The last section can sit above the observer band at the very bottom.
      onScroll = () => {
        const atBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
        if (atBottom) setActive(key.split('|').at(-1));
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return true;
    };

    if (!connect()) {
      mutation = new MutationObserver(() => {
        if (connect()) mutation.disconnect();
      });
      mutation.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      mutation?.disconnect();
      observer?.disconnect();
      if (onScroll) window.removeEventListener('scroll', onScroll);
    };
  }, [key, enabled]);

  return active;
}
