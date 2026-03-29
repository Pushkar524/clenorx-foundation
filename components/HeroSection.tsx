"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Archivo_Black } from "next/font/google";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function HeroSection() {
  const companyName = "ClenorX Foundation";

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-transparent pt-4 lg:pt-8">

      {/* ── Main grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-5rem)] flex items-start">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full pt-6 lg:pt-12 pb-12 lg:pb-0">

          {/* LEFT: Text content */}
          <div className="order-1 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="mb-6 mt-0"
            >
              <BlurredStagger
                text={companyName}
                className={`${archivoBlack.className} text-4xl sm:text-5xl xl:text-6xl leading-tight tracking-tight text-slate-900 dark:text-slate-50 [text-shadow:0_2px_10px_rgba(15,23,42,0.14)]`}
              />
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
                className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-6 bg-white rounded-2xl shadow-xl px-5 py-3 border border-orange-100 flex items-center gap-3"
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
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white rounded-2xl shadow-xl px-5 py-3 border border-blue-100 flex items-center gap-3"
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

    </section>
  );
}
