import { useTypewriter } from '../hooks/useTypewriter';

/**
 * Isolated so each typed character only re-renders this line — not the
 * whole hero (terminal, links and social icons stay untouched).
 */
export default function TypewriterLine({ phrases }) {
  const { text } = useTypewriter(phrases);

  return (
    <>
      <span className="text-accent" aria-hidden="true">
        $
      </span>
      <span className="sr-only">{phrases.join(' · ')}</span>
      <span aria-hidden="true" className="truncate text-ink">
        {text}
      </span>
      <span
        aria-hidden="true"
        className="typing-caret inline-block h-[1.05em] w-[2px] shrink-0 animate-blink bg-accent"
      />
    </>
  );
}
