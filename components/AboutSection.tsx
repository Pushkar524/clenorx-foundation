"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Flame, Eye, Target, HelpCircle } from "lucide-react";
import { TestimonialsWithMarquee } from "@/components/ui/testimonials-with-marquee";

const ABOUT_CARDS = [
  {
    author: {
      name: "Our Goal",
      handle: "Core Objective",
      avatar: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=150&h=150&fit=crop&crop=center",
    },
    text: "To enhance the quality of life of school and college students by equipping them with financial knowledge, essential life skills, wellness practices, and adolescent health awareness.",
  },
  {
    author: {
      name: "Our Vision",
      handle: "What We See",
      avatar: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=150&h=150&fit=crop&crop=center",
    },
    text: "To promote awareness, education, and well-being for the benefit of society at large — creating a financially literate generation across India.",
  },
  {
    author: {
      name: "Our Mission",
      handle: "What We Do",
      avatar: "https://images.unsplash.com/photo-1573155993874-d5d48af862ba?w=150&h=150&fit=crop&crop=center",
    },
    text: "To educate and empower individuals to make informed and responsible financial decisions that improve their lives and community.",
  },
  {
    author: {
      name: "Why Financial Literacy",
      handle: "The Foundation",
      avatar: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=150&h=150&fit=crop&crop=center",
    },
    text: "Financial literacy is the foundation of a secure life. Teaching it early shapes responsible, capable citizens and breaks cycles of poverty.",
  },
  {
    author: {
      name: "Who We Serve",
      handle: "Our Reach",
      avatar: "https://images.unsplash.com/photo-1567336273898-ebbf9eb3c3cd?w=150&h=150&fit=crop&crop=center",
    },
    text: "We serve school and college students, Self-Help Groups (SHGs), and rural communities in Tier 3 cities and villages across Karnataka.",
  },
  {
    author: {
      name: "Our Approach",
      handle: "How We Work",
      avatar: "https://images.unsplash.com/photo-1605106702842-01a887a31122?w=150&h=150&fit=crop&crop=center",
    },
    text: "Interactive workshops, digital banking camps, entrepreneurship seed programmes, and community-led SHG training — all delivered in local languages.",
  },
];

const fade = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12 } }),
};

const PILLARS = [
  {
    icon: Flame,
    title: "Our Goal",
    body: "To enhance the quality of life of school and college students by equipping them with Financial knowledge, Essential life skills, Wellness practices, and Adolescent Health awareness to build confident and capable citizens.",
    bg: "#EFF6FF",
    iconBg: "#DBEAFE",
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "To promote awareness, education, and well-being for the benefit of society at large.",
    bg: "#EFF6FF",
    iconBg: "#DBEAFE",
  },
  {
    icon: Target,
    title: "Our Mission",
    body: "To educate and empower individuals to make informed and responsible financial decisions.",
    bg: "#EFF6FF",
    iconBg: "#DBEAFE",
  },
  {
    icon: HelpCircle,
    title: "Why Fin. Literacy?",
    body: "Financial literacy is the foundation of a secure and independent life — empowering students to make informed decisions, avoid debt traps, and build a stable financial future.",
    bg: "#EFF6FF",
    iconBg: "#DBEAFE",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-bold tracking-widest uppercase mb-3"
              style={{ color: "#F59E0B" }}
            >
              Our Mission
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold mb-4"
              style={{ color: "#1E3A5F" }}
            >
              About ClenorX Foundation
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-slate-500 leading-relaxed mb-8 text-base"
            >
              ClenorX Foundation is a not-for-profit organization committed to building financial awareness among children and Self-Help Groups (SHGs) in rural and Tier 3 communities. We believe that financial literacy is not a privilege &mdash; it is a life skill. In many rural and semi-urban areas, children grow up without basic knowledge of saving, budgeting, banking, and responsible investing.
            </motion.p>

            {/* Cards grid */}
            <div className="grid grid-cols-2 gap-4">
              {PILLARS.map(({ icon: Icon, title, body, bg, iconBg }, i) => (
                <motion.div
                  key={title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fade}
                  className="rounded-2xl p-5 shadow-sm border border-blue-50 glass-card"
                  style={{ background: bg }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3 shadow-sm"
                    style={{ background: iconBg }}
                  >
                    <Icon size={18} color="#3B82F6" />
                  </div>
                  <h3 className="font-bold text-sm mb-1.5" style={{ color: "#1E3A5F" }}>{title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: image + Why Financial Literacy */}
          <div>
            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl overflow-hidden shadow-xl mb-6 glass-card"
              style={{ maxHeight: 340 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80"
                alt="Indian children smiling"
                width={600}
                height={340}
                className="w-full object-cover"
                style={{ height: 280 }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            {/* Why Financial Literacy card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl p-6 shadow-sm border border-blue-50 bg-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-sm"
                  style={{ background: "#FEF3C7" }}
                >
                  <HelpCircle size={20} style={{ color: "#F59E0B" }} />
                </div>
                <h3 className="font-bold text-base" style={{ color: "#1E3A5F" }}>Why Financial Literacy?</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Financial literacy is the foundation of a secure and independent life. It empowers individuals &mdash; especially young students &mdash; to understand money, make informed decisions, avoid debt traps, and build a stable financial future.
                In today&apos;s fast-changing digital economy, knowing how to save, budget, invest, and use banking services safely is not a luxury &mdash; it is a necessity. By teaching financial literacy early, we are not just educating minds &mdash; we are shaping responsible citizens and building a financially confident nation.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      {/* About content marquee */}
      <TestimonialsWithMarquee
        title="What We Stand For"
        description="Our goal, vision, mission and approach — the values that drive every workshop, camp and community we touch across Karnataka."
        testimonials={ABOUT_CARDS}
        className="bg-[#F8FAFC] py-8 sm:py-16"
      />
    </section>
  );
}
