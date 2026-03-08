import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  className?: string;
}

export function TestimonialCard({ author, text, href, className }: TestimonialCardProps) {
  const Card = href ? "a" : "div";

  return (
    <Card
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "flex flex-col rounded-2xl border border-slate-100",
        "bg-gradient-to-b from-slate-50/80 to-white/40",
        "p-5 text-start sm:p-6",
        "hover:from-blue-50/60 hover:to-amber-50/30",
        "max-w-[300px] sm:max-w-[320px] shrink-0",
        "transition-colors duration-300 shadow-sm hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 ring-2 ring-amber-100">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback style={{ background: "#DBEAFE", color: "#1E3A5F" }}>
            {author.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-sm font-bold leading-none" style={{ color: "#1E3A5F" }}>
            {author.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1">{author.handle}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-600 leading-relaxed">{text}</p>
    </Card>
  );
}
