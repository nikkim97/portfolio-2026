"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, FONT, GLASS } from "./ui";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || streaming) return;

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setStreaming(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: next }),
    });

    if (!res.body) { setStreaming(false); return; }

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: updated[updated.length - 1].content + chunk,
        };
        return updated;
      });
    }

    setStreaming(false);
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed bottom-20 right-5 z-50 flex flex-col"
            style={{
              width: "min(380px, calc(100vw - 24px))",
              height: 480,
              borderRadius: 20,
              overflow: "hidden",
              ...GLASS,
              background: "rgba(245,241,235,0.96)",
              ...FONT,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-3.5 border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex flex-col gap-0.5">
                <p className="text-[11px] font-normal tracking-[0.18em] uppercase" style={{ color: "var(--foreground)" }}>
                  Ask Nikki
                </p>
                <p className="text-[10px] font-light" style={{ color: "var(--midtone)" }}>
                  Powered by Claude
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[18px] leading-none transition-opacity duration-150 hover:opacity-50"
                style={{ color: "var(--midtone)" }}
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
              {messages.length === 0 && (
                <p
                  className="font-light leading-relaxed text-[13px] mt-2"
                  style={{ color: "var(--midtone)" }}
                >
                  Hey, ask me anything about my work, process, or what I'm building next.
                </p>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="font-light leading-relaxed text-[13px]"
                    style={{
                      maxWidth: "84%",
                      color: m.role === "user" ? "var(--background)" : "var(--foreground)",
                      background: m.role === "user" ? "var(--foreground)" : "transparent",
                      borderRadius: m.role === "user" ? 14 : 0,
                      padding: m.role === "user" ? "8px 13px" : "0",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {m.content}
                    {streaming && i === messages.length - 1 && m.role === "assistant" && (
                      <span
                        className="inline-block w-1.5 h-3.5 ml-0.5 align-middle"
                        style={{
                          background: "var(--accent)",
                          borderRadius: 2,
                          animation: "blink 1s step-start infinite",
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="px-4 py-3 border-t flex items-end gap-2"
              style={{ borderColor: "var(--border)" }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message…"
                rows={1}
                className="flex-1 resize-none bg-transparent outline-none font-light text-[13px] leading-relaxed placeholder:opacity-40"
                style={{
                  color: "var(--foreground)",
                  fontFamily: "var(--font-poppins), sans-serif",
                  maxHeight: 96,
                  overflowY: "auto",
                }}
                onInput={(e) => {
                  const t = e.currentTarget;
                  t.style.height = "auto";
                  t.style.height = t.scrollHeight + "px";
                }}
              />
              <button
                onClick={send}
                disabled={!input.trim() || streaming}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
                style={{
                  background: input.trim() && !streaming ? "var(--foreground)" : "var(--border)",
                  color: "var(--background)",
                }}
                aria-label="Send"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating circle trigger */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-50 flex items-center justify-center rounded-full shadow-lg"
        style={{
          width: 48,
          height: 48,
          background: "var(--foreground)",
          color: "var(--background)",
          ...FONT,
        }}
        aria-label={open ? "Close chat" : "Chat with Nikki"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.18 }}
              style={{ fontSize: 20, lineHeight: 1 }}
            >
              ×
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.18 }}
              style={{ fontSize: 16, lineHeight: 1 }}
            >
              ✦
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </>
  );
}
