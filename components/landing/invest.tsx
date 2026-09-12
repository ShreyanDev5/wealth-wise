'use client';

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Check,
  ArrowRight,
  MessageCircle,
  ChevronDown,
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
    "Start an SIP from ₹500/month to grow your savings steadily over time",
    "Carefully selected equity, hybrid, and debt funds from India's top fund houses",
    "Regular portfolio reviews and rebalancing to keep your goals on track",
    "Easy withdrawals deposited directly into your bank account within 2–3 days",
  ];

  const documents = [
    "PAN card and Aadhaar for one-time paperless KYC",
    "Cancelled cheque or bank passbook copy for auto-debit setup",
    "Nominee identity proof (Aadhaar or PAN)",
    "Aadhaar-linked phone number for instant OTP verification",
  ];

  const processSteps = [
    "Quick consultation with Monotosh to map your financial goals",
    "Paperless KYC completed online in under 5 minutes",
    "Fund selection and automatic monthly SIP setup",
    "Ongoing portfolio tracking and periodic performance check-ins",
  ];

  const pricingGuidelines = [
    { label: "Advisory & Setup", value: "Free" },
    { label: "Fund Management (TER)", value: "Standard SEBI rates (built into NAV)" },
    { label: "Long-Term Gains (> 1 yr)", value: "12.5% on profits over ₹1.25L / yr" },
    { label: "Short-Term Gains (< 1 yr)", value: "Flat 20% on profits" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
      {/* Header */}
      <SimplePageHeader 
        title="Mutual Funds &amp; SIPs" 
        description="Grow your wealth steadily with goal-focused SIPs, handpicked funds, and regular portfolio reviews." 
      />

      {/* Main Advisory Card */}
      <div id="mutual-funds" className="scroll-mt-28">
        <AnimatedSection animation="fade-up" delay={0} duration={350}>
          <div className="bg-white/95 rounded-2xl sm:rounded-3xl border border-stone-200/80 p-5 sm:p-7 shadow-2xs hover:shadow-xs hover:border-stone-300 transition-all duration-200 text-left">
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800 border border-stone-200/60 flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-emerald-800" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 leading-tight">
                  Mutual Fund Portfolios
                </h3>
              </div>

              {/* Desktop Direct WhatsApp CTA */}
              <a
                href={`https://wa.me/${whatsAppNumber}?text=Hi%20${encodeURIComponent(clientFirstName)}%2C%20I'd%20like%20guidance%20on%20starting%20a%20disciplined%20SIP%20or%20reviewing%20my%20mutual%20fund%20portfolio.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium text-xs shadow-2xs hover:shadow-xs transition-all flex-shrink-0"
                aria-label="Start SIP on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-100" />
                <span>Start SIP on WhatsApp</span>
              </a>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-600 mt-2.5 sm:mt-3 leading-normal">
              Build wealth steadily through monthly SIPs tailored to your family&apos;s goals and time horizon.
            </p>

            {/* Symmetrical 2x2 Highlights Grid */}
            <div className="mt-4 pt-3.5 border-t border-stone-100">
              <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-x-6">
                {highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-stone-700 leading-normal font-normal">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
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
                <span className="flex items-center gap-1.5 min-w-0 pr-2">
                  <FileText className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-600 transition-colors flex-shrink-0" />
                  <span className="truncate sm:whitespace-normal">
                    {isDetailsExpanded ? "Hide required documents, process & tax rules" : "View required documents, process & tax rules"}
                  </span>
                </span>
                <ChevronDown className={cn("w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-transform duration-200 flex-shrink-0", isDetailsExpanded && "rotate-180")} />
              </button>

              {/* Clean Sans-Serif Drawer Content */}
              {isDetailsExpanded && (
                <div className="mt-4 pt-4 border-t border-stone-100 space-y-5 font-sans">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Documents */}
                    <div>
                      <div className="text-xs font-semibold text-stone-900 mb-2.5 font-sans">
                        Required Documents
                      </div>
                      <ul className="space-y-1.5">
                        {documents.map((doc, idx) => (
                          <li key={idx} className="text-xs text-stone-600 flex items-start gap-2 leading-normal">
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-300 mt-1.5 flex-shrink-0" />
                            <span className="flex-1">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Process */}
                    <div>
                      <div className="text-xs font-semibold text-stone-900 mb-2.5 font-sans">
                        How It Works
                      </div>
                      <ol className="space-y-1.5 text-xs text-stone-600 leading-normal">
                        {processSteps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-stone-400 font-medium tabular-nums flex-shrink-0">{idx + 1}.</span>
                            <span className="text-stone-700 flex-1">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* Structured Tax & Fee Chips */}
                  <div className="pt-3 border-t border-stone-100 font-sans">
                    <div className="text-xs font-semibold text-stone-900 mb-2 font-sans">
                      Fees &amp; Tax Rules
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
                href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(clientFirstName)}%2C%20I'd%20like%20guidance%20on%20starting%20a%20disciplined%20SIP%20or%20reviewing%20my%20mutual%20fund%20portfolio.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 h-10 px-5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white rounded-full font-medium text-xs shadow-2xs transition-all"
                aria-label="Start SIP on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-100" />
                <span>Start SIP on WhatsApp</span>
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* FAQ Section */}
      <div id="mutual-fund-faq" className="scroll-mt-28 pt-8 sm:pt-14">
        <InvestFaq />
      </div>

      {/* Cross-Navigation Next Step (Borderless & Airy) */}
      <div className="pt-2 sm:pt-4 text-center">
        <p className="text-xs sm:text-sm text-stone-500">
          Want to see how your money could grow over time?
        </p>
        <Link 
          href="/calculators" 
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-900 mt-1.5 transition-colors group"
        >
          <span>Calculate Potential Returns</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
