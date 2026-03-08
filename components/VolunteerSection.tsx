"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Form { name: string; phone: string; email: string }

export default function VolunteerSection() {
  const [form, setForm] = useState<Form>({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    const phoneRe = /^[6-9]\d{9}$/;
    if (!phoneRe.test(form.phone.replace(/\s/g, ""))) {
      toast.error("Please enter a valid 10-digit Indian phone number.");
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submit failed");
      setDone(true);
      toast.success("Thank you for joining us!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="volunteer" className="section-padding bg-slate-50 dark:bg-slate-950">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-4">
            Get Involved
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Join Us
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Become a part of the ClenorX Foundation and help us spread financial literacy across rural India.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100 dark:border-slate-800"
        >
          {done ? (
            <div className="flex flex-col items-center gap-5 py-8">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">You&apos;re in!</h3>
              <p className="text-slate-600 dark:text-slate-400 text-center text-lg">
                Thank you, <strong>{form.name}</strong>! We&apos;ll reach out to you soon at{" "}
                <strong>{form.email}</strong>.
              </p>
              <button
                onClick={() => { setDone(false); setForm({ name: "", phone: "", email: "" }); }}
                className="mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                  <Users className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Volunteer Registration</h3>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Your full name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="10-digit mobile number"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 dark:shadow-blue-900/30 transition-all hover:shadow-xl flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Submitting...
                  </>
                ) : (
                  "Join Us"
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
