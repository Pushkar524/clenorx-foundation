"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight, Send } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/components/LangProvider";
import { translations } from "@/lib/i18n";

const QUICK_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Impact Dashboard", href: "#impact" },
  { label: "Financial Quiz", href: "#quiz" },
  { label: "Budget Calculator", href: "#calculator" },
  { label: "Volunteer", href: "#volunteer" },
  { label: "Donate", href: "#donate" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
  { icon: Twitter, href: "#", label: "Twitter / X", color: "hover:bg-sky-500" },
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-600" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/clenorxfoundation", label: "LinkedIn", color: "hover:bg-blue-700" },
  { icon: Youtube, href: "#", label: "YouTube", color: "hover:bg-red-600" },
];

export default function Footer() {
  const { lang } = useLang();
  const t = translations[lang];
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubscribed(true);
    toast.success("Subscribed! Thank you for joining our community.");
    setEmail("");
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" className="inline-block mb-5">
              <div className="relative h-14 w-48">
                <Image src="/logo.png" alt="ClenorX Foundation" fill className="object-contain object-left" />
              </div>
            </a>
            <p className="text-sm leading-relaxed mb-5 text-slate-400">
              Empowering children and Self-Help Groups in rural India with financial literacy education for a better future.
            </p>
            {/* Social links */}
            <div className="flex gap-2.5">
              {SOCIALS.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center transition-all ${color} hover:text-white hover:scale-110`}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.slice(0, 5).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-5">More</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.slice(5).map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-5">Contact Us</h4>
            <ul className="space-y-3 mb-6 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-blue-400 mt-0.5 shrink-0" />
                <span className="text-slate-400">Devaraj Aras Nagar, Opp. Marikamba Temple, Shikaripura – 577427, Karnataka</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="text-green-400 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+919743085298" className="text-slate-400 hover:text-green-400 transition-colors">+91 97430 85298</a>
                  <a href="tel:+919591601735" className="text-slate-400 hover:text-green-400 transition-colors">+91 95916 01735</a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-amber-400 shrink-0" />
                <a href="mailto:clenorxfoundation30@gmail.com" className="text-slate-400 hover:text-amber-400 transition-colors text-xs break-all">
                  clenorxfoundation30@gmail.com
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-semibold text-white mb-3">{t.footer_newsletter}</p>
              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-400 font-medium"
                >
                  ✅ You&apos;re subscribed! Thank you.
                </motion.p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors shrink-0"
                    aria-label="Subscribe"
                  >
                    <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="pt-6 pb-5 text-center text-sm text-slate-400">
          <p>
            Designed By{" "}
            <a
                href="https://thenexturl.com"
              target="_blank"
              rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold text-base link-glow"
            >
              TheNextUrl
            </a>
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>{t.footer_rights}</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-slate-300 transition-colors">80G Certificate</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
