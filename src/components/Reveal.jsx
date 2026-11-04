import { useEffect, useRef, useState } from 'react';

/**
 * Fade-and-rise on scroll, implemented with IntersectionObserver + CSS.
 * The content is shown immediately when reduced motion is requested.
 */
export default function Reveal({ children, className = '', delay = 0, y = 22 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: '-70px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}s`, '--reveal-y': `${y}px` }}
    >
      {children}
    </div>
  );
}
