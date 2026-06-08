# alya — AI Language Learning App

Website for [alyacompanion.xyz](https://www.alyacompanion.xyz) — learn a language by texting an AI friend.

## Stack

- **Astro 5** (fully static, SSG)
- **React 19** + TypeScript
- **TailwindCSS 3.4** + Framer Motion

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:4321](http://localhost:4321).

## Commands

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server |
| `bun build` | Production build |
| `bun preview` | Preview production build |

## Project Structure

```
src/
├── layouts/
│   └── Layout.astro          # Root layout
├── pages/                    # File-based routing
│   ├── index.astro           # Homepage
│   ├── features.astro        # Features page
│   ├── pricing.astro         # Pricing page
│   ├── privacy.astro         # Privacy policy
│   ├── terms.astro           # Terms of service
│   ├── support.astro         # Support page
│   ├── 404.astro             # 404 page
│   ├── sitemap.xml.ts        # Auto-generated /sitemap.xml
│   ├── blog/                 # Blog index + [slug] dynamic route
│   ├── learn-spanish.astro   # Spanish landing page
│   └── vs/                   # Competitor comparison pages (5 pages)
├── components/               # Shared UI components (React)
├── views/                    # React page views (used by pages/)
├── blog/
│   └── posts.ts              # Blog post registry
├── styles/
│   └── globals.css
└── constants.ts              # APP_STORE_URL, BASE_URL, NAV_LINKS, etc.
public/
├── og/                       # Open Graph images
├── logo/                     # App icon
├── videos/                   # Video assets
├── docs/                     # Markdown content (privacy, terms, support)
├── llms.txt
└── robots.txt
```

## Adding Content

**New language page:** create `src/pages/learn-[language].astro` using the existing `learn-spanish.astro` as a template.

**New comparison page:** create `src/pages/vs/[competitor].astro` using an existing vs page as a template.

**New blog post:** add an entry to `src/blog/posts.ts`. The blog index and post page render automatically.

## Deployment

Deployed on Cloudflare Pages via GitHub. Push to `main` → auto-deploy.
