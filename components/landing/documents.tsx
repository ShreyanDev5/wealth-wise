'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  MessageCircle,
  ChevronDown,
  PhoneCall,
  FileText,
  ArrowRight,
  FileCheck,
  UserCheck,
  BookUser,
  HeartHandshake,
  Car,
  Calculator,
  Briefcase,
  ScrollText,
  Coins,
  Clock,
  Building2,
} from "lucide-react";
import { SimplePageHeader } from "@/components/ui/simple-page-header";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { cn } from "@/lib/utils";

interface CostItem {
  label: string;
  value: string;
}

interface DocumentService {
  id: string;
  category: 'personal' | 'vehicle' | 'business';
  title: string;
  authority: string;
  description: string;
  highlights: string[];
  documents: string[];
  process: string[];
  costs: CostItem[];
  icon: React.ElementType;
  whatsAppMsg: string;
}

export default function DocumentsContent() {
  const clientFirstName = process.env.NEXT_PUBLIC_CLIENT_FIRST_NAME || "Monotosh";
  const rawPhone = process.env.NEXT_PUBLIC_CLIENT_PHONE || "98364 72260";
  const cleanPhone = rawPhone.replace(/\s/g, '');
  const whatsAppNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

  const [activeCategory, setActiveCategory] = useState<'all' | 'personal' | 'vehicle' | 'business'>('all');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleDetails = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const allDocumentServices: DocumentService[] = [
    // --- PERSONAL IDS & REGISTRY ---
    {
      id: "pan-card-services",
      category: "personal",
      title: "PAN Card Services",
      authority: "NSDL / UTIITSL (Income Tax Dept)",
      description: "New PAN applications, demographic corrections, duplicate re-issuance, and Aadhaar-PAN linking assistance.",
      highlights: [
        "Mandatory official financial identity for banking, investments, and salary credits",
        "Instant digital e-PAN delivery within 24–48 hours directly to your email",
        "Official laminated physical card delivered to your doorstep via India Post",
        "Aadhaar-PAN linking and penalty resolution assistance to restore inoperative cards",
      ],
      documents: [
        "Aadhaar Card (with active linked mobile for OTP verification)",
        "Valid proof of address & 2 recent passport-size photographs",
        "Existing PAN copy or FIR copy (for lost/correction applications)",
        "Certificate of incorporation or partnership deed (for business entities)",
      ],
      process: [
        "Share applicant details and passport photos via WhatsApp",
        "Verification and online submission on NSDL / UTIITSL portal",
        "Receive digital e-PAN via email within 24 to 48 hours",
        "Physical laminated card delivered to your address by India Post",
      ],
      costs: [
        { label: "New PAN Application", value: "₹250" },
        { label: "Correction / Duplicate Card", value: "₹250" },
        { label: "Aadhaar-PAN Link Penalty Filing", value: "₹1,150" },
        { label: "Physical Card Delivery", value: "Included" },
      ],
      icon: FileText,
      whatsAppMsg: `Hi ${clientFirstName}, I'd like help with PAN card application or corrections. Could you please guide me?`,
    },
    {
      id: "aadhaar-card-services",
      category: "personal",
      title: "Aadhaar Card Services",
      authority: "UIDAI (Govt. of India)",
      description: "Address updates, demographic corrections, PVC smart card orders, and official e-Aadhaar downloads.",
      highlights: [
        "Universal primary identity proof across all government and private institutions",
        "Rapid address updates with verified electricity, bank, or rent documentation",
        "Official UIDAI tamper-proof PVC smart card order with secure QR code",
        "Guidance for mandatory biometric updates and mobile linking at local centers",
      ],
      documents: [
        "Aadhaar number with active OTP access on registered mobile",
        "Valid proof of address (electricity bill, bank passbook, voter ID, rent deed)",
        "Proof of identity (PAN card, passport, or voter card for demographic updates)",
        "Supporting court order or gazette notification (for major name alterations)",
      ],
      process: [
        "Identify required demographic change (address, name, DOB)",
        "Submit online update request on UIDAI portal with supporting proofs",
        "Track Update Request Number (URN) until official approval",
        "Instant e-Aadhaar download and home dispatch of PVC smart card",
      ],
      costs: [
        { label: "Online Address Update", value: "₹250" },
        { label: "Demographic Correction", value: "₹250" },
        { label: "Official UIDAI PVC Card", value: "₹100" },
        { label: "e-Aadhaar Print & Lamination", value: "₹50" },
      ],
      icon: UserCheck,
      whatsAppMsg: `Hi ${clientFirstName}, I need assistance with Aadhaar updates or ordering a PVC card. Could you please guide me?`,
    },
    {
      id: "voter-id-card-services",
      category: "personal",
      title: "Voter ID Card Services",
      authority: "Election Commission of India (ECI)",
      description: "New voter enrolment (Form 6), constituency transfers (Form 8), demographic corrections, and mobile linking.",
      highlights: [
        "Constitutional democratic voting rights and recognized citizenship verification",
        "Seamless assembly constituency address transfers across Kolkata and West Bengal",
        "Official digital e-EPIC card download directly to your mobile phone",
        "Accurate demographic corrections for spellings, birth dates, and relative names",
      ],
      documents: [
        "Aadhaar Card copy (as primary identity and address verification)",
        "Age proof (Birth Certificate, Class 10 Admit Card, or PAN)",
        "Current residential address proof (utility bill or family member's EPIC)",
        "Recent passport-size color photograph and active mobile number",
      ],
      process: [
        "Fill out relevant ECI form (Form 6 for new enrolment, Form 8 for change)",
        "Upload verified identity, age, and Kolkata residential proofs",
        "Application tracking through local Booth Level Officer (BLO) verification",
        "Inclusion in electoral roll and instant digital e-EPIC download",
      ],
      costs: [
        { label: "New Voter Enrolment (Form 6)", value: "₹200" },
        { label: "Constituency Transfer (Form 8)", value: "₹200" },
        { label: "Demographic Correction", value: "₹200" },
        { label: "Mobile Linking & e-EPIC Download", value: "₹50" },
      ],
      icon: FileCheck,
      whatsAppMsg: `Hi ${clientFirstName}, I'd like help with Voter ID card application or transfer. Could you please guide me?`,
    },
    {
      id: "ration-card-services",
      category: "personal",
      title: "Ration Card Services",
      authority: "Food & Supplies Dept., Govt. of W.B.",
      description: "Digital ration cards (Khadya Sathi), family member additions, dealership transfers, and e-KYC compliance.",
      highlights: [
        "Subsidized food grain access and valid household family address proof",
        "Official digital e-Ration card generation under WB Khadya Sathi scheme",
        "Effortless addition of newborn children or newly married spouse",
        "Complete Aadhaar e-KYC linking to prevent card deactivation or suspension",
      ],
      documents: [
        "Aadhaar cards of all family members in the household",
        "Head of family's photograph and active linked mobile number",
        "Birth certificate for minor children or marriage certificate for spouse",
        "Existing ration card copies (for transfers or corrections)",
      ],
      process: [
        "Compile family member documents and Aadhaar details",
        "Online filing on West Bengal Food & Supplies portal",
        "Field verification by local municipal or block food inspector",
        "Official digital e-Ration card issuance and dealer mapping",
      ],
      costs: [
        { label: "New Family Application", value: "₹300 / person" },
        { label: "Family Member Addition", value: "₹200" },
        { label: "Fair Price Shop Transfer", value: "₹200" },
        { label: "Aadhaar e-KYC Linking", value: "₹50" },
      ],
      icon: FileText,
      whatsAppMsg: `Hi ${clientFirstName}, I need help with Ration card services and family member updates. Could you please assist?`,
    },
    {
      id: "passport-services",
      category: "personal",
      title: "Passport Services",
      authority: "Passport Seva, Ministry of External Affairs",
      description: "Fresh passport applications, renewals, Tatkaal processing, appointment scheduling, and document vetting.",
      highlights: [
        "End-to-end appointment booking at PSK Kolkata (Ruby/Anandapur) or POPSK",
        "Thorough pre-verification of names and dates to avoid counter rejections",
        "Complete guidance for expired passport re-issuance and lost card procedures",
        "Tatkaal slot scheduling for urgent overseas business, studies, or medical travel",
      ],
      documents: [
        "Aadhaar Card (with active linked mobile for Digilocker verification)",
        "PAN Card and voter ID (as secondary identification)",
        "Class 10 Pass Certificate / Admit Card (mandatory for Non-ECR status)",
        "Existing passport copy (for renewal) or Police FIR (for lost passport)",
      ],
      process: [
        "Complete application filing and document vetting on Passport Seva portal",
        "Payment of government fees and scheduling confirmed PSK appointment slot",
        "Pre-appointment briefing with organized original document folder",
        "Police verification follow-up and speed post passport tracking",
      ],
      costs: [
        { label: "Fresh Passport (36 Pages)", value: "₹2,100 (incl. ₹1,500 govt fee)" },
        { label: "Fresh Passport (60 Pages)", value: "₹2,650 (incl. ₹2,000 govt fee)" },
        { label: "Passport Renewal / Re-issue", value: "₹2,200 (incl. govt fee)" },
        { label: "Tatkaal Booking Assistance", value: "Customized quote" },
      ],
      icon: BookUser,
      whatsAppMsg: `Hi ${clientFirstName}, I need help with Passport application and appointment booking at PSK. Could you please guide me?`,
    },
    {
      id: "marriage-registration",
      category: "personal",
      title: "Marriage Registration",
      authority: "Office of the Registrar of Marriages, W.B.",
      description: "Legal marriage registration under Special Marriage Act and Hindu Marriage Act with official certificate.",
      highlights: [
        "Legally recognized marriage certificate for spouse visa, joint banking, and assets",
        "End-to-end management of the statutory 30-day notice and registrar appearance",
        "Experienced advocate drafting of solemnization notices and affidavits",
        "Flexible scheduling with Kolkata marriage registrars at your venue or office",
      ],
      documents: [
        "Age and address proofs for both bride and groom (Aadhaar, Passport, or Voter ID)",
        "Class 10 Admit Card / Birth Certificate verifying statutory legal age",
        "4 passport-size photographs of bride and groom + wedding invitation card",
        "Identity and residential proofs of 3 adult witnesses",
      ],
      process: [
        "Draft and submit formal statutory notice to the marriage officer",
        "Verification of witness credentials and original identity documents",
        "Formal appearance at the marriage registrar's office with 3 witnesses",
        "Issuance of official government-authenticated marriage registration certificate",
      ],
      costs: [
        { label: "Hindu Marriage Act Registration", value: "From ₹3,000" },
        { label: "Special Marriage Act (30-day notice)", value: "From ₹4,500" },
        { label: "Certified Copy / Urgent Issuance", value: "Consultation" },
        { label: "Advocate Legal Vetting", value: "Included" },
      ],
      icon: HeartHandshake,
      whatsAppMsg: `Hi ${clientFirstName}, I would like information regarding legal marriage registration services. Could you please guide me?`,
    },

    // --- DRIVING & VEHICLE ---
    {
      id: "new-driving-licence",
      category: "vehicle",
      title: "New Driving Licence",
      authority: "Sarathi Parivahan, MoRTH",
      description: "Learner Licence (LL) applications, test preparation, permanent Driving Licence (DL) slot booking, and smart card dispatch.",
      highlights: [
        "Authorized legal permit to ride two-wheelers (MCWG) and drive cars (LMV)",
        "Online Learner Licence exam application guidance and mock question assistance",
        "Practical driving test appointment scheduling at your local Kolkata RTO",
        "Tamper-proof chip-embedded smart card DL delivered to your residential address",
      ],
      documents: [
        "Aadhaar Card (mandatory for instant paperless e-KYC learner licence)",
        "Age proof (Class 10 Admit Card, Birth Certificate, or PAN)",
        "Blood group test report or certified declaration",
        "Recent passport-size color photographs",
      ],
      process: [
        "Online filing of Learner Licence application and theory exam clearance",
        "Mandatory 30-day waiting period with driving practice",
        "Permanent Driving Licence slot booking and practical test scheduling at RTO",
        "Practical driving test clearance and physical smart-card DL delivery",
      ],
      costs: [
        { label: "Two-Wheeler (MCWG)", value: "₹2,500 (all-inclusive)" },
        { label: "Four-Wheeler (LMV)", value: "₹3,000 (all-inclusive)" },
        { label: "Combined 2-Wheeler + 4-Wheeler", value: "₹4,800 (all-inclusive)" },
        { label: "RTO Slot & Form Fees", value: "Included" },
      ],
      icon: Car,
      whatsAppMsg: `Hi ${clientFirstName}, I'd like to apply for a Driving Licence. Could you please guide me through the RTO process?`,
    },
    {
      id: "licence-renewal-&-corrections",
      category: "vehicle",
      title: "Licence Renewal & Corrections",
      authority: "Sarathi Parivahan, MoRTH",
      description: "Expired driving licence renewals, duplicate re-issuance for lost licences, and address or name corrections.",
      highlights: [
        "Timely renewal to prevent heavy MV Act non-renewal penalties and insurance invalidation",
        "Rapid duplicate licence issuance with police lost diary and notary affidavit",
        "Updating old paper/booklet driving licences to digitized national Parivahan smart cards",
        "Residential address changes and spelling corrections across West Bengal RTOs",
      ],
      documents: [
        "Original Driving Licence (or GD/FIR copy with affidavit if lost)",
        "Aadhaar Card with updated residential address",
        "Medical Fitness Form 1-A signed by a registered MBBS practitioner (if age > 40)",
        "Current passport-size photographs",
      ],
      process: [
        "Submit existing licence details and required change request on WhatsApp",
        "Application drafting and fee clearance on Sarathi Parivahan portal",
        "Biometric update or document verification at local RTO (if required)",
        "Dispatch of renewed or corrected smart card licence to your home",
      ],
      costs: [
        { label: "Standard DL Renewal (within 1 yr)", value: "₹1,800 (+ govt late fee if > 1 yr)" },
        { label: "Lost Licence / Duplicate DL", value: "₹2,550 (incl. GD & affidavit)" },
        { label: "Address or Name Correction", value: "₹1,800" },
        { label: "Paper Licence to Smart Card", value: "₹2,000" },
      ],
      icon: Car,
      whatsAppMsg: `Hi ${clientFirstName}, I need assistance with driving licence renewal/correction. Could you please help?`,
    },
    {
      id: "vehicle-ownership-transfer",
      category: "vehicle",
      title: "Vehicle Ownership Transfer",
      authority: "Vahan Citizen Services, MoRTH (WB RTOs)",
      description: "RC ownership transfer from seller to buyer for two-wheelers and cars, bank loan hypothecation removal (HPA/HPT), and NOCs.",
      highlights: [
        "Complete legal immunity for the seller against future traffic challans or accidents",
        "Flawless title transfer ensuring insurance policy validity for the buyer",
        "Bank hypothecation removal (Form 35) upon auto loan completion",
        "Local RTO liaison across Beltala, Kasba, Salt Lake, Barasat, and Alipore",
      ],
      documents: [
        "Original Registration Certificate (RC smart card)",
        "Valid vehicle insurance policy certificate & active PUC certificate",
        "Signed RTO transfer forms (Form 29 & Form 30) by buyer and seller",
        "Bank NOC and Form 35 (if vehicle was financed on an auto loan)",
      ],
      process: [
        "Verification of vehicle hypothecation status, active challans, and blacklisting",
        "Execution of RTO transfer forms (Forms 29/30/35) and tax assessment",
        "Physical file submission and vehicle inspection at the jurisdiction RTO",
        "RTO endorsement and delivery of updated RC smart card in buyer's name",
      ],
      costs: [
        { label: "Two-Wheeler Ownership Transfer", value: "Approx. ₹4,500" },
        { label: "Four-Wheeler Ownership Transfer", value: "Varies by vehicle age & RTO" },
        { label: "Bank Hypothecation Removal (HPT)", value: "₹1,800 + govt fees" },
        { label: "Inter-State / Inter-RTO NOC", value: "Customized quote" },
      ],
      icon: Car,
      whatsAppMsg: `Hi ${clientFirstName}, I need help with vehicle ownership transfer (RC transfer). Could you please explain the process?`,
    },

    // --- BUSINESS & TAX ---
    {
      id: "income-tax-filing",
      category: "business",
      title: "Income Tax Filing (ITR)",
      authority: "Income Tax Department (Govt. of India)",
      description: "CA-guided ITR filing for salaried professionals, capital gains investors, business owners, and retirees.",
      highlights: [
        "Essential financial proof for home loans, personal loans, credit cards, and visa stamps",
        "Meticulous cross-verification with AIS, TIS, and Form 26AS to prevent tax notices",
        "Maximizing deductions under Sections 80C, 80D, 80G, and home loan interest provisions",
        "Accurate capital gains computation from mutual funds, shares, and real estate sales",
      ],
      documents: [
        "PAN Card and Aadhaar (linked)",
        "Form 16 / Salary slips from employer (for salaried individuals)",
        "Bank account statements for the financial year (April 1 to March 31)",
        "Capital gains tax statement from CAMS/KFintech and broker trading ledger",
      ],
      process: [
        "Share your Form 16 and bank statements via WhatsApp or email",
        "Tax expert computes income, deductions, and prepares optimized tax draft",
        "Review computation summary and approve draft before online submission",
        "Instant e-filing with official ITR-V acknowledgment and e-verification",
      ],
      costs: [
        { label: "Salaried Individual (ITR-1)", value: "From ₹699" },
        { label: "Capital Gains / Multiple Sources (ITR-2)", value: "From ₹999" },
        { label: "Small Business / Presumptive (ITR-3/4)", value: "From ₹1,699" },
        { label: "TDS Refund & Notice Rectification", value: "Customized quote" },
      ],
      icon: Calculator,
      whatsAppMsg: `Hi ${clientFirstName}, I'd like help filing my Income Tax Return. Could you please share the checklist and fees?`,
    },
    {
      id: "trade-license-services",
      category: "business",
      title: "Trade License Services",
      authority: "KMC / Municipalities / Gram Panchayats",
      description: "New trade licenses, certificate of enlistment (CE), and annual renewals for retail shops, offices, and commercial establishments.",
      highlights: [
        "Mandatory legal authorization to operate any commercial enterprise in West Bengal",
        "Prerequisite for opening business current bank accounts and GST registration",
        "Quick annual renewal to prevent hefty municipal compounding penalties",
        "Coverage across Kolkata Municipal Corporation (KMC) and local Gram Panchayats",
      ],
      documents: [
        "Proprietor / Director Aadhaar Card and PAN Card",
        "Commercial property tax receipt or registered rent agreement with landlord NOC",
        "Electricity bill for the commercial place of business",
        "Partnership deed or Certificate of Incorporation (for firms / companies)",
      ],
      process: [
        "Submit business category, proposed trade name, and commercial address proofs",
        "Online application filing with local municipality, corporation, or panchayat",
        "Assessment and payment of official statutory municipal license fees",
        "Issuance and download of official Trade License / Certificate of Enlistment",
      ],
      costs: [
        { label: "Panchayat / Municipality License", value: "From ₹500 + govt fees" },
        { label: "KMC Municipal Corporation License", value: "From ₹1,000 + govt fees" },
        { label: "Annual License Renewal", value: "From ₹400 + govt fees" },
        { label: "Trade Name / Category Amendment", value: "₹800 + govt fees" },
      ],
      icon: Briefcase,
      whatsAppMsg: `Hi ${clientFirstName}, I need help obtaining or renewing a Trade License for my business. Could you please guide me?`,
    },
    {
      id: "agreements-&-affidavits",
      category: "business",
      title: "Agreements & Affidavits",
      authority: "Legal Advocates & Notary Public (Govt. of India / WB)",
      description: "Legally enforceable rent agreements, commercial leases, partnership deeds, declarations, and notarized sworn affidavits.",
      highlights: [
        "Drafted and vetted by experienced legal advocates with watertight legal clauses",
        "Prevents costly future landlord-tenant, property, or business partnership disputes",
        "Executed on valid non-judicial stamp paper with authentic Notary Public attestation",
        "Fast same-day drafting and doorstep delivery available across Kolkata",
      ],
      documents: [
        "Identity proofs (Aadhaar / PAN) of all executing parties",
        "Title deed, tax bill, or holding number of the leased/transferred property",
        "Clear terms: monthly rent, security deposit, lock-in period, and notice terms",
        "Two passport-size photographs of each party for notarized registry",
      ],
      process: [
        "Share agreement covenants, tenancy terms, and party details on WhatsApp",
        "Legal advocate drafts customized agreement with balanced legal protection",
        "Review draft copy and approve all terms and commercial conditions",
        "Print on requisite denomination stamp paper with formal Notary attestation",
      ],
      costs: [
        { label: "Sworn Notarized Affidavit", value: "From ₹350 (incl. stamp & notary)" },
        { label: "Residential Rent Agreement", value: "From ₹1,200 (incl. stamp paper)" },
        { label: "Commercial Lease Deed", value: "From ₹2,500 (custom terms)" },
        { label: "Partnership Deed Drafting", value: "From ₹3,500" },
      ],
      icon: ScrollText,
      whatsAppMsg: `Hi ${clientFirstName}, I need help drafting an agreement or notarized affidavit. Could you please share the details?`,
    },
    {
      id: "professional-tax-(p.tax)",
      category: "business",
      title: "Professional Tax (P.Tax)",
      authority: "Directorate of Commercial Taxes, Govt. of W.B.",
      description: "State-level professional tax enrolment (EC), employer registration (RC), monthly challan generation, and annual return filing.",
      highlights: [
        "Mandatory statutory compliance for self-employed professionals and business owners",
        "Obtains Enrolment Certificate (EC) required for trade license renewals and banking",
        "Registration Certificate (RC) management for businesses deducting employee P.Tax",
        "Avoids steep compound interest penalties and regulatory enforcement notices",
      ],
      documents: [
        "Business Trade License / Certificate of Enlistment and PAN Card",
        "Commercial bank account details and active email/mobile",
        "Proprietor / Partner / Director KYC documents",
        "Monthly gross income figures or employee payroll summary",
      ],
      process: [
        "Determine applicable tax slab under West Bengal Professional Tax Schedule",
        "Online registration and profile creation on the WB Directorate P.Tax portal",
        "Generation of government e-payment challan and online tax clearance",
        "Issuance of Enrolment Certificate (EC) or Registration Certificate (RC)",
      ],
      costs: [
        { label: "WB Monthly P.Tax Liability", value: "₹110 – ₹200 (statutory slab)" },
        { label: "New P.Tax Enrolment (EC)", value: "₹500 (one-time filing)" },
        { label: "Employer Registration (RC)", value: "₹1,000 (setup & filing)" },
        { label: "Annual P.Tax Return Filing", value: "₹500 per submission" },
      ],
      icon: Coins,
      whatsAppMsg: `Hi ${clientFirstName}, I need help with Professional Tax (P.Tax) registration or annual return filing. Could you please assist?`,
    },
  ];

  const filteredServices = allDocumentServices.filter((service) => {
    if (activeCategory === 'all') return true;
    return service.category === activeCategory;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
      {/* Header & Segmented Category Filter */}
      <div className="flex flex-col items-center">
        <SimplePageHeader 
          title="Document &amp; Legal Services" 
          description="End-to-end guidance for government identity cards, RTO vehicle documentation, trade permits, and tax filings." 
          badge="Essential Documentation"
        />

        {/* Clean Segmented Category Filter */}
        <div className="p-1 bg-stone-100/90 rounded-2xl sm:rounded-full border border-stone-200/70 w-full sm:w-auto grid grid-cols-2 sm:flex gap-1">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={cn(
              "px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs rounded-xl sm:rounded-full font-medium transition-all text-center",
              activeCategory === 'all'
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            )}
          >
            All Services
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('personal')}
            className={cn(
              "px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs rounded-xl sm:rounded-full font-medium transition-all text-center",
              activeCategory === 'personal'
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            )}
          >
            Personal IDs
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('vehicle')}
            className={cn(
              "px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs rounded-xl sm:rounded-full font-medium transition-all text-center",
              activeCategory === 'vehicle'
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            )}
          >
            Driving &amp; Vehicle
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('business')}
            className={cn(
              "px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs rounded-xl sm:rounded-full font-medium transition-all text-center",
              activeCategory === 'business'
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            )}
          >
            Business &amp; Tax
          </button>
        </div>
      </div>

      {/* Service Cards */}
      <div className="space-y-6 sm:space-y-8">
        {filteredServices.map((service) => {
          const isExpanded = !!expandedCards[service.id];
          const ServiceIcon = service.icon;
          const isITR = service.id === "income-tax-filing";

          return (
            <AnimatedSection
              key={service.id}
              animation="fade-up"
              delay={0}
              duration={350}
              className="scroll-mt-28 relative"
              id={service.id}
            >
              {isITR && (
                <>
                  <span id="income-tax-filing-(itr)" className="absolute -top-28 pointer-events-none" />
                  <span id="income-tax-filing-services" className="absolute -top-28 pointer-events-none" />
                </>
              )}
              <div className="bg-white/95 rounded-2xl sm:rounded-3xl border border-stone-200/80 p-5 sm:p-7 shadow-2xs hover:shadow-xs hover:border-stone-300 transition-all duration-200 text-left">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800 border border-stone-200/60 flex-shrink-0 mt-0.5">
                      <ServiceIcon className="w-5 h-5 text-emerald-800" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 leading-tight">
                        {service.title}
                      </h3>

                      {/* Issuing Authority Badge */}
                      <div className="flex items-center gap-1.5 flex-wrap mt-1.5 text-xs text-stone-500">
                        <span>Authority:</span>
                        <span className="inline-flex items-center px-2 py-0.5 bg-stone-50 rounded-md border border-stone-200/70 text-xs text-stone-700 font-medium">
                          {service.authority}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Direct WhatsApp CTA */}
                  <a
                    href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(service.whatsAppMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-medium text-xs shadow-2xs hover:shadow-xs transition-all flex-shrink-0 self-start mt-0.5"
                    aria-label={`Inquire about ${service.title} on WhatsApp`}
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed">
                  {service.description}
                </p>

                {/* Symmetrical 2x2 Highlights Grid */}
                <div className="mt-4 pt-3.5 border-t border-stone-100">
                  <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-x-6">
                    {service.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-stone-700 leading-relaxed font-normal">
                        <Check className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements & Process Drawer Toggle */}
                <div className="mt-4 pt-3.5 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => toggleDetails(service.id)}
                    className="w-full flex items-center justify-between text-xs font-medium text-stone-500 hover:text-stone-900 py-1 transition-colors group"
                    aria-expanded={isExpanded}
                  >
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-600 transition-colors" />
                      <span>{isExpanded ? "Hide paperwork, process steps & fees" : "View paperwork, process steps & fees"}</span>
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
                            Documents required
                          </div>
                          <ul className="space-y-1.5">
                            {service.documents.map((doc, idx) => (
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
                            How the process works
                          </div>
                          <ol className="space-y-1.5 list-decimal list-inside text-xs text-stone-600 marker:text-stone-400 marker:font-medium leading-relaxed">
                            {service.process.map((step, idx) => (
                              <li key={idx}>
                                <span className="text-stone-700">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>

                      {/* Structured Fee Chips */}
                      <div className="pt-3 border-t border-stone-100 font-sans">
                        <div className="text-xs font-semibold text-stone-900 mb-2 font-sans">
                          Fees &amp; official charges
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.costs.map((item, idx) => (
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
                    href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(service.whatsAppMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-medium text-xs shadow-2xs"
                    aria-label={`Inquire about ${service.title} on WhatsApp`}
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-200" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
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
                Why Use Desk Assistance Instead of DIY Govt Portals?
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl leading-relaxed">
                Government portals frequently suffer from session timeouts, cryptic upload errors, and rejected submissions. We manage every step—from drafting to local authority follow-up.
              </p>
            </div>
            <a
              href={`https://wa.me/${whatsAppNumber}?text=Hi%20${encodeURIComponent(clientFirstName)}%2C%20I'd%20like%20guidance%20on%20getting%20my%20official%20documents%20sorted.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-medium text-xs sm:text-sm shadow-2xs hover:shadow-xs transition-all flex-shrink-0 self-start sm:self-auto"
            >
              <PhoneCall className="w-4 h-4 text-emerald-200" />
              <span>Direct Desk Support</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 font-sans">
            <div className="space-y-1">
              <div className="text-sm font-medium text-stone-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Error-Free Document Audit</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                We verify names, spellings, DOBs, and address proofs across all records before filing to prevent costly rejections and forfeited fees.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-medium text-stone-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Doorstep &amp; WhatsApp Ease</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Send document photos directly via WhatsApp. We draft forms, pay challans, and track URN numbers without you having to visit cyber cafés.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-medium text-stone-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Kolkata Authority Liaison</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Direct familiarity with local RTOs (Beltala, Kasba, Barasat, Alipore), municipal offices (KMC), and regional passport kendras.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Cross-Navigation Next Step (Borderless & Airy) */}
      <div className="pt-2 sm:pt-4 text-center">
        <p className="text-xs sm:text-sm text-stone-500">
          Paperwork sorted? Ensure your family and health are protected.
        </p>
        <Link 
          href="/insurance" 
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-900 mt-1.5 transition-colors group"
        >
          <span>Explore Health &amp; Life Insurance</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
