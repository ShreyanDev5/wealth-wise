'use client';

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { SimplePageHeader } from "@/components/ui/simple-page-header";
import InvestmentCalculatorRefined from "@/components/landing/investment-return-calculator-refined";
import { ChildEducationCalculatorWithToggleRefined } from "@/components/landing/child-education-planner-refined";
import ChildMarriageCalculatorRefined from "@/components/landing/child-marriage-planner-refined";
import IncomePlanningCalculatorRefined from "@/components/landing/retirement-planner-refined";

export default function CalculatorsContentRefined() {
  const clientFirstName = process.env.NEXT_PUBLIC_CLIENT_FIRST_NAME || "Monotosh";
  const rawPhone = process.env.NEXT_PUBLIC_CLIENT_PHONE || "98364 72260";
  const cleanPhone = rawPhone.replace(/\s/g, '');
  const whatsAppNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

  const [activeCategory, setActiveCategory] = useState<'all' | 'investment' | 'education' | 'retirement' | 'marriage'>('all');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  const checkScrollLimits = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setShowLeftScroll(el.scrollLeft > 4);
    const maxScroll = el.scrollWidth - el.clientWidth;
    setShowRightScroll(el.scrollLeft < maxScroll - 4);
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = 200;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScrollLimits();

    const resizeObserver = new ResizeObserver(() => {
      checkScrollLimits();
    });
    resizeObserver.observe(el);

    window.addEventListener("resize", checkScrollLimits);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkScrollLimits);
    };
  }, []);

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1).toLowerCase();
        if (id.includes("investment")) {
          setActiveCategory("investment");
        } else if (id.includes("education")) {
          setActiveCategory("education");
        } else if (id.includes("income") || id.includes("retirement")) {
          setActiveCategory("retirement");
        } else if (id.includes("marriage") || id.includes("wedding")) {
          setActiveCategory("marriage");
        }
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);

    return () => {
      window.removeEventListener("hashchange", checkHash);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col items-center">
        <SimplePageHeader 
          title="Financial Calculators" 
          description="Interactive planners to project returns on systematic investments (SIP), child higher education, retirement corpus, and major life milestones."
          badge="Planning Tools"
        />

        {/* Category Filter Pills Wrapper */}
        <div className="relative w-full max-w-2xl mx-auto overflow-hidden z-20 py-1">
          <button 
            type="button"
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 transition-opacity duration-200 sm:hidden ${
              showLeftScroll ? "opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll left"
          >
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-xs border border-stone-200">
              <ChevronLeft className="w-3.5 h-3.5 text-stone-700" />
            </span>
          </button>

          <button 
            type="button"
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 transition-opacity duration-200 sm:hidden ${
              showRightScroll ? "opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll right"
          >
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-xs border border-stone-200">
              <ChevronRight className="w-3.5 h-3.5 text-stone-700" />
            </span>
          </button>

          <div 
            ref={scrollContainerRef}
            onScroll={checkScrollLimits}
            className="flex overflow-x-auto sm:overflow-x-visible no-scrollbar w-full justify-start sm:justify-center gap-1.5 p-1 bg-stone-100/80 rounded-full border border-stone-200/70"
          >
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 text-xs rounded-full font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Planners
            </button>
            <button
              onClick={() => setActiveCategory('investment')}
              className={`px-3.5 py-1.5 text-xs rounded-full font-medium transition-all ${
                activeCategory === 'investment'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              SIP / Lump Sum
            </button>
            <button
              onClick={() => setActiveCategory('education')}
              className={`px-3.5 py-1.5 text-xs rounded-full font-medium transition-all ${
                activeCategory === 'education'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Child Education
            </button>
            <button
              onClick={() => setActiveCategory('retirement')}
              className={`px-3.5 py-1.5 text-xs rounded-full font-medium transition-all ${
                activeCategory === 'retirement'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Retirement
            </button>
            <button
              onClick={() => setActiveCategory('marriage')}
              className={`px-3.5 py-1.5 text-xs rounded-full font-medium transition-all ${
                activeCategory === 'marriage'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Child Marriage
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-10 sm:space-y-12">
        {/* Investment Calculator */}
        {(activeCategory === 'all' || activeCategory === 'investment') && (
          <div id="investment-calculator" className="scroll-mt-28">
            <InvestmentCalculatorRefined />
          </div>
        )}

        {/* Child Education Calculator */}
        {(activeCategory === 'all' || activeCategory === 'education') && (
          <div id="child-education-calculator" className="scroll-mt-28">
            <ChildEducationCalculatorWithToggleRefined />
          </div>
        )}

        {/* Income Planning Calculator */}
        {(activeCategory === 'all' || activeCategory === 'retirement') && (
          <div id="income-planning-calculator" className="scroll-mt-28">
            <IncomePlanningCalculatorRefined />
          </div>
        )}

        {/* Marriage Expense Planner */}
        {(activeCategory === 'all' || activeCategory === 'marriage') && (
          <div id="child-marriage-calculator" className="scroll-mt-28">
            <ChildMarriageCalculatorRefined />
          </div>
        )}
      </div>

      {/* Consultation Bridge */}
      <div className="pt-8 sm:pt-10 text-center border-t border-stone-200/60">
        <p className="text-xs sm:text-sm text-stone-500">
          Ready to turn these estimates into an actionable investment plan?
        </p>
        <a
          href={`https://wa.me/${whatsAppNumber}?text=Hi%20${encodeURIComponent(clientFirstName)}%2C%20I%20used%20your%20financial%20calculators%20and%20would%20like%20to%20discuss%20a%20personalized%20plan.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-900 mt-1.5 transition-colors group"
        >
          <span>Discuss Your Numbers with Monotosh Sardar</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}