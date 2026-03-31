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
            pi % 2 === 1 ? (
              <strong key={pi} style={{ color: "#D4A843", fontWeight: 600 }}>{part}</strong>
            ) : part
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
        <span key={i} style={{
          width: 7, height: 7, borderRadius: "50%",
          background: "rgba(255,246,236,0.35)", display: "inline-block",
          animation: "chatDot 1.2s ease-in-out infinite",
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}
    </div>
  );
}

export default function Chatbot() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState([
    { id: 0, role: "assistant", content: "Hey! 👋 Welcome to The L.A. Cafe. Ask me about our menu, hours, vegan options, wait times, or parking!" },
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

    const userMsg = { id: Date.now(), role: "user", content: msg };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setLoading(true);

    // Build history — skip the initial greeting (id: 0)
    const history = nextMessages
      .filter((m) => m.id !== 0)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      // UPDATED: Points to Port 5001 and uses correct variable names
      const res = await fetch("http://127.0.0.1:5001/api/chat", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: msg, 
          history: history 
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.reply || `Server error ${res.status}`);
      }

      const data  = await res.json();
      const reply = data?.reply || "Sorry, no response received. Please try again!";

      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", content: reply }]);
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

  return (
    <>
      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatDot {
          0%,100% { opacity: 0.3; transform: scale(0.8); }
          50%     { opacity: 1;   transform: scale(1.2); }
        }
        @keyframes chatSpin { to { transform: rotate(360deg); } }
        .chat-trigger:hover { transform: scale(1.1) !important; }
        .chat-trigger:active { transform: scale(0.95) !important; }
        .chat-chip:hover { color: rgba(255,246,236,0.9) !important; border-color: rgba(212,168,67,0.4) !important; }
        .chat-send:hover:not(:disabled) { background: #a50d25 !important; }
        .chat-send:active:not(:disabled) { transform: scale(0.95); }
        .chat-messages::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── Trigger button ─────────────────────────────────── */}
      <button
        className="chat-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open AI assistant"}
        style={{
          position: "fixed", bottom: 24, right: 20, zIndex: 1000,
          width: 56, height: 56, borderRadius: "50%",
          background: "#C8102E", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 28px rgba(200,16,46,0.45)",
          transition: "transform 0.2s, background 0.2s",
        }}
      >
        {open ? <X size={22} color="#fff" /> : <MessageCircle size={22} color="#fff" />}
        {!open && unread > 0 && (
          <span style={{
            position: "absolute", top: -4, right: -4,
            minWidth: 20, height: 20, borderRadius: 10,
            background: "#D4A843", color: "#1A0800",
            fontSize: 10, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "0 4px",
          }}>
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {/* ── Chat window ────────────────────────────────────── */}
      {open && (
        <div
          role="dialog"
          aria-label="LA Cafe AI Assistant"
          aria-modal="true"
          style={{
            position: "fixed", bottom: 90, right: 20, zIndex: 1000,
            width: "min(380px, calc(100vw - 24px))",
            maxHeight: "min(560px, calc(100dvh - 110px))",
            borderRadius: 20, overflow: "hidden",
            display: "flex", flexDirection: "column",
            background: "#160800",
            border: "1px solid rgba(212,168,67,0.18)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.65)",
            animation: "chatSlideUp 0.3s ease-out",
          }}
        >
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 16px", background: "#C8102E", flexShrink: 0,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Sparkles size={16} color="#fff" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontWeight: 600, color: "#fff", fontSize: 14 }}>
                  LA Cafe Assistant
                </span>
                <Bot size={12} color="rgba(255,255,255,0.6)" />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#34d399", display: "inline-block",
                }} />
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>
                  {loading ? "Typing…" : "Powered by Groq · Llama 3"}
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.65)", padding: 4, borderRadius: 8,
                display: "flex", alignItems: "center",
              }}
            >
              <ChevronDown size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="chat-messages"
            style={{
              flex: 1, overflowY: "auto",
              padding: 16, display: "flex",
              flexDirection: "column", gap: 10,
              minHeight: 0,
            }}
          >
            {messages.map((m) => (
              m.role === "user" ? (
                <div key={m.id} style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{
                    maxWidth: "84%", background: "#C8102E", color: "#fff",
                    borderRadius: "18px 18px 4px 18px",
                    padding: "10px 14px", fontSize: 13.5, lineHeight: 1.55,
                  }}>
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={m.id} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                    background: "rgba(200,16,46,0.2)", border: "1px solid rgba(200,16,46,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2,
                  }}>
                    <Bot size={12} color="#C8102E" />
                  </div>
                  <div style={{
                    maxWidth: "84%", background: "rgba(45,16,0,0.7)",
                    border: "1px solid rgba(212,168,67,0.12)",
                    color: "rgba(255,246,236,0.9)",
                    borderRadius: "18px 18px 18px 4px",
                    padding: "10px 14px", fontSize: 13.5, lineHeight: 1.55,
                  }}>
                    <BotText text={m.content} />
                  </div>
                </div>
              )
            ))}

            {/* Typing */}
            {loading && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                  background: "rgba(200,16,46,0.2)", border: "1px solid rgba(200,16,46,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2,
                }}>
                  <Bot size={12} color="#C8102E" />
                </div>
                <div style={{
                  background: "rgba(45,16,0,0.7)", border: "1px solid rgba(212,168,67,0.12)",
                  borderRadius: "18px 18px 18px 4px",
                }}>
                  <TypingDots />
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{
                fontSize: 12, color: "#f87171",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: 10, padding: "8px 12px",
              }}>
                {error}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick chips */}
          <div style={{
            display: "flex", gap: 6, padding: "0 12px 8px",
            overflowX: "auto", flexShrink: 0, scrollbarWidth: "none",
          }}>
            {CHIPS.map((chip) => (
              <button
                key={chip}
                className="chat-chip"
                onClick={() => send(chip)}
                disabled={loading}
                style={{
                  flexShrink: 0, fontSize: 11, fontWeight: 600,
                  padding: "6px 12px", borderRadius: 30,
                  cursor: loading ? "not-allowed" : "pointer",
                  background: "rgba(45,16,0,0.7)",
                  border: "1px solid rgba(212,168,67,0.18)",
                  color: "rgba(255,246,236,0.6)", whiteSpace: "nowrap",
                  opacity: loading ? 0.45 : 1,
                  transition: "all 0.15s",
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: "flex", gap: 8, padding: "0 12px 12px", flexShrink: 0 }}>
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
                flex: 1, background: "rgba(45,16,0,0.6)",
                border: "1px solid rgba(212,168,67,0.18)",
                borderRadius: 14, padding: "10px 14px",
                color: "rgba(255,246,236,0.9)", fontSize: 13,
                outline: "none", minHeight: 42,
                opacity: loading ? 0.6 : 1,
              }}
            />
            <button
              className="chat-send"
              onClick={() => send()}
              disabled={!input.trim() || loading}
              aria-label="Send"
              style={{
                width: 42, height: 42, borderRadius: 12,
                background: "#C8102E", border: "none",
                cursor: !input.trim() || loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, opacity: !input.trim() || loading ? 0.4 : 1,
                transition: "background 0.15s",
              }}
            >
              {loading
                ? <div style={{
                    width: 14, height: 14,
                    border: "2px solid #fff", borderTopColor: "transparent",
                    borderRadius: "50%", animation: "chatSpin 0.7s linear infinite",
                  }} />
                : <Send size={15} color="#fff" />
              }
            </button>
          </div>

          {/* Footer */}
          <div style={{
            textAlign: "center", padding: "0 16px 10px",
            fontSize: 10, color: "rgba(255,246,236,0.2)", flexShrink: 0,
          }}>
            AI responses may vary — call{" "}
            <a href="tel:+12136123000" style={{ color: "rgba(212,168,67,0.45)", textDecoration: "none" }}>
              213-612-3000
            </a>{" "}
            to confirm.
          </div>
        </div>
      )}
    </>
  );
}
