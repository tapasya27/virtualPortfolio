# VirtualPortfolio

Modern personal portfolio built with **Next.js 15**, **Framer Motion**, **Tailwind CSS**, and **Claude AI**.

## Getting started

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Adding your photo

1. Drop your photo into `public/photo.jpg`
2. Open `components/sections/HeroAboutSection.tsx`
3. Find the comment `{/* Replace this div with: */}` and swap the placeholder div with:
   ```tsx
   <img src="/photo.jpg" alt="Your Name" className="w-full h-full object-cover" />
   ```

## Personalising content

All editable content lives in **`data/portfolio.ts`**:
- `SKILLS` — skill names, levels, categories
- `TIMELINE` — work history and education
- `PROJECTS` — project cards
- `SOCIAL` — GitHub, LinkedIn, email links

In `components/sections/HeroAboutSection.tsx`:
- Replace `"Your Name"` / `"आपका नाम"` with your name in English and Hindi
- The `RING_CHARS_EN` and `RING_CHARS_HI` constants control the rotating ring text

In `components/sections/ProjectsSection.tsx`:
- Set `GITHUB_USERNAME` to your real GitHub handle for the live stats

In `app/api/chat/route.ts`:
- Fill in the `SYSTEM_PROMPT` with your real bio, projects, and experience

## Environment variables

Create `.env.local` (already gitignored):
```
ANTHROPIC_API_KEY=your_key_here
```

## Deploy

```bash
# Push to GitHub, then:
# 1. vercel.com → Add New Project → import repo
# 2. Add ANTHROPIC_API_KEY in Vercel Environment Variables
# 3. Deploy
```

## Branch

Current changes are on branch: `taps/web-viz-upgrade`
