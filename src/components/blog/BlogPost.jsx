import { useEffect, useRef } from 'react';
import { FiArrowLeft, FiArrowUpRight, FiClock } from 'react-icons/fi';
import { blog, profile, site } from '../../data/content';
import { usePageMeta } from '../../hooks/usePageMeta';
import { getAdjacentPosts, getPost } from '../../lib/blog';
import BlogNotFound from './BlogNotFound';
import BlogShell from './BlogShell';

export default function BlogPost({ slug }) {
  const post = getPost(slug);
  const articleRef = useRef(null);
  const { previous, next } = getAdjacentPosts(slug);

  usePageMeta({
    title: post ? `${post.title} — ${profile.name}` : `${blog.notFoundTitle} — ${profile.name}`,
    description: post ? post.excerpt || blog.description : blog.notFoundBody,
  });

  // Make external links in authored Markdown safe and clearly new-tab.
  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    article.querySelectorAll('a[href^="http"]').forEach((link) => {
      link.target = '_blank';
      link.rel = 'noreferrer noopener';
    });
  }, [post]);

  // BlogPosting structured data for the current note.
  useEffect(() => {
    if (!post) return undefined;

    const data = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt || undefined,
      author: { '@type': 'Person', name: profile.name, url: site.url },
      mainEntityOfPage: `${site.url}/#/blog/${post.slug}`,
    };

    if (post.date) data.datePublished = post.date;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'blog-post-jsonld';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => script.remove();
  }, [post]);

  if (!post) return <BlogNotFound />;

  return (
    <BlogShell
      eyebrow={`${blog.eyebrow} / ${post.dateLabel || 'Undated'}`}
      title={post.title}
      description={post.excerpt}
      backHref="#/blog"
      backLabel={blog.backToBlog}
      meta={
        <>
          {post.dateLabel ? <time dateTime={post.date}>{post.dateLabel}</time> : null}
          <span className="inline-flex items-center gap-1.5">
            <FiClock className="h-3 w-3" aria-hidden="true" />
            {post.readingTime} min read
          </span>
          {post.tags.map((tag) => (
            <span key={tag} className="chip text-ink/80">
              {tag}
            </span>
          ))}
        </>
      }
    >
      <article
        ref={articleRef}
        aria-label={post.title}
        className="prose-blog mt-10 max-w-3xl"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {previous || next ? (
        <nav
          aria-label="More posts"
          className="mt-12 grid max-w-3xl gap-3 border-t border-line/10 pt-6 sm:grid-cols-2"
        >
          {previous ? (
            <a
              href={previous.href}
              className="group rounded-xl border border-line/10 bg-line/[0.02] p-4 transition-colors hover:border-accent/30 hover:bg-line/[0.04]"
            >
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted/90">
                Older note
              </span>
              <span className="mt-2 block text-sm font-medium leading-snug text-ink transition-colors group-hover:text-accent">
                {previous.title}
              </span>
            </a>
          ) : (
            <span aria-hidden="true" />
          )}

          {next ? (
            <a
              href={next.href}
              className="group rounded-xl border border-line/10 bg-line/[0.02] p-4 text-left transition-colors hover:border-accent/30 hover:bg-line/[0.04] sm:text-right"
            >
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted/90">
                Newer note
              </span>
              <span className="mt-2 block text-sm font-medium leading-snug text-ink transition-colors group-hover:text-accent">
                {next.title}
              </span>
            </a>
          ) : null}
        </nav>
      ) : null}

      <div className="mt-10 flex max-w-3xl flex-wrap items-center gap-4 border-t border-line/10 pt-6">
        <a href="#/blog" className="link-arrow text-xs text-accent hover:text-ink">
          <FiArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          {blog.backToBlog}
        </a>
        <a href="#home" className="link-arrow text-xs text-muted hover:text-accent">
          {blog.backToPortfolio}
          <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </BlogShell>
  );
}
