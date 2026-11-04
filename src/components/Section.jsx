import Reveal from './Reveal';

/** Shared section shell: eyebrow, title, animated underline and intro copy. */
export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = '',
  aside = null,
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`section-shell relative py-20 sm:py-24 lg:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-shell px-5 sm:px-8">
        <div
          className={
            aside
              ? 'flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12'
              : undefined
          }
        >
          <Reveal className={aside ? 'min-w-0 max-w-2xl' : 'max-w-2xl'}>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={`${id}-title`} className="section-title mt-4">
              {title}
            </h2>
            <span
              aria-hidden="true"
              className="mt-6 block h-[2px] w-16 origin-left rounded-full bg-gradient-to-r from-accent to-violet"
            />
            {description ? (
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
            ) : null}
          </Reveal>

          {aside ? (
            <Reveal delay={0.12} className="mx-auto shrink-0 lg:mx-0">
              {aside}
            </Reveal>
          ) : null}
        </div>

        {children}
      </div>
    </section>
  );
}

