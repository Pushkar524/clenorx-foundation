"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Award, Users, Calendar, TrendingUp,
  ArrowRight, Zap,
} from "lucide-react";
import {
  motion, useScroll, useTransform, useInView, useSpring,
} from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceItemProps {
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  direction: "left" | "right";
}

interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

// ─── ServiceItem ──────────────────────────────────────────────────────────────

function ServiceItem({ icon, secondaryIcon, title, description, delay, direction }: ServiceItemProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <motion.div
      className="flex flex-col group"
      variants={itemVariants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex items-center gap-3 mb-3"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="text-orange-500 bg-orange-100 dark:bg-orange-950/20 p-3 rounded-lg transition-colors duration-300 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/30 relative"
          whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="text-xl font-medium text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors duration-300">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
      <motion.div
        className="mt-3 pl-12 flex items-center text-orange-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
      >
        <span className="flex items-center gap-1">
          Learn more <ArrowRight className="w-3 h-3" />
        </span>
      </motion.div>
    </motion.div>
  );
}

// ─── StatCounter ──────────────────────────────────────────────────────────────

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: false });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, { stiffness: 50, damping: 10 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      springValue.set(0);
      setHasAnimated(false);
    }
  }, [isInView, value, springValue, hasAnimated]);

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  return (
    <motion.div
      className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center group hover:bg-white dark:hover:bg-slate-900 transition-colors duration-300"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-950/20 flex items-center justify-center mb-4 text-orange-500 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/30 transition-colors duration-300"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div ref={countRef} className="text-3xl font-bold text-slate-900 dark:text-white flex items-center">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-slate-700 dark:text-slate-300 text-sm mt-1">{label}</p>
      <motion.div className="w-10 h-0.5 bg-orange-500 mt-3 group-hover:w-16 transition-all duration-300" />
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface AboutService {
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  title: string;
  description: string;
  position: "left" | "right";
}

interface AboutStat {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
}

interface AboutUsSectionProps {
  tagline?: string;
  heading?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
  services?: AboutService[];
  stats?: AboutStat[];
  ctaHeading?: string;
  ctaSubtext?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
}

export default function AboutUsSection({
  tagline = "DISCOVER OUR STORY",
  heading = "About Us",
  description = "We are a passionate team dedicated to creating meaningful impact.",
  imageSrc = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
  imageAlt = "About image",
  services = [],
  stats = [],
  ctaHeading = "Ready to make a difference?",
  ctaSubtext = "Let's create something beautiful together.",
  ctaButtonLabel = "Get Started",
  ctaButtonHref = "#",
}: AboutUsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const leftServices = services.filter((s) => s.position === "left");
  const rightServices = services.filter((s) => s.position === "right");

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 px-4 overflow-hidden relative bg-transparent text-slate-900 dark:text-white"
    >
      {/* Decorative blobs */}
      <motion.div className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(245,158,11,0.08)", y: y1, rotate: rotate1 }} />
      <motion.div className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl" style={{ background: "rgba(59,130,246,0.08)", y: y2, rotate: rotate2 }} />
      <motion.div className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full" style={{ background: "rgba(245,158,11,0.3)" }} animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full" style={{ background: "rgba(59,130,246,0.3)" }} animate={{ y: [0, 20, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} />

      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
          <motion.span className="font-medium mb-2 flex items-center gap-2 text-orange-500 dark:text-orange-400" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Zap className="w-4 h-4" /> {tagline}
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-center text-slate-900 dark:text-white">{heading}</h2>
          <motion.div className="h-1 bg-orange-500" initial={{ width: 0 }} animate={{ width: 96 }} transition={{ duration: 1, delay: 0.5 }} />
        </motion.div>

        <motion.p className="text-center max-w-2xl mx-auto mb-16 opacity-80 text-slate-700 dark:text-slate-300" variants={itemVariants}>
          {description}
        </motion.p>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Left */}
          <div className="space-y-16">
            {leftServices.map((service, index) => (
              <ServiceItem key={`left-${index}`} icon={service.icon} secondaryIcon={service.secondaryIcon} title={service.title} description={service.description} delay={index * 0.2} direction="left" />
            ))}
          </div>

          {/* Centre image */}
          <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
            <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
              <motion.div className="rounded-md overflow-hidden shadow-xl" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
                <motion.div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent flex items-end justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }}>
                  <motion.a href="#programs" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Our Programs <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </motion.div>
              </motion.div>
              <motion.div className="absolute inset-0 border-4 border-blue-400 dark:border-blue-500 rounded-md -m-3 z-[-1]" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.6 }} />
              <motion.div className="absolute -top-4 -right-8 w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-950/20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.9 }} style={{ y: y1 }} />
              <motion.div className="absolute -bottom-6 -left-10 w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-950/20" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1 }} style={{ y: y2 }} />
            </motion.div>
          </div>

          {/* Right */}
          <div className="space-y-16">
            {rightServices.map((service, index) => (
              <ServiceItem key={`right-${index}`} icon={service.icon} secondaryIcon={service.secondaryIcon} title={service.title} description={service.description} delay={index * 0.2} direction="right" />
            ))}
          </div>
        </div>

        {/* Stats */}
        {stats.length > 0 && (
          <motion.div
            ref={statsRef}
            className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate={isStatsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <StatCounter key={index} icon={stat.icon} value={stat.value} label={stat.label} suffix={stat.suffix} delay={index * 0.1} />
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          className="mt-20 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 text-white bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700"
          initial={{ opacity: 0, y: 30 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex-1">
            <h3 className="text-2xl font-medium mb-2">{ctaHeading}</h3>
            <p className="text-white/90">{ctaSubtext}</p>
          </div>
          <motion.a
            href={ctaButtonHref}
            className="px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors text-orange-600 bg-white hover:bg-orange-50 dark:text-white dark:bg-orange-700 dark:hover:bg-orange-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {ctaButtonLabel} <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
