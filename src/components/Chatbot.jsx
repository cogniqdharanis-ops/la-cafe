import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageCircle, X, Send, Bot, ChevronDown, Sparkles } from 'lucide-react'

// ── Smart fallback — works 100% on Vercel with no backend ──────────────────
const RULES = [
  {
    keys: ['hour', 'open', 'close', 'time', 'late', '2am', 'when', 'schedule'],
    reply: '🕐 We\'re open **Mon–Thu 8AM–12AM** and **Fri–Sat 8AM–2AM**, Sunday 8AM–12AM. Kitchen closes 30 min before. Perfect for late-night cravings!',
  },
  {
    keys: ['vegan', 'plant', 'vegetarian', 'plant-based', 'dairy', 'egg-free'],
    reply: '🌿 Yes! We have a dedicated **plant-based menu** — Plant Based Patty Melt, vegan breakfast plates, salads, and more. Every vegan item is clearly marked. No cross-contamination.',
  },
  {
    keys: ['wait', 'busy', 'how long', 'queue', 'crowd', 'peak', 'rush'],
    reply: '⏱️ Peak waits (Sat–Sun 10AM–2PM, evenings) run **18–25 min**. Mornings are usually **5–10 min**. Skip the line with **curbside pickup** — ready in 12–18 min!',
  },
  {
    keys: ['park', 'parking', 'car', 'drive', 'lot', 'garage'],
    reply: '🚗 Closest options: **6th Street Garage** (2 min walk), metered street on Spring St, and private lots on 5th/6th. We validate parking for orders over **$20**.',
  },
  {
    keys: ['location', 'address', 'where', 'find', 'direction', 'spring', 'dtla'],
    reply: '📍 We\'re at **639 S. Spring St., Los Angeles CA 90014** — inside Spring Towers Lofts, Downtown LA. Near Fashion District and Historic Core. Metro: closest is Pershing Square.',
  },
  {
    keys: ['burger', 'smash', 'dtla smash', 'best burger', 'patty'],
    reply: '🍔 Our **DTLA Smash** ($16) is the #1 seller — double smash patty, American cheese, caramelized onions. Also love the **Mushroom Swiss Melt** ($17) and **Crispy Chicken Crunch** ($15)!',
  },
  {
    keys: ['breakfast', 'eggs', 'waffle', 'morning', 'brunch', 'chicken waffle', 'burrito', 'bagel'],
    reply: '🍳 All-day breakfast all day! Highlights: **Classic LA Plate** ($14), **Chicken & Waffles**, **Belgian Waffle Stack** ($13), breakfast burritos, bagels, and pastries. Open 8AM!',
  },
  {
    keys: ['coffee', 'drink', 'cold brew', 'latte', 'smoothie', 'beverage'],
    reply: '☕ Handcrafted drinks: **Signature Cold Brew** ($7), **Lavender Latte** ($8), **Mango Sunrise Smoothie** ($9). All made to order!',
  },
  {
    keys: ['delivery', 'doordash', 'uber', 'grubhub', 'order online', 'pickup', 'curbside'],
    reply: '📱 Order for **curbside pickup** (ready 12–18 min) or delivery via **DoorDash, Uber Eats, Grubhub**. Tap "Online Ordering" at the top of the page!',
  },
  {
    keys: ['price', 'cost', 'how much', 'cheap', 'expensive', 'money'],
    reply: '💰 Most items run **$10–$20**. Drinks from $7. Generous portions at honest prices — great value for DTLA!',
  },
  {
    keys: ['seating', 'sit', 'table', 'sidewalk', 'outdoor', 'inside', 'dine'],
    reply: '🪑 We have **dine-in seating** plus **sidewalk tables** outside. Walk-in only — no reservations. First come, first seated!',
  },
  {
    keys: ['reservation', 'book', 'reserve', 'table'],
    reply: '🚶 We\'re **walk-in only** — no reservations needed! Just come in. Large groups (8+) can call ahead at **(213) 612-3000**.',
  },
  {
    keys: ['menu', 'food', 'eat', 'dish', 'item', 'option'],
    reply: '🍽️ Full menu: **Breakfast all day** (eggs, waffles, burritos, bagels), **Burgers & Sandwiches**, **Vegan plates**, **Coffee & Drinks**, pastries & bakery items. Scroll up to browse!',
  },
  {
    keys: ['phone', 'call', 'number', 'contact', 'reach'],
    reply: '📞 Call us at **(213) 612-3000** for pickup orders, large group inquiries, or any questions. We\'re friendly at the counter!',
  },
  {
    keys: ['instagram', 'facebook', 'social', 'follow', '@'],
    reply: '📸 Follow us on Instagram **@thelacafe** for daily specials, food shots, and DTLA vibes. Also on Facebook at **facebook.com/TheLACafe**!',
  },
  {
    keys: ['rating', 'review', 'google', 'yelp', 'stars'],
    reply: '⭐ We\'re rated **4.3/5 on Google** from 2,281+ reviews! Customers love the generous portions, vegan options, and late-night hours.',
  },
  {
    keys: ['bakery', 'pastry', 'bread', 'baked', 'pastries'],
    reply: '🥐 Yes, we have **bakery items** — pastries, bagels, and baked goods made fresh. Perfect with our cold brew or latte!',
  },
  {
    keys: ['hi', 'hello', 'hey', 'sup', 'hola', 'good morning', 'good evening'],
    reply: 'Hey there! 😊 Welcome to The L.A. Cafe! I can help with **menu info, hours, parking, wait times, vegan options**, or anything else. What do you need?',
  },
]

const FALLBACK = "Good question! 😊 I\'m not 100% sure on that one. For the most accurate answer, call us at **(213) 612-3000** or check the sections above. Anything else I can help with?"

function getReply(msg) {
  const lower = msg.toLowerCase()
  for (const rule of RULES) {
    if (rule.keys.some(k => lower.includes(k))) return rule.reply
  }
  return FALLBACK
}

function BotText({ text }) {
  return (
    <span>
      {text.split('\n').map((line, li) => (
        <span key={li}>
          {li > 0 && <br />}
          {line.split(/\*\*(.*?)\*\*/g).map((part, pi) =>
            pi % 2 === 1
              ? <strong key={pi} style={{ color: '#A7552F', fontWeight: 700 }}>{part}</strong>
              : part
          )}
        </span>
      ))}
    </span>
  )
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 5, padding: '10px 14px', alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 7, height: 7, borderRadius: '50%',
          background: 'rgba(0,0,0,0.22)',
          animation: 'chatDot 1.2s ease-in-out infinite',
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}
    </div>
  )
}

const CHIPS = [
  'Opening hours?', 'Vegan options 🌿', 'Best burger?',
  'Parking nearby?', 'Current wait?', 'Sidewalk seating?',
]

export default function Chatbot() {
  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState([{
    id: 0, role: 'assistant',
    content: 'Hey! 👋 Welcome to **The L.A. Cafe**. Ask me about our menu, hours, vegan options, wait times, parking, or anything else!',
  }])
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const [unread, setUnread]   = useState(0)

  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 120)
    }
  }, [open])

  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  const send = useCallback((textArg) => {
    const msg = (textArg ?? input).trim()
    if (!msg || loading) return

    setInput('')
    const userMsg = { id: Date.now(), role: 'user', content: msg }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    // Simulate typing delay then respond locally — no server needed
    setTimeout(() => {
      const reply = getReply(msg)
      setLoading(false)
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: reply }])
      if (!open) setUnread(n => n + 1)
    }, 600 + Math.random() * 400)
  }, [input, loading, open])

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const fabBottom   = 'calc(1.5rem + env(safe-area-inset-bottom))'
  const winBottom   = 'calc(5.5rem + env(safe-area-inset-bottom))'

  return (
    <>
      <style>{`
        @keyframes chatSlideUp {
          from { opacity:0; transform:translateY(14px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes chatDot {
          0%,100% { opacity:0.3; transform:scale(0.75); }
          50%     { opacity:1;   transform:scale(1.2); }
        }
        @keyframes chatSpin { to { transform:rotate(360deg); } }
        .chat-fab:hover  { transform:scale(1.1) !important; }
        .chat-fab:active { transform:scale(0.95) !important; }
        .chat-chip:hover { color:#111 !important; border-color:rgba(167,85,47,0.5) !important; background:rgba(255,255,255,0.9) !important; }
        .chat-msgs::-webkit-scrollbar { display:none; }
        .chat-msgs { scrollbar-width:none; }
      `}</style>

      {/* FAB */}
      <button
        className="chat-fab"
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close chat' : 'Open AI assistant'}
        aria-expanded={open}
        style={{
          position:'fixed', bottom:fabBottom,
          right:'max(1.25rem,env(safe-area-inset-right))',
          zIndex:1000, width:52, height:52, borderRadius:'50%',
          background:'#111111', border:'2px solid #A7552F', cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 6px 24px rgba(0,0,0,0.18),0 2px 8px rgba(167,85,47,0.25)',
          transition:'transform 0.2s',
        }}
      >
        {open ? <X size={20} color="#ECE7DE" /> : <MessageCircle size={20} color="#ECE7DE" />}
        {!open && unread > 0 && (
          <span style={{
            position:'absolute', top:-5, right:-5,
            minWidth:20, height:20, borderRadius:10,
            background:'#A7552F', color:'#fff',
            fontSize:10, fontWeight:700,
            display:'flex', alignItems:'center', justifyContent:'center', padding:'0 4px',
          }}>
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {/* Window */}
      {open && (
        <div
          role="dialog" aria-label="LA Cafe Assistant" aria-modal="true"
          style={{
            position:'fixed', bottom:winBottom,
            right:'max(1rem,env(safe-area-inset-right))',
            zIndex:999,
            width:'min(380px,calc(100vw - 2rem))',
            maxHeight:'min(560px,calc(100dvh - 9rem - env(safe-area-inset-bottom)))',
            borderRadius:16, overflow:'hidden',
            display:'flex', flexDirection:'column',
            background:'#F5F0E8',
            border:'1px solid rgba(0,0,0,0.14)',
            boxShadow:'0 20px 60px rgba(0,0,0,0.16),0 4px 16px rgba(0,0,0,0.08)',
            animation:'chatSlideUp 0.28s ease-out',
          }}
        >
          {/* Header */}
          <div style={{
            display:'flex', alignItems:'center', gap:10,
            padding:'12px 14px', background:'#111111',
            borderBottom:'1px solid rgba(167,85,47,0.3)', flexShrink:0,
          }}>
            <div style={{
              width:34, height:34, borderRadius:'50%',
              background:'rgba(167,85,47,0.25)', border:'1px solid rgba(167,85,47,0.4)',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <Sparkles size={15} color="#A7552F" />
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ color:'#ECE7DE', fontWeight:700, fontSize:13, fontFamily:'Roboto,sans-serif' }}>
                LA Cafe Assistant
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:2 }}>
                <span style={{
                  width:6, height:6, borderRadius:'50%',
                  background: loading ? '#F5A623' : '#4ade80',
                  display:'inline-block',
                }} />
                <span style={{ color:'rgba(236,231,222,0.5)', fontSize:10, fontFamily:'Roboto,sans-serif' }}>
                  {loading ? 'Typing…' : 'Ask me anything'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)} aria-label="Close chat"
              style={{ background:'none', border:'none', cursor:'pointer',
                color:'rgba(236,231,222,0.55)', padding:6, borderRadius:6,
                display:'flex', alignItems:'center' }}
            >
              <ChevronDown size={17} />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-msgs" style={{
            flex:1, overflowY:'auto', padding:'14px 12px',
            display:'flex', flexDirection:'column', gap:10, minHeight:0,
          }}>
            {messages.map(m =>
              m.role === 'user' ? (
                <div key={m.id} style={{ display:'flex', justifyContent:'flex-end' }}>
                  <div style={{
                    maxWidth:'82%', background:'#111111', color:'#ECE7DE',
                    borderRadius:'16px 16px 3px 16px', padding:'9px 13px',
                    fontSize:13, lineHeight:1.55, fontFamily:'Roboto,sans-serif',
                  }}>
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={m.id} style={{ display:'flex', gap:7, alignItems:'flex-start' }}>
                  <div style={{
                    width:24, height:24, borderRadius:'50%', flexShrink:0,
                    background:'rgba(167,85,47,0.15)', border:'1px solid rgba(167,85,47,0.3)',
                    display:'flex', alignItems:'center', justifyContent:'center', marginTop:2,
                  }}>
                    <Bot size={11} color="#A7552F" />
                  </div>
                  <div style={{
                    maxWidth:'82%', background:'rgba(255,255,255,0.78)',
                    border:'1px solid rgba(0,0,0,0.08)', color:'#111111',
                    borderRadius:'16px 16px 16px 3px', padding:'9px 13px',
                    fontSize:13, lineHeight:1.6, fontFamily:'Roboto,sans-serif',
                  }}>
                    <BotText text={m.content} />
                  </div>
                </div>
              )
            )}
            {loading && (
              <div style={{ display:'flex', gap:7, alignItems:'flex-start' }}>
                <div style={{
                  width:24, height:24, borderRadius:'50%', flexShrink:0,
                  background:'rgba(167,85,47,0.15)', border:'1px solid rgba(167,85,47,0.3)',
                  display:'flex', alignItems:'center', justifyContent:'center', marginTop:2,
                }}>
                  <Bot size={11} color="#A7552F" />
                </div>
                <div style={{
                  background:'rgba(255,255,255,0.78)', border:'1px solid rgba(0,0,0,0.08)',
                  borderRadius:'16px 16px 16px 3px',
                }}>
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Chips */}
          <div style={{
            display:'flex', gap:6, padding:'0 12px 8px',
            overflowX:'auto', flexShrink:0, scrollbarWidth:'none',
          }}>
            {CHIPS.map(chip => (
              <button key={chip} className="chat-chip"
                onClick={() => send(chip)} disabled={loading}
                style={{
                  flexShrink:0, fontSize:11, fontWeight:600,
                  padding:'7px 12px', minHeight:36, borderRadius:30,
                  cursor:loading ? 'not-allowed' : 'pointer',
                  background:'rgba(255,255,255,0.65)',
                  border:'1px solid rgba(0,0,0,0.12)',
                  color:'rgba(17,17,17,0.6)', whiteSpace:'nowrap',
                  opacity:loading ? 0.45 : 1, transition:'all 0.15s',
                  fontFamily:'Roboto,sans-serif',
                }}>
                {chip}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{
            display:'flex', gap:8, padding:'8px 12px 12px',
            flexShrink:0, borderTop:'1px solid rgba(0,0,0,0.07)',
          }}>
            <input
              ref={inputRef} value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey} disabled={loading}
              placeholder="Ask anything about the cafe…"
              maxLength={300} aria-label="Chat message"
              style={{
                flex:1, background:'rgba(255,255,255,0.75)',
                border:'1px solid rgba(0,0,0,0.12)', borderRadius:10,
                padding:'9px 13px', color:'#111111', fontSize:13,
                fontFamily:'Roboto,sans-serif', outline:'none', minHeight:44,
                opacity:loading ? 0.6 : 1,
              }}
            />
            <button
              onClick={() => send()} disabled={!input.trim() || loading}
              aria-label="Send"
              style={{
                width:44, height:44, borderRadius:10, background:'#111111',
                border:'none', cursor:!input.trim() || loading ? 'not-allowed' : 'pointer',
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0, opacity:!input.trim() || loading ? 0.35 : 1,
                transition:'opacity 0.15s',
              }}
            >
              {loading
                ? <div style={{ width:14, height:14, border:'2px solid #ECE7DE', borderTopColor:'transparent', borderRadius:'50%', animation:'chatSpin 0.7s linear infinite' }} />
                : <Send size={15} color="#ECE7DE" />
              }
            </button>
          </div>

          <div style={{ textAlign:'center', padding:'0 14px 10px', fontSize:10, color:'rgba(17,17,17,0.25)', fontFamily:'Roboto,sans-serif', flexShrink:0 }}>
            Quick answers · For complex inquiries call{' '}
            <a href="tel:+12136123000" style={{ color:'rgba(167,85,47,0.65)', textDecoration:'none' }}>
              213-612-3000
            </a>
          </div>
        </div>
      )}
    </>
  )
}
