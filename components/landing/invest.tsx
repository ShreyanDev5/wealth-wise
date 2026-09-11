'use client';

import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/ui/service-card";
import { SimplePageHeader } from "@/components/ui/simple-page-header";
import InvestFaq from "@/components/landing/invest-faq";

export default function InvestContent() {
  const clientFirstName = process.env.NEXT_PUBLIC_CLIENT_FIRST_NAME || "Monotosh";
  const mutualFundServices = {
    title: "Mutual Fund Portfolios",
    description: "Personalized equity, debt, and hybrid fund selection tailored to your financial goals and risk tolerance.",
    benefits: [
      "Disciplined SIP investments with rupee-cost averaging.",
      "Access to top-rated funds across SBI, HDFC, ICICI, Nippon, and Axis.",
      "Regular portfolio review and rebalancing to match changing market conditions.",
      "High liquidity on business days without lock-ins (except tax-saving ELSS).",
    ],
    documents: [
      "PAN Card and Aadhaar for one-time online KYC",
      "Active bank account details (cheque or passbook copy)",
      "Nominee details and KYC",
      "Mobile number linked to Aadhaar for e-sign verification",
    ],
    process: [
      "Goal & risk profiling consultation with your advisor",
      "Instant paperless KYC setup via OTP verification",
      "Fund selection and automated SIP or Lumpsum mandate setup",
      "Ongoing portfolio tracking via dedicated app & statement reports",
    ],
    costs: [
      "Zero advisory fees for regular plan investors",
      "Annual Total Expense Ratio (TER) directly managed by fund houses (SEBI capped)",
      "Capital gains tax rules apply as per latest Union Budget (Finance Act 2024)",
    ],
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
      <SimplePageHeader 
        title="Mutual Funds &amp; Investments" 
        description="Disciplined wealth creation through goal-based asset allocation, systematic investing, and professional portfolio monitoring." 
        badge="Wealth &amp; Growth"
      />

      {/* Mutual Fund Advisory Card */}
      <div id="mutual-funds" className="scroll-mt-28">
        <ServiceCard
          title={mutualFundServices.title}
          description={mutualFundServices.description}
          benefits={mutualFundServices.benefits}
          documents={mutualFundServices.documents}
          process={mutualFundServices.process}
          costs={mutualFundServices.costs}
          icon={TrendingUp}
          ctaText="Start Investing via WhatsApp"
          delay={0}
          animation="elegant-fade"
          whatsAppMessage={`Hi ${clientFirstName}, I'd like to discuss starting a disciplined SIP or mutual fund portfolio.`}
        />
      </div>

      {/* FAQ Section */}
      <div id="mutual-fund-faq" className="scroll-mt-28 pt-2">
        <InvestFaq />
      </div>

      {/* Cross-Navigation Next Step */}
      <div className="pt-8 sm:pt-10 text-center border-t border-stone-200/60">
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
