import { useCallback, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/**
 * Pointer-driven 3D tilt, written as a small CSS-variable bridge.
 *
 * The browser paints the transform from `--tilt-rx` / `--tilt-ry`; React only
 * attaches pointer handlers and never re-renders while the pointer moves.
 * Touch, pen and reduced-motion users keep the flat, static card.
 */
export function useTilt({ max = 6, lift = -5, scale = 1.012 } = {}) {
  const ref = useRef(null);
  const frame = useRef(0);
  const box = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  const reset = useCallback(() => {
    const node = ref.current;
    if (!node) return;

    cancelAnimationFrame(frame.current);
    frame.current = 0;
    box.current = null;
    node.classList.remove('is-tilting');
    node.style.setProperty('--tilt-rx', '0deg');
    node.style.setProperty('--tilt-ry', '0deg');
    node.style.setProperty('--tilt-lift', '0px');
    node.style.setProperty('--tilt-scale', '1');
    node.style.setProperty('--glare-x', '50%');
    node.style.setProperty('--glare-y', '50%');
  }, []);

  useEffect(() => {
    if (reducedMotion) reset();
    return () => cancelAnimationFrame(frame.current);
  }, [reducedMotion, reset]);

  // A resize invalidates the cached, untransformed box.
  useEffect(() => {
    const onResize = () => {
      box.current = null;
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onPointerMove = useCallback(
    (event) => {
      if (reducedMotion || event.pointerType !== 'mouse') return;

      const node = ref.current;
      if (!node) return;

      // Cache the layout box before the first tilt. A transformed element's
      // bounding box changes with every frame, which would otherwise feed
      // back into the maths and make the card drift under a still pointer.
      if (!box.current) {
        const rect = node.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        box.current = {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        };
      }

      const { width, height } = box.current;
      const left = box.current.left - (window.scrollX - box.current.scrollX);
      const top = box.current.top - (window.scrollY - box.current.scrollY);
      const x = clamp((event.clientX - left) / width, 0, 1);
      const y = clamp((event.clientY - top) / height, 0, 1);

      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        node.classList.add('is-tilting');
        node.style.setProperty('--tilt-rx', `${((0.5 - y) * 2 * max).toFixed(2)}deg`);
        node.style.setProperty('--tilt-ry', `${((x - 0.5) * 2 * max).toFixed(2)}deg`);
        node.style.setProperty('--tilt-lift', `${lift}px`);
        node.style.setProperty('--tilt-scale', String(scale));
        node.style.setProperty('--glare-x', `${(x * 100).toFixed(1)}%`);
        node.style.setProperty('--glare-y', `${(y * 100).toFixed(1)}%`);
      });
    },
    [lift, max, reducedMotion, scale],
  );

  return {
    ref,
    tiltProps: {
      onPointerMove,
      onPointerLeave: reset,
      onPointerCancel: reset,
    },
  };
}
