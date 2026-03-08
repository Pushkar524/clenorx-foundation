"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
/* ── Animated (hero) testimonials ── */
const HERO_TESTIMONIALS = [
  {
    quote:
      "ClenorX Foundation changed how I think about money. I save ₹200 every month and already have ₹2,400 this year. My parents are so proud!",
    name: "Riya Patil",
    designation: "Class 9 Student, Shikaripura Government School",
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80",
  },
  {
    quote:
      "Before the workshop I didn't even have a bank account. Now I run a savings group of 12 women. We've pooled ₹48,000 and given two micro-loans already.",
    name: "Lakshmi Gowda",
    designation: "SHG Leader, Soraba Village, Karnataka",
    src: "https://images.unsplash.com/photo-1573155993874-d5d48af862ba?w=500&q=80",
  },
  {
    quote:
      "The digital banking camp taught me UPI and how to avoid scams. I help my entire neighbourhood with mobile payments now.",
    name: "Suresh Kumar",
    designation: "Farmer & Community Volunteer, Thirthahalli",
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&q=80",
  },
  {
    quote:
      "My daughter came back from the school programme teaching me about budgeting. A child teaching her mother — that is real impact.",
    name: "Meena Desai",
    designation: "Parent & Local Entrepreneur, Sagara",
    src: "https://images.unsplash.com/photo-1567336273898-ebbf9eb3c3cd?w=500&q=80",
  },
  {
    quote:
      "The entrepreneurship seeds camp gave me confidence to open a tailoring shop. Net profit this month: ₹6,200!",
    name: "Kavya Hegde",
    designation: "Youth Entrepreneur, Bhadravathi",
    src: "https://images.unsplash.com/photo-1605106702842-01a887a31122?w=500&q=80",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-[#F8FAFC] relative overflow-hidden">
      {/* Background blob */}
      <div
        className="bg-blob w-96 h-96 rounded-full"
        style={{ background: "#BFDBFE", bottom: "-4rem", right: "-6rem" }}
      />

      <div className="relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center pt-16 px-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-4">
            <Quote size={14} />
            Real Stories
          </span>
        </motion.div>

        {/* Animated hero testimonials */}
        <AnimatedTestimonials testimonials={HERO_TESTIMONIALS} autoplay />

      </div>
    </section>
  );
}
