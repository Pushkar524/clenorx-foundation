"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";
import { useLang } from "@/components/LangProvider";
import { translations } from "@/lib/i18n";

const QUESTIONS = [
  {
    q: "What is the best way to manage your pocket money?",
    options: ["Spend it all immediately", "Save a portion before spending", "Give it all away", "Hide it"],
    correct: 1,
    category: "Saving",
  },
  {
    q: "What does 'budget' mean?",
    options: [
      "A type of bank account",
      "A plan for spending and saving money",
      "A government tax",
      "A form of investment",
    ],
    correct: 1,
    category: "Budgeting",
  },
  {
    q: "What is UPI?",
    options: [
      "Unified Payments Interface",
      "Universal Power Interface",
      "United Pay Income",
      "Unified Private Investment",
    ],
    correct: 0,
    category: "Digital Payments",
  },
  {
    q: "Why is saving money important?",
    options: [
      "It is not important",
      "To spend more later",
      "For emergencies and future goals",
      "To show off to friends",
    ],
    correct: 2,
    category: "Saving",
  },
  {
    q: "What is interest in banking?",
    options: [
      "A fee you pay for being interested in banking",
      "Extra money earned on savings or paid on loans",
      "A type of fraud",
      "A monthly charge",
    ],
    correct: 1,
    category: "Banking",
  },
  {
    q: "Which is a safe digital payment option in India?",
    options: ["Sharing your OTP with strangers", "UPI through verified banking app", "Giving your debit card to someone", "Paying in advance to unknown sellers"],
    correct: 1,
    category: "Digital Payments",
  },
];

function Confetti() {
  const pieces = Array.from({ length: 40 }, (_, i) => i);
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((i) => (
        <motion.div
          key={i}
          initial={{ y: -20, x: Math.random() * 100 + "vw", opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: [1, 1, 0], rotate: Math.random() * 720 - 360 }}
          transition={{ duration: Math.random() * 2.5 + 1.5, delay: Math.random() * 0.5, ease: "easeIn" }}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            backgroundColor: ["#2563EB", "#22C55E", "#F59E0B", "#EC4899", "#8B5CF6"][i % 5],
            clipPath: i % 3 === 0 ? "polygon(50% 0%, 0% 100%, 100% 100%)" : undefined,
          }}
        />
      ))}
    </div>
  );
}

export default function QuizSection() {
  const { lang } = useLang();
  const t = translations[lang];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));

  const question = QUESTIONS[current];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
    if (idx === question.correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
      if (score + (selected === question.correct ? 1 : 0) >= Math.ceil(QUESTIONS.length * 0.6)) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      }
    }
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswers(Array(QUESTIONS.length).fill(null));
  };

  const percentage = Math.round((score / QUESTIONS.length) * 100);

  return (
    <section id="quiz" className="section-padding bg-white dark:bg-slate-900">
      {showConfetti && <Confetti />}

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-sm font-semibold mb-4">
            🎮 Interactive
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            {t.quiz_title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {t.quiz_subtitle}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700"
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Question {current + 1} of {QUESTIONS.length}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                  {question.category}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-8">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-8">
                {question.q}
              </h3>

              {/* Options */}
              <div className="grid gap-3">
                {question.options.map((opt, i) => {
                  let styles = "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30";
                  if (selected !== null) {
                    if (i === question.correct) styles = "border-green-500 bg-green-50 dark:bg-green-900/30";
                    else if (i === selected && i !== question.correct) styles = "border-red-400 bg-red-50 dark:bg-red-900/30";
                    else styles = "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 opacity-60";
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={selected !== null}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${styles} cursor-pointer disabled:cursor-not-allowed`}
                    >
                      <span className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold shrink-0 text-slate-500 dark:text-slate-400">
                        {["A", "B", "C", "D"][i]}
                      </span>
                      <span className="text-slate-700 dark:text-slate-200 font-medium">{opt}</span>
                      {selected !== null && i === question.correct && (
                        <CheckCircle2 className="ml-auto text-green-500 shrink-0" size={20} />
                      )}
                      {selected !== null && i === selected && i !== question.correct && (
                        <XCircle className="ml-auto text-red-400 shrink-0" size={20} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next */}
              {selected !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex justify-between items-center"
                >
                  <span className={`text-sm font-semibold ${selected === question.correct ? "text-green-600" : "text-red-500"}`}>
                    {selected === question.correct ? "🎉 Correct!" : "❌ Incorrect"}
                  </span>
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-colors"
                  >
                    {current < QUESTIONS.length - 1 ? "Next Question →" : "See Results 🏆"}
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 dark:border-slate-700 text-center"
            >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl mx-auto mb-6">
                <Trophy className="text-white" size={36} />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
                {percentage >= 80 ? "🎉 Excellent!" : percentage >= 60 ? "👍 Good Job!" : "📚 Keep Learning!"}
              </h3>
              <div className="text-6xl font-extrabold gradient-text my-4">
                {score}/{QUESTIONS.length}
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                You scored <strong>{percentage}%</strong>. {percentage >= 60 ? "You're on the path to financial wisdom!" : "Review the topics and try again — you've got this!"}
              </p>

              {/* Score bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-8">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className={`h-3 rounded-full ${percentage >= 80 ? "bg-green-500" : percentage >= 60 ? "bg-amber-500" : "bg-red-400"}`}
                />
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-colors"
                >
                  <RotateCcw size={16} /> Try Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
