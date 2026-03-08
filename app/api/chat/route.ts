import { NextRequest, NextResponse } from "next/server";

// Simple financial literacy chatbot
// Replace OPENAI_API_KEY in .env.local to enable real AI responses
const SYSTEM_PROMPT = `You are FinBot, a friendly financial literacy assistant for ClenorX Foundation, an NGO in India.
Your job is to explain financial concepts to children and rural communities in Karnataka.
Keep responses:
- Simple and child-friendly
- Under 80 words
- Practical with Indian context (₹, UPI, SBI, etc.)
- Encouraging and positive
Topics: saving, budgeting, banking, digital payments, debt, investment basics.`;

// Offline knowledge base (used when no OpenAI key)
const KNOWLEDGE: Record<string, string> = {
  save: "💰 Saving means keeping part of your money for later. Try to save at least 20% of what you get. Even saving ₹5 daily = ₹1,825 in a year! Start a piggy bank today.",
  budget: "📊 A budget is a simple plan: write down your income, list your expenses, and save what's left. Use the 50-30-20 rule — 50% needs, 30% wants, 20% savings!",
  bank: "🏦 A bank account keeps your money safe and earns interest. To open one, visit any bank with your Aadhaar card. Jan Dhan accounts have zero minimum balance!",
  upi: "📱 UPI (Unified Payments Interface) lets you send money instantly using your mobile. PhonePe, GPay, and Paytm use UPI. Always verify before sending!",
  debt: "⚠️ Debt means money you owe. Borrow only what you can repay. Avoid money lenders with high interest — always use banks or microfinance institutions instead.",
  invest: "📈 Investing means putting money to work to earn more money. Start with a Post Office RD or bank FD. Even ₹100/month grows over time with compound interest!",
};

function getOfflineResponse(msg: string): string {
  const lower = msg.toLowerCase();
  for (const [key, response] of Object.entries(KNOWLEDGE)) {
    if (lower.includes(key)) return response;
  }
  return "Great question! I'm here to help with saving, budgeting, banking, and digital payments. Which topic would you like to learn about? 😊";
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string" || message.length > 500) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message },
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content ?? getOfflineResponse(message);
        return NextResponse.json({ reply });
      }
    }

    // Offline fallback
    return NextResponse.json({ reply: getOfflineResponse(message) });
  } catch {
    return NextResponse.json(
      { reply: "Sorry, I'm having trouble connecting. Please try again in a moment!" },
      { status: 200 }
    );
  }
}
