"use client";

import { motion } from "framer-motion";
import { Clock, BarChart3 } from "lucide-react";

export default function ImpactDashboard() {
  return (
    <section id="impact" className="section-padding bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-4">
            Our Impact
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
            Impact Dashboard
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center min-h-[380px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl p-12"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg mb-6">
            <BarChart3 className="text-white" size={36} />
          </div>

          <div className="flex items-center gap-2.5 mb-4">
            <Clock className="text-blue-500 shrink-0" size={22} />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Coming Soon</h3>
          </div>

          <p className="text-slate-500 dark:text-slate-400 text-lg text-center max-w-md leading-relaxed">
            We are actively collecting and verifying our impact data. Real numbers, real stories &mdash; coming soon.
          </p>

          <div className="flex flex-wrap gap-3 mt-8 justify-center">
            {["Students Reached", "Workshops Held", "Communities Served", "Districts Covered"].map((label) => (
              <div
                key={label}
                className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-700 text-center"
              >
                {label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
