import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

/** Accessible dark/light switch with a small CSS icon transition. */
export default function ThemeToggle({ theme, onToggle, className = '' }) {
  const [mounted, setMounted] = useState(false);
  const next = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => setMounted(true), []);

  // Keep the first client render neutral so the label does not flash while
  // the remembered theme is read from the document.
  if (!mounted) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className={`icon-btn relative overflow-hidden ${className}`}
        aria-label="Toggle colour theme"
        title="Toggle colour theme"
      >
        <span className="inline-flex">
          <FiSun className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`icon-btn relative overflow-hidden ${className}`}
      aria-label={`Switch to ${next} theme`}
      aria-pressed={theme === 'light'}
      title={`Switch to ${next} theme`}
    >
      <span key={theme} className="icon-swap inline-flex">
        {theme === 'dark' ? (
          <FiSun className="h-[18px] w-[18px]" aria-hidden="true" />
        ) : (
          <FiMoon className="h-[18px] w-[18px]" aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
