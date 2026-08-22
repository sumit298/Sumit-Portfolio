# Sumit Sinha — Portfolio

Editorial, band-based portfolio built with React 19, Vite, Tailwind v4, three.js and framer-motion.
All copy lives in one JSON file and is editable from a built-in studio at `/admin`.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
npm run lint
```

## Content — the CMS

Everything on the page comes from `src/content/portfolio.json`. Nothing is hardcoded in components.

**Editing:** open `/admin` (the Content Studio). Tabs for Profile, Social, Experience, Projects, Stack,
Education, Contact, plus a raw JSON editor. Items can be added, reordered and deleted.

**Where Save writes, depending on where you are:**

| Context | Save target | Permanence |
| --- | --- | --- |
| `npm run dev` | `src/content/portfolio.json` on disk, via a dev-only Vite middleware | permanent once committed |
| deployed build | `localStorage` draft in that one browser | preview only — use **Export** and commit the file |

Import/Export move the whole document as a `.json` file, so an edit made on the deployed site can be
exported and dropped back into the repo.

**Pointing at a hosted CMS instead:** set `VITE_CONTENT_URL` to any endpoint that serves this JSON
shape (Sanity, Strapi, Supabase, a gist — anything). The app fetches it first and falls back to the
bundled file if the request fails. `src/lib/content.jsx` holds that resolution order:

1. `VITE_CONTENT_URL`
2. dev content API (`/__content`)
3. `localStorage` draft
4. the JSON bundled at build time

## Design system

Two complementary accents, ~183° apart, defined in `src/styles/globals.css`:

- violet `#5b2eff`
- chartreuse `#c8f135`

Sections alternate between a paper ground and a slate ground. Adding `band-ink` to a section flips
every design token (`--fg`, `--hair`, `--accent`, `--accent-2`), so components need no per-band
variants — the accents swap roles automatically so whichever one is readable on that ground leads.

Type: **Anton** for display, **JetBrains Mono** for everything else.

## three.js

`src/components/three/` renders a drifting 3D node network behind the hero — nodes link up when they
come within range, and the group parallaxes with the pointer. It is lazy-loaded, skipped entirely
when WebGL is unavailable or `prefers-reduced-motion` is set, and thinned out on low-power devices.

## Layout

```
src/
  content/portfolio.json    single source of truth
  lib/content.jsx           provider + save/resolve logic
  lib/contentContext.js     context + useContent()
  admin/                    Content Studio
  components/
    three/                  Constellation, HeroField
    sections/               Hero, Ticker, About, Experience, Stack, Work, Contact
    ui/                     Reveal, SectionHead, Icon
vite-plugin-content.js      dev-only JSON read/write API
```

## Deploy

`vercel.json` rewrites all routes to `index.html` so `/admin` resolves on a hard refresh.
