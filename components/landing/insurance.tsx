'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Bike,
  Car,
  ShieldCheck,
  Check,
  ArrowRight,
  MessageCircle,
  ChevronDown,
  PhoneCall,
  Clock,
  ShieldAlert,
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
      description: "Hospitalisation protection with direct cashless admission across Kolkata and nationwide networks, protecting family savings from sudden medical expenses.",
      highlights: [
        "Direct cashless admission across network hospitals with fast TPA approvals",
        "In-patient hospitalisation, daycare procedures, and pre/post-admission expenses",
        "Annual cumulative No Claim Bonus and automatic restoration of sum insured",
        "Preventive health checkup vouchers and lifetime renewability with no penalties",
      ],
      documents: [
        "KYC proof (Aadhaar Card and PAN)",
        "Age proof (Birth Certificate or Class 10 Admit)",
        "Past discharge summaries or prescriptions (if pre-existing conditions exist)",
        "Previous policy document (for renewals or porting)",
      ],
      process: [
        "Brief call to evaluate family needs & medical history",
        "Transparent plan comparison between Star Health & Care Health",
        "Direct online premium payment to insurer via official link",
        "Dedicated assistance with hospital desk for cashless pre-authorizations",
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
      description: "Pure protection term plans, guaranteed maturity savings, and retirement pension solutions backed by the sovereign security of LIC.",
      highlights: [
        "High sum-assured pure term protection at affordable monthly premiums",
        "Guaranteed-return endowment and pension plans for secure family milestones",
        "Sovereign guarantee backing all claim settlements through LIC of India",
        "Tax deductions under Section 80C and 100% tax-free maturity under Section 10(10D)",
      ],
      documents: [
        "Identity & address proof (Aadhaar & PAN)",
        "Income proof (Form 16 / ITR / salary slips for higher term cover)",
        "Nominee KYC details & bank passbook copy",
        "Medical screening (only if required by underwriting limits)",
      ],
      process: [
        "Calculate life cover needed based on liabilities, lifestyle & dependents",
        "Select the right balance between Pure Term Cover and Guaranteed Savings",
        "Complete proposal form with instant policy receipt upon issuance",
        "Ongoing support for nomination updates, addresses, and death claim payouts",
      ],
      costs: [
        { plan: "Pure Term Plan (₹50L – ₹1 Cr)", cost: "From ₹600 – ₹1,800 / month" },
        { plan: "Guaranteed Savings / Pension", cost: "Customized to milestone target" },
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
      description: "Mandatory third-party protection and comprehensive own-damage coverage for motorcycles and scooters, issued within minutes on WhatsApp.",
      highlights: [
        "Instant digital policy PDF delivered directly on WhatsApp in under 15 minutes",
        "Complete protection against road accidents, theft, fire, and flood damage",
        "Seamless No Claim Bonus (NCB) retention and transfer from your previous insurer",
        "Instant renewal without physical vehicle inspection for active policies",
      ],
      documents: [
        "Vehicle Registration Certificate (RC)",
        "Owner's Driving Licence and Aadhaar",
        "Previous year policy copy (for NCB verification)",
      ],
      process: [
        "Send photo of your RC and old policy via WhatsApp",
        "Receive instant side-by-side quotes from top insurers",
        "Pay directly to insurer via official online payment link",
        "Receive policy document instantly on WhatsApp & email",
      ],
      costs: [
        { plan: "Third-Party Liability", cost: "Approx. ₹1,200 – ₹2,800 / year (IRDAI rates)" },
        { plan: "Comprehensive Package", cost: "Calculated based on vehicle IDV & CC" },
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
      description: "Bumper-to-bumper zero-depreciation coverage, engine protector, and cashless repairs across authorized manufacturer workshops.",
      highlights: [
        "Cashless accident repairs across authorized manufacturer garages",
        "Bumper-to-bumper Zero Depreciation with zero parts deduction on claims",
        "Engine and gearbox protector against water ingression and hydrostatic lock",
        "24x7 Roadside Assistance (RSA) for emergency towing, jumpstarts, and repairs",
      ],
      documents: [
        "Vehicle Registration Certificate (RC)",
        "Owner's Driving Licence and Aadhaar",
        "Previous policy copy with NCB certificate",
      ],
      process: [
        "Share car model, year, and RC details on WhatsApp",
        "Review comparative quotes with recommended add-on riders",
        "Pay directly on the insurer's portal without physical inspection (if unexpired)",
        "Instant policy issuance with active garage cashless support",
      ],
      costs: [
        { plan: "Hatchback & Sedan", cost: "Approx. ₹6,000 – ₹18,000 / year" },
        { plan: "SUV & Luxury Vehicles", cost: "Quotes aligned with market IDV" },
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
          title="Insurance & Family Protection" 
          description="Independent advice across health, life, and motor insurance—with direct personal claim support when you need it most." 
          badge="Risk & Family Protection"
        />

        {/* Segmented Category Filter */}
        <div className="inline-flex p-1 bg-stone-100/90 rounded-full border border-stone-200/70 max-w-sm w-full sm:w-auto grid grid-cols-3 sm:flex gap-1">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={cn(
              "px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs rounded-full font-medium transition-all text-center",
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
              "px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs rounded-full font-medium transition-all text-center",
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
              "px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs rounded-full font-medium transition-all text-center",
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
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800 border border-stone-200/60 flex-shrink-0 mt-0.5">
                      <PolicyIcon className="w-5 h-5 text-emerald-800" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 leading-tight">
                        {policy.title}
                      </h3>

                      {/* Underwriter Trust Badges */}
                      <div className="flex items-center gap-1.5 flex-wrap mt-1.5 text-xs text-stone-500">
                        <span>{policy.underwriters.label}:</span>
                        {policy.underwriters.items.map((item, idx) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-stone-50 rounded-md border border-stone-200/70 text-xs text-stone-700"
                          >
                            {item.logo && (
                              <Image 
                                src={item.logo} 
                                alt={item.name} 
                                width={36} 
                                height={14} 
                                className="h-3 w-auto object-contain" 
                              />
                            )}
                            <span className="font-medium">{item.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Desktop WhatsApp Action */}
                  <a
                    href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(policy.whatsAppMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-medium text-xs shadow-2xs hover:shadow-xs transition-all flex-shrink-0 self-start mt-0.5"
                    aria-label={`Get quote for ${policy.title} on WhatsApp`}
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Get Quote on WhatsApp</span>
                  </a>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                  {policy.description}
                </p>

                {/* Symmetrical 2x2 Coverage Highlights */}
                <div className="mt-4 pt-3.5 border-t border-stone-100">
                  <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-x-6">
                    {policy.highlights.map((highlight, idx) => (
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
                    onClick={() => toggleDetails(policy.id)}
                    className="w-full flex items-center justify-between text-xs font-medium text-stone-500 hover:text-stone-900 py-1 transition-colors group"
                    aria-expanded={isExpanded}
                  >
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-600 transition-colors" />
                      <span>{isExpanded ? "Hide paperwork, issuance steps & estimated premiums" : "View paperwork, issuance steps & estimated premiums"}</span>
                    </span>
                    <ChevronDown className={cn("w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-transform duration-200", isExpanded && "rotate-180")} />
                  </button>

                  {/* Clean Sans-Serif Drawer Content */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-stone-100 space-y-5 font-sans">
                      <div className="grid gap-6 sm:grid-cols-2">
                        {/* Documents */}
                        <div>
                          <div className="text-xs font-semibold text-stone-900 mb-2.5 font-sans">
                            Documents needed
                          </div>
                          <ul className="space-y-1.5">
                            {policy.documents.map((doc, idx) => (
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
                            How issuance works
                          </div>
                          <ol className="space-y-1.5 list-decimal list-inside text-xs text-stone-600 marker:text-stone-400 marker:font-medium leading-relaxed">
                            {policy.process.map((step, idx) => (
                              <li key={idx}>
                                <span className="text-stone-700">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>

                      {/* Structured Premium Range Chips */}
                      <div className="pt-3 border-t border-stone-100 font-sans">
                        <div className="text-xs font-semibold text-stone-900 mb-2 font-sans">
                          Estimated premium guideline
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
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-medium text-xs shadow-2xs"
                    aria-label={`Get quote for ${policy.title} on WhatsApp`}
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-200" />
                    <span>Get Quote on WhatsApp</span>
                  </a>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>

      {/* Personal Claim Support Reassurance Section */}
      <AnimatedSection animation="fade-up" delay={50} duration={350}>
        <div className="rounded-2xl sm:rounded-3xl border border-stone-200/80 bg-white/95 p-6 sm:p-8 shadow-2xs text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/70">
            <div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                The Advisory Advantage
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 mt-2">
                Personal Claim Assistance When It Counts
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl leading-relaxed">
                The real value of insurance is tested when a claim occurs—not during purchase. You reach Monotosh directly, never an automated call center.
              </p>
            </div>
            <a
              href={`https://wa.me/${whatsAppNumber}?text=Hi%20${encodeURIComponent(clientFirstName)}%2C%20I%20have%20an%20insurance%20claim%20or%20policy%20question%20I'd%20like%20guidance%20on.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-medium text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all flex-shrink-0 self-start sm:self-auto"
            >
              <PhoneCall className="w-4 h-4 text-emerald-200" />
              <span>Direct Support</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 font-sans">
            <div className="space-y-1">
              <div className="text-sm font-medium text-stone-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Fast TPA Coordination</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Direct liaison with hospital insurance desks in Kolkata and beyond to accelerate cashless pre-authorizations.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-medium text-stone-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Unbiased Representation</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                We represent your family's interests against the insurer, ensuring fair evaluation and maximum eligible claim payout.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-medium text-stone-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Zero Paperwork Friction</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                From hospital discharge bill sorting to reimbursement documentation, we guide you through every step.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Cross-Navigation Next Step */}
      <div className="pt-2 sm:pt-4 text-center">
        <p className="text-xs sm:text-sm text-stone-500">
          Protecting your family is step one. Looking to grow wealth alongside it?
        </p>
        <Link 
          href="/invest" 
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-900 mt-1.5 transition-colors group"
        >
          <span>Explore Mutual Funds &amp; SIP Portfolios</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
