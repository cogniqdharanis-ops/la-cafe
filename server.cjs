console.log("🚀 LA Cafe server starting...");

const express = require("express");
const cors    = require("cors");
require("dotenv").config();


const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// ── System prompt ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a friendly, knowledgeable assistant for The L.A. Cafe in Downtown Los Angeles.

ABOUT:
- Location: Downtown LA, near 7th & Flower St | Phone: +1 213-612-3000
- Hours: Mon–Thu 7AM–12AM | Fri–Sat 7AM–2AM | Sunday 8AM–12AM
- Kitchen closes 30 min before closing. Walk-in only (no reservations). Groups 8+ can call ahead.
- Price range: $10–$20 most items, drinks from $7
- Delivery: DoorDash, Uber Eats, Grubhub | Curbside pickup: 12–18 min

MENU:
BREAKFAST (all-day): Classic LA Plate $14 | Belgian Waffle Stack $13 | Avocado Smash Toast $12 | French Toast Royale $13
BURGERS: The DTLA Smash $16 (most popular) | Mushroom Swiss Melt $17 | Crispy Chicken Crunch $15
SANDWICHES: Prime Club Stack $14 | Philly Cheesesteak $16
VEGAN (100% plant-based): Plant Smash Burger $16 | Acai Power Bowl $13 | Vegan Avocado Melt $12
DRINKS: Signature Cold Brew $7 | Lavender Latte $8 | Mango Sunrise Smoothie $9

WAIT TIMES: Peak Sat–Sun 10AM–2PM = 18–25 min | Morning = 8–12 min | Off-peak = 5–8 min
PARKING: 6th Street Garage (2 min walk) | Metered on 7th St | Validate for orders $20+

PERSONALITY: Warm, upbeat, concise (2–4 sentences). Use food emojis occasionally 🍳🍔☕.
If unsure about something, suggest calling +1 213-612-3000.`;

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "LA Cafe Chat API" });
});

// ── Chat endpoint ─────────────────────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ reply: "No message provided." });
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("❌ GROQ_API_KEY missing in .env");
      return res.status(500).json({ reply: "Server misconfigured — missing API key." });
    }

    console.log(`📨 User: ${message.slice(0, 120)}`);

    // Keep last 10 turns so context window stays manageable
    const validHistory = (Array.isArray(history) ? history : [])
      .filter((m) => m?.role && m?.content && ["user","assistant"].includes(m.role))
      .slice(-10);

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model:       "llama-3.1-8b-instant",
        max_tokens:  350,
        temperature: 0.7,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...validHistory,
          { role: "user", content: message.trim() },
        ],
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error(`❌ Groq ${groqRes.status}:`, errText.slice(0, 300));
      if (groqRes.status === 401)
        return res.status(502).json({ reply: "Invalid Groq API key — check your .env file." });
      if (groqRes.status === 429)
        return res.status(502).json({ reply: "Rate limit hit — please wait a moment and try again!" });
      return res.status(502).json({ reply: "AI service error. Please try again shortly." });
    }

    const data  = await groqRes.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      console.error("❌ Unexpected Groq shape:", JSON.stringify(data).slice(0, 300));
      return res.status(502).json({ reply: "Unexpected AI response. Please try again." });
    }

    console.log(`🤖 Bot: ${reply.slice(0, 120)}`);
    res.json({ reply });

  } catch (err) {
    console.error("❌ Server error:", err.message);
    res.status(500).json({
      reply: "Something went wrong. Please try again or call +1 213-612-3000.",
    });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 LA Cafe server starting...`);
  console.log(`✅ Server running → http://127.0.0.1:${PORT}`);
  console.log(`   GROQ_API_KEY : ${process.env.GROQ_API_KEY ? "✅ found" : "❌ MISSING — add to .env"}`);
});