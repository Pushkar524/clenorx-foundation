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
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLang();
  const t = translations[lang];
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white shadow-md py-3"
          : "py-5 bg-white/80 backdrop-blur-md"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative h-14 w-48 sm:w-56">
            <Image
              src="/logo.png"
              alt="ClenorX Foundation"
              fill
              className="object-contain object-left"
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
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-orange-500 rounded-lg hover:bg-orange-50 transition-all"
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
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-all"
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
                  className="absolute right-0 mt-2 w-28 rounded-xl glass shadow-xl overflow-hidden"
                >
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={cn(
                        "w-full px-4 py-2 text-sm text-left hover:bg-orange-50 transition-colors",
                        lang === l.code ? "text-orange-600 font-semibold" : "text-slate-700"
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
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg text-slate-600 hover:bg-orange-50 hover:text-orange-500 transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Donate CTA */}
          <a href="#donate" className="hidden sm:inline-flex btn-pill btn-primary text-sm items-center gap-1.5">
            <Heart size={14} />
            {t.nav_donate}
          </a>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600"
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
            className="lg:hidden bg-white border-t border-slate-100 shadow-lg mt-2"
          >
            <ul className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
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
