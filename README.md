# alya — AI Language Learning App

Website for [alyacompanion.xyz](https://www.alyacompanion.xyz) — learn a language by texting an AI friend.

## Stack

- **Next.js 16** (App Router, full SSG)
- **React 19** + TypeScript
- **TailwindCSS 3.4** + Framer Motion
- **Bun** for package management

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server |
| `bun build` | Production build |
| `bun start` | Serve production build |
| `bun lint` | Run ESLint |

## Project Structure

```
src/
├── app/                  # Next.js App Router routes
│   ├── layout.tsx        # Root layout (font, global metadata)
│   ├── page.tsx          # Homepage
│   ├── sitemap.ts        # Auto-generated /sitemap.xml
│   ├── not-found.tsx     # 404 page
│   ├── loading.tsx       # Loading state
│   ├── error.tsx         # Error boundary
│   ├── blog/             # Blog index + [slug] dynamic route
│   ├── learn-*/          # Language landing pages (10 languages)
│   └── vs/               # Competitor comparison pages (5 pages)
├── components/           # Shared UI components ('use client' where needed)
├── views/                # Client page components (used by app/ routes)
├── blog/
│   └── posts.ts          # Blog post registry
└── constants.ts          # APP_STORE_URL, BASE_URL, NAV_LINKS, etc.
public/
├── og/                   # Open Graph images
├── logo/                 # App icon
├── docs/                 # Markdown content (privacy, terms, support)
└── robots.txt
```

## Adding Content

**New language page:** create `src/app/learn-[language]/page.tsx` with `export const metadata` and `<LanguagePage>` props. Routing and sitemap update automatically.

**New comparison page:** create `src/app/vs/[competitor]/page.tsx` with `export const metadata` and `<ComparisonPage>` props.

**New blog post:** add an entry to `src/blog/posts.ts`. The blog index and post page render automatically.

## Deployment

Deployed on Vercel via GitHub. Push to `main` → auto-deploy.
