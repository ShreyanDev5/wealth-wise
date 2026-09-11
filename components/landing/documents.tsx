'use client';

import { useState, useEffect, useRef } from "react";
import { UserCheck, FileCheck, Car, Briefcase, Calculator, FileText, ScrollText, BookUser, Handshake, HeartHandshake, Coins, ChevronLeft, ChevronRight } from "lucide-react";
import { ServiceCard } from "@/components/ui/service-card";
import { SimplePageHeader } from "@/components/ui/simple-page-header";

export default function DocumentsContent() {
  const clientFirstName = process.env.NEXT_PUBLIC_CLIENT_FIRST_NAME || "Monotosh";
  const [activeCategory, setActiveCategory] = useState<'all' | 'personal' | 'vehicle' | 'business'>('all');

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
        if (
          id.includes("pan") ||
          id.includes("aadhaar") ||
          id.includes("voter") ||
          id.includes("ration") ||
          id.includes("birth") ||
          id.includes("passport") ||
          id.includes("marriage")
        ) {
          setActiveCategory("personal");
        } else if (
          id.includes("driving") ||
          id.includes("licence") ||
          id.includes("vehicle") ||
          id.includes("ownership") ||
          id.includes("rto")
        ) {
          setActiveCategory("vehicle");
        } else if (
          id.includes("tax") ||
          id.includes("trade") ||
          id.includes("agreement") ||
          id.includes("affidavit") ||
          id.includes("business") ||
          id.includes("p.tax")
        ) {
          setActiveCategory("business");
        }
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);

    return () => {
      window.removeEventListener("hashchange", checkHash);
    };
  }, []);

  const allDocumentServices = [
    // --- PERSONAL IDS & REGISTRY ---
    {
      category: "personal" as const,
      title: "PAN Card Services",
      description: "New PAN application, corrections, duplicate re-issuance, and Aadhaar-PAN linking.",
      benefits: [
        "Mandatory official identification for banking and investments.",
        "Instant e-PAN generation with door-delivered physical card.",
      ],
      documents: [
        "Aadhaar Card (with active linked mobile for OTP)",
        "Address proof & passport-size photograph",
        "Entity registration certificate (for firms / organizations)",
      ],
      process: [
        "Submit applicant details and photos via WhatsApp",
        "Verification & online NSDL/UTIITSL application submission",
        "Receive digital e-PAN via email within 24-48 hours",
        "Laminated physical PAN card delivered by India Post",
      ],
      costs: [
        "New PAN: ₹250",
        "Correction / Lost Card: ₹250",
        "Aadhaar-PAN Link penalty filing: ₹1,150",
      ],
      icon: FileText,
      whatsAppMessage: "Hi Monotosh, I'd like help with PAN card services. Could you please let me know the requirements?",
    },
    {
      category: "personal" as const,
      title: "Aadhaar Card Services",
      description: "Address updates, mobile & email link assistance, PVC smart card orders, and e-Aadhaar downloads.",
      benefits: [
        "Primary universal identity proof across India.",
        "Quick online correction guidance without queue hassle.",
      ],
      documents: [
        "Aadhaar number with registered mobile for OTP",
        "Valid proof of address (electricity bill, bank passbook, voter ID)",
      ],
      process: [
        "Identify required change (address, name, or photo)",
        "Submit online update with supporting documents",
        "Track update request number (URN) until approval",
        "Instant e-Aadhaar download & PVC card dispatch",
      ],
      costs: [
        "Address Update: ₹250",
        "Name/DOB Correction: ₹250",
        "Official UIDAI PVC Card: ₹100",
      ],
      icon: UserCheck,
      whatsAppMessage: "Hi Monotosh, I need assistance with Aadhaar updates. Could you please guide me?",
    },
    {
      category: "personal" as const,
      title: "Voter ID Card Services",
      description: "New voter enrolment (Form 6), constituency transfer (Form 8), corrections, and mobile linking.",
      benefits: [
        "Constitutional voting rights and valid citizenship proof.",
        "Digital e-EPIC download on your mobile.",
      ],
      documents: [
        "Aadhaar Card copy",
        "Age proof (Birth Certificate or 10th Admit)",
        "Passport size photograph and active mobile number",
      ],
      process: [
        "Fill out relevant election commission form",
        "Upload verified identity and address proofs",
        "Track application through BLO field verification",
        "Download digital e-EPIC upon inclusion in voter roll",
      ],
      costs: [
        "New Enrolment: ₹200",
        "Address Change / Correction: ₹200",
        "Mobile Linking: ₹50",
      ],
      icon: FileCheck,
      whatsAppMessage: "Hi Monotosh, I'd like help with Voter ID card application/updates. Could you please guide me?",
    },
    {
      category: "personal" as const,
      title: "Ration Card Services",
      description: "New digital ration card, addition/removal of family members, dealer changes, and corrections.",
      benefits: [
        "Subsidized food grain access and official family address proof.",
        "Aadhaar e-KYC compliance for active status.",
      ],
      documents: [
        "Aadhaar cards of all family members",
        "Head of family's photo and mobile number",
        "Birth certificate for minor children",
      ],
      process: [
        "Submit family member details and Aadhaar copies",
        "Online filing on West Bengal Food & Supplies portal",
        "Verification by food inspector",
        "Download digital e-Ration card",
      ],
      costs: [
        "New Family Application: ₹300/person",
        "Member Addition / Dealer Change: ₹200",
      ],
      icon: FileText,
      whatsAppMessage: "Hi Monotosh, I need help with Ration card services. Could you please share the details?",
    },
    {
      category: "personal" as const,
      title: "Passport Services",
      description: "Online application filing, document preparation, and appointment scheduling for fresh and renewal passports.",
      benefits: [
        "Official legal international travel document.",
        "Error-free appointment booking and document checklist.",
      ],
      documents: [
        "Aadhaar Card (linked with active mobile)",
        "PAN Card / Voter ID",
        "Old passport copy (for renewals)",
        "Police FIR & affidavit (for lost passports)",
      ],
      process: [
        "Portal registration and complete application form filling",
        "Government fee payment and appointment slot booking at PSK",
        "Document pre-verification before your physical visit",
        "Police verification follow-up and speed-post delivery",
      ],
      costs: [
        "Fresh Passport (36 Pages): ₹2,100 (incl. govt fee)",
        "Fresh Passport (60 Pages): ₹2,650 (incl. govt fee)",
        "Renewal / Re-issue: ₹2,200",
      ],
      icon: BookUser,
      whatsAppMessage: "Hi Monotosh, I need help with Passport application and appointment booking. Could you please guide me?",
    },
    {
      category: "personal" as const,
      title: "Marriage Registration",
      description: "Special Marriage Act and Hindu Marriage Act legal registration guidance and certificate issuance.",
      benefits: [
        "Legally recognized marriage certificate for spouse visa and joint assets.",
        "End-to-end assistance with marriage officer appointments and notices.",
      ],
      documents: [
        "Age and address proof for both bride and groom",
        "Passport-size photographs and wedding invitation / proof",
        "Identity proofs of 3 adult witnesses",
      ],
      process: [
        "Draft and submit 30-day notice to marriage officer",
        "Document pre-check and appointment confirmation",
        "Appearance at registrar office with witnesses",
        "Official marriage registration certificate issued",
      ],
      costs: [
        "Registration assistance packages starting from ₹3,000",
      ],
      icon: HeartHandshake,
      whatsAppMessage: "Hi Monotosh, I would like information regarding marriage registration services. Could you please guide me?",
    },

    // --- VEHICLE & RTO ---
    {
      category: "vehicle" as const,
      title: "New Driving Licence",
      description: "Learner license (LL), permanent driving license (DL) booking, and RTO test assistance.",
      benefits: [
        "Authorized legal permit to drive two-wheelers and four-wheelers.",
        "Universally recognized government photo identity proof.",
      ],
      documents: [
        "Aadhaar Card (mandatory for online LL)",
        "Blood group certificate",
        "Passport size photographs",
      ],
      process: [
        "Online learner license application and exam guidance",
        "Slot booking for permanent DL practical driving test",
        "Attend RTO test with authorized vehicle",
        "Smart-card Driving Licence delivered to address",
      ],
      costs: [
        "Two-Wheeler (MCWG): ₹2,500",
        "Four-Wheeler (LMV): ₹3,000",
        "Both 2+4 Wheeler: ₹4,800",
      ],
      icon: Car,
      whatsAppMessage: "Hi Monotosh, I'd like to apply for a Driving Licence. Could you please guide me through the process?",
    },
    {
      category: "vehicle" as const,
      title: "Licence Renewal & Corrections",
      description: "Expired licence renewal, duplicate re-issuance, and name/address correction.",
      benefits: [
        "Keeps driving permits legally compliant to prevent heavy traffic fines.",
        "Fast replacement for lost or damaged physical smart cards.",
      ],
      documents: [
        "Original Driving Licence (or FIR if lost)",
        "Aadhaar Card and current photos",
      ],
      process: [
        "Submit details and existing DL copy",
        "Application filing on Sarathi Parivahan portal",
        "Fee clearance and biometric update at RTO if required",
        "Updated licence smart card issued",
      ],
      costs: [
        "Renewal: ₹1,800 (+ late fee if expired)",
        "Lost DL / Duplicate: ₹2,550 (incl. report & affidavit)",
      ],
      icon: Car,
      whatsAppMessage: "Hi Monotosh, I need assistance with driving licence renewal/correction. Could you please help?",
    },
    {
      category: "vehicle" as const,
      title: "Vehicle Ownership Transfer",
      description: "RC ownership transfer from seller to buyer for two-wheelers and cars at local RTOs.",
      benefits: [
        "Shields seller from legal liability after sale.",
        "Legally secures ownership title and insurance validity for buyer.",
      ],
      documents: [
        "Original RC, valid insurance & PUC certificate",
        "Forms 29 & 30 signed by seller and buyer",
        "Buyer & seller Aadhaar cards and PAN",
        "Bank NOC (Form 35) if vehicle was on loan",
      ],
      process: [
        "Draft and execute RTO transfer forms",
        "Tax and fee clearance submission at RTO",
        "RTO inspection and ownership change endorsement",
        "Updated smart card RC issued to new owner",
      ],
      costs: [
        "Two-Wheeler transfer: approx. ₹4,500",
        "Four-Wheeler transfer: Varies by vehicle age and RTO jurisdiction",
      ],
      icon: Handshake,
      whatsAppMessage: "Hi Monotosh, I need help with vehicle ownership transfer. Could you please explain the process?",
    },

    // --- BUSINESS & TAX ---
    {
      category: "business" as const,
      title: "Income Tax Filing (ITR)",
      description: "CA-guided ITR filing for salaried professionals, business owners, and capital gains investors.",
      benefits: [
        "Essential financial proof for personal loans, home loans, and visa clearances.",
        "Thorough cross-verification with AIS, TIS, and Form 26AS to prevent notices.",
      ],
      documents: [
        "PAN Card and Aadhaar",
        "Form 16 / Salary slips (if salaried)",
        "Bank statements for the financial year",
        "Capital gains statements from mutual funds / shares",
      ],
      process: [
        "Send documents via WhatsApp or email",
        "Specialist computes income, deductions, and tax liability",
        "Review draft computation before final submission",
        "ITR-V acknowledgment generated and e-verified",
      ],
      costs: [
        "Salaried ITR-1: from ₹699",
        "Capital Gains ITR-2: from ₹999",
        "Small Business ITR-3/4: from ₹1,699",
      ],
      icon: Calculator,
      whatsAppMessage: "Hi Monotosh, I'd like help filing my Income Tax Return. Could you please share the checklist and fees?",
    },
    {
      category: "business" as const,
      title: "Trade License Services",
      description: "New trade licenses and annual renewals for shops, offices, and commercial establishments.",
      benefits: [
        "Mandatory legal permit to operate commercial business in municipal/panchayat areas.",
        "Prerequisite for opening current bank accounts and GST registration.",
      ],
      documents: [
        "Proprietor Aadhaar and PAN",
        "Rent agreement or tax receipt of commercial property",
      ],
      process: [
        "Submit business nature and address documents",
        "File application with local municipality or panchayat",
        "Pay government license fees",
        "Digital trade license certificate delivered",
      ],
      costs: [
        "Panchayat / Municipality license: from ₹500 + govt fees",
        "Municipal Corporation license: from ₹1,000 + govt fees",
      ],
      icon: Briefcase,
      whatsAppMessage: "Hi Monotosh, I need help obtaining a Trade License for my business. Could you please guide me?",
    },
    {
      category: "business" as const,
      title: "Agreements & Affidavits",
      description: "Legally binding rent agreements, partnership deeds, commercial sale agreements, and sworn affidavits.",
      benefits: [
        "Drafted and vetted by experienced legal advocates.",
        "Prevents future legal and property disputes with clear covenants.",
      ],
      documents: [
        "Identity proofs of all involved parties",
        "Property or agreement details and terms",
      ],
      process: [
        "Share agreement terms and party details on WhatsApp",
        "Review legal draft prepared by our advocate",
        "Print on stamp paper with notary attestation",
      ],
      costs: [
        "Affidavits: starting from ₹350 (incl. stamp & notary)",
        "Rent & Commercial Agreements: customized per requirement",
      ],
      icon: ScrollText,
      whatsAppMessage: "Hi Monotosh, I need help drafting an agreement / affidavit. Could you please share the details?",
    },
    {
      category: "business" as const,
      title: "Professional Tax (P.Tax)",
      description: "State-level professional tax enrolment (EC), registration (RC), and annual return filing.",
      benefits: [
        "Prevents regulatory fines and late interest penalties.",
        "Mandatory for running businesses and employing staff in West Bengal.",
      ],
      documents: [
        "Business trade license and PAN",
        "Bank details and gross income details",
      ],
      process: [
        "Determine applicable slab rate",
        "Online registration on state P.Tax portal",
        "Generate challan and pay tax online",
      ],
      costs: [
        "West Bengal Monthly P.Tax: ₹110 – ₹200 (based on monthly gross)",
        "Advisory & Filing Fee: ₹300 per submission",
      ],
      icon: Coins,
      whatsAppMessage: "Hi Monotosh, I need help with Professional Tax (P.Tax) registration/filing. Could you please assist?",
    },
  ];

  const filteredServices = allDocumentServices.filter((service) => {
    if (activeCategory === 'all') return true;
    return service.category === activeCategory;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col items-center">
        <SimplePageHeader 
          title="Document &amp; Legal Services" 
          description="End-to-end guidance for government identity cards, RTO vehicle documentation, trade permits, and tax filings." 
          badge="Essential Documentation"
        />

        {/* Category Filters */}
        <div className="relative w-full max-w-xl mx-auto overflow-hidden z-20 py-1">
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
              All Services
            </button>
            <button
              onClick={() => setActiveCategory('personal')}
              className={`px-3.5 py-1.5 text-xs rounded-full font-medium transition-all ${
                activeCategory === 'personal'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Personal IDs
            </button>
            <button
              onClick={() => setActiveCategory('vehicle')}
              className={`px-3.5 py-1.5 text-xs rounded-full font-medium transition-all ${
                activeCategory === 'vehicle'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Driving &amp; Vehicle
            </button>
            <button
              onClick={() => setActiveCategory('business')}
              className={`px-3.5 py-1.5 text-xs rounded-full font-medium transition-all ${
                activeCategory === 'business'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Business &amp; Tax
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {filteredServices.map((service, index) => (
          <div key={index} id={service.title.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-28">
            <ServiceCard
              title={service.title}
              description={service.description}
              benefits={service.benefits}
              documents={service.documents}
              process={service.process}
              costs={service.costs}
              icon={service.icon}
              ctaText="Inquire on WhatsApp"
              delay={0}
              animation="elegant-fade"
              whatsAppMessage={service.whatsAppMessage.replace("Monotosh", clientFirstName)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
