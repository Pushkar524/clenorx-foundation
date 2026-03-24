"use client";

import { useLang } from "@/components/LangProvider";
import { translations } from "@/lib/i18n";
import { TestimonialSection } from "@/components/ui/testimonials";

const PROGRAMS = [
  {
    id: 1,
    name: "School Financial Literacy",
    role: "Children & Students",
    quote:
      "Classroom sessions teaching saving, budgeting, and smart money habits.",
    imageSrc: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80&fit=crop",
  },
  {
    id: 2,
    name: "Digital Banking Awareness",
    role: "Youth & Rural Communities",
    quote:
      "Training on UPI, internet banking, and safe digital financial practices.",
    imageSrc: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80&fit=crop",
  },
  {
    id: 3,
    name: "Rural Financial Camps",
    role: "SHG & Communities",
    quote:
      "Financial camps covering savings, micro-finance, and income growth.",
    imageSrc: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=800&q=80&fit=crop",
  },
];

export default function ProgramsSection() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <section id="programs">
      <TestimonialSection
        title={t.programs_title}
        subtitle={t.programs_subtitle}
        testimonials={PROGRAMS}
      />
    </section>
  );
}
