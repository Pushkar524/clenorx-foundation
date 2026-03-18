"use client";

import {
  Flame, Eye, Target, HelpCircle,
  BookOpen, Wifi, Users, CheckCircle,
  Award, Calendar, TrendingUp, Star, Sparkles,
} from "lucide-react";
import AboutUsSection from "@/components/ui/about-us-section";
import { TestimonialsWithMarquee } from "@/components/ui/testimonials-with-marquee";

const ABOUT_CARDS = [
  {
    author: {
      name: "Our Goal",
      handle: "Core Objective",
      avatar: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=150&h=150&fit=crop&crop=center",
    },
    text: "To enhance the quality of life of school and college students by equipping them with financial knowledge, essential life skills, wellness practices, and adolescent health awareness.",
  },
  {
    author: {
      name: "Our Vision",
      handle: "What We See",
      avatar: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=150&h=150&fit=crop&crop=center",
    },
    text: "To promote awareness, education, and well-being for the benefit of society at large — creating a financially literate generation across India.",
  },
  {
    author: {
      name: "Our Mission",
      handle: "What We Do",
      avatar: "https://images.unsplash.com/photo-1573155993874-d5d48af862ba?w=150&h=150&fit=crop&crop=center",
    },
    text: "To educate and empower individuals to make informed and responsible financial decisions that improve their lives and community.",
  },
  {
    author: {
      name: "Why Financial Literacy",
      handle: "The Foundation",
      avatar: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=150&h=150&fit=crop&crop=center",
    },
    text: "Financial literacy is the foundation of a secure life. Teaching it early shapes responsible, capable citizens and breaks cycles of poverty.",
  },
  {
    author: {
      name: "Who We Serve",
      handle: "Our Reach",
      avatar: "https://images.unsplash.com/photo-1567336273898-ebbf9eb3c3cd?w=150&h=150&fit=crop&crop=center",
    },
    text: "We serve school and college students, Self-Help Groups (SHGs), and rural communities in Tier 3 cities and villages across Karnataka.",
  },
  {
    author: {
      name: "Our Approach",
      handle: "How We Work",
      avatar: "https://images.unsplash.com/photo-1605106702842-01a887a31122?w=150&h=150&fit=crop&crop=center",
    },
    text: "Interactive workshops, digital banking camps, entrepreneurship seed programmes, and community-led SHG training — all delivered in local languages.",
  },
];

const SERVICES = [
  {
    icon: <Flame className="w-6 h-6" />,
    secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />,
    title: "Our Goal",
    description:
      "Enhance the quality of life of students by equipping them with financial knowledge, essential life skills, wellness practices, and adolescent health awareness — building confident, capable citizens.",
    position: "left" as const,
  },
  {
    icon: <Eye className="w-6 h-6" />,
    secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />,
    title: "Our Vision",
    description:
      "To promote awareness, education, and well-being for the benefit of society at large — creating a financially literate generation across rural and Tier 3 India.",
    position: "left" as const,
  },
  {
    icon: <Target className="w-6 h-6" />,
    secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />,
    title: "Our Mission",
    description:
      "To educate and empower individuals to make informed and responsible financial decisions that improve their lives, their families, and their communities.",
    position: "left" as const,
  },
  {
    icon: <HelpCircle className="w-6 h-6" />,
    secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />,
    title: "Why Fin. Literacy",
    description:
      "Financial literacy is a necessity in today's digital economy — knowing how to save, budget, invest, and bank safely shapes responsible citizens and breaks cycles of poverty.",
    position: "right" as const,
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />,
    title: "Who We Serve",
    description:
      "School & college students, Self-Help Groups (SHGs), and rural communities across Karnataka — especially in Tier 3 cities and villages where financial awareness is critically low.",
    position: "right" as const,
  },
  {
    icon: <Wifi className="w-6 h-6" />,
    secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />,
    title: "Our Approach",
    description:
      "Interactive workshops, digital banking camps, entrepreneurship seed programmes, and community-led SHG training — all delivered in local languages for maximum impact.",
    position: "right" as const,
  },
];

const STATS = [
  { icon: <Award className="w-6 h-6" />, value: 200, label: "Workshops Conducted", suffix: "+" },
  { icon: <Users className="w-6 h-6" />, value: 10000, label: "Students Reached", suffix: "+" },
  { icon: <Calendar className="w-6 h-6" />, value: 3, label: "Years of Impact", suffix: "" },
  { icon: <TrendingUp className="w-6 h-6" />, value: 50, label: "Communities Served", suffix: "+" },
];

export default function AboutSection() {
  return (
    <section id="about">
      <AboutUsSection
        tagline="DISCOVER OUR STORY"
        heading="About ClenorX Foundation"
        description="ClenorX Foundation is a not-for-profit organization committed to building financial awareness among children and Self-Help Groups (SHGs) in rural and Tier 3 communities. We believe that financial literacy is not a privilege — it is a life skill."
        imageSrc="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80"
        imageAlt="Indian children smiling"
        services={SERVICES}
        stats={STATS}
        ctaHeading="Ready to make a difference?"
        ctaSubtext="Join us in building a financially literate generation across India."
        ctaButtonLabel="Get Involved"
        ctaButtonHref="#volunteer"
      />
      <TestimonialsWithMarquee
        title="What We Stand For"
        description="Our goal, vision, mission and approach — the values that drive every workshop, camp and community we touch across Karnataka."
        testimonials={ABOUT_CARDS}
        className="py-8 sm:py-16"
      />
    </section>
  );
}

