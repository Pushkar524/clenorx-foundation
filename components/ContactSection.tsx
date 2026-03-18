"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/components/LangProvider";
import { translations } from "@/lib/i18n";

export default function ContactSection() {
  const { lang } = useLang();
  const t = translations[lang];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) { toast.error("Please fill all fields"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Message sent! We'll get back to you shortly.");
    setName(""); setEmail(""); setMessage("");
    setLoading(false);
  };

  const CONTACT_INFO = [
    {
      icon: MapPin,
      label: "Address",
      value: "Devaraj Aras Nagar, Opp. Marikamba Temple,\nShikaripura - 577427, Karnataka",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 97430 85298\n+91 95916 01735",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      icon: Mail,
      label: "Email",
      value: "clenorxfoundation30@gmail.com",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <section id="contact" className="section-padding bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-semibold mb-4">
            Say Hello
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1E3A5F] dark:text-white mb-4">
            {t.contact_title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {CONTACT_INFO.map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className={`${bg} dark:bg-slate-800 rounded-2xl p-5 flex items-start gap-4 border border-slate-100 dark:border-slate-700`}>
                <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm shrink-0">
                  <Icon className={color} size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">{label}</p>
                  <p className="text-slate-800 dark:text-slate-100 font-medium whitespace-pre-line">{value}</p>
                </div>
              </div>
            ))}

            {/* Google Maps embed */}
            <div className="rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-lg h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.2!2d75.35!3d14.26!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDE1JzM2LjAiTiA3NcKwMjEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin&q=Shikaripura,Karnataka"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ClenorX Foundation Location"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700 space-y-5"
            >
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Send Us a Message</h3>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 focus:border-orange-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all hover:shadow-lg disabled:opacity-60"
                style={{ background: "#F59E0B" }}
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
