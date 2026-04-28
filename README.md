# Tapasya Sharma — Portfolio

A single-page developer portfolio with a vision board background, bilingual typing animation, and an AI chat section.

**Live:** *coming soon*

## Stack

- **Next.js 15** (App Router, React Server Components)
- **Framer Motion** for scroll-linked animations and transitions
- **Tailwind CSS** + CSS custom properties for theming
- **Claude AI** (Anthropic SDK) powers the "Ask Me" chat section
- **TypeScript** throughout

## Features

- **Vision board background** — tiled images from `public/vision-board/` with a torn-paper clip-path effect
- **Bilingual name animation** — types out in English (Bebas Neue) and Hindi (Noto Sans Devanagari), cycling between the two
- **Single-page scroll** — Hero + About, Skills, Timeline, Projects, and Chat all live on one page with a sticky footer nav
- **Scroll progress bar** — gradient bar at the bottom tracks page position
- **AI chat** — ask questions and get responses powered by Claude, with rate limiting

## Quick start

```bash
git clone https://github.com/tapasya27/virtualPortfolio.git
cd virtualPortfolio
npm install
```

Create `.env.local`:

```
ANTHROPIC_API_KEY=your_key_here
```

```bash
npm run dev
# → http://localhost:3000
```

## Project structure

```
app/
  page.tsx              # Single-page entry — all sections rendered here
  layout.tsx            # Root layout with VisionBoard, ScrollProgressBar, Nav
  globals.css           # Theme variables, animations, torn-paper clip-path
  api/chat/route.ts     # Claude AI chat endpoint with rate limiting
  api/vision-board/     # Dynamic image discovery (optional, not used in prod)
components/
  sections/             # HeroAboutSection, SkillsSection, TimelineSection,
                        #   ProjectsSection, ChatSection
  ui/                   # ScrollProgressBar, VisionBoard, Nav, Footer, Cursor
data/portfolio.ts       # All editable content: skills, timeline, projects, socials
public/vision-board/    # Drop images here — they tile as the background
```

## Customisation

**Content** — edit `data/portfolio.ts` to change skills, work history, projects, and social links.

**Name** — in `components/sections/HeroAboutSection.tsx`, update `EN_NAME` and `HI_NAME`.

**Vision board** — add or remove `.jpg` / `.png` / `.webp` files in `public/vision-board/` and update the `IMAGE_FILES` array in `components/ui/VisionBoard.tsx`.

**Chat persona** — edit the `SYSTEM_PROMPT` in `app/api/chat/route.ts` with your own bio.

**Theme colours** — all defined as CSS variables in `app/globals.css` (`:root` block). Primary accent is golden amber (`#e6a817`).

## Deploy

1. Push to GitHub
2. Import the repo on [Vercel](https://vercel.com)
3. Add `ANTHROPIC_API_KEY` in Vercel → Settings → Environment Variables
4. Deploy

## License

MIT
