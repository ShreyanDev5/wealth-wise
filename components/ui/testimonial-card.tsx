import Image from "next/image";
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
  avatarSrc,
}: TestimonialCardProps) {
  return (
    <div className="w-full bg-white/80 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-stone-200/80 hover:border-stone-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between text-left h-full group overflow-hidden">
      {/* 5-Star Row */}
      <div className="flex items-center gap-1 mb-3.5" aria-label="5 out of 5 stars">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" aria-hidden="true" />
        ))}
      </div>
      
      {/* Quote */}
      <p className="text-[13.5px] sm:text-sm text-stone-700 leading-relaxed flex-grow mb-5 break-words">
        &ldquo;{testimonial}&rdquo;
      </p>
      
      {/* Author Lockup (Avatar + Name/Role united) */}
      <div className="flex items-center gap-3 pt-3.5 border-t border-stone-100/90 w-full mt-auto min-w-0">
        <div className="relative shrink-0 w-10 h-10 rounded-full overflow-hidden border border-stone-200/90 shadow-2xs bg-stone-100">
          {avatarSrc ? (
            <Image
              src={avatarSrc}
              alt={name}
              fill
              className="object-cover"
              sizes="40px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-700 font-bold text-xs">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-xs sm:text-sm text-stone-900 leading-tight truncate">{name}</p>
          <p className="text-[11px] text-stone-500 mt-0.5 truncate">{role}</p>
        </div>
      </div>
    </div>
  );
}
