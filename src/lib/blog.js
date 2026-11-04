import { marked } from 'marked';

/**
 * Posts are plain Markdown files in src/content/blog/posts/.
 *
 * The slug is the filename (`my-first-post.md` -> `my-first-post`). Add
 * frontmatter at the top of the file; see the README in that folder.
 */
const files = import.meta.glob('../content/blog/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) return { data: {}, body: raw.trim() };

  const data = {};

  match[1].split(/\r?\n/).forEach((line) => {
    const separator = line.indexOf(':');
    if (separator === -1) return;

    const key = line.slice(0, separator).trim();
    if (!key) return;

    let value = line.slice(separator + 1).trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else if (value === 'true' || value === 'false') {
      value = value === 'true';
    } else {
      value = value.replace(/^["']|["']$/g, '');
    }

    data[key] = value;
  });

  return { data, body: match[2].trim() };
}

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

function readingTime(body) {
  const words = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`[\]()!-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 200));
}

export const posts = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    const slug = String(data.slug || path.split('/').pop().replace(/\.md$/, ''));

    return {
      slug,
      title: data.title || '[ADD: post title]',
      excerpt: data.excerpt || '',
      date: data.date || '',
      dateLabel: formatDate(data.date),
      tags: Array.isArray(data.tags) ? data.tags : [],
      draft: data.draft === true || data.draft === 'true',
      readingTime: readingTime(body),
      body,
      html: marked.parse(body, { gfm: true, breaks: false }),
      href: `#/blog/${encodeURIComponent(slug)}`,
    };
  })
  .filter((post) => !post.draft)
  .sort((a, b) => {
    const aTime = new Date(a.date).getTime() || 0;
    const bTime = new Date(b.date).getTime() || 0;
    return bTime - aTime;
  });

export function getPost(slug) {
  return posts.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug) {
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: posts[index + 1] || null,
    next: posts[index - 1] || null,
  };
}
