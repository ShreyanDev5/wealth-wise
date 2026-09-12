"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type Language = 'en' | 'bn';

interface LocalizedText {
  en: string;
  bn: string;
}

interface CategoryGuideRow {
  name: LocalizedText;
  purpose: LocalizedText;
  horizon: LocalizedText;
  risk: {
    en: string;
    bn: string;
    level: 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
  };
  returns: string;
}

interface FaqItem {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
  hasCategoryTable?: boolean;
}

interface FaqCategory {
  id: string;
  label: LocalizedText;
  items: FaqItem[];
}

// Strictly sorted by Time Horizon & Risk progression with natural, conversational Bengali phrasing
const categoryGuideData: CategoryGuideRow[] = [
  {
    name: { en: "Liquid Funds", bn: "লিকুইড ফান্ড" },
    purpose: { en: "Emergency Cash & Surplus Savings", bn: "জরুরি ফান্ড ও সেভিংসের বাড়তি টাকা" },
    horizon: { en: "1 – 90 Days", bn: "১ – ৯০ দিন" },
    risk: { en: "Very Low", bn: "খুব কম", level: "very-low" },
    returns: "5% – 6.5%",
  },
  {
    name: { en: "Debt Funds", bn: "ডেট ফান্ড" },
    purpose: { en: "Reliable Bank FD Alternative", bn: "ব্যাংক FD-র নির্ভরযোগ্য বিকল্প" },
    horizon: { en: "1 – 3 Years", bn: "১ – ৩ বছর" },
    risk: { en: "Low", bn: "কম", level: "low" },
    returns: "6.5% – 8%",
  },
  {
    name: { en: "Gold Funds", bn: "গোল্ড ফান্ড" },
    purpose: { en: "Gold Investment & Inflation Defense", bn: "সোনায় বিনিয়োগ ও মূল্যবৃদ্ধির সুরক্ষা" },
    horizon: { en: "3 – 5 Years", bn: "৩ – ৫ বছর" },
    risk: { en: "Medium", bn: "মাঝারি", level: "medium" },
    returns: "8% – 10%",
  },
  {
    name: { en: "Balanced Advantage (BAF)", bn: "ব্যালেন্সড অ্যাডভান্টেজ (BAF)" },
    purpose: { en: "Low-Risk First Step in Equity", bn: "শেয়ার বাজারে কম ঝুঁকিতে প্রথম বিনিয়োগ" },
    horizon: { en: "3 – 5 Years", bn: "৩ – ৫ বছর" },
    risk: { en: "Medium", bn: "মাঝারি", level: "medium" },
    returns: "10% – 12%",
  },
  {
    name: { en: "ELSS Tax Saver", bn: "ELSS ট্যাক্স সেভার" },
    purpose: { en: "Tax Exemption under Section 80C", bn: "Section 80C অনুযায়ী আয়করে ছাড়" },
    horizon: { en: "3 Yrs (Lock-in)", bn: "৩ বছর (লক-ইন)" },
    risk: { en: "High", bn: "বেশি", level: "high" },
    returns: "12% – 15%",
  },
  {
    name: { en: "Large Cap Bluechips", bn: "লার্জ ক্যাপ ব্লুচিপ" },
    purpose: { en: "India's Top 100 Giant Companies", bn: "দেশের সেরা ১০০টি ব্লুচিপ কোম্পানি" },
    horizon: { en: "5+ Years", bn: "৫+ বছর" },
    risk: { en: "Medium to High", bn: "মাঝারি থেকে বেশি", level: "medium" },
    returns: "11% – 13%",
  },
  {
    name: { en: "Flexi Cap Funds", bn: "ফ্লেক্সি ক্যাপ ফান্ড" },
    purpose: { en: "Core Long-Term Wealth Creation", bn: "দীর্ঘমেয়াদে সার্বিক সম্পদ তৈরি" },
    horizon: { en: "5+ Years", bn: "৫+ বছর" },
    risk: { en: "High", bn: "বেশি", level: "high" },
    returns: "12% – 15%",
  },
  {
    name: { en: "Mid & Small Cap", bn: "মিড ও স্মল ক্যাপ" },
    purpose: { en: "High Long-Term Growth Potential", bn: "দীর্ঘমেয়াদে দ্রুত বৃদ্ধির সুযোগ" },
    horizon: { en: "7 – 10+ Years", bn: "৭ – ১০+ বছর" },
    risk: { en: "Very High", bn: "খুব বেশি", level: "very-high" },
    returns: "14% – 18%+",
  },
];

const categories: FaqCategory[] = [
  {
    id: 'basics',
    label: {
      en: 'Getting Started',
      bn: 'শুরু করার গাইড',
    },
    items: [
      {
        id: 'basics-1',
        question: {
          en: 'How do mutual funds work?',
          bn: 'মিউচুয়াল ফান্ড কীভাবে কাজ করে?',
        },
        answer: {
          en: 'A mutual fund pools money from multiple investors into a diversified basket of stocks, bonds, or government securities managed by professional fund managers. You earn returns as the value of the underlying assets grows. You can start with as little as ₹500/month via SIP.',
          bn: 'মিউচুয়াল ফান্ড হলো এমন একটি নির্ভরযোগ্য ব্যবস্থা, যেখানে অনেক মানুষের জমানো টাকা অভিজ্ঞ ফান্ড ম্যানেজাররা একত্রিত করে দেশের সেরা কোম্পানি (Stocks) ও সরকারি বন্ডে বিনিয়োগ করেন। এই কোম্পানিগুলির ব্যবসা বৃদ্ধির সাথে সাথে আপনার জমানো টাকার মুনাফাও বাড়ে। আপনি চাইলে প্রতি মাসে মাত্র ₹৫০০ দিয়েও নিয়মিত SIP শুরু করতে পারেন।',
        },
      },
      {
        id: 'basics-benefits',
        question: {
          en: 'Why choose Mutual Funds over traditional bank savings or FDs?',
          bn: 'ব্যাংক ফিক্সড ডিপোজিট (FD) বা ট্র্যাডিশনাল সঞ্চয়ের চেয়ে মিউচুয়াল ফান্ড কেন ভালো?',
        },
        answer: {
          en: 'Mutual funds offer 6 decisive advantages over traditional fixed deposits: (1) Inflation-beating growth (12–15% historical equity average vs. 6–7% in FDs), (2) High liquidity with withdrawals anytime, (3) Wide diversification across 40–80+ top companies, (4) Experienced full-time fund management, (5) Disciplined compounding starting from just ₹500/month, and (6) Superior tax efficiency under Section 80C and LTCG exemption limits.',
          bn: 'সাধারণ ব্যাংক ফিক্সড ডিপোজিট (FD)-র তুলনায় মিউচুয়াল ফান্ডের প্রধান সুবিধাগুলি হলো: (১) মূল্যবৃদ্ধিকে টেক্কা দেওয়ার ক্ষমতা—FD-তে যেখানে ৬-৭% সুদ মেলে, ভালো ইকুইটি ফান্ডে দীর্ঘমেয়াদে গড়ে ১২-১৫% চক্রবৃদ্ধি রিটার্ন পাওয়ার ইতিহাস রয়েছে; (২) হাই লিকুইডিটি—জরুরি প্রয়োজনে যেকোনো সময় টাকা তুলে নেওয়ার স্বাধীনতা; (৩) ডাইভারসিফিকেশন—৪০ থেকে ৮০টি নামী কোম্পানিতে টাকা ভাগ হয়ে থাকায় ঝুঁকি অনেক কম; (৪) প্রফেশনাল ফান্ড ম্যানেজমেন্ট—অভিজ্ঞ বিশেষজ্ঞদের সার্বক্ষণিক নজরদারি; (৫) মাত্র ₹৫০০ দিয়ে প্রতি মাসে ছোট সঞ্চয় থেকে শুরুর সুযোগ; এবং (৬) আকর্ষণীয় ট্যাক্স সাশ্রয়ের সুবিধা।',
        },
      },
      {
        id: 'basics-2',
        question: {
          en: 'Do I need a Demat account to invest?',
          bn: 'মিউচুয়াল ফান্ডে ইনভেস্ট করতে কি Demat অ্যাকাউন্ট লাগবে?',
        },
        answer: {
          en: 'No. A Demat account is not required for mutual funds. Investments are held directly as units registered with the fund house (AMC). You only need a one-time paperless KYC using your PAN, Aadhaar, and active bank account.',
          bn: 'না, মিউচুয়াল ফান্ডে বিনিয়োগ করার জন্য কোনো Demat অ্যাকাউন্টের প্রয়োজন নেই। আপনার ইনভেস্টমেন্ট সরাসরি ফান্ড হাউসের (AMC) অধীনে আপনার নিজের নামেই ইউনিট হিসেবে জমা থাকে। শুধু প্যান কার্ড, আধার কার্ড আর ব্যাংক অ্যাকাউন্ট দিয়ে একবার পেপারলেস KYC কমপ্লিট করলেই আপনি শুরু করতে পারবেন।',
        },
      },
      {
        id: 'basics-3',
        question: {
          en: 'What is the difference between SIP and Lump Sum?',
          bn: 'SIP এবং লাম্পসাম (Lump Sum)-এর মধ্যে পার্থক্য কী?',
        },
        answer: {
          en: 'An SIP (Systematic Investment Plan) automatically invests a fixed amount monthly, averaging out market fluctuations (rupee-cost averaging). A Lump Sum is a one-time investment of capital, best suited when deploying bonuses, savings, or business proceeds.',
          bn: 'SIP (Systematic Investment Plan) হলো প্রতি মাসে একটি নির্দিষ্ট অঙ্কের টাকা নিয়মিত সঞ্চয় করা—ঠিক যেমন ব্যাংকে আরডি (RD) করা হয়। এতে বাজারের ওঠানামার ঝুঁকি স্বাভাবিক হয়ে যায় (Rupee-Cost Averaging)। আর লাম্পসাম (Lump Sum) হলো এককালীন কিছু টাকা একবারে ইনভেস্ট করা—যা বোনাস, গ্র্যাচুইটি বা জমানো পুঁজি একবারে কাজে লাগানোর জন্য সবচেয়ে উপযুক্ত।',
        },
      },
      {
        id: 'basics-swp',
        question: {
          en: 'What are SIP and SWP, and why are they so popular?',
          bn: 'SIP এবং SWP কেন এত জনপ্রিয়? মাসে মাসে নিয়মিত আয় বা পেনশন কি সম্ভব?',
        },
        answer: {
          en: 'SIP builds your wealth during your working years by investing a fixed sum monthly. SWP (Systematic Withdrawal Plan) does the exact reverse: it lets you withdraw a fixed monthly income from your accumulated corpus into your bank account. It acts as a reliable, tax-efficient monthly "pension" ideal for retirees and senior citizens, while your remaining fund balance continues to compound.',
          bn: 'SIP হলো কর্মজীবনে প্রতি মাসে অল্প অল্প টাকা জমিয়ে একটি বড় তহবিল বা ফান্ড তৈরি করার উপায়। আর SWP (Systematic Withdrawal Plan) ঠিক তার উল্টো—আপনার জমানো ফান্ড থেকে প্রতি মাসে পেনশনের মতো একটি নির্দিষ্ট টাকা সরাসরি আপনার ব্যাংক অ্যাকাউন্টে পাওয়ার সুবিধা। বিশেষ করে অবসরপ্রাপ্ত ব্যক্তি ও সিনিয়র সিটিজেনদের জন্য এটি ফিক্সড ডিপোজিটের চেয়েও ভালো ও ট্যাক্স-সাশ্রয়ী নিয়মিত আয়ের মাধ্যম, কারণ বাকি টাকা ফান্ডেই বাড়তে থাকে।',
        },
      },
      {
        id: 'basics-4',
        question: {
          en: 'Can I pause, increase, or stop my SIP anytime if I face an emergency?',
          bn: 'জরুরি প্রয়োজনে কি SIP বন্ধ বা Pause করা যায়? কোনো পেনাল্টি আছে কি?',
        },
        answer: {
          en: 'Yes, completely flexible. There is zero penalty or lock-in fee for pausing, stopping, or modifying your SIP amount. You can stop, increase, or resume anytime with a single message to us.',
          bn: 'হ্যাঁ, সম্পূর্ণ ফ্লেক্সিবল। কোনো জরিমানা বা অতিরিক্ত চার্জ ছাড়াই আপনি যেকোনো সময় SIP সাময়িক পজ (Pause), টাকার পরিমাণ বাড়ানো-কমানো, বা সম্পূর্ণ বন্ধ করতে পারেন। মনতোষবাবুকে শুধু একটি WhatsApp মেসেজ পাঠালেই সব ব্যবস্থা হয়ে যায়।',
        },
      },
    ],
  },
  {
    id: 'safety',
    label: {
      en: 'Safety & Trust',
      bn: 'টাকার নিরাপত্তা',
    },
    items: [
      {
        id: 'safety-scale',
        question: {
          en: 'How large and trusted is the mutual fund industry in India today?',
          bn: 'ভারতে মিউচুয়াল ফান্ড ইন্ডাস্ট্রি কতটা বড় এবং মানুষ কতটা ভরসা করছেন?',
        },
        answer: {
          en: 'The mutual fund ecosystem in India is one of the fastest-growing and strictly regulated financial sectors in the world. According to official AMFI data, total Indian mutual fund Assets Under Management (AUM) stands at over ₹86+ Lakh Crore, with more than ₹32,000+ Crore contributed monthly through retail SIPs alone by millions of disciplined Indian families across 50+ regulated fund houses.',
          bn: 'SEBI-র অত্যন্ত কড়া নজরদারি ও নিয়মের কারণে ভারতে মিউচুয়াল ফান্ডের ওপর সাধারণ মানুষের ভরসা দিন দিন বাড়ছে। AMFI-এর সর্বশেষ তথ্য অনুযায়ী, দেশের ৫০টিরও বেশি ফান্ড হাউসে মানুষের মোট বিনিয়োগের পরিমাণ (AUM) প্রায় ₹৮৬ লক্ষ কোটি টাকা ছাড়িয়ে গেছে। এছাড়া প্রতি মাসে ভারতীয় পরিবারগুলি নিয়মিত SIP-র মাধ্যমে ₹৩২,০০০ কোটি টাকারও বেশি ইনভেস্ট করছেন—যা সাধারণ মানুষের নির্ভরযোগ্য আস্থার বড় প্রমাণ।',
        },
      },
      {
        id: 'safety-1',
        question: {
          en: 'Does my investment money go into your personal account? How secure is the transaction?',
          bn: 'বিনিয়োগের টাকা কি আপনার পার্সোনাল অ্যাকাউন্টে যাবে? লেনদেন কতটা নিরাপদ?',
        },
        answer: {
          en: 'Never. Monotosh never accepts or holds investment capital in any personal account. All funds are debited directly from your verified bank account to SEBI-regulated Asset Management Companies (AMCs) through official exchange platforms (BSE Star MF / NSE NMF). Your money is always 100% in your own name.',
          bn: 'কখনোই নয়। মনতোষবাবু ব্যক্তিগত অ্যাকাউন্টে কোনো ক্লায়েন্টের টাকা গ্রহণ করেন না। সমস্ত টাকা সরাসরি আপনার নিজের ভেরিফায়েড ব্যাংক অ্যাকাউন্ট থেকে SEBI-অনুমোদিত অফিসিয়াল প্ল্যাটফর্মের (BSE Star MF / NSE NMF) মাধ্যমে সংশ্লিষ্ট ফান্ড হাউসে জমা হয়। সমস্ত ইউনিট ১০০% আপনার নিজের নামেই রেজিস্টার্ড থাকে।',
        },
      },
      {
        id: 'safety-2',
        question: {
          en: 'Is my money safe? Who regulates mutual funds (SEBI) and what if a fund company closes?',
          bn: 'আমার জমানো টাকা কতটা সুরক্ষিত? মিউচুয়াল ফান্ড কে নিয়ন্ত্রণ করে (SEBI) এবং কোম্পানি বন্ধ হলে কী হবে?',
        },
        answer: {
          en: 'Mutual funds in India are strictly regulated by SEBI (Securities and Exchange Board of India). Your assets are never kept on the fund house balance sheet; they are held by an independent custodian bank designated by SEBI. Even if an AMC ceases operations, SEBI oversees the orderly transfer of your funds to another regulated institution or liquidates the assets directly back into your bank account.',
          bn: 'ভারতে সমস্ত মিউচুয়াল ফান্ড সেবি (SEBI - Securities and Exchange Board of India) দ্বারা অত্যন্ত কঠোরভাবে নিয়ন্ত্রিত। আপনার টাকা ফান্ড কোম্পানির নিজস্ব ব্যালেন্স শিটে থাকে না, বরং এটি একটি সম্পূর্ণ স্বাধীন কাস্টোডিয়ান ব্যাংকের কাছে সুরক্ষিত থাকে। কোনো ফান্ড কোম্পানি বন্ধ হয়ে গেলেও SEBI-র নজরদারিতে আপনার ফান্ড অন্য বিশ্বস্ত ফান্ড হাউসে পাঠিয়ে দেওয়া হয় অথবা আপনার সমস্ত প্রাপ্য অর্থ সরাসরি আপনার ব্যাংক অ্যাকাউন্টে ফেরত দেওয়া হয়।',
        },
      },
      {
        id: 'safety-3',
        question: {
          en: 'Can I lose all my money in a mutual fund?',
          bn: 'মিউচুয়াল ফান্ডে কি সমস্ত টাকা ডুবে যাওয়ার বা Zero হয়ে যাওয়ার ঝুঁকি থাকে?',
        },
        answer: {
          en: 'Because mutual funds diversify across 40–80+ different securities, the risk of total loss is virtually zero in diversified funds. Market values fluctuate short-term, but holding equity funds for 5+ years historically delivers consistent inflation-beating growth.',
          bn: 'না, কারণ একটি মিউচুয়াল ফান্ডে আপনার টাকা কোনো একটি নির্দিষ্ট কোম্পানিতে রাখা হয় না, বরং দেশের ৪০ থেকে ৮০টি শীর্ষস্থানীয় কোম্পানিতে ভাগ করে রাখা হয় (Diversification)। ফলে দু-একটি কোম্পানি ক্ষতিগ্রস্ত হলেও পুরো টাকা হারানোর কোনো ঝুঁকি থাকে না। স্বল্পমেয়াদে বাজার ওঠানামা করলেও, ৫ বছরের বেশি মেয়াদে ভালো ইকুইটি ফান্ড সবসময় মূল্যবৃদ্ধি কাটিয়ে চমৎকার লাভ দিয়েছে।',
        },
      },
      {
        id: 'safety-4',
        question: {
          en: 'What happens to my mutual fund investments if something happens to me?',
          bn: 'আমার অবর্তমানে এই জমানো টাকার কী হবে? Nominee কীভাবে টাকা পাবেন?',
        },
        answer: {
          en: 'All investments include 100% legal nomination registered with the fund houses. In any eventuality, we personally assist your designated nominee and family members with documentation and claim settlement to ensure funds are transferred smoothly without legal hurdles.',
          bn: 'প্রতিটি ইনভেস্টমেন্টে ১০০% আইনি নমিনি (Nominee) যুক্ত থাকে। কোনো অঘটন ঘটলে পরিবারের সদস্যদের কোনো সরকারি অফিসে বা জটিলতায় দৌড়াদৌড়ি করতে হয় না—নথিপত্র তৈরি থেকে শুরু করে নমিনির ব্যাংক অ্যাকাউন্টে টাকা পৌঁছে দেওয়া পর্যন্ত সমস্ত পেপারওয়ার্কের দায়িত্ব মনতোষবাবু নিজে সামনে থেকে সমাধান করেন।',
        },
      },
    ],
  },
  {
    id: 'advisory',
    label: {
      en: 'Advisory Value',
      bn: 'ব্যক্তিগত পরামর্শ',
    },
    items: [
      {
        id: 'advisory-1',
        question: {
          en: 'Why should I invest through an advisor when apps like Groww or Zerodha exist?',
          bn: 'Groww বা Zerodha-র মতো অ্যাপ থাকা সত্ত্বেও একজন ব্যক্তিগত অ্যাডভাইজরের মাধ্যমে ইনভেস্ট করা কেন ভালো?',
        },
        answer: {
          en: 'Discount apps only provide self-service execution without financial guidance. We offer personalized planning aligned to your family goals, emotional discipline during volatile markets, periodic rebalancing, and direct hands-on support for tax optimization and nominee claim settlements.',
          bn: 'Groww বা Zerodha-র মতো অ্যাপগুলি কেবল নিজে নিজে লেনদেন করার একটি প্ল্যাটফর্ম—সেখানে কোনো অভিজ্ঞ পরামর্শ বা ব্যক্তিগত দায়িত্ব থাকে না। একজন পার্সোনাল অ্যাডভাইজর হিসেবে মনতোষবাবু আপনার পরিবারের সুনির্দিষ্ট লক্ষ্য অনুযায়ী সঠিক ফান্ড বেছে দেন, মার্কেট যখন পড়ে যায় তখন ভয় পেয়ে লোকসানে বিক্রি না করে ধৈর্য ধরতে শেখান, প্রতি বছর পোর্টফোলিও রিভিউ করেন এবং যেকোনো প্রয়োজনে পরিবারের পাশে দাঁড়িয়ে সম্পূর্ণ অফলাইন ও অনলাইন সহায়তা দেন।',
        },
      },
    ],
  },
  {
    id: 'returns',
    label: {
      en: 'Returns & Liquidity',
      bn: 'রিটার্ন ও টাকা তোলা',
    },
    items: [
      {
        id: 'returns-1',
        question: {
          en: 'What returns can I realistically expect?',
          bn: 'দীর্ঘমেয়াদে কেমন রিটার্ন (Return) আশা করা বাস্তবসম্মত?',
        },
        answer: {
          en: 'While market returns are never guaranteed, long-term diversified equity funds in India have historically delivered average annualized returns between 12% and 15% over 7–10 year horizons. Conservative hybrid and debt funds typically deliver between 7% and 9%.',
          bn: 'শেয়ার বাজারে কোনো নির্দিষ্ট ফিক্সড রিটার্নের গ্যারান্টি দেওয়া নিয়মবিরুদ্ধ, তবে ঐতিহাসিক রেকর্ড অনুযায়ী ৭ থেকে ১০ বছরের মেয়াদে ভালো ইকুইটি ফান্ডে গড়ে ১২% থেকে ১৫% পর্যন্ত চক্রবৃদ্ধি রিটার্ন পাওয়া গেছে। আর অপেক্ষাকৃত কম ঝুঁকির হাইব্রিড বা ডেট ফান্ডে সাধারণত ৭% থেকে ৯% পর্যন্ত রিটার্ন পাওয়া যায়।',
        },
      },
      {
        id: 'returns-guide',
        hasCategoryTable: true,
        question: {
          en: 'Which mutual fund category fits my goal? (Time Horizon & Return Guide)',
          bn: 'কোন ধরনের মিউচুয়াল ফান্ড আমার জন্য সঠিক? (সময়সীমা ও রিটার্ন গাইড)',
        },
        answer: {
          en: 'Different funds are designed for different financial timeframes and risk appetites. The table below is organized sequentially from shortest time horizon (emergency cash) to longest investment horizon (aggressive compounding):',
          bn: 'প্রতিটি মিউচুয়াল ফান্ডের উদ্দেশ্য ও প্রয়োজনীয় মেয়াদ আলাদা। আপনার সুবিধার জন্য অতি স্বল্পমেয়াদ থেকে শুরু করে দীর্ঘমেয়াদি বড় লক্ষ্য অনুযায়ী তালিকাটি ক্রমানুসারে সাজানো হলো:',
        },
      },
      {
        id: 'returns-2',
        question: {
          en: 'How quickly can I withdraw my money?',
          bn: 'জরুরি প্রয়োজনে কত দ্রুত টাকা তুলে (Withdraw) ব্যাংকে পাওয়া যায়?',
        },
        answer: {
          en: 'Most mutual funds are highly liquid. Open-ended equity funds credit withdrawals directly to your bank account within 2–3 business days. Liquid funds typically credit within 24 hours. Only tax-saving ELSS funds have a mandatory 3-year lock-in.',
          bn: 'মিউচুয়াল ফান্ড থেকে টাকা তোলা অত্যন্ত সহজ ও দ্রুত। সাধারণ ওপেন-এন্ডেড ফান্ড থেকে টাকা তোলার নির্দেশ দিলে ২ থেকে ৩ কার্যদিবসের (Working Days) মধ্যে সরাসরি আপনার ব্যাংক অ্যাকাউন্টে টাকা চলে আসে। আর লিকুইড ফান্ডের টাকা মাত্র ২৪ ঘণ্টার মধ্যেই পাওয়া যায়। শুধু ট্যাক্স-সেভিং ELSS ফান্ডে ৩ বছরের লক-ইন থাকে।',
        },
      },
    ],
  },
  {
    id: 'tax',
    label: {
      en: 'Tax Rules (Budget 2024)',
      bn: 'ট্যাক্স নিয়মাবলী',
    },
    items: [
      {
        id: 'tax-1',
        question: {
          en: 'How are mutual fund profits taxed in India?',
          bn: 'মিউচুয়াল ফান্ডের লাভের ওপর ট্যাক্স (LTCG / STCG) কীভাবে হিসেব হয়?',
        },
        answer: {
          en: 'As per the latest Finance Act 2024: For equity funds held over 1 year (LTCG), gains above ₹1.25 Lakhs per financial year are taxed at 12.5% (the first ₹1.25 Lakhs is completely tax-free). Equity gains held under 1 year (STCG) are taxed at 20%. Debt fund gains are taxed according to your individual income tax slab.',
          bn: 'বাজেট ২০২৪-এর সর্বশেষ নিয়ম অনুযায়ী: ইকুইটি ফান্ডে ১ বছরের বেশি টাকা রাখলে (LTCG), বছরে ₹১.২৫ লাখ পর্যন্ত লাভ সম্পূর্ণ ট্যাক্স-ফ্রি! ₹১.২৫ লাখের বেশি লাভের ওপর ১২.৫% ট্যাক্স লাগে। আর ১ বছরের কম সময়ের মধ্যে টাকা তুললে (STCG) লাভের ওপর ২০% ট্যাক্স দিতে হয়। ডেট ফান্ডের ক্ষেত্রে আপনার নিজস্ব ইনকাম ট্যাক্স স্ল্যাব অনুযায়ী ট্যাক্স হিসেব হয়।',
        },
      },
      {
        id: 'tax-2',
        question: {
          en: 'Can mutual funds help me save income tax?',
          bn: 'মিউচুয়াল ফান্ড কি ইনকাম ট্যাক্স (Section 80C) বাঁচাতে সাহায্য করে?',
        },
        answer: {
          en: 'Yes. ELSS (Equity Linked Savings Scheme) allows deductions up to ₹1.5 Lakhs under Section 80C, with the shortest lock-in period (3 years) among all 80C investment options.',
          bn: 'হ্যাঁ। ELSS (ট্যাক্স সেভার ফান্ড)-এ ইনভেস্ট করলে আয়কর আইনের Section 80C অনুযায়ী বছরে সর্বোচ্চ ₹১.৫ লাখ টাকা পর্যন্ত ট্যাক্স ছাড় পাওয়া যায়। তাছাড়া PPF (১৫ বছর) বা ট্যাক্স-সেভিং FD (৫ বছর)-র তুলনায় ELSS-এর লক-ইন পিরিয়ড সবচেয়ে কম—মাত্র ৩ বছর।',
        },
      },
    ],
  },
];

export default function InvestFaq() {
  const [lang, setLang] = useState<Language>('en');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const displayedItems = activeCategory === 'all'
    ? categories.flatMap((cat) => cat.items)
    : (categories.find((c) => c.id === activeCategory)?.items ?? []);

  const getRiskBadgeClass = (level: CategoryGuideRow['risk']['level']) => {
    switch (level) {
      case 'very-low':
      case 'low':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
      case 'medium':
        return 'bg-amber-50 text-amber-800 border-amber-200/80';
      case 'high':
      case 'very-high':
        return 'bg-rose-50 text-rose-800 border-rose-200/80';
      default:
        return 'bg-stone-50 text-stone-700 border-stone-200/70';
    }
  };

  return (
    <AnimatedSection animation="fade-up" delay={50} duration={350}>
      <div className={cn("w-full", lang === 'bn' ? "font-bengali" : "font-sans")}>
        {/* Header & Segmented Filter */}
        <div className="text-center mb-6 sm:mb-7 flex flex-col items-center">
          {/* Clean Language Segmented Switch */}
          <div className="inline-flex p-1 bg-stone-100/90 rounded-full border border-stone-200/70 mb-3.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={cn(
                "px-3.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer",
                lang === 'en'
                  ? "bg-white text-stone-900 shadow-xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              )}
              aria-pressed={lang === 'en'}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang('bn')}
              className={cn(
                "px-3.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer font-bengali",
                lang === 'bn'
                  ? "bg-white text-stone-900 shadow-xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              )}
              aria-pressed={lang === 'bn'}
            >
              বাংলা
            </button>
          </div>

          <h2 className={cn(
            "tracking-tight mb-2",
            lang === 'bn'
              ? "text-2xl sm:text-3xl font-bold font-bengali text-stone-900"
              : "text-xl sm:text-2xl font-bold font-serif text-stone-900"
          )}>
            {lang === 'en' ? "Frequently Asked Questions" : "সাধারণ জিজ্ঞাসা ও উত্তর"}
          </h2>
          <p className={cn(
            "text-stone-600 max-w-md mx-auto mb-4",
            lang === 'bn' ? "text-xs sm:text-[13.5px] leading-relaxed font-bengali" : "text-xs sm:text-sm leading-normal text-pretty font-sans"
          )}>
            {lang === 'en'
              ? "Straightforward answers on safety, returns, liquidity, and taxation before you invest."
              : "বিনিয়োগের আগে আপনার জমানো টাকার নিরাপত্তা, রিটার্ন, উইথড্রয়াল ও ট্যাক্স সংক্রান্ত যাবতীয় তথ্য।"}
          </p>

          {/* Clean Segmented Category Filter */}
          <div className="inline-flex p-1 bg-stone-100/90 rounded-full border border-stone-200/70 overflow-x-auto no-scrollbar gap-1 max-w-full justify-start sm:justify-center">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={cn(
                "px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap text-center cursor-pointer",
                lang === 'bn' && "font-bengali text-xs sm:text-[13px]",
                activeCategory === 'all'
                  ? "bg-white text-stone-900 shadow-xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              )}
            >
              {lang === 'en' ? "All Questions" : "সব প্রশ্ন"}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap text-center cursor-pointer",
                  lang === 'bn' && "font-bengali text-xs sm:text-[13px]",
                  activeCategory === cat.id
                    ? "bg-white text-stone-900 shadow-xs font-semibold"
                    : "text-stone-600 hover:text-stone-900"
                )}
              >
                {cat.label[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Unified FAQ Card */}
        <div className="bg-white/95 rounded-2xl sm:rounded-3xl shadow-2xs border border-stone-200/80 p-5 sm:p-7 text-left font-sans">
          <Accordion type="single" collapsible defaultValue="faq-0">
            {displayedItems.map((item, idx) => (
              <AccordionItem
                key={`${item.id}-${idx}`}
                value={`faq-${idx}`}
                className="border-b border-stone-100 last:border-b-0"
              >
                <AccordionTrigger className={cn(
                  "text-left font-medium text-stone-900 hover:text-emerald-800 hover:no-underline py-3.5 sm:py-4 group",
                  lang === 'bn'
                    ? "text-sm sm:text-base font-bengali leading-relaxed"
                    : "text-xs sm:text-sm font-sans leading-snug"
                )}>
                  <span className="pr-4">{item.question[lang]}</span>
                </AccordionTrigger>
                <AccordionContent className={cn(
                  "text-stone-600 pb-3.5 sm:pb-4 pr-2 sm:pr-4",
                  lang === 'bn'
                    ? "text-xs sm:text-[14px] font-bengali leading-relaxed"
                    : "text-xs sm:text-[13px] font-sans leading-relaxed"
                )}>
                  <p>{item.answer[lang]}</p>

                  {/* Clean Sequential Risk & Return Table with Fixed Column Proportions */}
                  {item.hasCategoryTable && (
                    <div className="mt-4 rounded-xl border border-stone-200/80 bg-stone-50/60 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[520px]">
                          <thead>
                            <tr className={cn(
                              "border-b border-stone-200/80 bg-stone-100/90 text-stone-700 font-semibold",
                              lang === 'bn' ? "text-xs sm:text-[13px] font-bengali" : "text-xs font-sans"
                            )}>
                              <th className="w-[42%] px-4 py-3">
                                {lang === 'en' ? "Category & Purpose" : "ফান্ডের ধরন ও উদ্দেশ্য"}
                              </th>
                              <th className="w-[22%] px-4 py-3 whitespace-nowrap">
                                {lang === 'en' ? "Time Horizon" : "প্রয়োজনীয় সময়সীমা"}
                              </th>
                              <th className="w-[18%] px-4 py-3 whitespace-nowrap">
                                {lang === 'en' ? "Risk Level" : "ঝুঁকির মাত্রা"}
                              </th>
                              <th className="w-[18%] px-4 py-3 whitespace-nowrap">
                                {lang === 'en' ? "Expected Return" : "সম্ভাব্য রিটার্ন"}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-100 bg-white">
                            {categoryGuideData.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-stone-50/70 transition-colors">
                                <td className="px-4 py-3 sm:py-3.5">
                                  <div className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-600 font-semibold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5 border border-stone-200/70">
                                      {rIdx + 1}
                                    </span>
                                    <div>
                                      <div className={cn(
                                        "font-semibold text-stone-900 leading-snug",
                                        lang === 'bn' ? "text-xs sm:text-[14px] font-bengali" : "text-xs sm:text-[13px] font-sans"
                                      )}>
                                        {row.name[lang]}
                                      </div>
                                      <div className={cn(
                                        "text-stone-500 mt-0.5 font-normal leading-normal",
                                        lang === 'bn' ? "text-[11.5px] sm:text-xs font-bengali" : "text-[11px] font-sans"
                                      )}>
                                        {row.purpose[lang]}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className={cn(
                                  "px-4 py-3 sm:py-3.5 whitespace-nowrap text-stone-700 font-medium",
                                  lang === 'bn' ? "text-xs sm:text-[13.5px] font-bengali" : "text-xs sm:text-sm font-sans"
                                )}>
                                  {row.horizon[lang]}
                                </td>
                                <td className="px-4 py-3 sm:py-3.5 whitespace-nowrap">
                                  <span className={cn(
                                    "inline-block px-2.5 py-0.5 rounded-full font-medium border",
                                    lang === 'bn' ? "text-[11px] font-bengali" : "text-[10px] font-sans",
                                    getRiskBadgeClass(row.risk.level)
                                  )}>
                                    {row.risk[lang]}
                                  </span>
                                </td>
                                <td className={cn(
                                  "px-4 py-3 sm:py-3.5 whitespace-nowrap font-bold text-stone-900 tabular-nums",
                                  lang === 'bn' ? "text-xs sm:text-sm font-bengali" : "text-xs sm:text-[13px] font-sans"
                                )}>
                                  {row.returns}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className={cn(
                        "px-3.5 py-2.5 bg-stone-100/60 border-t border-stone-200/60 text-stone-500",
                        lang === 'bn' ? "text-[11.5px] font-bengali leading-normal" : "text-[10px] font-sans italic"
                      )}>
                        {lang === 'en'
                          ? "* Indicative historical returns based on Indian market cycles. Sorted chronologically from shortest time horizon to longest compounding horizon."
                          : "* বিগত বছরগুলির বাজারভিত্তিক গড়ের ওপর নির্ভরশীল। সময়সীমা অনুযায়ী অতি স্বল্পমেয়াদ থেকে দীর্ঘমেয়াদি লক্ষ্য হিসেবে সাজানো।"}
                      </div>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Quiet Regulatory Disclaimer */}
        <p className={cn(
          "text-stone-400 text-center mt-3 leading-relaxed",
          lang === 'bn' ? "text-xs font-bengali" : "text-[11px] font-sans"
        )}>
          {lang === 'en'
            ? "Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing."
            : "মিউচুয়াল ফান্ড বিনিয়োগ বাজারগত ঝুঁকি সাপেক্ষ। বিনিয়োগ করার পূর্বে স্কিম সম্পর্কিত সমস্ত নথি সতর্কতার সাথে পড়ুন।"}
        </p>
      </div>
    </AnimatedSection>
  );
}
