"use client";

import { useState } from "react";
import { BookOpen, Shield, TrendingUp, Receipt, HelpCircle, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
    <AnimatedSection animation="elegant-fade" delay={100} duration={350}>
      <div className="w-full max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            Common Investor Questions
          </div>
          <h2 className="text-2xl font-bold font-serif text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-sm border border-stone-200/80 overflow-hidden">
          {/* Category Tabs */}
          <div className="p-2 border-b border-stone-100 bg-stone-50/50">
            <div className="flex gap-1 overflow-x-auto no-scrollbar justify-start sm:justify-center">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = cat.id === activeCategory;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                      inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap
                      ${
                        isActive
                          ? 'bg-stone-900 text-white shadow-xs font-semibold'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                      }
                    `}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Questions Accordion */}
          <div className="p-4 sm:p-6">
            <Accordion type="single" collapsible defaultValue={`${activeCat.id}-0`} className="space-y-2">
              {activeCat.items.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`${activeCat.id}-${idx}`}
                  className="border border-stone-200/60 rounded-2xl px-4 overflow-hidden data-[state=open]:border-stone-300 data-[state=open]:bg-stone-50/40 transition-all"
                >
                  <AccordionTrigger className="text-left text-xs sm:text-sm font-semibold text-stone-900 hover:no-underline py-3.5 leading-snug">
                    <span className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-700 opacity-60 flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                      <span>{item.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-[13px] text-stone-600 pl-5 pb-4 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Subtle Disclaimer */}
          <div className="px-6 py-3 bg-stone-50/70 border-t border-stone-100 text-center">
            <p className="text-[10px] text-stone-500 leading-tight">
              Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
