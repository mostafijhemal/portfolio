import { FiArrowLeft } from 'react-icons/fi';
import Reveal from '../Reveal';

/** Shared header and spacing for the blog index, post pages and 404 page. */
export default function BlogShell({
  eyebrow,
  title,
  description,
  backHref = '#home',
  backLabel = 'Back to portfolio',
  meta,
  children,
}) {
  return (
    <div className="relative pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36">
      <div className="mx-auto w-full max-w-shell px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="eyebrow">{eyebrow}</p>
            <a
              href={backHref}
              className="link-arrow text-xs text-muted transition-colors hover:text-accent"
            >
              <FiArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              {backLabel}
            </a>
          </div>

          <h1 className="section-title mt-4">{title}</h1>
          <span
            aria-hidden="true"
            className="mt-6 block h-[2px] w-16 origin-left rounded-full bg-gradient-to-r from-accent to-violet"
          />

          {description ? (
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
          ) : null}

          {meta ? (
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted/90">
              {meta}
            </div>
          ) : null}
        </Reveal>

        {children}
      </div>
    </div>
  );
}
