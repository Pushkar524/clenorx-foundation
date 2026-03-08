import { cn } from "@/lib/utils";
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card";

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

export function TestimonialsWithMarquee({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  return (
    <section
      className={cn(
        "bg-background text-foreground",
        "py-12 sm:py-24 px-0",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 text-center sm:gap-16">
        {/* Heading */}
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-6">
          <h2 className="max-w-[720px] text-3xl font-bold leading-tight sm:text-5xl sm:leading-tight" style={{ color: "#1E3A5F" }}>
            {title}
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ background: "#F59E0B" }} />
          <p className="max-w-[600px] text-base font-medium text-slate-500 sm:text-lg">
            {description}
          </p>
        </div>

        {/* Marquee */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div
            className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s]"
          >
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, setIndex) =>
                testimonials.map((testimonial, i) => (
                  <TestimonialCard key={`${setIndex}-${i}`} {...testimonial} />
                ))
              )}
            </div>
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-[#F8FAFC] sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-[#F8FAFC] sm:block" />
        </div>
      </div>
    </section>
  );
}
