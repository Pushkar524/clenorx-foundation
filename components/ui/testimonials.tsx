"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  imageSrc: string;
}

interface TestimonialSectionProps {
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export const TestimonialSection = ({
  title,
  subtitle,
  testimonials,
}: TestimonialSectionProps) => {
  return (
    <section className="w-full bg-transparent py-16 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        {/* Section Header */}
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#1E3A5F] dark:text-white">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-300">
          {subtitle}
        </p>

        {/* Grid */}
        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.figure
              key={testimonial.id}
              className="relative overflow-hidden rounded-2xl shadow-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.025, transition: { duration: 0.2 } }}
            >
              {/* Image */}
              <div className="relative h-80 w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={testimonial.imageSrc}
                  alt={testimonial.name}
                  className="h-full w-full object-cover object-center"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <figcaption className="absolute bottom-0 left-0 right-0 p-6 text-left text-white">
                <Quote className="mb-3 h-7 w-7 text-[#F59E0B]" aria-hidden="true" />
                <blockquote className="text-sm font-medium leading-relaxed text-white/90">
                  {testimonial.quote}
                </blockquote>
                <div className="mt-4 border-t border-white/20 pt-3">
                  <p className="font-bold text-white text-sm">{testimonial.name}</p>
                  <p className="text-xs text-white/60 mt-0.5">{testimonial.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
