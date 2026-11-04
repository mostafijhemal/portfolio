import { useTilt } from '../hooks/useTilt';

/**
 * Shared 3D hover surface.
 *
 * Keeps the pointer maths in one place so every card on the page reacts the
 * same way. Pass `glare={false}` on text-heavy or form surfaces to keep the
 * accent sheen from tinting copy.
 */
export default function TiltCard({
  as: Tag = 'div',
  className = '',
  max = 6,
  lift = -5,
  scale = 1.012,
  glare = true,
  children,
  ...rest
}) {
  const { ref, tiltProps } = useTilt({ max, lift, scale });

  return (
    <Tag ref={ref} {...tiltProps} {...rest} className={`tilt ${className}`}>
      {glare ? <span aria-hidden="true" className="tilt-glare" /> : null}
      {children}
    </Tag>
  );
}
