'use client';

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollToTopProps {
  threshold?: number;
  className?: string;
}

export function ScrollToTop({ threshold = 400, className }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className={cn(
        "fixed z-40 flex items-center justify-center w-10 h-10 rounded-full",
        "bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-2xs hover:shadow-xs",
        "text-stone-600 hover:text-stone-900 hover:border-stone-300",
        "bottom-[180px] right-4 sm:right-6 md:bottom-20 md:right-8",
        "transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/40",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none",
        className
      )}
    >
      <ArrowUp className="w-4 h-4 text-stone-700" />
    </button>
  );
}
