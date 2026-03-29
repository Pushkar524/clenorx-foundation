"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/components/LangProvider";
import { translations, Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { key: "nav_home", href: "#home" },
  { key: "nav_about", href: "#about" },
  { key: "nav_programs", href: "#programs" },
  { key: "nav_volunteer", href: "#volunteer" },
  { key: "nav_donate", href: "#donate" },
  { key: "nav_contact", href: "#contact" },
];

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "hi", label: "हिंदी" },
];

export default function Navbar() {
  const { lang } = useLang();
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    return;
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 backdrop-blur-[22px] saturate-150 border-b border-white/35 shadow-[0_12px_35px_rgba(255,140,0,0.12)]",
        scrolled
          ? "bg-[rgba(255,165,0,0.22)] dark:bg-[rgba(255,140,0,0.24)] py-2.5"
          : "bg-[rgba(255,165,0,0.16)] dark:bg-[rgba(255,140,0,0.18)] py-3"
      )}
    >
      {/* top header removed per request */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-4 lg:gap-6">
        {/* Logo */}
        <a href="#home" aria-label="ClenorX Foundation home" className="flex items-center shrink-0 group">
          <span
            className="block h-16 w-48 sm:h-20 sm:w-56 bg-contain bg-no-repeat bg-left"
            style={{ backgroundImage: "url('/logo.png')" }}
          />
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex flex-1 items-center justify-evenly gap-4 xl:gap-8 max-w-4xl mx-auto">
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                className="px-5 py-2.5 text-lg lg:text-xl font-semibold tracking-wide text-slate-900 dark:text-orange-50 hover:text-orange-700 dark:hover:text-amber-100 rounded-lg hover:bg-white/20 dark:hover:bg-white/10 transition-all focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                {t[link.key]}
              </a>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex items-center justify-end gap-2 shrink-0">
          {/* Donate CTA */}
          <a
            href="#donate"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-none px-4 py-2.5 text-base lg:text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:translate-y-[-1px] focus:ring-2 focus:ring-orange-500 focus:outline-none"
            style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)" }}
          >
            <Heart size={15} />
            Donate Now
          </a>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-900 dark:text-orange-50 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-lg mt-2"
          >
            <ul className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-slate-800 rounded-lg transition-all focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    {t[link.key]}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#donate"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 flex justify-center rounded-none px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:translate-y-[-1px]"
                  style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)" }}
                >
                  <Heart size={14} />
                  Donate Now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
