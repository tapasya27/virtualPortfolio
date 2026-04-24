"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Msg = { role: "user" | "assistant"; content: string };

export function Chatbot() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: text, history: messages }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed");
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-5 max-w-2xl">
      <div className="flex flex-col gap-3 min-h-[180px] max-h-[420px] overflow-y-auto mb-4">
        <AnimatePresence initial={false}>
          {messages.length === 0 && (
            <p className="text-sm text-muted italic">
              Try: "What are you working on lately?" or "What's your favorite project?"
            </p>
          )}
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                m.role === "user"
                  ? "self-end bg-accent text-white"
                  : "self-start bg-card border border-border"
              }`}
            >
              {m.content}
            </motion.div>
          ))}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="self-start text-xs text-muted"
            >
              thinking…
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything…"
          className="flex-1 rounded-full border border-border bg-bg px-4 py-2 text-sm outline-none focus:border-accent"
          maxLength={2000}
        />
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          Send
        </motion.button>
      </form>
    </div>
  );
}
