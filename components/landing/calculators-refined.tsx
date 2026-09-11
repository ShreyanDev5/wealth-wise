'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, ShieldCheck, Coins, CalendarCheck } from "lucide-react";
import { SimplePageHeader } from "@/components/ui/simple-page-header";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
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
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
      {/* Header & Category Filter */}
      <div className="flex flex-col items-center">
        <SimplePageHeader 
          title="Financial Calculators" 
          description="Interactive planners to project returns on systematic investments (SIP), child higher education, retirement corpus, and major life milestones."
          badge="Planning Tools"
        />

        {/* Clean Segmented Category Filter */}
        <div className="p-1 bg-stone-100/90 rounded-2xl sm:rounded-full border border-stone-200/70 w-full sm:w-auto flex flex-wrap sm:flex-nowrap justify-center gap-1">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={cn(
              "px-3 py-1.5 text-[11px] sm:text-xs rounded-xl sm:rounded-full font-medium transition-all text-center",
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
              "px-3 py-1.5 text-[11px] sm:text-xs rounded-xl sm:rounded-full font-medium transition-all text-center",
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
              "px-3 py-1.5 text-[11px] sm:text-xs rounded-xl sm:rounded-full font-medium transition-all text-center",
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
              "px-3 py-1.5 text-[11px] sm:text-xs rounded-xl sm:rounded-full font-medium transition-all text-center",
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
              "px-3 py-1.5 text-[11px] sm:text-xs rounded-xl sm:rounded-full font-medium transition-all text-center",
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

      {/* The Advisory Advantage Section */}
      <AnimatedSection animation="fade-up" delay={50} duration={350}>
        <div className="w-full max-w-3xl mx-auto rounded-2xl sm:rounded-3xl border border-stone-200/80 bg-white/95 p-6 sm:p-8 shadow-2xs text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/70">
            <div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                The Advisory Advantage
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-2">
                From Calculator Math to a Real-World Financial Plan
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl leading-relaxed">
                Calculators assume steady, straight-line growth with zero volatility. Real life brings market swings, inflation spikes, and tax rules that require professional navigation.
              </p>
            </div>
            <a
              href={`https://wa.me/${whatsAppNumber}?text=Hi%20${encodeURIComponent(clientFirstName)}%2C%20I%20used%20your%20financial%20calculators%20and%20would%20like%20to%20review%20my%20numbers.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-medium text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all flex-shrink-0 self-start sm:self-auto"
            >
              <PhoneCall className="w-4 h-4 text-emerald-200" />
              <span>Discuss Your Goals</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 font-sans">
            <div className="space-y-1">
              <div className="text-sm font-medium text-stone-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Sequence of Returns Risk</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Markets don&apos;t grow in a straight line. We protect near-term goals by systematically shifting equity gains to debt funds before your target date.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-medium text-stone-900 flex items-center gap-2">
                <Coins className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Inflation &amp; Tax Reality</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Factoring in real education inflation (8–10%) and updated LTCG tax provisions (Finance Act 2024) so your future corpus never falls short.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-medium text-stone-900 flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Annual Milestone Reviews</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Periodic portfolio rebalancing, step-up SIP adjustments as your income rises, and goal-tracking to ensure you stay on course.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Cross-Navigation Next Step (Borderless & Airy) */}
      <div className="pt-2 sm:pt-4 text-center">
        <p className="text-xs sm:text-sm text-stone-500">
          Have your target numbers in mind? Start turning them into real-world wealth.
        </p>
        <Link 
          href="/invest" 
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-900 mt-1.5 transition-colors group"
        >
          <span>Explore Mutual Funds &amp; SIP Portfolios</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}