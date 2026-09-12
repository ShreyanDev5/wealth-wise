'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  Bike,
  Car,
  ShieldCheck,
  Check,
  ArrowRight,
  MessageCircle,
  ChevronDown,
  FileText,
} from "lucide-react";
import { SimplePageHeader } from "@/components/ui/simple-page-header";
import { AnimatedSection } from "@/components/ui/animated-section";
import { cn } from "@/lib/utils";

interface PremiumRange {
  plan: string;
  cost: string;
}

interface PolicyItem {
  id: string;
  title: string;
  underwriters: {
    label: string;
    items: { name: string; logo?: string }[];
  };
  description: string;
  highlights: string[];
  documents: string[];
  process: string[];
  costs: PremiumRange[];
  icon: React.ElementType;
  whatsAppMsg: string;
}

export default function InsuranceContent() {
  const clientFirstName = process.env.NEXT_PUBLIC_CLIENT_FIRST_NAME || "Monotosh";
  const rawPhone = process.env.NEXT_PUBLIC_CLIENT_PHONE || "98364 72260";
  const cleanPhone = rawPhone.replace(/\s/g, '');
  const whatsAppNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

  const [activeCategory, setActiveCategory] = useState<'all' | 'health-life' | 'vehicle'>('all');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleDetails = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1).toLowerCase();
        if (id === "health-insurance" || id === "life-insurance") {
          setActiveCategory("health-life");
        } else if (
          id === "two-wheeler-insurance" ||
          id === "four-wheeler-(car)-insurance" ||
          id.includes("vehicle") ||
          id.includes("wheeler")
        ) {
          setActiveCategory("vehicle");
        }
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const policies: PolicyItem[] = [
    {
      id: "health-insurance",
      title: "Health Insurance",
      underwriters: {
        label: "Underwritten by",
        items: [
          { name: "Star Health", logo: "/starhealth.png" },
          { name: "Care Health", logo: "/care.png" },
        ],
      },
      description: "Cashless hospitalisation across network hospitals in Kolkata and nationwide, protecting your family from unexpected medical bills.",
      highlights: [
        "Cashless admission across network hospitals with quick approvals",
        "Covers hospital stays, daycare treatments, and pre/post-admission costs",
        "Annual No Claim Bonus and automatic recharge of sum insured",
        "Free annual health checkups and lifelong renewal with no penalties",
      ],
      documents: [
        "Aadhaar card and PAN",
        "Age proof (Birth Certificate or Class 10 Admit Card)",
        "Past medical discharge summaries (if any existing conditions)",
        "Previous policy copy (for renewals or porting)",
      ],
      process: [
        "Quick call to understand your family's healthcare requirements",
        "Transparent plan comparison between top health insurers",
        "Direct online payment through the insurer's official portal",
        "Direct personal support for cashless hospital admissions and claims",
      ],
      costs: [
        { plan: "Individual Plan", cost: "Typically ₹5,000 – ₹18,000 / year" },
        { plan: "Family Floater", cost: "Typically ₹14,000 – ₹38,000 / year" },
      ],
      icon: Heart,
      whatsAppMsg: `Hi ${clientFirstName}, I'd like help comparing health insurance plans for my family.`,
    },
    {
      id: "life-insurance",
      title: "Life Insurance",
      underwriters: {
        label: "Underwritten by",
        items: [{ name: "LIC of India", logo: "/lic.png" }],
      },
      description: "Affordable pure term protection, guaranteed savings, and pension policies backed by LIC of India.",
      highlights: [
        "High term cover at affordable premiums to secure your family's future",
        "Guaranteed savings and pension plans for milestone goals",
        "100% sovereign government guarantee backing all LIC claim settlements",
        "Tax deductions under Section 80C and tax-free payouts under Section 10(10D)",
      ],
      documents: [
        "Aadhaar card and PAN",
        "Income proof (Form 16, ITR, or salary slips for term plans)",
        "Nominee identity proof and bank details",
        "Medical checkup (only if required by policy limits)",
      ],
      process: [
        "Calculate the right cover based on your income, loans, and family needs",
        "Choose between term protection and guaranteed savings",
        "Complete the simple proposal form and receive your official receipt",
        "Lifetime personal support for address changes, nominees, and claims",
      ],
      costs: [
        { plan: "Pure Term Cover (₹50L – ₹1 Cr)", cost: "From ₹600 – ₹1,800 / month" },
        { plan: "Guaranteed Savings / Pension", cost: "Tailored to your target goal" },
      ],
      icon: ShieldCheck,
      whatsAppMsg: `Hi ${clientFirstName}, I'd like guidance on LIC term and savings plans.`,
    },
    {
      id: "two-wheeler-insurance",
      title: "Two-Wheeler Insurance",
      underwriters: {
        label: "Partner insurers",
        items: [{ name: "HDFC ERGO · Tata AIG · Bajaj Allianz · ICICI Lombard" }],
      },
      description: "Third-party and comprehensive insurance for bikes and scooters, issued in minutes over WhatsApp.",
      highlights: [
        "Instant policy PDF delivered on WhatsApp in under 15 minutes",
        "Coverage against road accidents, theft, fire, and flood damage",
        "Full No Claim Bonus (NCB) transfer from your previous policy",
        "Instant renewal with zero inspection for unexpired policies",
      ],
      documents: [
        "Vehicle Registration Certificate (RC) photo",
        "Owner's Driving Licence or Aadhaar",
        "Previous policy copy (for NCB discount)",
      ],
      process: [
        "Send a photo of your RC and old policy on WhatsApp",
        "Receive instant side-by-side quotes from top insurers",
        "Pay directly through the insurer's official online link",
        "Receive your policy PDF instantly on WhatsApp and email",
      ],
      costs: [
        { plan: "Third-Party Liability", cost: "Approx. ₹1,200 – ₹2,800 / year (statutory)" },
        { plan: "Comprehensive Package", cost: "Based on bike model and current IDV" },
      ],
      icon: Bike,
      whatsAppMsg: `Hi ${clientFirstName}, I'd like an instant quote for my two-wheeler insurance renewal.`,
    },
    {
      id: "four-wheeler-(car)-insurance",
      title: "Four-Wheeler (Car) Insurance",
      underwriters: {
        label: "Partner insurers",
        items: [{ name: "HDFC ERGO · Tata AIG · Bajaj Allianz · ICICI Lombard" }],
      },
      description: "Comprehensive car insurance with zero depreciation, engine protection, and cashless repairs across authorized workshops.",
      highlights: [
        "Cashless repairs across authorized manufacturer service centers",
        "Zero Depreciation add-on for full claim payouts with no parts deduction",
        "Engine and gearbox protection against water damage during monsoons",
        "24x7 Roadside Assistance for towing, battery jumpstarts, and flat tyres",
      ],
      documents: [
        "Vehicle Registration Certificate (RC) photo",
        "Owner's Driving Licence or Aadhaar",
        "Previous policy copy with NCB certificate",
      ],
      process: [
        "Share car model, year, and RC details on WhatsApp",
        "Review quotes with recommended add-ons like Zero Dep and RSA",
        "Pay securely on the insurer's portal with no physical inspection needed",
        "Receive your policy instantly with active cashless garage support",
      ],
      costs: [
        { plan: "Hatchback & Sedan", cost: "Approx. ₹6,000 – ₹18,000 / year" },
        { plan: "SUV & Premium Vehicles", cost: "Based on vehicle model and market IDV" },
      ],
      icon: Car,
      whatsAppMsg: `Hi ${clientFirstName}, I need a quote and comparison for my car insurance renewal.`,
    },
  ];

  const filteredPolicies = policies.filter((policy) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'health-life') {
      return policy.id === "health-insurance" || policy.id === "life-insurance";
    }
    if (activeCategory === 'vehicle') {
      return policy.id === "two-wheeler-insurance" || policy.id === "four-wheeler-(car)-insurance";
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
      {/* Header & Filter */}
      <div className="flex flex-col items-center">
        <SimplePageHeader 
          title="Insurance &amp; Family Protection" 
          description="Independent health, life, and vehicle insurance with direct personal claim support when your family needs it most." 
        />

        {/* Segmented Category Filter */}
        <div className="inline-flex p-1 bg-stone-100/90 rounded-full border border-stone-200/70 overflow-x-auto no-scrollbar gap-1 max-w-full justify-start sm:justify-center">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={cn(
              "px-3 sm:px-3.5 py-1.5 text-xs rounded-full font-medium transition-all whitespace-nowrap text-center",
              activeCategory === 'all'
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            )}
          >
            All Policies
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('health-life')}
            className={cn(
              "px-3 sm:px-3.5 py-1.5 text-xs rounded-full font-medium transition-all whitespace-nowrap text-center",
              activeCategory === 'health-life'
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            )}
          >
            Health &amp; Life
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('vehicle')}
            className={cn(
              "px-3 sm:px-3.5 py-1.5 text-xs rounded-full font-medium transition-all whitespace-nowrap text-center",
              activeCategory === 'vehicle'
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            )}
          >
            Motor Insurance
          </button>
        </div>
      </div>

      {/* Policy Cards */}
      <div className="space-y-6 sm:space-y-8">
        {filteredPolicies.map((policy) => {
          const isExpanded = !!expandedCards[policy.id];
          const PolicyIcon = policy.icon;

          return (
            <AnimatedSection
              key={policy.id}
              animation="fade-up"
              delay={0}
              duration={350}
              className="scroll-mt-28"
              id={policy.id}
            >
              <div className="bg-white/95 rounded-2xl sm:rounded-3xl border border-stone-200/80 p-5 sm:p-7 shadow-2xs hover:shadow-xs hover:border-stone-300 transition-all duration-200 text-left">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800 border border-stone-200/60 flex-shrink-0">
                      <PolicyIcon className="w-5 h-5 text-emerald-800" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 leading-tight">
                      {policy.title}
                    </h3>
                  </div>

                  {/* Desktop WhatsApp Action */}
                  <a
                    href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(policy.whatsAppMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium text-xs shadow-2xs hover:shadow-xs transition-all flex-shrink-0"
                    aria-label={`Get quote for ${policy.title} on WhatsApp`}
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-100" />
                    <span>Get Quote on WhatsApp</span>
                  </a>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 mt-2.5 sm:mt-3 leading-normal">
                  {policy.description}
                </p>

                {/* Symmetrical 2x2 Coverage Highlights */}
                <div className="mt-4 pt-3.5 border-t border-stone-100">
                  <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-x-6">
                    {policy.highlights.map((highlight, idx) => (
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
                    onClick={() => toggleDetails(policy.id)}
                    className="w-full flex items-center justify-between text-xs font-medium text-stone-500 hover:text-stone-900 py-1 transition-colors group"
                    aria-expanded={isExpanded}
                  >
                    <span className="flex items-center gap-1.5 min-w-0 pr-2">
                      <FileText className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-600 transition-colors flex-shrink-0" />
                      <span className="truncate sm:whitespace-normal">
                        {isExpanded ? "Hide required documents, process & estimated premiums" : "View required documents, process & estimated premiums"}
                      </span>
                    </span>
                    <ChevronDown className={cn("w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-transform duration-200 flex-shrink-0", isExpanded && "rotate-180")} />
                  </button>

                  {/* Clean Sans-Serif Drawer Content */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-stone-100 space-y-5 font-sans">
                      <div className="grid gap-6 sm:grid-cols-2">
                        {/* Documents */}
                        <div>
                          <div className="text-xs font-semibold text-stone-900 mb-2.5 font-sans">
                            Required Documents
                          </div>
                          <ul className="space-y-1.5">
                            {policy.documents.map((doc, idx) => (
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
                            {policy.process.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-stone-400 font-medium tabular-nums flex-shrink-0">{idx + 1}.</span>
                                <span className="text-stone-700 flex-1">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>

                      {/* Structured Premium Range Chips */}
                      <div className="pt-3 border-t border-stone-100 font-sans">
                        <div className="text-xs font-semibold text-stone-900 mb-2 font-sans">
                          Estimated Premium Guidelines
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {policy.costs.map((item, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-stone-50/80 border border-stone-200/70 text-xs"
                            >
                              <span className="text-stone-600 font-medium">{item.plan}</span>
                              <span className="font-semibold text-stone-900 text-right flex-shrink-0">{item.cost}</span>
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
                    href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(policy.whatsAppMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 h-10 px-5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white rounded-full font-medium text-xs shadow-2xs transition-all"
                    aria-label={`Get quote for ${policy.title} on WhatsApp`}
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-100" />
                    <span>Get Quote on WhatsApp</span>
                  </a>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>



      {/* Cross-Navigation Next Step */}
      <div className="pt-2 sm:pt-4 text-center">
        <p className="text-xs sm:text-sm text-stone-500">
          Family protected? See how your savings can grow over time.
        </p>
        <Link 
          href="/invest" 
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-900 mt-1.5 transition-colors group"
        >
          <span>Explore Mutual Funds &amp; SIPs</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
