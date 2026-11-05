# Mostafijur Rahman — Portfolio

A fast, dark-first portfolio and Markdown blog for **Mostafijur Rahman**, Software Engineer (Dhaka, Bangladesh).
Portfolio copy lives in structured JSON under `src/content/`; blog notes are plain Markdown files.
Both can be edited from the built-in CMS at `/admin/`.

> **Stack:** React 18 + Vite 6 + Tailwind CSS 3 + CSS-only motion.
> No UI kit, no animation runtime, no icon font, no analytics. The public site ships no
> third-party scripts; only the `/admin/` page loads Sveltia CMS from a CDN.

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

There are two ways to edit the site:

- **Admin panel (recommended):** `/admin/` — forms, media library and a Markdown editor.
- **In the repository:** edit the JSON files in `src/content/` and the Markdown files in
  `src/content/blog/posts/`.

The React app reads those files through `src/data/content.js`, which re-exports them under the
names the components already use. Keep the JSON keys unchanged; the CMS schema in
`public/admin/config.yml` mirrors them.

| File | Controls |
| --- | --- |
| `src/content/site.json` | Canonical site URL used by blog share metadata |
| `src/content/profile.json` | Name, role, location, tagline, photo, résumé, typing phrases |
| `src/content/socials.json` | Social links and their icons |
| `src/content/about.json` | Story, experience, education, location, quick facts |
| `src/content/skills.json` | Categories, icons, tier (`core` / `working` / `exploring`) |
| `src/content/credentials.json` | Certifications and professional training groups |
| `src/content/projects.json` | `section` copy plus the `items` case-study cards |
| `src/content/github.json` | Username and copy for the live API section |
| `src/content/youtube.json` | Channel link, topics, featured video slots |
| `src/content/contact.json` | Email, Formspree endpoint, messages |
| `src/content/blog.json` | Blog heading, intro, empty state and 404 copy |
| `src/content/footer.json` | Built-with line and back-to-top label |
| `src/data/content.js` | Structural navigation (`navLinks`) and project filters |

### Admin panel

The CMS is [Sveltia CMS](https://sveltiacms.app/). It is a static page in `public/admin/`; it reads
`config.yml` and talks directly to the GitHub API. No database or server is involved: saving creates
a commit, and the normal Pages workflow publishes it.

1. Open **https://mostafijhemal.github.io/portfolio/admin/**.
2. Choose **Sign In Using Access Token**.
3. Create a token on GitHub:
   - **Fine-grained token** → Resource owner `mostafijhemal`, repository access only
     `portfolio`, permission **Contents: Read and write**.
   - Or a **classic token** with the `repo` scope.
4. Paste the token and sign in. Edit a section or post, then save. Sveltia commits to `main`, and
   the Pages workflow rebuilds the public site (usually about a minute).

The token is stored in the browser's local storage, not in this repository. Use a private device,
set an expiry date when you create it, and revoke it from GitHub if it is ever exposed.

**Optional one-click login:** if you later want GitHub sign-in instead of pasting a token, deploy
[Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth) to a free Cloudflare
Worker, then add its URL as `backend.base_url` and `oauth` to `backend.auth_methods`. Token login
can stay enabled as a fallback.

Uploads from the CMS go to `public/uploads/` and are referenced as `/portfolio/uploads/...`.
`src/lib/assetUrl.js` converts those paths for local development and for the GitHub Pages subpath.

### Add real screenshots

Each project card renders a designed placeholder with `visualNote: '[ADD: screenshot]'`.
To use a real image:

1. Put the image in `public/projects/` (e.g. `public/projects/iptv.png`) or upload it in the CMS.
2. Add `"image": "./projects/iptv.png"` to that project object in `src/content/projects.json`.
3. Update `ProjectCard.jsx` to render an `<img>` when `project.image` exists. Import
   `assetUrl` from `../lib/assetUrl` so CMS uploads work in both local preview and production:

```jsx
{project.image ? (
  <img
    src={assetUrl(project.image)}
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

Use the CMS image field on a credential, or put the image in `public/certificates/` (for example
`public/certificates/gemini-educator.png`) and add `"image": "./certificates/gemini-educator.png"`
to that item in `credentials.groups[...].items` inside `src/content/credentials.json`. The card
then shows a “View certificate” link. Keep scans under ~400 KB; the current set is resized to
1800 px and saved as JPEG.

### Change the profile photo

The About portrait is `public/profile.jpg` (square, 460×460). Replace that file, or change
`profile.photo.src` in `src/content/profile.json` — or use the image field in the CMS, which
uploads a new file to `public/uploads/`.

### Contact form

The form is connected to Formspree and sends submissions to `mostafij.hemal@gmail.com`.

```json
"formEndpoint": "https://formspree.io/f/xdeewjrq",
```

To use a different Formspree form, replace `formEndpoint` in `src/content/contact.json`.
If the endpoint is removed, the form falls back to opening the visitor's email app via
`contact.email`; if both are `null`, it shows a setup notice instead of pretending to send.

### Write a blog post

The blog stays file-based — the CMS is a form over the same Markdown files. Each note is one file:

```
src/content/blog/posts/my-note.md  →  #/blog/my-note
```

**From the admin panel:** open `/admin/` → **Blog posts** → **New Post**, write, then set
**Draft** off and save. The commit rebuilds the live site automatically.

**In the repository:** copy `src/content/blog/_template.md` to a new file in `posts/`, fill in
`title`, `date` (`YYYY-MM-DD`), optional `excerpt` and `tags`, and set `draft: false`.
Run `npm run dev` to preview, or push to publish.

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

### Vercel (optional, zero config)

1. Push the project to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) → import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. Add your custom domain if you have one.
5. If you use a different domain, update the canonical/OG URLs in `index.html`, `public/sitemap.xml`, `public/robots.txt` and `src/content/site.json` (currently `https://mostafijhemal.github.io/portfolio/`). Also update `public_folder` in `public/admin/config.yml` if the site is no longer served from `/portfolio/`.

### GitHub Pages (included workflow)

1. Push to a GitHub repository with the default branch named `main`.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**. This one-time step
   cannot be automated by the workflow — the Actions token is not allowed to create the Pages site.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes `dist/` on every push.
4. The site is available at `https://mostafijhemal.github.io/portfolio/`.
   `vite.config.js` uses `base: './'`, so project-site subpaths work without changes.
5. The CMS is at `https://mostafijhemal.github.io/portfolio/admin/` (see **Admin panel** above).

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
│   ├── admin/
│   │   ├── config.yml        # Sveltia CMS schema
│   │   └── index.html        # CMS shell
│   ├── certificates/
│   ├── uploads/              # new CMS uploads land here
│   ├── apple-touch-icon.png
│   ├── favicon.svg
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── manifest.webmanifest
│   ├── og-image.png
│   ├── profile.jpg
│   ├── resume.pdf
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   ├── generate-assets.py
│   └── validate-cms.mjs      # checks JSON keys against the CMS schema
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
│   │   ├── Credentials.jsx
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
│   ├── content/
│   │   ├── about.json
│   │   ├── blog.json
│   │   ├── contact.json
│   │   ├── credentials.json
│   │   ├── footer.json
│   │   ├── github.json
│   │   ├── profile.json
│   │   ├── projects.json
│   │   ├── site.json
│   │   ├── skills.json
│   │   ├── socials.json
│   │   ├── youtube.json
│   │   └── blog/
│   │       ├── _template.md
│   │       ├── README.md
│   │       └── posts/
│   ├── data/content.js      # imports JSON, exports nav/filter constants
│   ├── hooks/
│   │   ├── useActiveSection.js
│   │   ├── useGitHub.js
│   │   ├── useHashRoute.js
│   │   ├── usePageMeta.js
│   │   ├── usePrefersReducedMotion.js
│   │   ├── useTheme.js
│   │   ├── useTilt.js
│   │   └── useTypewriter.js
│   ├── lib/
│   │   ├── assetUrl.js
│   │   └── blog.js
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

- [x] **Email** — set to `mostafij.hemal@gmail.com` in `src/content/contact.json`
- [x] **Formspree endpoint** — connected at `contact.formEndpoint`
- [x] **CMS admin** — Sveltia CMS at `/admin/`, with content JSON + Markdown collections
- [ ] **Screenshots** — `public/projects/*` + `image` fields on projects
- [ ] **Résumé** — replace `public/resume.pdf`
- [x] **Universities & years** — Eastern University (B.Sc., 2019) and Jahangirnagar University (M.Sc., 2026) in `about.education`
- [x] **Work experience** — Executive, AristoPharma Ltd., Feb 2023 – Present; Software Support Engineer, Living Support, Feb–Dec 2022 (`about.experience`)
- [x] **Freelance availability** — `profile.availability` and `contact.freelance`
- [x] **Published notes** — two sourced AI news posts in `src/content/blog/posts/`
- [x] **Certifications & training** — `credentials` in `src/content/credentials.json`
- [x] **Certificate scans** — optimized images in `public/certificates/`, linked from each credential
- [x] **Profile photo** — `public/profile.jpg`, shown in the About header
- [ ] **Role responsibilities** — add 2–3 bullet points for the Executive role when ready
- [x] **Current company** — AristoPharma Ltd. (`about.experience` + About quick facts)
- [ ] **Featured videos** — `youtube.featured` (2–3 `{ title, href }` objects)
- [ ] **Blood Bank repo URL** — `projects.items[4].links.source`
- [ ] **Blood Bank tech stack** — `projects.items[4].tech` + `techNote`
- [x] **Deployed URL** — `index.html`, `public/sitemap.xml`, `public/robots.txt`, `src/content/site.json`
- [ ] **Favicon / OG image** — optional custom replacements in `public/`

---

Built with React, Vite and Tailwind CSS.
