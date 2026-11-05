import { marked } from 'marked';
import { JSON_SCHEMA, load as parseYaml } from 'js-yaml';
import { assetUrl } from './assetUrl';

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

  let data = {};

  try {
    // JSON_SCHEMA keeps unquoted dates as strings instead of Date objects,
    // while still parsing booleans, lists and quoted values correctly.
    const parsed = parseYaml(match[1], { schema: JSON_SCHEMA });
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      data = parsed;
    }
  } catch (error) {
    console.warn('Could not parse post frontmatter:', error.message);
  }

  return { data, body: match[2].trim() };
}

/**
 * Markdown images link to CMS uploads as `/portfolio/uploads/...`, but the
 * site is built with a relative base. Rewrite those paths at render time.
 */
function renderMarkdown(body) {
  return marked
    .parse(body, { gfm: true, breaks: false })
    .replace(/\bsrc="(\/[^"]*)"/g, (match, path) => `src="${assetUrl(path)}"`)
    .replace(
      /\bhref="(\/portfolio\/[^"]*)"/g,
      (match, path) => `href="${assetUrl(path)}"`,
    );
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
    const date = data.date ? String(data.date) : '';

    return {
      slug,
      title: data.title ? String(data.title) : '[ADD: post title]',
      excerpt: data.excerpt ? String(data.excerpt) : '',
      date,
      dateLabel: formatDate(date),
      tags: Array.isArray(data.tags) ? data.tags.map((tag) => String(tag)) : [],
      draft: data.draft === true || data.draft === 'true',
      readingTime: readingTime(body),
      body,
      html: renderMarkdown(body),
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
