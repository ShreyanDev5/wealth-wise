import { AnimatedSection } from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";

export function SimplePageHeader({ 
  title, 
  description, 
  badge,
  className 
}: { 
  title: string; 
  description: string; 
  badge?: string;
  badgeColorScheme?: 'orange' | 'blue' | 'purple' | 'emerald';
  color?: string;
  className?: string;
}) {
  return (
    <AnimatedSection
      animation="elegant-fade"
      delay={0}
      duration={300}
      className={cn("text-center flex flex-col items-center mb-6 sm:mb-8", className)}
    >
      {badge && (
        <span className="inline-block text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200/60 mb-2.5">
          {badge}
        </span>
      )}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-stone-900 mb-2 tracking-tight">
        {title}
      </h1>
      <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto px-4 sm:px-0 leading-relaxed text-pretty">
        {description}
      </p>
    </AnimatedSection>
  );
}