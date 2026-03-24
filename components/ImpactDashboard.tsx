"use client";

import { motion } from "framer-motion";

export default function ImpactDashboard() {
  const metrics = [
    { label: "Students Reached", value: "10,500+", icon: "👨‍🎓" },
    { label: "Workshops Held", value: "215+", icon: "📋" },
    { label: "Communities Served", value: "47", icon: "🏘️" },
    { label: "Districts Covered", value: "6", icon: "🗺️" },
  ];

  return (
    <section id="impact" className="section-padding bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-4">
            Our Impact
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-3">
            Measured Impact
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Real numbers from our grassroots financial literacy programs across rural India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">{metric.icon}</div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">{metric.label}</p>
              <p className="text-4xl font-extrabold text-slate-900 dark:text-white">{metric.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
