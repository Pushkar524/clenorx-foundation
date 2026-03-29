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
        "bg-transparent text-foreground",
        "py-0 sm:py-4 px-0",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-3 text-center sm:gap-6">
        {/* Heading */}
        <div className="flex flex-col items-center gap-2 px-4 sm:gap-3">
          <h2 className="max-w-[720px] text-3xl font-bold leading-tight sm:text-5xl sm:leading-tight text-[#1E3A5F] dark:text-slate-100">
            {title}
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ background: "#F59E0B" }} />
          <p className="max-w-[600px] text-base font-medium text-slate-500 dark:text-slate-300 sm:text-lg">
            {description}
          </p>
        </div>

        {/* Marquee */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="relative w-full overflow-hidden p-2 [--gap:1rem] [--duration:56s]">
            <div className="animate-marquee-track-a flex w-max shrink-0 [gap:var(--gap)] flex-row [will-change:transform]">
              {testimonials.map((testimonial, i) => (
                <TestimonialCard key={`track-a-${testimonial.author.name}-${i}`} {...testimonial} />
              ))}
            </div>

            <div className="animate-marquee-track-b absolute left-0 top-2 flex w-max shrink-0 [gap:var(--gap)] flex-row [will-change:transform]">
              {testimonials.map((testimonial, i) => (
                <TestimonialCard key={`track-b-${testimonial.author.name}-${i}`} {...testimonial} />
              ))}
            </div>
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-[var(--background)] to-transparent sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-[var(--background)] to-transparent sm:block" />
        </div>
      </div>
    </section>
  );
}
