# Blog posts

Every `.md` file in `posts/` becomes a note on the site:

```
src/content/blog/posts/learning-fastapi.md  →  #/blog/learning-fastapi
```

The filename is the URL slug. Set `slug:` in the frontmatter to override it.

## Publish a note

1. Copy `posts/_template.md` to `posts/my-note.md`.
2. Fill in the frontmatter and write the note.
3. Change `draft: true` to `draft: false` (or delete the `draft` line).
4. Run `npm run dev`, or `npm run build` for the production site.

Posts are sorted newest first. Files with `draft: true` are never shown, including
in the production build. When no published posts exist, the blog shows an honest
empty state.

## Frontmatter

| Field     | Required | Notes                                                        |
| --------- | -------- | ------------------------------------------------------------ |
| `title`   | yes      | Plain text.                                                  |
| `date`    | yes      | `YYYY-MM-DD`. Used for sorting and the date label.           |
| `excerpt` | no       | Short summary shown on the index and in share metadata.      |
| `tags`    | no       | Array, e.g. `["Python", "Notes"]`.                            |
| `draft`   | no       | `true` hides the post. Defaults to published.                |
| `slug`    | no       | Overrides the filename in the URL.                           |

## Writing

The body is standard Markdown: headings, lists, links, images, tables, quotes
and fenced code blocks. External links in a published note open in a new tab
automatically.

Notes are plain files in the repository, so publishing is a commit — there is
no admin panel, database or backend to maintain.
