import { FiArrowUpRight, FiClock, FiEdit3 } from 'react-icons/fi';
import { blog, profile } from '../../data/content';
import { usePageMeta } from '../../hooks/usePageMeta';
import { posts } from '../../lib/blog';
import Reveal from '../Reveal';
import TiltCard from '../TiltCard';
import BlogShell from './BlogShell';

function PostCard({ post }) {
  return (
    <TiltCard
      as="a"
      href={post.href}
      max={4}
      lift={-4}
      aria-label={`Read ${post.title}`}
      className="card group flex h-full flex-col p-6 hover:border-accent/30 sm:p-7"
    >
      <div className="relative z-10 flex items-center justify-between gap-3 font-mono text-xs text-muted/90">
        <time dateTime={post.date || undefined}>{post.dateLabel || '[ADD: date]'}</time>
        <span className="inline-flex items-center gap-1.5">
          <FiClock className="h-3 w-3" aria-hidden="true" />
          {post.readingTime} min read
        </span>
      </div>

      <h2 className="relative z-10 mt-4 text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
        {post.title}
      </h2>

      {post.excerpt ? (
        <p className="relative z-10 mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      ) : null}

      <div className="relative z-10 mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
        {post.tags.length ? (
          <ul className="flex flex-wrap gap-1.5" aria-label={`${post.title} tags`}>
            {post.tags.map((tag) => (
              <li key={tag} className="chip text-ink/80">
                {tag}
              </li>
            ))}
          </ul>
        ) : (
          <span aria-hidden="true" />
        )}

        <span className="link-arrow ml-auto text-xs text-accent">
          Read note
          <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </TiltCard>
  );
}

export default function BlogIndex() {
  usePageMeta({
    title: `${blog.title} — ${profile.name}`,
    description: blog.description,
  });

  return (
    <BlogShell
      eyebrow={blog.eyebrow}
      title={blog.title}
      description={blog.description}
      backHref="#home"
      backLabel={blog.backToPortfolio}
    >
      <div className="mt-10 flex items-center justify-between gap-3 border-t border-line/10 pt-5">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          {posts.length ? `${posts.length} ${posts.length === 1 ? 'note' : 'notes'}` : 'No notes yet'}
        </p>
        <p className="font-mono text-xs text-muted/90">Newest first</p>
      </div>

      {posts.length ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={Math.min(index * 0.04, 0.2)} className="h-full">
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal className="mt-5">
          <div className="rounded-card border border-dashed border-line/15 bg-line/[0.015] p-8 text-center sm:p-12">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-line/10 bg-line/[0.04] text-accent">
              <FiEdit3 className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-xl font-semibold">{blog.emptyTitle}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
              {blog.emptyBody}
            </p>
            <a href={blog.emptyHref} className="btn-ghost mt-6 px-4 py-2.5 text-xs">
              {blog.emptyCta}
              <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            {import.meta.env.DEV ? (
              <p className="mx-auto mt-5 max-w-md font-mono text-xs leading-relaxed text-muted/90">
                Add a Markdown file in src/content/blog/posts/ to publish a note.
              </p>
            ) : null}
          </div>
        </Reveal>
      )}
    </BlogShell>
  );
}
