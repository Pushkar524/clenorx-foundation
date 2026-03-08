"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Lightbulb, IndianRupee } from "lucide-react";
import { useLang } from "@/components/LangProvider";
import { translations } from "@/lib/i18n";

interface BudgetResult {
  savings: number;
  savingsPercent: number;
  discretionary: number;
  tip: string;
  status: "excellent" | "good" | "poor";
}

function calcBudget(income: number, expenses: number, goal: number): BudgetResult {
  const remaining = income - expenses;
  const savings = Math.min(remaining, goal > 0 ? goal : remaining * 0.3);
  const savingsPercent = income > 0 ? Math.round((savings / income) * 100) : 0;
  const discretionary = remaining - savings;

  let tip = "";
  let status: "excellent" | "good" | "poor" = "good";

  if (savingsPercent >= 30) {
    status = "excellent";
    tip = "🌟 Excellent! Saving 30%+ is a great habit. Consider investing in fixed deposits or RD.";
  } else if (savingsPercent >= 15) {
    status = "good";
    tip = "👍 Good job! Try to increase savings by reducing 1-2 unnecessary expenses.";
  } else if (savings > 0) {
    status = "poor";
    tip = "📚 You can improve! Try the 50-30-20 rule: 50% needs, 30% wants, 20% savings.";
  } else {
    status = "poor";
    tip = "⚠️ Expenses exceed income! Review your spending and look for areas to cut down.";
  }

  return { savings, savingsPercent, discretionary, tip, status };
}

export default function BudgetCalculator() {
  const { lang } = useLang();
  const t = translations[lang];

  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState<BudgetResult | null>(null);

  const handleCalc = () => {
    const i = parseFloat(income) || 0;
    const e = parseFloat(expenses) || 0;
    const g = parseFloat(goal) || 0;
    if (i <= 0) return;
    setResult(calcBudget(i, e, g));
  };

  const statusColor = result?.status === "excellent"
    ? "from-green-500 to-emerald-600"
    : result?.status === "good"
      ? "from-amber-500 to-orange-500"
      : "from-red-500 to-rose-600";

  const TIPS = [
    "Save at least 20% of your monthly income",
    "Track every expense, no matter how small",
    "Use the 50-30-20 rule for budgeting",
    "Build an emergency fund of 3-6 months expenses",
    "Invest early — compound interest works miracles",
  ];

  return (
    <section id="calculator" className="section-padding bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-sm font-semibold mb-4">
            🧮 Tool
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t.budget_title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">{t.budget_subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <Calculator className="text-white" size={22} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Enter Your Numbers</h3>
            </div>

            <div className="space-y-5">
              {[
                { label: "Monthly Income / Pocket Money (₹)", value: income, setter: setIncome, placeholder: "e.g. 5000" },
                { label: "Monthly Expenses (₹)", value: expenses, setter: setExpenses, placeholder: "e.g. 3000" },
                { label: "Savings Goal (₹)", value: goal, setter: setGoal, placeholder: "e.g. 1000" },
              ].map(({ label, value, setter, placeholder }) => (
                <div key={label}>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    {label}
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3.5 text-slate-400" size={16} />
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      placeholder={placeholder}
                      className="w-full pl-9 pr-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-green-500 focus:outline-none transition-colors"
                      min="0"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={handleCalc}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900 transition-all hover:-translate-y-0.5"
              >
                Calculate My Budget
              </button>
            </div>
          </motion.div>

          {/* Result or Tips */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {result ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700 h-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${statusColor} flex items-center justify-center shadow-lg`}>
                    <TrendingUp className="text-white" size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">Your Budget Plan</h3>
                </div>

                <div className="space-y-4 mb-6">
                  {[
                    { label: "Recommended Savings", value: `₹${result.savings.toLocaleString()}`, color: "text-green-600" },
                    { label: "Savings Rate", value: `${result.savingsPercent}%`, color: "text-blue-600" },
                    { label: "Discretionary Spending", value: `₹${Math.max(0, result.discretionary).toLocaleString()}`, color: "text-amber-600" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-700">
                      <span className="text-slate-600 dark:text-slate-300 text-sm font-medium">{label}</span>
                      <span className={`${color} font-extrabold text-lg`}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Savings Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-medium text-slate-500 mb-2">
                    <span>Savings Progress</span>
                    <span>{result.savingsPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, result.savingsPercent)}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-3 rounded-full bg-gradient-to-r ${statusColor}`}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">{result.tip}</p>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Lightbulb className="text-white" size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">Smart Money Tips</h3>
                </div>
                <ul className="space-y-3">
                  {TIPS.map((tip, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700"
                    >
                      <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">{tip}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
