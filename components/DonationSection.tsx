"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, CheckCheck, Heart, QrCode } from "lucide-react";
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
    <section id="donate" className="section-padding bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-sm font-semibold mb-4">
            <Heart size={14} className="animate-pulse" /> Make a Difference
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            {t.donate_title}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">{t.donate_body}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Amount selection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">Choose Amount</h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                  className={`py-3 rounded-2xl font-bold text-sm transition-all ${
                    selectedAmount === amount
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-white/10 text-slate-300 hover:bg-white/20"
                  }`}
                >
                  ₹{amount.toLocaleString()}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-400 mb-2">Custom Amount</label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                placeholder="Enter amount in ₹"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-500 focus:border-blue-400 focus:outline-none transition-colors"
                min="1"
              />
            </div>

            {/* Impact info */}
            <div className="space-y-3 mb-6">
              {[
                { amount: 100, impact: "Provides learning material for 1 child" },
                { amount: 500, impact: "Sponsors a rural workshop session" },
                { amount: 1000, impact: "Funds 1 day of financial camp" },
              ].map(({ amount, impact }) => (
                <div key={amount} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                  <span className="text-blue-400 font-bold text-sm shrink-0">₹{amount}</span>
                  <span className="text-slate-400 text-sm">{impact}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowQR(true)}
              className="btn-pill btn-primary w-full justify-center"
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
            className="glass rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">Bank Transfer Details</h3>
            <div className="space-y-3">
              {BANK_DETAILS.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div>
                    <p className="text-slate-500 text-xs font-medium mb-0.5">{label}</p>
                    <p className="text-white font-semibold">{value}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(value, label)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
                    aria-label={`Copy ${label}`}
                  >
                    {copied === value ? <CheckCheck size={16} className="text-green-400" /> : <Copy size={16} />}
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => copyToClipboard(BANK_DETAILS.map(d => `${d.label}: ${d.value}`).join("\n"), "Bank Details")}
              className="w-full mt-6 py-3 border border-white/20 text-slate-300 rounded-2xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Copy size={16} /> Copy All Details
            </button>

            {/* 80G note */}
            <div className="mt-4 p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
              <p className="text-green-400 text-sm font-medium">
                ✅ Donations are eligible for 80G tax exemption under Indian Income Tax Act.
              </p>
            </div>
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
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-600 to-green-500 rounded-2xl flex items-center justify-center mb-4 shadow-xl">
                <QrCode className="text-white" size={80} />
              </div>
              <p className="font-bold text-blue-600 text-lg mb-2">clenorx@sbi</p>
              <p className="text-slate-500 text-sm mb-6">Amount: ₹{customAmount || selectedAmount || "—"}</p>
              <button
                onClick={() => setShowQR(false)}
                className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-colors"
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
