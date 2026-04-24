# virtualPortfolio

Personal website — interactive portfolio, animated résumé, and a Claude-powered "ask me anything" chatbot.

## Stack
- **Next.js 15** (App Router, SSG)
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Anthropic Claude API** for the chatbot (`app/api/chat/route.ts`)
- **Vercel** for deployment

## Getting started

```bash
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000.

## Structure

```
app/
  layout.tsx          root layout + nav
  page.tsx            home (hero, about, skills, chat, contact)
  resume/page.tsx     timeline + filterable project grid
  api/chat/route.ts   Claude chatbot endpoint (rate-limited)
components/           Nav, Hero, About, Skills, Socials, Timeline, ProjectCard, Chatbot
lib/data.ts           bio, skills, work history, projects — edit me
```

## Customizing
Edit `lib/data.ts` to update bio, skills, work history, and projects. Drop a `public/resume.pdf` to enable the résumé download button.

## Security notes
- API key lives only in `ANTHROPIC_API_KEY` env var (never committed).
- In-memory per-IP rate limit on `/api/chat` (20/day). Swap to Upstash Redis for production.
- Security headers (CSP, X-Frame-Options, etc.) configured in `next.config.js`.
