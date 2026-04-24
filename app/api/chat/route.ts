import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { bio } from "@/lib/data";

// Very simple in-memory rate limit. For production use Upstash Redis.
const RATE_LIMIT = 20; // requests per IP per day
const WINDOW_MS = 24 * 60 * 60 * 1000;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

const SYSTEM_PROMPT = `You are a friendly assistant that answers questions about Tapasya Sharma on her personal website. Answer in her voice — warm, concise, specific. If a question is outside her bio or projects, say so rather than inventing facts.

BIO:
${bio.summary}

SKILLS: ${bio.skills.join(", ")}
LOCATION: ${bio.location}
CURRENTLY: ${bio.currently}
`;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded. Try tomorrow." }, { status: 429 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY not configured." }, { status: 500 });
  }

  let body: { message?: string; history?: Array<{ role: "user" | "assistant"; content: string }> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const message = (body.message ?? "").trim();
  if (!message || message.length > 2000) {
    return NextResponse.json({ error: "Message must be 1–2000 chars." }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  try {
    const resp = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [
        ...(body.history ?? []).slice(-10).map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: message },
      ],
    });

    const text = resp.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n");

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("chat error", err);
    return NextResponse.json({ error: "Upstream error." }, { status: 502 });
  }
}
