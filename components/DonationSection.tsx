"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, CheckCheck, Heart, QrCode, Check } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useLang } from "@/components/LangProvider";
import { translations } from "@/lib/i18n";

const BANK_DETAILS = [
  { label: "Account Name", value: "ClenorX Foundation" },
  { label: "Account Number", value: "1234 5678 9012" },
  { label: "IFSC Code", value: "SBIN0001234" },
  { label: "Bank", value: "State Bank of India" },
  { label: "Branch", value: "Shikaripura" },
  { label: "UPI ID", value: "clenorx@sbi" },
];

const AMOUNTS = [100, 250, 500, 1000, 2500, 5000];

export default function DonationSection() {
  const { lang } = useLang();
  const t = translations[lang];
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(500);
  const [customAmount, setCustomAmount] = useState("");
  const [showQR, setShowQR] = useState(false);

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(value);
      toast.success(`${label} copied!`);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <section id="donate" className="section-padding bg-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700 text-orange-600 dark:text-orange-300 text-sm font-semibold mb-4">
            <Heart size={14} className="animate-pulse" /> Make a Difference
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 dark:text-white mb-4">
            {t.donate_title}
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-300 max-w-2xl mx-auto">{t.donate_body}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Amount selection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl"
          >
            <div className="rounded-2xl overflow-hidden mb-6">
              <Image
                src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=900&q=80"
                alt="Children with joyful smiles"
                width={900}
                height={360}
                className="w-full h-40 object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Choose Amount</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                  className={`py-3 rounded-2xl font-bold text-sm transition-all focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none flex items-center justify-center gap-1 ${
                    selectedAmount === amount
                      ? "text-white shadow-lg ring-2 ring-orange-500"
                        : "bg-orange-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-orange-100 dark:hover:bg-slate-700"
                  }`}
                  style={selectedAmount === amount ? { background: "#F59E0B" } : undefined}
                >
                  {selectedAmount === amount && <Check size={16} />}
                  ₹{amount.toLocaleString()}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Custom Amount</label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                placeholder="Enter amount in ₹"
                className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-800 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors ${
                  customAmount && Number(customAmount) < 1
                    ? "border-red-500 dark:border-red-400"
                    : "border-slate-200 dark:border-slate-700"
                }`}
                min="1"
              />
              {customAmount && Number(customAmount) < 1 && (
                <p className="text-xs text-red-500 mt-1">Amount must be at least 1</p>
              )}
            </div>

            {/* Impact info */}
            <div className="space-y-3 mb-6">
              {[
                { amount: 100, impact: "Provides learning material for 1 child" },
                { amount: 500, impact: "Sponsors a rural workshop session" },
                { amount: 1000, impact: "Funds 1 day of financial camp" },
              ].map(({ amount, impact }) => (
                <div key={amount} className="flex items-start gap-3 p-3 rounded-xl bg-orange-50 dark:bg-slate-800 border border-orange-100 dark:border-slate-700">
                  <span className="text-orange-500 font-bold text-sm shrink-0">₹{amount}</span>
                  <span className="text-slate-600 dark:text-slate-300 text-sm">{impact}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowQR(true)}
              className="w-full py-3.5 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition-opacity"
              style={{ background: "#F59E0B" }}
            >
              <QrCode size={20} />
              Donate via UPI QR
            </button>
          </motion.div>

          {/* Bank details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl"
          >
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Bank Transfer Details</h3>
            <div className="space-y-3">
              {BANK_DETAILS.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors group border border-slate-100 dark:border-slate-700"
                >
                  <div>
                    <p className="text-slate-500 text-xs font-medium mb-0.5">{label}</p>
                    <p className="text-slate-800 dark:text-white font-semibold">{value}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(value, label)}
                    className="p-2 rounded-xl text-slate-400 hover:text-orange-600 hover:bg-orange-100 transition-all opacity-0 group-hover:opacity-100"
                    aria-label={`Copy ${label}`}
                  >
                    {copied === value ? <CheckCheck size={16} className="text-green-400" /> : <Copy size={16} />}
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => copyToClipboard(BANK_DETAILS.map(d => `${d.label}: ${d.value}`).join("\n"), "Bank Details")}
              className="w-full mt-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Copy size={16} /> Copy All Details
            </button>

            {/* 80G note removed as requested */}
          </motion.div>
        </div>

        {/* QR Modal */}
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Scan to Donate</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Use any UPI app to scan and donate</p>
              {/* QR Code placeholder (in production, generate real QR) */}
              <div className="w-48 h-48 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-xl" style={{ background: "linear-gradient(135deg, #F59E0B, #3B82F6)" }}>
                <QrCode className="text-white" size={80} />
              </div>
              <p className="font-bold text-orange-500 text-lg mb-2">clenorx@sbi</p>
              <p className="text-slate-500 text-sm mb-6">Amount: ₹{customAmount || selectedAmount || "—"}</p>
              <button
                onClick={() => setShowQR(false)}
                className="px-8 py-3 text-white rounded-2xl font-semibold transition-colors"
                style={{ background: "#F59E0B" }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
