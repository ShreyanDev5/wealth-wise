'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  Check,
  ArrowRight,
  MessageCircle,
  ChevronDown,
  PhoneCall,
  Compass,
  LineChart,
  FileText,
} from "lucide-react";
import { SimplePageHeader } from "@/components/ui/simple-page-header";
import { AnimatedSection } from "@/components/ui/animated-section";
import InvestFaq from "@/components/landing/invest-faq";
import { cn } from "@/lib/utils";

export default function InvestContent() {
  const clientFirstName = process.env.NEXT_PUBLIC_CLIENT_FIRST_NAME || "Monotosh";
  const rawPhone = process.env.NEXT_PUBLIC_CLIENT_PHONE || "98364 72260";
  const cleanPhone = rawPhone.replace(/\s/g, '');
  const whatsAppNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  const partnerAMCs = [
    { name: "SBI Mutual Fund", logo: "/sbi.png" },
    { name: "HDFC Mutual Fund", logo: "/hdfc.png" },
    { name: "ICICI Prudential", logo: "/icici.png" },
    { name: "Nippon India", logo: "/nippon.png" },
  ];

  const highlights = [
    "Systematic Investment Plans (SIP) starting from ₹500/month with automated rupee-cost averaging",
    "Direct access to top-performing equity, hybrid, and debt funds across India's leading AMCs",
    "Periodic portfolio rebalancing, milestone reviews, and disciplined asset allocation",
    "High liquidity with redemption payouts credited directly to your registered bank account",
  ];

  const documents = [
    "PAN Card and Aadhaar for one-time digital KYC verification",
    "Cancelled cheque or bank passbook copy for automated SIP debit setup",
    "Nominee KYC details and relationship declaration",
    "Aadhaar-linked mobile number for instant paperless e-sign verification",
  ];

  const processSteps = [
    "Financial goal & risk profiling consultation with Monotosh",
    "One-time paperless digital KYC completed in under 5 minutes",
    "Curated fund selection & automated monthly SIP mandate activation",
    "Periodic performance reviews and dedicated mobile app portfolio tracking",
  ];

  const pricingGuidelines = [
    { label: "Advisory & Setup", value: "Zero fees for regular plan investors" },
    { label: "Fund Management", value: "TER capped by SEBI (built into NAV)" },
    { label: "Equity LTCG (> 1 yr)", value: "12.5% on gains above ₹1.25L / year" },
    { label: "Equity STCG (< 1 yr)", value: "Flat 20% on short-term capital gains" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
      {/* Header */}
      <SimplePageHeader 
        title="Mutual Funds &amp; Wealth Growth" 
        description="Disciplined wealth creation through goal-based asset allocation, systematic investing, and professional portfolio monitoring." 
        badge="Wealth &amp; Growth"
      />

      {/* Main Advisory Card */}
      <div id="mutual-funds" className="scroll-mt-28">
        <AnimatedSection animation="fade-up" delay={0} duration={350}>
          <div className="bg-white/95 rounded-2xl sm:rounded-3xl border border-stone-200/80 p-5 sm:p-7 shadow-2xs hover:shadow-xs hover:border-stone-300 transition-all duration-200 text-left">
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800 border border-stone-200/60 flex-shrink-0 mt-0.5">
                  <TrendingUp className="w-5 h-5 text-emerald-800" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 leading-tight">
                    Mutual Fund Portfolios
                  </h3>

                  {/* Partner AMCs Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap mt-1.5 text-xs text-stone-500">
                    <span>Partner AMCs:</span>
                    {partnerAMCs.map((amc, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-stone-50 rounded-md border border-stone-200/70 text-xs text-stone-700"
                      >
                        <Image 
                          src={amc.logo} 
                          alt={amc.name} 
                          width={36} 
                          height={14} 
                          className="h-3 w-auto object-contain" 
                        />
                        <span className="font-medium">{amc.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop Direct WhatsApp CTA */}
              <a
                href={`https://wa.me/${whatsAppNumber}?text=Hi%20${encodeURIComponent(clientFirstName)}%2C%20I'd%20like%20guidance%20on%20starting%20a%20disciplined%20SIP%20or%20reviewing%20my%20mutual%20fund%20portfolio.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-medium text-xs shadow-2xs hover:shadow-xs transition-all flex-shrink-0 self-start mt-0.5"
                aria-label="Start SIP on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                <span>Start SIP on WhatsApp</span>
              </a>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
              Disciplined wealth creation through systematic investing (SIP) and goal-based asset allocation tailored to your family&apos;s financial milestones and time horizon.
            </p>

            {/* Symmetrical 2x2 Highlights Grid */}
            <div className="mt-4 pt-3.5 border-t border-stone-100">
              <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-x-6">
                {highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-stone-700 leading-relaxed font-normal">
                    <Check className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements & Process Toggle */}
            <div className="mt-4 pt-3.5 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                className="w-full flex items-center justify-between text-xs font-medium text-stone-500 hover:text-stone-900 py-1 transition-colors group"
                aria-expanded={isDetailsExpanded}
              >
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-600 transition-colors" />
                  <span>{isDetailsExpanded ? "Hide paperwork, onboarding steps & tax guidelines" : "View paperwork, onboarding steps & tax guidelines"}</span>
                </span>
                <ChevronDown className={cn("w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-transform duration-200", isDetailsExpanded && "rotate-180")} />
              </button>

              {/* Clean Sans-Serif Drawer Content */}
              {isDetailsExpanded && (
                <div className="mt-4 pt-4 border-t border-stone-100 space-y-5 font-sans">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Documents */}
                    <div>
                      <div className="text-xs font-semibold text-stone-900 mb-2.5 font-sans">
                        Documents needed for KYC
                      </div>
                      <ul className="space-y-1.5">
                        {documents.map((doc, idx) => (
                          <li key={idx} className="text-xs text-stone-600 flex items-start gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-300 mt-1.5 flex-shrink-0" />
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Process */}
                    <div>
                      <div className="text-xs font-semibold text-stone-900 mb-2.5 font-sans">
                        How onboarding works
                      </div>
                      <ol className="space-y-1.5 list-decimal list-inside text-xs text-stone-600 marker:text-stone-400 marker:font-medium leading-relaxed">
                        {processSteps.map((step, idx) => (
                          <li key={idx}>
                            <span className="text-stone-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Structured Tax & Fee Chips */}
                  <div className="pt-3 border-t border-stone-100 font-sans">
                    <div className="text-xs font-semibold text-stone-900 mb-2 font-sans">
                      Fees &amp; Tax Rules (Finance Act 2024)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pricingGuidelines.map((item, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-stone-50/80 border border-stone-200/70 text-xs"
                        >
                          <span className="text-stone-600 font-medium">{item.label}</span>
                          <span className="font-semibold text-stone-900 text-right flex-shrink-0">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile WhatsApp Action */}
            <div className="mt-4 sm:hidden">
              <a
                href={`https://wa.me/${whatsAppNumber}?text=Hi%20${encodeURIComponent(clientFirstName)}%2C%20I'd%20like%20guidance%20on%20starting%20a%20disciplined%20SIP%20or%20reviewing%20my%20mutual%20fund%20portfolio.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-medium text-xs shadow-2xs"
                aria-label="Start SIP on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200" />
                <span>Start SIP on WhatsApp</span>
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* The Advisory Advantage Section */}
      <AnimatedSection animation="fade-up" delay={50} duration={350}>
        <div className="rounded-2xl sm:rounded-3xl border border-stone-200/80 bg-white/95 p-6 sm:p-8 shadow-2xs text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/70">
            <div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                The Advisory Advantage
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-2">
                Why Invest With an Advisor Instead of DIY Apps?
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl leading-relaxed">
                Investing is simple, but staying disciplined during market swings is hard. We help you navigate volatility and reach your financial goals.
              </p>
            </div>
            <a
              href={`https://wa.me/${whatsAppNumber}?text=Hi%20${encodeURIComponent(clientFirstName)}%2C%20I'd%20like%20to%20discuss%20portfolio%20planning%20and%20disciplined%20investing.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-medium text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all flex-shrink-0 self-start sm:self-auto"
            >
              <PhoneCall className="w-4 h-4 text-emerald-200" />
              <span>Free Consultation</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 font-sans">
            <div className="space-y-1">
              <div className="text-sm font-medium text-stone-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Market Correction Discipline</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                When markets dip, human emotion says sell. We prevent panic-selling and ensure you stay invested to capture full long-term compounding.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-medium text-stone-900 flex items-center gap-2">
                <LineChart className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Goal-Linked Allocation</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                We map SIPs to real-life family milestones—higher education, home purchase, and retirement—rather than chasing last month&apos;s top fund.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-medium text-stone-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Zero-Paperwork Service</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Consolidated family statements, nomination updates, bank changes, and capital gains reports ready for easy ITR filing.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <div id="mutual-fund-faq" className="scroll-mt-28">
        <InvestFaq />
      </div>

      {/* Cross-Navigation Next Step (Borderless & Airy) */}
      <div className="pt-2 sm:pt-4 text-center">
        <p className="text-xs sm:text-sm text-stone-500">
          Want to see how your money could compound over time?
        </p>
        <Link 
          href="/calculators" 
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-900 mt-1.5 transition-colors group"
        >
          <span>Project with Financial Calculators</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
