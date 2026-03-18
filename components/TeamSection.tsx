"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";

const TEAM = [
  {
    name: "Pavan M Naik",
    designation: "Founder & CEO",
    quote:
      "Passionate about empowering rural communities through financial literacy and sustainable education. Every workshop we run is a step towards a more equitable India.",
    src: "/pavan-naik.jpeg",
    linkedin: "https://www.linkedin.com/in/pavan-m-naik-44b53b143",
  },
  {
    name: "Praveena K",
    designation: "Co-Founder & COO",
    quote:
      "Dedicated to building impactful grassroots programs that create lasting change in Tier 3 communities across Karnataka. Operations that serve people — that is my purpose.",
    src: "https://images.unsplash.com/photo-1573155993874-d5d48af862ba?w=600&h=600&fit=crop&crop=face",
    linkedin: "https://www.linkedin.com/in/praveena-k-69073337b/",
  },
];

export default function TeamSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <section id="team" className="section-padding bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-4">
            Leadership
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-[#1E3A5F] dark:text-white">
            Meet Our Team
          </h2>
          <div className="heading-accent mx-auto mb-4" />
          <p className="text-lg text-slate-500 dark:text-slate-300 max-w-2xl mx-auto">
            Driven by purpose &mdash; committed to transforming financial futures in rural India.
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-8">
          <CircularTestimonials
            testimonials={TEAM}
            autoplay
            colors={{
              name: isDark ? "#F8FAFC" : "#1E3A5F",
              designation: "#F59E0B",
              testimony: isDark ? "#CBD5E1" : "#475569",
              arrowBackground: isDark ? "#334155" : "#1E3A5F",
              arrowForeground: "#ffffff",
              arrowHoverBackground: "#F59E0B",
            }}
            fontSizes={{
              name: "28px",
              designation: "16px",
              quote: "17px",
            }}
          />
          {/* LinkedIn links */}
          <div className="flex flex-wrap justify-center gap-4">
            {TEAM.map((member) => (
              <a
                key={member.name}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E3A5F] dark:bg-slate-700 hover:bg-[#F59E0B] text-white text-sm font-semibold transition-colors"
              >
                <Linkedin size={16} />
                {member.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
