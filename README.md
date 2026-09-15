# alya — learn spanish. by doomscrolling.

Website for [alyacompanion.xyz](https://www.alyacompanion.xyz) — a Spanish immersion feed. Scroll short real-world videos, tap what you don't know, grow your companion.

## Stack

- **Astro 6** + Cloudflare adapter
- **React 19** + TypeScript
- **TailwindCSS 4** + Framer Motion

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
| `bun preview` | Preview production build (`build && wrangler dev`) |
| `bun run deploy` | Deploy (`build && wrangler deploy`) |

## Project Structure

```
src/
├── layouts/
│   └── Layout.astro          # Root layout + SEO
├── pages/                    # File-based routing
│   ├── index.astro           # Homepage (immersion feed)
│   ├── features.astro        # Features page
│   ├── pricing.astro         # Pricing (Free / ALYA Plus)
│   ├── faq.astro             # FAQ
│   ├── privacy.astro         # Privacy policy
│   ├── terms.astro           # Terms of service
│   ├── support.astro         # Support page
│   ├── 404.astro             # 404 page
│   ├── sitemap.xml.ts        # Auto-generated /sitemap.xml
│   ├── blog/                 # Blog index + [slug] dynamic route
│   ├── learn-spanish.astro   # Spanish landing page
│   ├── topics.astro          # 20 feed topics hub
│   └── vs/                   # Competitor comparison pages (7 pages)
├── components/               # Shared UI components (React)
├── views/                    # React page views (used by pages/)
├── blog/
│   └── posts.ts              # Blog post registry
├── data/
│   └── languages.ts          # FEED_TOPICS (20 feed topics)
├── styles/
│   └── globals.css
└── constants.ts              # APP_STORE_URL, BASE_URL, NAV_LINKS, etc.
public/
├── og/                       # Open Graph images
├── logo/                     # App icon + favicons
├── videos/                   # alya-background.mp4 + poster
├── docs/                     # Markdown content (privacy, terms, support)
├── .well-known/              # Apple app-site-association (Universal Links)
├── llms.txt
└── robots.txt
```

## Product (feat/video-processing)

- **Feed:** vertical Spanish immersion feed (TikTok-style). 20 clips on open, refill at ~10 remaining. YouTube playback + pre-processed learning layer (transcript, translation, word glosses).
- **Learning:** tap-to-translate, per-word glosses, tap-to-hear (Deepgram Aura-2 `selena-es`), 0.75–1.5x playback, save vocabulary, contextual prompts.
- **Companion:** stars + energy / bond / curiosity meters, rooms, outfits, streaks, achievements.
- **Levels:** beginner / intermediate / advanced. **Topics:** 20 feed topics. **Explore filters:** levels, grammar, sources, shorts vs videos.
- **Onboarding:** goals, level, challenges, minutes (5–30), reminders, personalized plan.
- **Subscription:** Free + ALYA Plus (Annual / Monthly via RevenueCat, 7-day free trial when eligible). Plus = Unlimited Immersion, Advanced Explanations, Unlimited Vocabulary, Customization. iOS-only subscriptions.

## Adding Content

**New comparison page:** create `src/pages/vs/[competitor].astro` using an existing vs page as a template.

**New blog post:** add an entry to `src/blog/posts.ts`. The blog index and post page render automatically.

## Deployment

Deployed on Cloudflare via GitHub. Push to `main` → auto-deploy.
