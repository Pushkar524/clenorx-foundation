"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import { useLang } from "@/components/LangProvider";
import { translations } from "@/lib/i18n";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  time: string;
}

const QUICK_QUESTIONS = [
  "What is saving?",
  "What is budgeting?",
  "How to open a bank account?",
  "Why should we save money?",
  "What is UPI?",
];

// Offline fallback responses (used when API not configured)
const OFFLINE_RESPONSES: Record<string, string> = {
  default: "Great question! Financial literacy is about understanding how money works. I'm ClenorX FinBot — ask me about saving, budgeting, banking, or digital payments!",
  saving: "💰 **Saving** means keeping part of your money instead of spending all of it. Start by saving at least 20% of what you receive. Even saving ₹10 daily adds up to ₹3,650 every year!",
  budget: "📊 A **budget** is a plan for how you'll spend and save your money. A simple rule: 50% for needs, 30% for wants, 20% for savings. Write down your income, subtract expenses, and plan what's left.",
  bank: "🏦 To open a **bank account**, visit your nearest bank with: Aadhaar card, PAN card (or Form 60), passport photo, and initial deposit (can be as low as ₹0 for zero-balance accounts like PMJDY).",
  upi: "📱 **UPI** (Unified Payments Interface) lets you instantly transfer money using your mobile phone. Apps like PhonePe, GPay, and Paytm use UPI. Always verify the recipient before sending money!",
  why: "🌟 Saving money is important because: 1) Emergencies can happen anytime, 2) It helps you achieve goals like education, 3) Saved money can earn interest, 4) It prevents debt and financial stress!",
};

function getOfflineReply(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("sav")) return OFFLINE_RESPONSES.saving;
  if (lower.includes("budget") || lower.includes("plan")) return OFFLINE_RESPONSES.budget;
  if (lower.includes("bank") || lower.includes("account")) return OFFLINE_RESPONSES.bank;
  if (lower.includes("upi") || lower.includes("digital") || lower.includes("pay")) return OFFLINE_RESPONSES.upi;
  if (lower.includes("why") || lower.includes("important")) return OFFLINE_RESPONSES.why;
  return OFFLINE_RESPONSES.default;
}

export default function AIChatbot() {
  const { lang } = useLang();
  const t = translations[lang];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: "Hi! I'm FinBot 🤖 — your financial literacy assistant. Ask me anything about saving, budgeting, banking, or digital payments!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: msg,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: data.reply || getOfflineReply(msg),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      // Offline fallback
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: getOfflineReply(msg),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-2xl shadow-2xl shadow-blue-500/40 flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Open FinBot"
      >
        <MessageCircle size={24} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 flex flex-col bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden"
            style={{ maxHeight: "520px" }}
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot className="text-white" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">FinBot</p>
                <p className="text-blue-200 text-xs">Financial Literacy Assistant</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "320px" }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === "bot" ? "bg-blue-100 dark:bg-blue-900/50" : "bg-green-100 dark:bg-green-900/50"}`}>
                    {msg.role === "bot" ? <Bot size={14} className="text-blue-600" /> : <User size={14} className="text-green-600" />}
                  </div>
                  <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === "bot" ? "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-tl-sm" : "bg-blue-600 text-white rounded-tr-sm"}`}>
                      {msg.content}
                    </div>
                    <span className="text-slate-400 text-[10px]">{msg.time}</span>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-blue-600" />
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.15 }}
                          className="w-1.5 h-1.5 rounded-full bg-slate-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick questions */}
            <div className="px-4 pb-2">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t border-slate-100 dark:border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder={t.chatbot_placeholder}
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors disabled:opacity-50"
                  aria-label="Send message"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
