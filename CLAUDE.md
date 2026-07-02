@AGENTS.md

# joel-site — Joel Castro's personal website & portfolio

Personal hub/portfolio for Joel Castro (mobile app developer, Flutter/FlutterFlow + AI).
Live at **https://joelcastro.life**. Next.js 16 (App Router) + Tailwind v4 + TypeScript.

## The one thing to understand first: content is data-driven

You almost never write JSX to change what the site *says*. Two files hold all the content:

- **`lib/site.ts`** — identity: name, tagline, subtitle, `about` paragraphs, `email`, and social `links` (github/upwork/linkedin/x). Empty link strings are filtered out and simply don't render (this is how we avoid broken links — don't put placeholder URLs).
- **`lib/projects.ts`** — the project list (`Project[]`). This drives the homepage, the archive, and the case-study pages.

### How projects render
- `featured: true` → shows as a card on the homepage (**keep this to 3–6** — it's a curation decision backed by UX research; the rest belong in the archive).
- Every project → appears in `/archive` (a client-side tag-filtered list).
- A project with a `caseStudy` object → gets a full page at `/projects/<slug>`, statically generated via `generateStaticParams`.

### Common tasks
- **Add a project:** append an object to `projects` in `lib/projects.ts`. Required: `slug`, `title`, `tagline`, `type`, `year`, `tech`. Optional: `featured`, `status` (`shipped`/`wip`/`experiment`), `client`, `image`, `links`, `caseStudy`.
- **Add a case study:** add a `caseStudy: { problem, build: string[], results? }` to that project. Omit `results` (don't leave a placeholder) if there's no real outcome — the section just won't render. **Do not invent metrics.**
- **Add a screenshot:** drop the image in `public/projects/` and set `image: "/projects/<file>.png"` on the project (there are commented `// image:` lines ready to uncomment). A clean placeholder shows when `image` is unset.
- **Change name/tagline/links:** edit `lib/site.ts`.

Helpers exported from `lib/projects.ts`: `featuredProjects`, `projectsWithCaseStudies`, `getProject(slug)`, `projectTypes`.

## Structure
```
app/
  layout.tsx              # metadata + no-flash theme <script>
  page.tsx                # homepage: hero → featured → about
  globals.css            # theme tokens (see Theming below)
  archive/page.tsx        # server page → renders ArchiveList
  archive/ArchiveList.tsx # "use client" — tag filter chips
  projects/[slug]/page.tsx# case-study page (async params!)
  components/
    Nav.tsx, Footer.tsx, ProjectCard.tsx
    ThemeToggle.tsx       # "use client"
lib/
  site.ts, projects.ts
```

## Theming (dark-first with manual toggle)
- Theme is controlled by `data-theme="light|dark"` on `<html>`. CSS tokens live in `app/globals.css`: `:root` = dark default, `:root[data-theme="light"]` = light, and a `prefers-color-scheme` block for first-visit system preference when the user hasn't chosen.
- An inline script in `app/layout.tsx` sets `data-theme` **before paint** (reads `localStorage.theme`, falls back to system) to avoid a flash. `<html>` uses `suppressHydrationWarning` because of this.
- `ThemeToggle.tsx` flips `data-theme` and persists to `localStorage`.
- To recolor the site, edit the CSS variables (single `--accent` is teal `#2dd4bf` / `#0d9488`). Colors are exposed to Tailwind via the `@theme inline` block, e.g. `bg-accent`, `text-muted`, `border-border`.

## Commands
- `npm run dev` — local dev (http://localhost:3000)
- `npm run build` — production build; **run this before pushing** — it runs the type-check and catches errors.
- `npm run lint`

## Deploy & infrastructure
- **Auto-deploy:** pushing to `main` on GitHub (`joelc0193/joelcastro.life`) triggers a Vercel production deploy (~15–25s). No manual deploy step.
- **Vercel:** project `joelcastro-life` under Joel's Hobby team. Domains: `joelcastro.life` (apex, 308-redirects to www) + `www.joelcastro.life` (canonical) + `joelcastro-life.vercel.app`.
- **DNS (GoDaddy):** `A @ → 216.198.79.1`, `CNAME www → 6e1c9d827983dd53.vercel-dns-017.com.` Editing DNS in GoDaddy requires SMS 2FA — Joel must complete it; you can't. Only change DNS with explicit user go-ahead.
- Commit only when asked; end commit messages with the Co-Authored-By trailer used in git history.

## Next.js 16 gotchas (also see AGENTS.md)
- **`params` is a `Promise`** in dynamic routes — `await params` (see `app/projects/[slug]/page.tsx`). Same for `searchParams`.
- Bundled docs for this exact version live in `node_modules/next/dist/docs/` — consult them over training-data assumptions.
- Tailwind is **v4** (CSS-first: `@import "tailwindcss"` + `@theme`, no `tailwind.config.js`).

## Outstanding TODOs (content, not code)
Search `TODO` in `lib/projects.ts`: real project/repo/store links, and screenshots for the featured cards (`public/projects/`). These are the main polish items left.
