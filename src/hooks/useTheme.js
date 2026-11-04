import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

function readInitialTheme() {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

/**
 * Dark-first theme with a remembered light-mode choice.
 * The initial class is set by a tiny inline script in index.html to avoid FOUC.
 */
export function useTheme() {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === 'dark';

    root.classList.toggle('dark', isDark);
    root.classList.toggle('light', !isDark);
    root.style.colorScheme = theme;

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* Storage can be blocked — the site still works, it just won't remember. */
    }

    const meta = document.getElementById('theme-color');
    if (meta) meta.setAttribute('content', isDark ? '#070b10' : '#f5f8fb');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}
