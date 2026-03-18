"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const step = target / (2000 / 16);
          let cur = 0;
          const t = setInterval(() => {
            cur += step;
            if (cur >= target) { setCount(target); clearInterval(t); }
            else setCount(Math.floor(cur));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function HeroSection() {
  const companyName = "ClenorX Foundation";
  const [typedName, setTypedName] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setTypedName(companyName.slice(0, index));
      if (index >= companyName.length) {
        clearInterval(interval);
      }
    }, 85);

    return () => clearInterval(interval);
  }, [companyName]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-white dark:bg-slate-950 pt-20 lg:pt-32">

      {/* ── Floating gradient blobs ── */}
      <div className="bg-blob blob-animate w-80 h-80 rounded-full" style={{ background: "#BFDBFE", top: "-4rem", left: "-5rem" }} />
      <div className="bg-blob blob-animate w-96 h-96 rounded-full" style={{ background: "#FEF3C7", top: "40%", right: "-8rem", animationDelay: "4s" }} />
      <div className="bg-blob w-72 h-72 rounded-full" style={{ background: "#DBEAFE", bottom: "0", left: "30%" }} />

      {/* ── Decorative background floating shapes ── */}
      {/* Hearts */}
      <motion.div animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-24 left-[8%] text-orange-400 opacity-70">
        <Heart size={26} fill="currentColor" />
      </motion.div>
      <motion.div animate={{ y: [0, -8, 0], rotate: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-40 left-[18%] text-orange-300 opacity-60">
        <Heart size={18} fill="currentColor" />
      </motion.div>
      <motion.div animate={{ y: [0, -12, 0], rotate: [0, 9, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-32 left-[12%] text-amber-400 opacity-60">
        <Heart size={20} fill="currentColor" />
      </motion.div>

      {/* Colored dots */}
      <motion.div animate={{ y: [0, -10, 0], opacity: [0.35, 0.7, 0.35] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-36 left-[30%] w-4 h-4 rounded-full bg-blue-300" />
      <motion.div animate={{ y: [0, 8, 0], opacity: [0.4, 0.75, 0.4] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }} className="absolute top-72 left-[5%] w-3 h-3 rounded-full bg-orange-300" />
      <motion.div animate={{ y: [0, -12, 0], opacity: [0.25, 0.6, 0.25] }} transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} className="absolute bottom-48 left-[25%] w-5 h-5 rounded-full bg-amber-300" />
      <motion.div animate={{ y: [0, 6, 0], opacity: [0.3, 0.65, 0.3] }} transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} className="absolute top-20 right-[5%] w-4 h-4 rounded-full bg-blue-200" />
      <motion.div animate={{ y: [0, -9, 0], opacity: [0.35, 0.8, 0.35] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} className="absolute bottom-24 right-[8%] w-3 h-3 rounded-full bg-orange-200" />

      {/* Dashed circle */}
      <div className="absolute hidden lg:block bottom-24 left-[28%] w-28 h-28 rounded-full border-2 border-dashed border-orange-200 opacity-40" />
      <div className="absolute hidden lg:block top-28 left-[38%] w-16 h-16 rounded-full border-2 border-dashed border-blue-200 opacity-40" />

      {/* SVG hearts / stars scattered */}
      <svg className="absolute top-28 left-[14%] w-7 h-7 opacity-50" viewBox="0 0 24 24" fill="#F59E0B">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <svg className="absolute top-16 right-[28%] w-5 h-5 opacity-40" viewBox="0 0 24 24" fill="#3B82F6">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <svg className="absolute bottom-36 left-[6%] w-6 h-6 opacity-40" viewBox="0 0 24 24" fill="#F59E0B">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
      <svg className="absolute top-32 right-[38%] w-4 h-4 opacity-30" viewBox="0 0 24 24" fill="#F59E0B">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
      <svg className="absolute bottom-16 right-[20%] w-5 h-5 opacity-35" viewBox="0 0 24 24" fill="#3B82F6">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>

      {/* Flower / plus shapes */}
      <motion.svg animate={{ y: [0, -12, 0], rotate: [0, 12, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[45%] left-[3%] w-8 h-8 opacity-35" viewBox="0 0 24 24" fill="#3B82F6">
        <circle cx="12" cy="7" r="3" /><circle cx="12" cy="17" r="3" />
        <circle cx="7" cy="12" r="3" /><circle cx="17" cy="12" r="3" />
        <circle cx="12" cy="12" r="2" />
      </motion.svg>
      <motion.svg animate={{ y: [0, 10, 0], rotate: [0, -14, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }} className="absolute bottom-28 right-[30%] w-7 h-7 opacity-30" viewBox="0 0 24 24" fill="#F59E0B">
        <circle cx="12" cy="7" r="3" /><circle cx="12" cy="17" r="3" />
        <circle cx="7" cy="12" r="3" /><circle cx="17" cy="12" r="3" />
        <circle cx="12" cy="12" r="2" />
      </motion.svg>

      {/* ── Main grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full py-12 lg:py-0">

          {/* LEFT: Text content */}
          <div className="order-1 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="mb-6 mt-2"
            >
              <h1
                className={`${nunito.className} font-extrabold text-4xl sm:text-5xl xl:text-6xl leading-tight tracking-tight text-slate-900 dark:text-slate-50 [text-shadow:0_2px_10px_rgba(15,23,42,0.14)]`}
                aria-label={companyName}
              >
                {typedName}
                <span
                  className="ml-1 inline-block h-[0.9em] w-[2px] align-middle bg-orange-500/90 animate-pulse"
                  aria-hidden="true"
                />
              </h1>
              <div className="w-24 h-1 rounded-full bg-orange-500/80 mt-4" />
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-4 max-w-lg font-medium">
                Empowering children and communities through practical financial literacy.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-sm font-semibold mt-5 dark:bg-orange-950/20 dark:border-orange-900/40 dark:text-orange-300">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Not-for-Profit &middot; Karnataka, India
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-500 max-w-md leading-relaxed mb-8"
            >
              Your donation can make a difference in a child&apos;s life. Together, we can provide hope and support to children in need.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <a href="#donate" className="btn-pill btn-primary inline-flex items-center">
                <Heart size={18} />
                <span>Donate Now</span>
              </a>
              <a href="#about" className="btn-pill btn-secondary inline-flex items-center">
                <span>Explore Programs</span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Children image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="order-2 lg:order-2 relative flex items-center justify-center"
          >
            {/* Glow blob behind image */}
            <div
              className="absolute inset-0 rounded-[3rem] blur-3xl opacity-30 scale-105"
              style={{ background: "radial-gradient(ellipse at center, #FDE68A 0%, #BFDBFE 60%, transparent 100%)" }}
            />

            {/* Main image container */}
            <div className="relative w-full max-w-lg">
              {/* Large rounded card */}
              <div
                className="relative overflow-hidden shadow-2xl"
                style={{ borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%", minHeight: 420 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=85"
                  alt="Happy children"
                  width={600}
                  height={520}
                  className="w-full h-[420px] sm:h-[500px] object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Warm overlay at bottom */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(245,158,11,0.15) 0%, transparent 50%)" }}
                />
              </div>

              {/* Floating stat cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl px-5 py-3 border border-orange-100 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#FEF3C7" }}>
                  <svg viewBox="0 0 24 24" fill="#F59E0B" className="w-5 h-5">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <div>
                  <div className="font-extrabold text-lg leading-none" style={{ color: "#1E3A5F" }}>10,000+</div>
                  <div className="text-xs text-slate-500 font-medium">Lives Impacted</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-5 py-3 border border-blue-100 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#DBEAFE" }}>
                  <svg viewBox="0 0 24 24" fill="#3B82F6" className="w-5 h-5">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                  </svg>
                </div>
                <div>
                  <div className="font-extrabold text-lg leading-none" style={{ color: "#1E3A5F" }}>200+</div>
                  <div className="text-xs text-slate-500 font-medium">Workshops</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#F8FAFC" />
        </svg>
      </div>
    </section>
  );
}
