import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, ChevronDown, Sparkles } from "lucide-react";

const CHIPS = [
  "Opening hours?",
  "Vegan options 🌿",
  "Best burger?",
  "Parking nearby?",
  "Wait time?",
  "Order online?",
];

function BotText({ text }) {
  return (
    <span>
      {text.split("\n").map((line, li) => (
        <span key={li}>
          {li > 0 && <br />}
          {line.split(/\*\*(.*?)\*\*/g).map((part, pi) =>
            pi % 2 === 1
              ? <strong key={pi} style={{ color: "#A7552F", fontWeight: 700 }}>{part}</strong>
              : part
          )}
        </span>
      ))}
    </span>
  );
}

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 5, padding: "10px 14px", alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "rgba(0,0,0,0.25)", display: "inline-block",
            animation: "chatDot 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Chatbot() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: "assistant",
      content: "Hey! 👋 Welcome to The L.A. Cafe. Ask me about our menu, hours, vegan options, wait times, or parking!",
    },
  ]);
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [unread,  setUnread]  = useState(0);

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setError("");
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const send = useCallback(async (textArg) => {
    const msg = (textArg ?? input).trim();
    if (!msg || loading) return;

    setInput("");
    setError("");

    const userMsg    = { id: Date.now(), role: "user", content: msg };
    const nextMsgs   = [...messages, userMsg];
    setMessages(nextMsgs);
    setLoading(true);

    const history = nextMsgs
      .filter((m) => m.id !== 0)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("http://127.0.0.1:5001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.reply || `Server error ${res.status}`);
      }

      const data  = await res.json();
      const reply = data?.reply || "Sorry, no response. Please try again!";

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: reply },
      ]);
      if (!open) setUnread((n) => n + 1);

    } catch (err) {
      console.error("[Chatbot]", err);
      setError(
        err.message.includes("fetch") || err.message.includes("Failed")
          ? "⚠️ Can't reach server. Make sure `node server.cjs` is running on port 5001."
          : `⚠️ ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, open]);

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  // ── Safe-area-aware bottom offset ─────────────────────────
  // Chatbot sits above the mobile browser chrome + safe area
  const fabBottom   = "calc(1.5rem + env(safe-area-inset-bottom))";
  const windowBottom = "calc(5.5rem + env(safe-area-inset-bottom))";

  return (
    <>
      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes chatDot {
          0%,100% { opacity: 0.3; transform: scale(0.75); }
          50%     { opacity: 1;   transform: scale(1.2); }
        }
        @keyframes chatSpin { to { transform: rotate(360deg); } }
        .chat-fab:hover  { transform: scale(1.1) !important; }
        .chat-fab:active { transform: scale(0.95) !important; }
        .chat-chip:hover {
          color: #111 !important;
          border-color: rgba(167,85,47,0.5) !important;
          background: rgba(255,255,255,0.85) !important;
        }
        .chat-send:hover:not(:disabled) { opacity: 0.85; }
        .chat-msgs { scrollbar-width: none; }
        .chat-msgs::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── Floating button ─────────────────────────────── */}
      <button
        className="chat-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open AI assistant"}
        aria-expanded={open}
        style={{
          position: "fixed",
          bottom: fabBottom,
          right: "max(1.25rem, env(safe-area-inset-right))",
          zIndex: 1000,
          width: 52,
          height: 52,
          borderRadius: "50%",
          // Match the site's brand — black button, amber shadow
          background: "#111111",
          border: "2px solid #A7552F",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 24px rgba(0,0,0,0.2), 0 2px 8px rgba(167,85,47,0.3)",
          transition: "transform 0.2s",
        }}
      >
        {open
          ? <X size={20} color="#ECE7DE" />
          : <MessageCircle size={20} color="#ECE7DE" />
        }
        {!open && unread > 0 && (
          <span style={{
            position: "absolute", top: -5, right: -5,
            minWidth: 20, height: 20, borderRadius: 10,
            background: "#A7552F", color: "#fff",
            fontSize: 10, fontWeight: 700,
            display: "flex", alignItems: "center",
            justifyContent: "center", padding: "0 4px",
          }}>
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {/* ── Chat window ─────────────────────────────────── */}
      {open && (
        <div
          role="dialog"
          aria-label="LA Cafe AI Assistant"
          aria-modal="true"
          style={{
            position: "fixed",
            // Never overlap the FAB, respects safe area
            bottom: windowBottom,
            right: "max(1rem, env(safe-area-inset-right))",
            zIndex: 999,
            // Width: fills almost full screen on mobile, capped at 380px
            width: "min(380px, calc(100vw - 2rem))",
            // Height: fills viewport minus FAB + bottom bar
            maxHeight: "min(560px, calc(100dvh - 9rem - env(safe-area-inset-bottom)))",
            borderRadius: 16,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            // Match brand: cream/paper bg, black border
            background: "#F5F0E8",
            border: "1px solid rgba(0,0,0,0.16)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
            animation: "chatSlideUp 0.28s ease-out",
          }}
        >
          {/* ── Header ────────────────────────────────── */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "12px 14px",
            background: "#111111",
            borderBottom: "1px solid rgba(167,85,47,0.3)",
            flexShrink: 0,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "rgba(167,85,47,0.25)",
              border: "1px solid rgba(167,85,47,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Sparkles size={15} color="#A7552F" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 5,
                color: "#ECE7DE", fontWeight: 700, fontSize: 13,
                fontFamily: "'Roboto', sans-serif",
              }}>
                LA Cafe Assistant
                <Bot size={11} color="rgba(236,231,222,0.45)" />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: loading ? "#F5A623" : "#4ade80",
                  display: "inline-block",
                  animation: "chatDot 2s ease-in-out infinite",
                }} />
                <span style={{
                  color: "rgba(236,231,222,0.5)",
                  fontSize: 10,
                  fontFamily: "'Roboto', sans-serif",
                }}>
                  {loading ? "Typing…" : "Powered by Groq · Llama 3"}
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(236,231,222,0.55)", padding: 6, borderRadius: 6,
                display: "flex", alignItems: "center",
              }}
            >
              <ChevronDown size={17} />
            </button>
          </div>

          {/* ── Messages ──────────────────────────────── */}
          <div
            className="chat-msgs"
            style={{
              flex: 1, overflowY: "auto", padding: "14px 12px",
              display: "flex", flexDirection: "column", gap: 10,
              minHeight: 0,
            }}
          >
            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{
                    maxWidth: "82%",
                    background: "#111111",
                    color: "#ECE7DE",
                    borderRadius: "16px 16px 3px 16px",
                    padding: "9px 13px",
                    fontSize: 13,
                    lineHeight: 1.55,
                    fontFamily: "'Roboto', sans-serif",
                  }}>
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={m.id} style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                    background: "rgba(167,85,47,0.15)",
                    border: "1px solid rgba(167,85,47,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginTop: 2,
                  }}>
                    <Bot size={11} color="#A7552F" />
                  </div>
                  <div style={{
                    maxWidth: "82%",
                    background: "rgba(255,255,255,0.72)",
                    border: "1px solid rgba(0,0,0,0.10)",
                    color: "#111111",
                    borderRadius: "16px 16px 16px 3px",
                    padding: "9px 13px",
                    fontSize: 13,
                    lineHeight: 1.6,
                    fontFamily: "'Roboto', sans-serif",
                  }}>
                    <BotText text={m.content} />
                  </div>
                </div>
              )
            )}

            {/* Typing dots */}
            {loading && (
              <div style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                  background: "rgba(167,85,47,0.15)",
                  border: "1px solid rgba(167,85,47,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginTop: 2,
                }}>
                  <Bot size={11} color="#A7552F" />
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.72)",
                  border: "1px solid rgba(0,0,0,0.10)",
                  borderRadius: "16px 16px 16px 3px",
                }}>
                  <TypingDots />
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{
                fontSize: 12, color: "#b91c1c",
                background: "rgba(220,38,38,0.08)",
                border: "1px solid rgba(220,38,38,0.2)",
                borderRadius: 8, padding: "8px 12px",
                fontFamily: "'Roboto', sans-serif",
              }}>
                {error}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* ── Quick chips ───────────────────────────── */}
          <div style={{
            display: "flex", gap: 6,
            padding: "0 12px 8px",
            overflowX: "auto",
            flexShrink: 0,
            scrollbarWidth: "none",
          }}>
            {CHIPS.map((chip) => (
              <button
                key={chip}
                className="chat-chip"
                onClick={() => send(chip)}
                disabled={loading}
                style={{
                  flexShrink: 0, fontSize: 11, fontWeight: 600,
                  padding: "7px 12px",
                  // min 36px height for touch
                  minHeight: 36,
                  borderRadius: 30,
                  cursor: loading ? "not-allowed" : "pointer",
                  background: "rgba(255,255,255,0.65)",
                  border: "1px solid rgba(0,0,0,0.14)",
                  color: "rgba(17,17,17,0.6)",
                  whiteSpace: "nowrap",
                  opacity: loading ? 0.45 : 1,
                  transition: "all 0.15s",
                  fontFamily: "'Roboto', sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* ── Input row ─────────────────────────────── */}
          <div style={{
            display: "flex", gap: 8,
            padding: "0 12px 12px",
            flexShrink: 0,
            borderTop: "1px solid rgba(0,0,0,0.08)",
            paddingTop: 10,
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
              placeholder="Ask anything about the cafe…"
              maxLength={300}
              aria-label="Chat message"
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(0,0,0,0.14)",
                borderRadius: 10,
                padding: "9px 13px",
                color: "#111111",
                fontSize: 13,
                fontFamily: "'Roboto', sans-serif",
                outline: "none",
                // 44px min tap target
                minHeight: 44,
                opacity: loading ? 0.6 : 1,
              }}
            />
            <button
              className="chat-send"
              onClick={() => send()}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              style={{
                width: 44, height: 44, borderRadius: 10,
                background: "#111111",
                border: "none",
                cursor: !input.trim() || loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                opacity: !input.trim() || loading ? 0.35 : 1,
                transition: "opacity 0.15s",
              }}
            >
              {loading
                ? <div style={{
                    width: 14, height: 14,
                    border: "2px solid #ECE7DE",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "chatSpin 0.7s linear infinite",
                  }} />
                : <Send size={15} color="#ECE7DE" />
              }
            </button>
          </div>

          {/* ── Footer note ───────────────────────────── */}
          <div style={{
            textAlign: "center",
            padding: "0 14px 10px",
            fontSize: 10,
            color: "rgba(17,17,17,0.28)",
            fontFamily: "'Roboto', sans-serif",
            flexShrink: 0,
          }}>
            AI may make mistakes — call{" "}
            <a
              href="tel:+12136123000"
              style={{ color: "rgba(167,85,47,0.6)", textDecoration: "none" }}
            >
              213-612-3000
            </a>{" "}
            to confirm.
          </div>
        </div>
      )}
    </>
  );
}
