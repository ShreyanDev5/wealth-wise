'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  MessageCircle,
  ChevronDown,
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
} from "lucide-react";
import { SimplePageHeader } from "@/components/ui/simple-page-header";
import { AnimatedSection } from "@/components/ui/animated-section";
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
      description: "Fast new applications, detail corrections, duplicate reprints, and Aadhaar-PAN linking.",
      highlights: [
        "Essential ID for opening bank accounts, investing, and salary credits",
        "Digital e-PAN delivered to your email within 24–48 hours",
        "Official laminated card delivered to your home by India Post",
        "Aadhaar-PAN linking assistance to reactivate inoperative cards",
      ],
      documents: [
        "Aadhaar card with active linked mobile for OTP",
        "Address proof and 2 passport-size photographs",
        "Old PAN copy or police diary (if applying for correction or lost card)",
        "Business registration documents (for firm/company PAN)",
      ],
      process: [
        "Share applicant details and photos on WhatsApp",
        "Online verification and submission on the official NSDL/UTIITSL portal",
        "Receive digital e-PAN by email in 24–48 hours",
        "Physical card delivered to your doorstep via India Post",
      ],
      costs: [
        { label: "New PAN Application", value: "₹250" },
        { label: "Correction / Duplicate Card", value: "₹250" },
        { label: "Aadhaar-PAN Linking", value: "₹1,150 (incl. ₹1,000 govt fee)" },
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
      description: "Address updates, demographic corrections, official PVC smart cards, and e-Aadhaar downloads.",
      highlights: [
        "Universal identity proof for government benefits, banking, and SIM cards",
        "Fast address updates with verified electricity bills, bank passbooks, or rent deeds",
        "Official tamper-proof PVC smart card order with QR code",
        "Guidance for biometric updates and mobile linking at local centers",
      ],
      documents: [
        "Aadhaar number with mobile OTP access",
        "Valid address proof (electricity bill, bank passbook, voter card, or rent deed)",
        "Identity proof (PAN card, passport, or voter card for name/DOB changes)",
        "Gazette notification (only for legal name changes)",
      ],
      process: [
        "Share the details you need to update",
        "Submit online request on the UIDAI portal with supporting proofs",
        "Track Update Request Number (URN) until approved",
        "Download updated e-Aadhaar and receive the PVC card by post",
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
      description: "New voter registrations, assembly transfers, corrections, and official e-EPIC downloads.",
      highlights: [
        "Official photo identity and valid citizenship proof",
        "Easy assembly constituency transfers across Kolkata and West Bengal",
        "Official digital e-EPIC card downloaded directly to your phone",
        "Corrections for spellings, birth dates, and relative names",
      ],
      documents: [
        "Aadhaar card copy",
        "Age proof (Birth Certificate, Class 10 Admit Card, or PAN)",
        "Address proof (electricity bill or family member's voter card)",
        "Recent passport-size photo and active mobile number",
      ],
      process: [
        "Fill out official form (Form 6 for new, Form 8 for change/transfer)",
        "Upload verified identity, age, and address proofs",
        "Application verified by local Booth Level Officer (BLO)",
        "Inclusion in electoral roll with instant digital card download",
      ],
      costs: [
        { label: "New Voter Registration (Form 6)", value: "₹200" },
        { label: "Address Transfer (Form 8)", value: "₹200" },
        { label: "Name / Detail Correction", value: "₹200" },
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
      description: "Digital e-Ration cards, family member additions, dealer transfers, and Aadhaar e-KYC linking.",
      highlights: [
        "Subsidized food grains and recognized family address proof",
        "Digital e-Ration card under the West Bengal Khadya Sathi portal",
        "Quickly add newborns or a newly married spouse to your card",
        "Aadhaar e-KYC linking to prevent card suspension",
      ],
      documents: [
        "Aadhaar cards of all family members",
        "Head of family photo and linked mobile number",
        "Birth certificate for minor children or marriage certificate for spouse",
        "Existing ration card copy (for transfers or corrections)",
      ],
      process: [
        "Compile family member documents and Aadhaar details",
        "Submit application on the WB Food & Supplies portal",
        "Verification by local municipal or block food inspector",
        "Digital ration card issued and mapped to your local dealer",
      ],
      costs: [
        { label: "New Family Application", value: "₹300 / person" },
        { label: "Add Family Member", value: "₹200" },
        { label: "Ration Shop Transfer", value: "₹200" },
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
      description: "Fresh applications, renewals, Tatkaal bookings, and verified document checks for PSK visits.",
      highlights: [
        "Appointment booking at PSK Kolkata (Ruby/Anandapur) or local Post Office PSKs",
        "Thorough document pre-check to prevent counter rejections",
        "Guidance for renewal of expired passports and lost passport procedures",
        "Tatkaal slot booking for urgent overseas travel, work, or studies",
      ],
      documents: [
        "Aadhaar card (linked with DigiLocker)",
        "PAN card or voter ID",
        "Class 10 Pass Certificate or Admit Card (mandatory for Non-ECR status)",
        "Old passport (for renewal) or police report (if lost)",
      ],
      process: [
        "Application filing and document check on Passport Seva portal",
        "Pay government fees and book confirmed PSK appointment slot",
        "Document briefing so you carry exactly what is needed on appointment day",
        "Police verification guidance and passport dispatch tracking",
      ],
      costs: [
        { label: "Fresh Passport (36 Pages)", value: "₹2,100 (incl. ₹1,500 govt fee)" },
        { label: "Fresh Passport (60 Pages)", value: "₹2,650 (incl. ₹2,000 govt fee)" },
        { label: "Passport Renewal", value: "₹2,200 (incl. govt fee)" },
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
      description: "Government-authenticated marriage registration under the Special or Hindu Marriage Act.",
      highlights: [
        "Legally recognized certificate for spouse visas, joint accounts, and home loans",
        "Complete management of the statutory 30-day notice and registrar appearance",
        "Affidavits and notice drafts prepared by experienced legal advocates",
        "Flexible scheduling with marriage registrars at their office or your venue",
      ],
      documents: [
        "Age and address proofs for bride and groom (Aadhaar, Passport, or Voter ID)",
        "Class 10 Admit Card or Birth Certificate (verifying legal age)",
        "4 passport-size photos of bride and groom + wedding invitation card",
        "Identity and address proofs of 3 adult witnesses",
      ],
      process: [
        "Draft and submit legal notice to the marriage registrar",
        "Verification of witness credentials and original identity documents",
        "Appearance at the registrar's office with 3 witnesses for signing",
        "Issuance of official government-authenticated marriage certificate",
      ],
      costs: [
        { label: "Hindu Marriage Act Registration", value: "From ₹3,000" },
        { label: "Special Marriage Act (30-day notice)", value: "From ₹4,500" },
        { label: "Certified Copy / Urgent Issuance", value: "Customized quote" },
        { label: "Legal Vetting & Drafting", value: "Included" },
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
      description: "Learner Licence filings, test slot bookings, and chip-based smart card delivery to your home.",
      highlights: [
        "Official permit to ride motorcycles (MCWG) and drive cars (LMV)",
        "Online test preparation and sample question guidance",
        "Practical driving test appointment booking at your local RTO",
        "Chip-embedded smart card licence delivered to your home",
      ],
      documents: [
        "Aadhaar card (for paperless learner licence)",
        "Age proof (Class 10 Admit Card, Birth Certificate, or PAN)",
        "Blood group test report or declaration",
        "Recent passport-size color photographs",
      ],
      process: [
        "Apply online for Learner Licence and complete the simple test",
        "Practice driving during the mandatory 30-day period",
        "Book permanent driving test slot at your local RTO",
        "Pass the driving test and receive your smart card DL by post",
      ],
      costs: [
        { label: "Two-Wheeler (MCWG)", value: "₹2,500 (all-inclusive)" },
        { label: "Four-Wheeler (LMV)", value: "₹3,000 (all-inclusive)" },
        { label: "Combined 2-Wheeler + 4-Wheeler", value: "₹4,800 (all-inclusive)" },
        { label: "RTO Slot & Govt Fees", value: "Included" },
      ],
      icon: Car,
      whatsAppMsg: `Hi ${clientFirstName}, I'd like to apply for a Driving Licence. Could you please guide me through the RTO process?`,
    },
    {
      id: "licence-renewal-&-corrections",
      category: "vehicle",
      title: "Licence Renewal & Corrections",
      authority: "Sarathi Parivahan, MoRTH",
      description: "Timely expired licence renewals, duplicate DL re-issuance, and name or address corrections.",
      highlights: [
        "Timely renewal to avoid traffic fines and keep your motor insurance valid",
        "Fast duplicate licence issuance with police report and affidavit",
        "Upgrade old booklet licences to modern smart cards",
        "Address changes and spelling corrections across West Bengal RTOs",
      ],
      documents: [
        "Original licence (or police report and affidavit if lost)",
        "Aadhaar card with current address",
        "Medical Fitness Form 1-A from an MBBS doctor (if age > 40)",
        "Recent passport-size photos",
      ],
      process: [
        "Send a photo of your licence and requested changes on WhatsApp",
        "We submit the application and pay fees on the Parivahan portal",
        "Quick verification at the RTO (if required)",
        "Renewed smart card delivered to your home by speed post",
      ],
      costs: [
        { label: "Standard DL Renewal (within 1 yr)", value: "₹1,800 (+ govt late fee if > 1 yr)" },
        { label: "Lost Licence / Duplicate DL", value: "₹2,550 (incl. police report & affidavit)" },
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
      description: "RC ownership transfers for bikes and cars, bank loan hypothecation removal, and RTO NOCs.",
      highlights: [
        "Protects the seller from future accident liabilities or traffic fines",
        "Ensures clear vehicle title and valid insurance for the buyer",
        "Bank loan removal (Form 35) once auto loan is fully repaid",
        "Liaison with RTOs across Beltala, Kasba, Salt Lake, Barasat, and Alipore",
      ],
      documents: [
        "Original RC smart card",
        "Valid vehicle insurance copy and active PUC certificate",
        "Signed RTO transfer forms (Form 29 and Form 30) by buyer and seller",
        "Bank NOC and Form 35 (if loan is cleared)",
      ],
      process: [
        "Check vehicle details, active traffic challans, and loan status",
        "Prepare transfer forms and calculate statutory RTO fees",
        "Submit paperwork and complete RTO inspection",
        "Updated RC smart card delivered in the new owner's name",
      ],
      costs: [
        { label: "Two-Wheeler Ownership Transfer", value: "Approx. ₹4,500" },
        { label: "Four-Wheeler Ownership Transfer", value: "Varies by vehicle age & RTO" },
        { label: "Bank Loan Removal (HPT)", value: "₹1,800 + govt fees" },
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
      description: "Expert-assisted ITR filing for salaried professionals, investors, business owners, and retirees.",
      highlights: [
        "Essential income proof for home loans, credit cards, and visa applications",
        "Checked against AIS, TIS, and Form 26AS to prevent tax notices",
        "Claim all eligible deductions under Sections 80C, 80D, and home loans",
        "Accurate capital gains calculations from mutual funds, shares, and property",
      ],
      documents: [
        "PAN card and Aadhaar (linked)",
        "Form 16 or salary slips (for salaried individuals)",
        "Bank statements for the financial year (April 1 to March 31)",
        "Capital gains statements from broker or CAMS",
      ],
      process: [
        "Share Form 16 and bank statements via WhatsApp or email",
        "Our tax expert computes income, deductions, and tax draft",
        "Review computation summary and approve draft before filing",
        "Instant online e-filing with official ITR-V acknowledgment",
      ],
      costs: [
        { label: "Salaried Individual (ITR-1)", value: "From ₹699" },
        { label: "Capital Gains / Multiple Sources (ITR-2)", value: "From ₹999" },
        { label: "Small Business / Presumptive (ITR-3/4)", value: "From ₹1,699" },
        { label: "TDS Refund & Notice Help", value: "Customized quote" },
      ],
      icon: Calculator,
      whatsAppMsg: `Hi ${clientFirstName}, I'd like help filing my Income Tax Return. Could you please share the checklist and fees?`,
    },
    {
      id: "trade-license-services",
      category: "business",
      title: "Trade License Services",
      authority: "KMC / Municipalities / Gram Panchayats",
      description: "New trade licenses, Certificates of Enlistment (CE), and prompt annual municipal renewals.",
      highlights: [
        "Mandatory legal permit to operate any business or shop in West Bengal",
        "Required for opening a business current account and GST registration",
        "Quick annual renewal to avoid municipal compounding penalties",
        "Covers Kolkata Municipal Corporation (KMC), municipalities, and panchayats",
      ],
      documents: [
        "Proprietor or director Aadhaar card and PAN",
        "Property tax receipt or rent agreement with landlord NOC",
        "Electricity bill for commercial premises",
        "Partnership deed or company incorporation certificate (if applicable)",
      ],
      process: [
        "Share business name, trade category, and address proofs",
        "Online filing with local municipality, corporation, or panchayat",
        "Assessment and payment of statutory municipal license fees",
        "Download official Trade License / Certificate of Enlistment",
      ],
      costs: [
        { label: "Panchayat / Municipality License", value: "From ₹500 + govt fees" },
        { label: "KMC Corporation License", value: "From ₹1,000 + govt fees" },
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
      description: "Advocate-drafted rent agreements, commercial lease deeds, partnership deeds, and affidavits.",
      highlights: [
        "Drafted by experienced legal advocates with balanced, protective clauses",
        "Protects against future disputes between landlords, tenants, or partners",
        "Printed on official non-judicial stamp paper with authentic Notary attestation",
        "Same-day drafting and doorstep delivery available across Kolkata",
      ],
      documents: [
        "Aadhaar and PAN of all involved parties",
        "Property tax bill, title deed, or holding number of the premises",
        "Agreed terms: monthly rent, security deposit, and notice period",
        "Two passport-size photos of each party",
      ],
      process: [
        "Share agreement terms and party details on WhatsApp",
        "Our legal advocate drafts a clear, customized agreement",
        "Review and approve the draft copy",
        "Printed on requisite stamp paper with formal Notary attestation",
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
      description: "West Bengal P.Tax enrolment (EC), employer registration (RC), and statutory return filing.",
      highlights: [
        "Mandatory statutory compliance for self-employed professionals and business owners",
        "Provides Enrolment Certificate (EC) required for trade license renewals",
        "Registration Certificate (RC) management for firms deducting employee P.Tax",
        "Avoids government interest penalties and compliance notices",
      ],
      documents: [
        "Trade License and business PAN card",
        "Business bank account details and active contact info",
        "Proprietor or partner KYC documents",
        "Monthly turnover or employee payroll summary",
      ],
      process: [
        "Determine applicable tax slab under West Bengal rules",
        "Online registration on the WB Directorate P.Tax portal",
        "Generate payment challan and clear taxes online",
        "Download official Enrolment (EC) or Registration Certificate (RC)",
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
          description="Assistance with government identity cards, vehicle paperwork, business registrations, and tax filing." 
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
            All Services
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('personal')}
            className={cn(
              "px-3 sm:px-3.5 py-1.5 text-xs rounded-full font-medium transition-all whitespace-nowrap text-center",
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
              "px-3 sm:px-3.5 py-1.5 text-xs rounded-full font-medium transition-all whitespace-nowrap text-center",
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
              "px-3 sm:px-3.5 py-1.5 text-xs rounded-full font-medium transition-all whitespace-nowrap text-center",
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-stone-100 flex items-center justify-center text-stone-800 border border-stone-200/60 flex-shrink-0">
                      <ServiceIcon className="w-5 h-5 text-emerald-800" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 leading-tight">
                      {service.title}
                    </h3>
                  </div>

                  {/* Desktop Direct WhatsApp CTA */}
                  <a
                    href={`https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(service.whatsAppMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium text-xs shadow-2xs hover:shadow-xs transition-all flex-shrink-0"
                    aria-label={`Inquire about ${service.title} on WhatsApp`}
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-100" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>

                {/* Symmetrical 2x2 Highlights Grid */}
                <div className="mt-4 sm:mt-5">
                  <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-x-6">
                    {service.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-stone-700 leading-normal font-normal">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
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
                    <span className="flex items-center gap-2 min-w-0 pr-2 text-left">
                      <FileText className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-600 transition-colors flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">
                        {isExpanded ? "Hide documents, process & official fees" : "View documents, process & official fees"}
                      </span>
                    </span>
                    <ChevronDown className={cn("w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-transform duration-200 flex-shrink-0", isExpanded && "rotate-180")} />
                  </button>

                  {/* Clean Sans-Serif Drawer Content */}
                  {isExpanded && (
                    <div className="mt-3 pt-1 space-y-5 font-sans">
                      <div className="grid gap-6 sm:grid-cols-2">
                        {/* Documents */}
                        <div>
                          <h4 className="text-xs font-semibold text-stone-900 mb-2.5">
                            Required Documents
                          </h4>
                          <ul className="space-y-1.5">
                            {service.documents.map((doc, idx) => (
                              <li key={idx} className="text-xs text-stone-600 flex items-start gap-2 leading-normal">
                                <span className="w-1.5 h-1.5 rounded-full bg-stone-300 mt-1.5 flex-shrink-0" />
                                <span className="flex-1">{doc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Process */}
                        <div>
                          <h4 className="text-xs font-semibold text-stone-900 mb-2.5">
                            How It Works
                          </h4>
                          <ol className="space-y-1.5 text-xs text-stone-600 leading-normal">
                            {service.process.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-stone-400 font-medium tabular-nums flex-shrink-0">{idx + 1}.</span>
                                <span className="text-stone-600 flex-1">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>

                      {/* Fees & Government Charges */}
                      <div className="pt-1">
                        <h4 className="text-xs font-semibold text-stone-900 mb-2.5">
                          Fees &amp; Government Charges
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-2">
                          {service.costs.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-stone-600 leading-normal min-w-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-stone-300 mt-1.5 flex-shrink-0" />
                              <span className="flex-1 leading-normal break-words">
                                <span className="font-medium text-stone-600">{item.label}:</span>{" "}
                                <span className="font-semibold text-stone-900">{item.value}</span>
                              </span>
                            </li>
                          ))}
                        </ul>
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
                    className="w-full inline-flex items-center justify-center gap-2 h-10 px-5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white rounded-full font-medium text-xs shadow-2xs transition-all"
                    aria-label={`Inquire about ${service.title} on WhatsApp`}
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-100" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>



      {/* Cross-Navigation Next Step (Borderless & Airy) */}
      <div className="pt-2 sm:pt-4 text-center">
        <p className="text-xs sm:text-sm text-stone-500">
          Need coverage for your health, life, or vehicle?
        </p>
        <Link 
          href="/insurance" 
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-900 mt-1.5 transition-colors group"
        >
          <span>Explore Insurance Plans</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
