"use client";

import { motion } from "framer-motion";
import { Wallet, PiggyBank, Landmark, Smartphone, Trophy } from "lucide-react";
import { useLang } from "@/components/LangProvider";
import { translations } from "@/lib/i18n";

const STEPS = [
  {
    icon: Wallet,
    title: "Learning About Money",
    desc: "Understanding what money is, where it comes from, and why it matters in daily life.",
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-700",
  },
  {
    icon: PiggyBank,
    title: "Saving Habits",
    desc: "Building the discipline to save a part of every earning or pocket money for future goals.",
    color: "from-green-500 to-emerald-700",
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-700",
  },
  {
    icon: Landmark,
    title: "Understanding Banking",
    desc: "Learning about bank accounts, interest rates, deposits, and how the banking system works.",
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-700",
  },
  {
    icon: Smartphone,
    title: "Digital Payments",
    desc: "Mastering UPI, mobile banking, and safe digital payment practices for a cashless economy.",
    color: "from-purple-500 to-indigo-700",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-200 dark:border-purple-700",
  },
  {
    icon: Trophy,
    title: "Financial Independence",
    desc: "Achieving the ability to make confident, informed financial decisions independently.",
    color: "from-pink-500 to-rose-600",
    bg: "bg-pink-50 dark:bg-pink-900/20",
    border: "border-pink-200 dark:border-pink-700",
  },
];

export default function FinancialJourney() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <section id="journey" className="section-padding bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-sm font-semibold mb-4">
            The Journey
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t.journey_title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.journey_subtitle}
          </p>
        </motion.div>

        {/* Desktop timeline (horizontal) */}
        <div className="hidden md:block relative">
          {/* Connector line */}
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 mx-16" />

          <div className="grid grid-cols-5 gap-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center text-center"
              >
                {/* Step number + icon */}
                <div className="relative mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl`}>
                    <step.icon className="text-white" size={24} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <div className={`${step.bg} ${step.border} border rounded-2xl p-5 card-hover w-full`}>
                  <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-2">{step.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile timeline (vertical) */}
        <div className="md:hidden relative pl-8">
          {/* Vertical connector */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-40" />

          <div className="flex flex-col gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex gap-4"
              >
                {/* Step dot */}
                <div className={`absolute -left-8 w-5 h-5 rounded-full bg-gradient-to-br ${step.color} border-2 border-white dark:border-slate-900 shadow-md flex items-center justify-center`}>
                  <span className="text-white text-[8px] font-bold">{i + 1}</span>
                </div>

                <div className={`${step.bg} ${step.border} border rounded-2xl p-5 flex-1 card-hover`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow`}>
                      <step.icon className="text-white" size={18} />
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-white">{step.title}</h3>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
