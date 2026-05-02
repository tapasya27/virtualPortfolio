"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What technologies do you specialize in?",
  "Tell me about your most interesting project",
  "Are you open to new opportunities?",
  "What's your experience with Next.js?",
];

export function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setError("");
    const userMsg: Message = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed");
      setMessages([...next, { role: "assistant", content: data.message }]);
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  }

  return (
    <section data-section="Chat" className="py-14 md:py-28 px-4 md:px-12 min-h-screen" style={{ background: "var(--bg)" }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-6 md:mb-12 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
            style={{ background: "var(--teal-dim)", borderColor: "rgba(0,200,150,0.3)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={14} style={{ color: "var(--teal)" }} />
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--teal)", letterSpacing: "0.12em" }}>
              AI Powered
            </span>
          </motion.div>
          <motion.h1
            className="font-display mb-4"
            style={{ fontSize: "clamp(36px, 5vw, 60px)", color: "var(--text)", fontWeight: 400 }}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          >
            Ask Me{" "}<span className="italic" style={{ color: "var(--accent)" }}>Anything</span>
          </motion.h1>
          <motion.p
            className="font-body" style={{ color: "var(--text-2)", maxWidth: "480px", margin: "0 auto" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          >
            An AI trained on my bio, projects, and experience. Ask me about my work, skills, or availability.
          </motion.p>
        </div>

        {/* Chat window */}
        <motion.div
          className="rounded-sm border overflow-hidden"
          style={{ background: "var(--bg-2)", borderColor: "var(--border-2)" }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        >
          {/* Messages */}
          <div className="h-64 md:h-96 overflow-y-auto p-4 md:p-6 flex flex-col gap-4">
            {messages.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center border"
                  style={{ background: "var(--bg-4)", borderColor: "var(--border-2)" }}
                >
                  <Bot size={22} style={{ color: "var(--accent)" }} />
                </div>
                <p className="font-body text-sm" style={{ color: "var(--text-3)" }}>
                  Start a conversation — I'll answer as myself.
                </p>
              </div>
            )}

            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border"
                    style={{
                      background:   m.role === "assistant" ? "var(--bg-4)" : "var(--accent)",
                      borderColor:  m.role === "assistant" ? "var(--border-2)" : "var(--accent-3)",
                    }}
                  >
                    {m.role === "assistant"
                      ? <Bot  size={14} style={{ color: "var(--accent)" }} />
                      : <User size={14} style={{ color: "var(--bg)" }} />
                    }
                  </div>
                  <div
                    className="px-4 py-3 rounded-sm max-w-[85%] md:max-w-md font-body text-sm"
                    style={{
                      background:  m.role === "assistant" ? "var(--bg-3)" : "var(--bg-4)",
                      color:       "var(--text-2)",
                      lineHeight:  1.75,
                      borderRadius: "6px",
                      border:      `1px solid ${m.role === "assistant" ? "var(--border)" : "var(--border-2)"}`,
                    }}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div className="flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center border" style={{ background: "var(--bg-4)", borderColor: "var(--border-2)" }}>
                  <Bot size={14} style={{ color: "var(--accent)" }} />
                </div>
                <div className="px-4 py-3 rounded-sm flex items-center gap-1" style={{ background: "var(--bg-3)", border: "1px solid var(--border)" }}>
                  {[0, 1, 2].map((d) => (
                    <motion.div
                      key={d}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--accent)" }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: d * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {error && (
              <p className="font-mono text-xs text-center" style={{ color: "var(--crimson)" }}>{error}</p>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Suggestion chips */}
          {messages.length === 0 && (
            <div className="px-6 pb-4 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="font-mono text-xs px-3 py-1.5 rounded-sm border transition-all duration-200"
                  style={{ borderColor: "var(--border)", color: "var(--text-3)", background: "transparent", letterSpacing: "0.04em" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t flex gap-3 items-end" style={{ borderColor: "var(--border)" }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask something…"
              rows={1}
              className="flex-1 resize-none font-body text-sm bg-transparent outline-none"
              style={{ color: "var(--text)", minHeight: "40px", maxHeight: "120px" }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 transition-all duration-200"
              style={{
                background:  input.trim() ? "var(--accent)" : "var(--bg-4)",
                color:       input.trim() ? "var(--bg)"    : "var(--text-3)",
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
