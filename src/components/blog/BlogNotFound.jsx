import { FiArrowLeft, FiArrowUpRight, FiFileText } from 'react-icons/fi';
import { blog, profile } from '../../data/content';
import { usePageMeta } from '../../hooks/usePageMeta';
import Reveal from '../Reveal';
import BlogShell from './BlogShell';

/** Shown for an unknown note slug and for unknown `#/...` routes. */
export default function BlogNotFound() {
  usePageMeta({
    title: `${blog.notFoundTitle} — ${profile.name}`,
    description: blog.notFoundBody,
  });

  return (
    <BlogShell
      eyebrow={blog.eyebrow}
      title={blog.notFoundTitle}
      description={blog.notFoundBody}
      backHref="#/blog"
      backLabel={blog.backToBlog}
    >
      <Reveal className="mt-10 max-w-3xl">
        <div className="rounded-card border border-dashed border-line/15 bg-line/[0.015] p-8 text-center sm:p-12">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-line/10 bg-line/[0.04] text-accent">
            <FiFileText className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-xl font-semibold">This page took a wrong turn.</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            The link may be old, or the note may have been renamed. The full list is a good place
            to pick up again.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href={blog.notFoundHref} className="btn-primary px-4 py-2.5 text-xs">
              {blog.notFoundCta}
              <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a href="#home" className="btn-ghost px-4 py-2.5 text-xs">
              <FiArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              {blog.backToPortfolio}
            </a>
          </div>
        </div>
      </Reveal>
    </BlogShell>
  );
}
