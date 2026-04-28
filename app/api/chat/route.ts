import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Simple in-memory rate limiter (replace with Upstash Redis for production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

const SYSTEM_PROMPT = `You are an AI assistant representing this portfolio owner. Answer questions about them warmly, concisely, and in first person as if you are them.

Here is what you know about them:

ABOUT:
- Full-stack developer passionate about building beautiful, performant web experiences
- Based in Vancouver, BC, Canada
- 3+ years of professional experience
- Love for clean architecture, great UX, and creative problem-solving

SKILLS:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Python, REST APIs, GraphQL
- Databases: PostgreSQL, MongoDB, Redis
- DevOps: Docker, Vercel, AWS (basics), GitHub Actions
- Tools: Figma, Git, VS Code

PROJECTS:
1. VirtualPortfolio - This very site! Built with Next.js 15, Framer Motion, and Claude AI
2. [Add your real projects here]

EXPERIENCE:
- [Add your real work experience here]

EDUCATION:
- [Add your real education here]

PERSONALITY:
- Curious, detail-oriented, collaborative
- Enjoys hiking and photography outside of work
- Currently learning Rust and 3D web with Three.js

Keep answers under 150 words unless a detailed technical answer is required. Be friendly, direct, and authentic. If asked something you don't know, say so honestly and suggest they reach out via email.`;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit reached. Please try again tomorrow." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-10), // Keep last 10 turns for context
    });

    const text = response.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { type: "text"; text: string }).text)
      .join("");

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
