# Mostafijur Rahman — Portfolio

A fast, dark-first portfolio and Markdown blog for **Mostafijur Rahman**, Software Engineer (Dhaka, Bangladesh).
Portfolio copy lives in `src/data/content.js`; blog notes are plain Markdown files.

> **Stack:** React 18 + Vite 6 + Tailwind CSS 3 + CSS-only motion.
> No UI kit, no animation runtime, no icon font, no analytics, no third-party scripts.

---

## Quick start

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

```bash
npm run build     # production build → dist/
npm run preview   # preview the production build
```

> Built and tested with Node 20+.

---

## Edit the content

Everything is in **`src/data/content.js`**:

| Export | Controls |
| --- | --- |
| `profile` | Name, role, company, tagline, bio, location, résumé link, typing phrases |
| `navLinks` / `socials` | Navigation and social links |
| `about` | Story, education, location, quick facts |
| `skills` | Categories, icons, tier (`core` / `working` / `exploring`) |
| `credentials` | Certifications and professional training groups |
| `projects` / `projectFilters` | Case-study cards, categories, links, statuses |
| `github` | Username and copy for the live API section |
| `youtube` | Channel link, topics, featured video slots |
| `contact` | Email, Formspree endpoint, messages |
| `blog` | Blog heading, intro, empty state and 404 copy |
| `footer` | Built-with line and back-to-top label |

### Add real screenshots

Each project card renders a designed placeholder with `visualNote: '[ADD: screenshot]'`.
To use a real image:

1. Put the image in `public/projects/` (e.g. `public/projects/iptv.png`).
2. Add `image: './projects/iptv.png'` to that project object.
3. Update `ProjectCard.jsx` to render an `<img>` when `project.image` exists:

```jsx
{project.image ? (
  <img
    src={project.image}
    alt={`${project.title} screenshot`}
    loading="lazy"
    decoding="async"
    className="absolute inset-0 h-full w-full object-cover"
  />
) : (
  /* existing placeholder */
)}
```

Keep screenshots around 1600×1000 and under ~250 KB (WebP/AVIF preferred).

### Add certificate scans

Put the image in `public/certificates/` (for example `public/certificates/gemini-educator.png`)
and add `image: './certificates/gemini-educator.png'` to that item in
`credentials.groups[...].items`. The card then shows a “View certificate” link.
Keep scans under ~400 KB; the current set is resized to 1800 px and saved as JPEG.

### Change the profile photo

The About portrait is `public/profile.jpg` (square, 460×460). Replace that file, or change
`profile.photo` in `src/data/content.js` to point at a different image.

### Contact form

The form is connected to Formspree and sends submissions to `mostafij.hemal@gmail.com`.

```js
formEndpoint: 'https://formspree.io/f/xdeewjrq',
```

To use a different Formspree form, replace `contact.formEndpoint` in `src/data/content.js`.
If the endpoint is removed, the form falls back to opening the visitor's email app via
`contact.email`; if both are `null`, it shows a setup notice instead of pretending to send.

### Write a blog post

The blog is file-based — no backend, database or admin panel. Each note is a Markdown file:

```
src/content/blog/posts/my-note.md  →  #/blog/my-note
```

1. Copy `src/content/blog/posts/_template.md` to a new `.md` file.
2. Fill in `title`, `date` (`YYYY-MM-DD`), and optional `excerpt` and `tags`.
3. Set `draft: false` (or remove the line) to publish.
4. Run `npm run dev`, or `npm run build` for the production site.

The filename becomes the slug; add `slug:` to the frontmatter to override it. Posts are sorted
newest first. Drafts are hidden from the index and the production build. If every note is a draft,
the blog shows a clear empty state instead of placeholder writing. Full details are in
`src/content/blog/README.md`.

Markdown supports headings, lists, links, images, tables, quotes and fenced code blocks. External
links open in a new tab. Blog routes use hash URLs (`#/blog`, `#/blog/<slug>`), so GitHub Pages and
Vercel need no rewrite rules, and the existing `#about` / `#projects` anchors keep working.

---

## Assets

Regenerate the generated assets (requires Python + Pillow):

```bash
python -m pip install pillow
python scripts/generate-assets.py
```

This writes:

- `public/og-image.png` — 1200×630 share card
- `public/icon-192.png`, `public/icon-512.png`, `public/apple-touch-icon.png`
- `public/resume.pdf` — **placeholder** résumé, clearly marked

`public/favicon.svg` is hand-written and can be edited directly.

---

## Deploy

### Vercel (recommended, zero config)

1. Push the project to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) → import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. Add your custom domain if you have one.
5. If you use a different domain, update the canonical/OG URLs in `index.html`, and `public/sitemap.xml`, `public/robots.txt` and `src/data/content.js` (currently `https://mostafijhemal.github.io/portfolio/`).

### GitHub Pages (included workflow)

1. Push to a GitHub repository with the default branch named `main`.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions** (the workflow also
   enables Pages on its first run).
3. The workflow in `.github/workflows/deploy.yml` builds and publishes `dist/` on every push.
4. The site is available at `https://mostafijhemal.github.io/portfolio/`.
   `vite.config.js` uses `base: './'`, so project-site subpaths work without changes.

### Netlify

Build command `npm run build`, publish directory `dist`.

---

## Performance notes

- No images above the fold; the hero is pure CSS + text → fast LCP.
- Fonts are self-hosted via Fontsource (`Inter Variable`, `Fira Code`) with `font-display: swap`.
- The hero and navigation are the only initial React surface. Everything below the fold is a
  separate `BelowFold` chunk, loaded on the first scroll, an anchor click, or an 8-second fallback.
- Blog routes live in their own lazy chunk. The home page never downloads the Markdown renderer,
  and the blog never downloads the portfolio sections.
- No animation runtime: reveals use one shared `IntersectionObserver` plus CSS transitions.
  The typewriter is isolated so only its own line re-renders per character.
- The 3D card tilt is shared through `TiltCard` and writes CSS custom properties from a
  rAF-throttled pointer handler, so it never re-renders React and costs nothing until a mouse
  actually moves over a card. Every card surface uses it; text-heavy and form cards get a
  smaller angle and no glare so reading and typing stay comfortable.
- `content-visibility: auto` skips layout and paint for offscreen sections.
- Decorative layers are static CSS gradients; the heavy `backdrop-filter` blur was removed from
  cards and background glows after profiling showed it delayed first paint on mobile.
- GitHub data is fetched client-side once and cached in `sessionStorage` for 10 minutes, with a
  clearly-labelled fallback if the API is rate-limited.
- Icons are tree-shaken named imports; social and tech icons live in separate modules so the
  hero does not download database/tooling marks.

Run Lighthouse against `npm run preview` (not the dev server) for accurate numbers.

---

## Accessibility

- Skip-to-content link, semantic landmarks and heading order.
- Visible `:focus-visible` rings on every interactive element.
- Keyboard-navigable skill tabs (arrow keys, Home/End) with correct ARIA roles.
- Mobile menu closes on Escape, locks scroll, and moves focus into the panel.
- Form labels, inline errors, `aria-invalid`, and a polite live region for status.
- Colour tokens are chosen for WCAG AA contrast in both themes.
- `prefers-reduced-motion` disables the typewriter, reveals, panel animations, smooth scroll and
  the 3D tilt. Touch and pen input keep the flat card; the tilt is mouse-only.

---

## Project structure

```
.
├── .github/workflows/deploy.yml
├── public/
│   ├── apple-touch-icon.png
│   ├── favicon.svg
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── manifest.webmanifest
│   ├── og-image.png
│   ├── resume.pdf
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/generate-assets.py
├── src/
│   ├── components/
│   │   ├── blog/
│   │   │   ├── BlogIndex.jsx
│   │   │   ├── BlogNotFound.jsx
│   │   │   ├── BlogPost.jsx
│   │   │   ├── BlogRoutes.jsx
│   │   │   └── BlogShell.jsx
│   │   ├── About.jsx
│   │   ├── Background.jsx
│   │   ├── BelowFold.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── GitHubActivity.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── Projects.jsx
│   │   ├── Reveal.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── Section.jsx
│   │   ├── Skills.jsx
│   │   ├── SocialIcons.jsx
│   │   ├── TechIcons.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── TiltCard.jsx
│   │   ├── TypewriterLine.jsx
│   │   └── YouTubeSection.jsx
│   ├── data/content.js
│   ├── content/blog/
│   │   ├── posts/_template.md
│   │   └── README.md
│   ├── hooks/
│   │   ├── useActiveSection.js
│   │   ├── useGitHub.js
│   │   ├── useHashRoute.js
│   │   ├── usePageMeta.js
│   │   ├── usePrefersReducedMotion.js
│   │   ├── useTheme.js
│   │   ├── useTilt.js
│   │   └── useTypewriter.js
│   ├── lib/blog.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## Placeholders to replace

- [x] **Email** — set to `mostafij.hemal@gmail.com` in `src/data/content.js`
- [x] **Formspree endpoint** — connected at `contact.formEndpoint`
- [ ] **Screenshots** — `public/projects/*` + `image` fields on projects
- [ ] **Résumé** — replace `public/resume.pdf`
- [x] **Universities & years** — Eastern University (B.Sc., 2019) and Jahangirnagar University (M.Sc., 2026) in `about.education`
- [x] **Work experience** — Executive, AristoPharma Ltd., Feb 2023 – Present; Software Support Engineer, Living Support, Feb–Dec 2022 (`about.experience`)
- [x] **Freelance availability** — `profile.availability` and `contact.freelance`
- [x] **Published notes** — two sourced AI news posts in `src/content/blog/posts/`
- [x] **Certifications & training** — `credentials` in `src/data/content.js`
- [x] **Certificate scans** — optimized images in `public/certificates/`, linked from each credential
- [x] **Profile photo** — `public/profile.jpg`, shown in the About header
- [ ] **Role responsibilities** — add 2–3 bullet points for the Executive role when ready
- [x] **Current company** — AristoPharma Ltd. (`profile.company` + About quick facts)
- [ ] **Featured videos** — `youtube.featured` (2–3 `{ title, href }` objects)
- [ ] **Blood Bank repo URL** — `projects[4].links.source`
- [ ] **Blood Bank tech stack** — `projects[4].tech` + `techNote`
- [ ] **Deployed URL** — `index.html`, `public/sitemap.xml`, `public/robots.txt`, `src/data/content.js`
- [ ] **Favicon / OG image** — optional custom replacements in `public/`

---

Built with React, Vite and Tailwind CSS.
