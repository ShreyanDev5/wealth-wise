"use client";

import { useState } from "react";
import { BookOpen, Shield, TrendingUp, Receipt } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  items: FaqItem[];
}

const categories: FaqCategory[] = [
  {
    id: 'basics',
    label: 'Getting Started',
    icon: BookOpen,
    items: [
      {
        question: 'How do mutual funds work?',
        answer: 'A mutual fund pools money from multiple investors into a diversified basket of stocks, bonds, or government securities managed by professional fund managers. You earn returns as the value of the underlying assets grows. You can start with as little as ₹500/month via SIP.',
      },
      {
        question: 'Do I need a Demat account to invest?',
        answer: 'No. A Demat account is not required for mutual funds. Investments are held directly as units registered with the fund house (AMC). You only need a one-time paperless KYC using your PAN, Aadhaar, and active bank account.',
      },
      {
        question: 'What is the difference between SIP and Lump Sum?',
        answer: 'An SIP (Systematic Investment Plan) automatically invests a fixed amount monthly, averaging out market fluctuations (rupee-cost averaging). A Lump Sum is a one-time investment of capital, best suited when deploying bonuses, savings, or business proceeds.',
      },
    ],
  },
  {
    id: 'safety',
    label: 'Safety & Risk',
    icon: Shield,
    items: [
      {
        question: 'Is my money safe? What if the fund company closes?',
        answer: 'Mutual funds in India are strictly regulated by SEBI. Your invested assets are held by an independent custodian (usually a designated bank), not on the balance sheet of the fund house. If an AMC ceases operations, SEBI transfers the funds to another regulated institution or liquidates the assets directly back to unit holders.',
      },
      {
        question: 'Can I lose all my money in a mutual fund?',
        answer: 'Because mutual funds diversify across 40–80+ different securities, the risk of total loss is virtually zero in diversified funds. Market values fluctuate short-term, but holding equity funds for 5+ years historically delivers consistent inflation-beating growth.',
      },
    ],
  },
  {
    id: 'returns',
    label: 'Returns & Growth',
    icon: TrendingUp,
    items: [
      {
        question: 'What returns can I realistically expect?',
        answer: 'While market returns are never guaranteed, long-term diversified equity funds in India have historically delivered average annualized returns between 12% and 15% over 7–10 year horizons. Conservative hybrid and debt funds typically deliver between 7% and 9%.',
      },
      {
        question: 'How quickly can I withdraw my money?',
        answer: 'Most mutual funds are highly liquid. Open-ended equity funds credit withdrawals directly to your bank account within 2–3 business days. Liquid funds typically credit within 24 hours. Only tax-saving ELSS funds have a mandatory 3-year lock-in.',
      },
    ],
  },
  {
    id: 'tax',
    label: 'Tax Rules (Budget 2024)',
    icon: Receipt,
    items: [
      {
        question: 'How are mutual fund profits taxed in India?',
        answer: 'As per the latest Finance Act 2024: For equity funds held over 1 year (LTCG), gains above ₹1.25 Lakhs per financial year are taxed at 12.5% (the first ₹1.25 Lakhs is completely tax-free). Equity gains held under 1 year (STCG) are taxed at 20%. Debt fund gains are taxed according to your individual income tax slab.',
      },
      {
        question: 'Can mutual funds help me save income tax?',
        answer: 'Yes. ELSS (Equity Linked Savings Scheme) allows deductions up to ₹1.5 Lakhs under Section 80C, with the shortest lock-in period (3 years) among all 80C investment options.',
      },
    ],
  },
];

export default function InvestFaq() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const activeCat = categories.find((c) => c.id === activeCategory) ?? categories[0];

  return (
    <AnimatedSection animation="fade-up" delay={50} duration={350}>
      <div className="w-full">
        {/* Header & Floating Segmented Tabs */}
        <div className="text-center mb-6 flex flex-col items-center">
          <span className="inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 mb-2">
            Investor Guidance
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>

          {/* Floating Category Filter Pills */}
          <div className="inline-flex p-1 bg-stone-100/90 rounded-full border border-stone-200/70 overflow-x-auto no-scrollbar gap-1 max-w-full">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = cat.id === activeCategory;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap",
                    isActive
                      ? "bg-white text-stone-900 shadow-xs font-semibold"
                      : "text-stone-600 hover:text-stone-900"
                  )}
                >
                  <Icon className="w-3.5 h-3.5 text-stone-500" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Unified FAQ Card */}
        <div className="bg-white/95 rounded-2xl sm:rounded-3xl shadow-2xs border border-stone-200/80 p-5 sm:p-7 text-left font-sans">
          <Accordion type="single" collapsible defaultValue={`${activeCat.id}-0`}>
            {activeCat.items.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`${activeCat.id}-${idx}`}
                className="border-b border-stone-100 last:border-b-0"
              >
                <AccordionTrigger className="text-left text-xs sm:text-sm font-medium text-stone-900 hover:no-underline py-3.5 leading-snug font-sans group">
                  <span>{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-[13px] text-stone-600 pb-3.5 leading-relaxed font-sans pr-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Quiet Regulatory Disclaimer */}
        <p className="text-[11px] text-stone-400 text-center mt-3 leading-relaxed">
          Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing.
        </p>
      </div>
    </AnimatedSection>
  );
}
