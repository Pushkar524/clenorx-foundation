"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/components/LangProvider";
import { translations } from "@/lib/i18n";

const POSTS = [
  {
    id: 1,
    title: "Teaching Kids About Money: Why It Starts at Home",
    excerpt:
      "Financial habits formed in childhood shape lifelong money management. Here's why parents and teachers must start early.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    category: "Education",
    date: "Feb 15, 2026",
    readTime: "4 min read",
    categoryColor: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  },
  {
    id: 2,
    title: "Digital Banking Awareness in Rural Karnataka",
    excerpt:
      "Our recent camp in Shikaripura trained 120+ SHG women on mobile banking, UPI, and digital safety — a transformative day.",
    image: "https://images.unsplash.com/photo-1567336273898-ebbf9eb3c3cd?w=600&q=80",
    category: "Field Report",
    date: "Jan 28, 2026",
    readTime: "6 min read",
    categoryColor: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  },
  {
    id: 3,
    title: "Rural Financial Empowerment: Stories from the Ground",
    excerpt:
      "Meet Lakshmi — a homemaker from Soraba who learned budgeting through our workshop and saved ₹12,000 in 6 months.",
    image: "https://images.unsplash.com/photo-1573155993874-d5d48af862ba?w=600&q=80",
    category: "Impact Stories",
    date: "Jan 10, 2026",
    readTime: "5 min read",
    categoryColor: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
  },
];

export default function BlogSection() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <section id="blog" className="section-padding bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-sm font-semibold mb-3">
              Stories & Updates
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">
              {t.blog_title}
            </h2>
            <div className="heading-accent mt-3" />
          </div>
          <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all shrink-0">
            View All <ArrowRight size={18} />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group glass-card rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${post.categoryColor}`}>
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {post.date}
                  </span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-sm font-semibold group-hover:gap-3 transition-all">
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
