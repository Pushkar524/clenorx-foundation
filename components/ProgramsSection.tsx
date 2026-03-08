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
      "Interactive classroom sessions teaching children the basics of saving, budgeting, and smart money habits. We equip students in schools and colleges with financial knowledge, essential life skills, wellness practices, and adolescent health awareness.",
    imageSrc: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=800&q=80&fit=crop",
  },
  {
    id: 2,
    name: "Digital Banking Awareness",
    role: "Youth & Rural Communities",
    quote:
      "Hands-on training for rural students and youth on mobile payments, UPI, internet banking, and safe digital financial practices to prepare them for today's digital economy.",
    imageSrc: "https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=800&q=80&fit=crop",
  },
  {
    id: 3,
    name: "Rural Financial Camps",
    role: "SHG & Communities",
    quote:
      "On-ground financial camps for SHG women and rural communities covering savings, micro-finance, debt management, and collective income growth — delivered in local languages.",
    imageSrc: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop",
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
