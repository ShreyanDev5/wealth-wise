import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon?: LucideIcon;
  description?: string;
  className?: string;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  className,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        "bg-white/90 p-4 sm:p-5 rounded-2xl border border-stone-200/70 flex flex-col justify-between transition-all duration-200 shadow-sm hover:shadow-md hover:border-stone-300 backdrop-blur-md",
        className
      )}
    >
      <div className="flex flex-col items-center text-center">
        {Icon && (
          <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center mb-2 shadow-xs">
            <Icon className="w-4 h-4" />
          </div>
        )}
        
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-stone-900 mb-0.5 tracking-tight">
          {value}
        </div>
        
        <h3 className="text-xs sm:text-[13px] font-medium text-stone-600 leading-tight">
          {title}
        </h3>
      </div>
      
      {description && (
        <p className="text-[11px] text-stone-400 leading-normal text-center mt-2 pt-2 border-t border-stone-100">
          {description}
        </p>
      )}
    </div>
  );
};
