"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Globe, Heart } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/components/LangProvider";
import { translations, Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { key: "nav_home", href: "#home" },
  { key: "nav_about", href: "#about" },
  { key: "nav_programs", href: "#programs" },
  { key: "nav_impact", href: "#impact" },
  { key: "nav_volunteer", href: "#volunteer" },
  { key: "nav_donate", href: "#donate" },
  { key: "nav_blog", href: "#blog" },
  { key: "nav_contact", href: "#contact" },
];

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "hi", label: "हिंदी" },
];

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const { lang, setLang } = useLang();
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b border-white/35",
        scrolled
          ? "bg-orange-500/24 dark:bg-orange-600/30 shadow-lg py-3"
          : "py-5 bg-orange-500/16 dark:bg-orange-600/20"
      )}
    >
      {/* top header removed per request */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative h-20 w-20 sm:h-[88px] sm:w-[88px]">
            <Image
              src="/logo.png"
              alt="ClenorX Foundation"
              fill
              className="object-contain object-left mix-blend-multiply dark:mix-blend-normal"
              priority
            />
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                className="px-3 py-2 text-sm font-semibold text-slate-900 dark:text-orange-50 hover:text-orange-700 dark:hover:text-amber-100 rounded-lg hover:bg-white/35 dark:hover:bg-white/10 transition-all focus:ring-2 focus:ring-orange-500 focus:outline-none"
              >
                {t[link.key]}
              </a>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language Picker */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-slate-900 dark:text-orange-50 hover:bg-white/35 dark:hover:bg-white/10 transition-all focus:ring-2 focus:ring-orange-500 focus:outline-none"
              aria-label="Select language"
            >
              <Globe size={16} />
              <span className="hidden sm:inline">{lang.toUpperCase()}</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 mt-2 w-28 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-xl overflow-hidden border border-white/20"
                >
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={cn(
                        "w-full px-4 py-2 text-sm text-left hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-orange-500 focus:outline-none",
                        lang === l.code ? "text-orange-600 font-semibold" : "text-slate-700 dark:text-slate-300"
                      )}
                    >
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="p-2 rounded-lg text-slate-900 dark:text-orange-50 hover:bg-white/35 dark:hover:bg-white/10 transition-all focus:ring-2 focus:ring-orange-500 focus:outline-none"
            aria-label="Toggle theme"
          >
            {!mounted ? <Moon size={18} /> : isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Donate CTA */}
          <a href="#donate" className="hidden sm:inline-flex btn-pill btn-primary text-sm items-center gap-1.5">
            <Heart size={14} />
            {t.nav_donate}
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
                    className="block px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-slate-800 rounded-lg transition-all focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    {t[link.key]}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#donate"
                  onClick={() => setMobileOpen(false)}
                  className="btn-pill btn-primary flex justify-center mt-2 text-sm"
                >
                  <Heart size={14} />
                  {t.nav_donate}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
