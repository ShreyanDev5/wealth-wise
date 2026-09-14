'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SimplePageHeader } from "@/components/ui/simple-page-header";
import { AnimatedSection } from "@/components/ui/animated-section";
import InvestmentCalculatorRefined from "@/components/landing/investment-return-calculator-refined";
import { ChildEducationCalculatorWithToggleRefined } from "@/components/landing/child-education-planner-refined";
import ChildMarriageCalculatorRefined from "@/components/landing/child-marriage-planner-refined";
import IncomePlanningCalculatorRefined from "@/components/landing/retirement-planner-refined";
import { cn } from "@/lib/utils";

export default function CalculatorsContentRefined() {
  const clientFirstName = process.env.NEXT_PUBLIC_CLIENT_FIRST_NAME || "Monotosh";
  const rawPhone = process.env.NEXT_PUBLIC_CLIENT_PHONE || "98364 72260";
  const cleanPhone = rawPhone.replace(/\s/g, '');
  const whatsAppNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

  const [activeCategory, setActiveCategory] = useState<'all' | 'investment' | 'education' | 'retirement' | 'marriage'>('all');

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
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header & Category Filter */}
      <div className="flex flex-col items-center mb-5 sm:mb-6">
        <SimplePageHeader 
          title="Financial Calculators" 
          description="Plan your investments, education funds, retirement corpus, and life milestones."
          className="mb-4 sm:mb-5"
        />

        {/* Segmented Category Filter */}
        <div className="inline-flex p-1 bg-stone-100/90 rounded-full border border-stone-200/70 overflow-x-auto no-scrollbar gap-1 max-w-full justify-start sm:justify-center">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={cn(
              "px-3.5 py-1.5 text-xs rounded-full font-medium transition-all shrink-0",
              activeCategory === 'all'
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            )}
          >
            All Planners
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('investment')}
            className={cn(
              "px-3.5 py-1.5 text-xs rounded-full font-medium transition-all shrink-0",
              activeCategory === 'investment'
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            )}
          >
            SIP / Lump Sum
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('education')}
            className={cn(
              "px-3.5 py-1.5 text-xs rounded-full font-medium transition-all shrink-0",
              activeCategory === 'education'
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            )}
          >
            Child Education
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('retirement')}
            className={cn(
              "px-3.5 py-1.5 text-xs rounded-full font-medium transition-all shrink-0",
              activeCategory === 'retirement'
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            )}
          >
            Retirement
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('marriage')}
            className={cn(
              "px-3.5 py-1.5 text-xs rounded-full font-medium transition-all shrink-0",
              activeCategory === 'marriage'
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            )}
          >
            Child Marriage
          </button>
        </div>
      </div>

      {/* Calculator Cards */}
      <div className="space-y-8 sm:space-y-10">
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



      {/* Cross-Navigation Next Step (Borderless & Airy) */}
      <div className="mt-8 sm:mt-10 pt-2 sm:pt-4 text-center">
        <p className="text-xs sm:text-sm text-stone-500">
          Ready to start investing toward your goals?
        </p>
        <Link 
          href="/invest" 
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-900 mt-1.5 transition-colors group"
        >
          <span>Explore Mutual Fund Investments</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}