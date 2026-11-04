import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Typewriter effect with a blinking caret.
 * With prefers-reduced-motion, it renders the first phrase statically.
 */
export function useTypewriter(phrases, { typeSpeed = 62, deleteSpeed = 28, hold = 1700 } = {}) {
  const reduceMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setText(phrases[0] ?? '');
      return undefined;
    }

    const phrase = phrases[index % phrases.length] ?? '';
    let timer;

    if (!deleting && text === phrase) {
      timer = window.setTimeout(() => setDeleting(true), hold);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((current) => (current + 1) % phrases.length);
    } else {
      const next = phrase.slice(0, text.length + (deleting ? -1 : 1));
      timer = window.setTimeout(() => setText(next), deleting ? deleteSpeed : typeSpeed);
    }

    return () => window.clearTimeout(timer);
  }, [text, deleting, index, phrases, typeSpeed, deleteSpeed, hold, reduceMotion]);

  return { text, reduceMotion };
}
