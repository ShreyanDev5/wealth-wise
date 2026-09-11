'use client';

import { useState, useEffect, useRef } from "react";
import { Heart, Bike, Car, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { ServiceCard } from "@/components/ui/service-card";
import { SimplePageHeader } from "@/components/ui/simple-page-header";

export default function InsuranceContent() {
  const clientFirstName = process.env.NEXT_PUBLIC_CLIENT_FIRST_NAME || "Monotosh";
  const [activeCategory, setActiveCategory] = useState<'all' | 'health-life' | 'vehicle'>('all');

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

    return () => {
      window.removeEventListener("hashchange", checkHash);
    };
  }, []);

  const insuranceServices = [
    {
      title: "Health Insurance",
      description: "Comprehensive medical coverage from Star Health and Care Health Insurance with cashless hospitalisation networks.",
      benefits: [
        "Direct cashless admission at network hospitals nationwide.",
        "In-patient, daycare, and pre/post-hospitalisation coverage.",
        "Restoration of sum insured and annual health checkups.",
      ],
      documents: [
        "KYC Proof (Aadhaar, PAN)",
        "Age Proof (Birth Certificate, 10th Admit)",
        "Medical history / discharge summaries (if pre-existing conditions)",
        "Existing policy copy (for renewals or porting)",
      ],
      process: [
        "Select sum insured and optional riders with advisor",
        "Submit medical history & basic KYC",
        "Instant policy issuance upon online premium payment",
        "Assistance with pre-authorization during claim requests",
      ],
      costs: [
        "Individual plans: Typically ₹5,000 – ₹20,000/yr (based on age)",
        "Family Floater plans: Typically ₹12,000 – ₹45,000/yr",
        "Exact premium calculated according to age, city, and sum insured",
      ],
      icon: Heart,
    },
    {
      title: "Life Insurance",
      description: "Pure protection term plans, guaranteed savings, and pension solutions backed by LIC.",
      benefits: [
        "High sum-assured term insurance at affordable premiums.",
        "Guaranteed maturity and pension plans for long-term safety.",
        "Tax benefits under Section 80C and Section 10(10D).",
      ],
      documents: [
        "Identity Proof (PAN & Aadhaar)",
        "Income Proof (Form 16 / ITR / Salary Slip for higher sum assured)",
        "Age proof and nominee KYC details",
        "Medical test reports (if required by underwriter)",
      ],
      process: [
        "Determine life cover required based on family liabilities",
        "Choose between Pure Term, Endowment, or Pension plans",
        "Complete proposal form & schedule medical check if needed",
        "Policy bond issued upon underwriter approval",
      ],
      costs: [
        "Term plans start as low as ₹500 – ₹1,500/month for ₹50L–₹1Cr cover",
        "Endowment and savings premiums depend on target corpus",
      ],
      icon: ShieldCheck,
    },
    {
      title: "Two-Wheeler Insurance",
      description: "Third-party mandatory cover and comprehensive own-damage protection for motorcycles and scooters.",
      benefits: [
        "Mandatory legal third-party liability protection.",
        "Complete coverage against accident damage, fire, and theft.",
        "No Claim Bonus (NCB) retention and transfer support.",
      ],
      documents: [
        "Vehicle Registration Certificate (RC)",
        "Owner's Driving Licence and Aadhaar",
        "Previous year policy document (for NCB claims)",
      ],
      process: [
        "Share RC and previous policy on WhatsApp",
        "Receive competitive comparative quotes instantly",
        "Pay premium directly to insurer",
        "Instant policy PDF delivered via WhatsApp & email",
      ],
      costs: [
        "Third-party: IRDAI regulated rates (approx. ₹1,200 – ₹2,800/yr)",
        "Comprehensive: Based on vehicle age, cubic capacity, and IDV",
      ],
      icon: Bike,
    },
    {
      title: "Four-Wheeler (Car) Insurance",
      description: "Zero-depreciation, engine protect, and cashless accident claim settlement for personal and commercial cars.",
      benefits: [
        "Zero-depreciation bumper-to-bumper coverage available.",
        "Protection against flood, theft, engine damage, and vandalism.",
        "Cashless repairs across authorized manufacturer garages.",
      ],
      documents: [
        "Vehicle RC copy",
        "Owner's Driving Licence & Aadhaar",
        "Previous insurance policy with NCB proof",
      ],
      process: [
        "Send car model and RC details for comparison",
        "Choose IDV and preferred add-ons (Zero Dep, RSA, Engine Cover)",
        "Online payment confirmation",
        "Policy issued immediately without garage inspection (if active)",
      ],
      costs: [
        "Hatchback: Approx. ₹6,000 – ₹14,000/yr",
        "Sedan / Compact SUV: Approx. ₹9,000 – ₹22,000/yr",
        "Luxury / Large SUV: Quotes generated based on current IDV",
      ],
      icon: Car,
    },
  ];

  const filteredServices = insuranceServices.filter((service) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'health-life') {
      return service.title === "Health Insurance" || service.title === "Life Insurance";
    }
    if (activeCategory === 'vehicle') {
      return service.title === "Two-Wheeler Insurance" || service.title === "Four-Wheeler (Car) Insurance";
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col items-center">
        <SimplePageHeader 
          title="Insurance Solutions" 
          description="Independent advice across health, life, and motor protection with end-to-end claims assistance." 
          badge="Risk & Protection"
        />

        {/* Category Filters */}
        <div className="relative w-full max-w-md mx-auto overflow-hidden z-20 py-1">
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
              className={`px-4 py-1.5 text-xs rounded-full font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Policies
            </button>
            <button
              onClick={() => setActiveCategory('health-life')}
              className={`px-4 py-1.5 text-xs rounded-full font-medium transition-all ${
                activeCategory === 'health-life'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Health &amp; Life
            </button>
            <button
              onClick={() => setActiveCategory('vehicle')}
              className={`px-4 py-1.5 text-xs rounded-full font-medium transition-all ${
                activeCategory === 'vehicle'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Motor Insurance
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
              whatsAppMessage={`Hi ${clientFirstName}, I'm interested in ${service.title.toLowerCase()}. Could you please help me understand the coverage options and quote?`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
