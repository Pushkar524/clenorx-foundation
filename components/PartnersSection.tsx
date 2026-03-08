"use client";

import { motion } from "framer-motion";
import { useLang } from "@/components/LangProvider";
import { translations } from "@/lib/i18n";

const PARTNERS = [
  { name: "Govt. of Karnataka", abbr: "GOK", color: "from-red-500 to-orange-500" },
  { name: "NABARD", abbr: "NABARD", color: "from-green-600 to-teal-600" },
  { name: "SBI Foundation", abbr: "SBI", color: "from-blue-600 to-indigo-600" },
  { name: "UNICEF India", abbr: "UNICEF", color: "from-cyan-600 to-blue-600" },
  { name: "Rural India", abbr: "RI", color: "from-amber-600 to-yellow-500" },
  { name: "Teach For India", abbr: "TFI", color: "from-purple-600 to-pink-600" },
  { name: "NSS Karnataka", abbr: "NSS", color: "from-teal-600 to-green-600" },
  { name: "MUDRA Bank", abbr: "MUDRA", color: "from-rose-500 to-red-600" },
];

export default function PartnersSection() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <section id="partners" className="py-16 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
            {t.partners_title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Working together to build a financially literate India
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 flex flex-col items-center gap-3 border border-slate-100 dark:border-slate-700 shadow-sm cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${partner.color} flex items-center justify-center shadow-lg`}>
                <span className="text-white font-extrabold text-xs">{partner.abbr}</span>
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 text-center leading-tight">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
