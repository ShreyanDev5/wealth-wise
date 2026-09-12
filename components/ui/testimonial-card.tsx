import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  testimonial: string;
  avatarSrc?: string;
}

export function TestimonialCard({
  name,
  role,
  testimonial,
}: TestimonialCardProps) {
  return (
    <div className="w-full bg-white/80 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-stone-200/80 hover:border-stone-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between text-left h-full group">
      <div>
        {/* 5-Star Row */}
        <div className="flex items-center gap-1 mb-3.5" aria-label="5 out of 5 stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" aria-hidden="true" />
          ))}
        </div>
        
        {/* Quote */}
        <p className="text-[13.5px] sm:text-sm text-stone-700 leading-relaxed break-words text-pretty">
          &ldquo;{testimonial}&rdquo;
        </p>
      </div>
      
      {/* Author Lockup */}
      <div className="pt-4 mt-5 border-t border-stone-100/90 w-full min-w-0">
        <p className="font-bold text-xs sm:text-sm text-stone-900 leading-tight truncate">{name}</p>
        <p className="text-[11.5px] text-stone-500 mt-1 truncate">{role}</p>
      </div>
    </div>
  );
}
