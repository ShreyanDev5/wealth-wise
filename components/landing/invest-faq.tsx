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
    purpose: { en: "Emergency funds & surplus cash", bn: "জরুরি প্রয়োজন ও স্বল্পমেয়াদি সঞ্চয়" },
    horizon: { en: "1 – 90 Days", bn: "১ – ৯০ দিন" },
    risk: { en: "Very Low", bn: "খুব কম", level: "very-low" },
    returns: "5% – 6.5%",
  },
  {
    name: { en: "Debt Funds", bn: "ডেট ফান্ড" },
    purpose: { en: "Better alternative to bank fixed deposits", bn: "ফিক্সড ডিপোজিটের নির্ভরযোগ্য বিকল্প" },
    horizon: { en: "1 – 3 Years", bn: "১ – ৩ বছর" },
    risk: { en: "Low", bn: "কম", level: "low" },
    returns: "6.5% – 8%",
  },
  {
    name: { en: "Gold Funds", bn: "গোল্ড ফান্ড" },
    purpose: { en: "Gold investment without storage hassle", bn: "সোনায় বিনিয়োগের সহজ উপায়" },
    horizon: { en: "3 – 5 Years", bn: "৩ – ৫ বছর" },
    risk: { en: "Medium", bn: "মাঝারি", level: "medium" },
    returns: "8% – 10%",
  },
  {
    name: { en: "Balanced Advantage (BAF)", bn: "ব্যালেন্সড অ্যাডভান্টেজ (BAF)" },
    purpose: { en: "Mix of equity and debt with lower risk", bn: "শেয়ার ও বন্ড মিলিয়ে ব্যালেন্সড বিনিয়োগ" },
    horizon: { en: "3 – 5 Years", bn: "৩ – ৫ বছর" },
    risk: { en: "Medium", bn: "মাঝারি", level: "medium" },
    returns: "10% – 12%",
  },
  {
    name: { en: "ELSS Tax Saver", bn: "ELSS ট্যাক্স সেভার" },
    purpose: { en: "Tax savings under Section 80C", bn: "Section 80C অনুযায়ী ট্যাক্স ছাড় (৩ বছর)" },
    horizon: { en: "3 Yrs (Lock-in)", bn: "৩ বছর (লক-ইন)" },
    risk: { en: "High", bn: "বেশি", level: "high" },
    returns: "12% – 15%",
  },
  {
    name: { en: "Large Cap Bluechips", bn: "লার্জ ক্যাপ ব্লুচিপ" },
    purpose: { en: "Top 100 largest and most stable Indian companies", bn: "দেশের শীর্ষ ১০০টি সুপ্রতিষ্ঠিত কোম্পানি" },
    horizon: { en: "5+ Years", bn: "৫+ বছর" },
    risk: { en: "Medium to High", bn: "মাঝারি থেকে বেশি", level: "medium" },
    returns: "11% – 13%",
  },
  {
    name: { en: "Flexi Cap Funds", bn: "ফ্লেক্সি ক্যাপ ফান্ড" },
    purpose: { en: "All-round growth across large, mid, and small caps", bn: "বড় ও মাঝারি সব ধরনের কোম্পানিতে বিনিয়োগ" },
    horizon: { en: "5+ Years", bn: "৫+ বছর" },
    risk: { en: "High", bn: "বেশি", level: "high" },
    returns: "12% – 15%",
  },
  {
    name: { en: "Mid & Small Cap", bn: "মিড ও স্মল ক্যাপ" },
    purpose: { en: "High growth potential in emerging companies", bn: "দ্রুত বর্ধনশীল নতুন কোম্পানিতে বেশি বৃদ্ধির সুযোগ" },
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
        id: 'basics-benefits',
        question: {
          en: 'Why choose mutual funds over bank fixed deposits?',
          bn: 'ব্যাংক ফিক্সড ডিপোজিটের (FD) চেয়ে মিউচুয়াল ফান্ড কেন ভালো?',
        },
        answer: {
          en: 'A mutual fund pools investments into India\'s top companies and bonds, managed by professional fund managers starting from just ₹500/month. Compared to bank FDs, it offers three key advantages: higher long-term growth (equity funds have historically delivered 12–15% annual returns vs. 6–7% in FDs), easy liquidity (withdraw anytime without penalty), and better tax efficiency (equity gains up to ₹1.25L per year are tax-free).',
          bn: 'মিউচুয়াল ফান্ডে জমানো টাকা একত্রিত করে দেশের শীর্ষ কোম্পানি ও বন্ডে পেশাদারভাবে বিনিয়োগ করা হয়, যা মাসে মাত্র ₹৫০০ দিয়েও শুরু করা যায়। সাধারণ ফিক্সড ডিপোজিটের তুলনায় এর তিনটি বড় সুবিধা রয়েছে: (১) বেশি রিটার্ন—FD-র ৬-৭% সুদের তুলনায় দীর্ঘমেয়াদে গড়ে ১২-১৫% বার্ষিক বৃদ্ধি; (২) সহজ উইথড্রয়াল—কোনো পেনাল্টি ছাড়াই যেকোনো সময় টাকা তোলার সুবিধা; এবং (৩) ট্যাক্স ছাড়—বছরে প্রথম ₹১.২৫ লাখ পর্যন্ত মুনাফায় কোনো ট্যাক্স লাগে না।',
        },
      },
      {
        id: 'basics-2',
        question: {
          en: 'Do I need a Demat account to invest?',
          bn: 'মিউচুয়াল ফান্ডে বিনিয়োগ করতে কি Demat অ্যাকাউন্ট লাগবে?',
        },
        answer: {
          en: 'No. You do not need a Demat account. Fund units are held directly in your own name with the fund house. You only need a one-time paperless KYC using your PAN, Aadhaar, and bank account.',
          bn: 'না, মিউচুয়াল ফান্ডে বিনিয়োগের জন্য Demat অ্যাকাউন্টের প্রয়োজন নেই। আপনার ফান্ড ইউনিট সরাসরি আপনার নিজের নামেই ফান্ড হাউসে জমা থাকে। শুধু প্যান কার্ড, আধার ও ব্যাংক অ্যাকাউন্ট দিয়ে একবার পেপারলেস KYC করলেই শুরু করা যায়।',
        },
      },
      {
        id: 'basics-3',
        question: {
          en: 'What is the difference between SIP and Lump Sum?',
          bn: 'SIP এবং লাম্পসাম (Lump Sum)-এর মধ্যে পার্থক্য কী?',
        },
        answer: {
          en: 'An SIP invests a fixed amount every month, helping you average out market ups and downs. A lump sum is a one-time investment of capital, best suited when you receive a bonus, gratuity, or have accumulated savings ready to invest.',
          bn: 'SIP হলো প্রতি মাসে একটি নির্দিষ্ট অঙ্কের টাকা নিয়মিত জমানো—যেমন প্রতি মাসে ব্যাংকে RD করা হয়। এতে বাজারের ওঠানামার ঝুঁকি কমে যায়। আর লাম্পসাম হলো এককালীন কিছু টাকা একবারে বিনিয়োগ করা—যা বোনাস বা জমানো টাকা একবারে কাজে লাগানোর জন্য উপযুক্ত।',
        },
      },
      {
        id: 'basics-swp',
        question: {
          en: 'What is an SWP, and how does it provide monthly income?',
          bn: 'SWP কী? এটি কীভাবে প্রতি মাসে নিয়মিত আয় বা পেনশন দেয়?',
        },
        answer: {
          en: 'While an SIP helps you invest money monthly during your working years, an SWP (Systematic Withdrawal Plan) does the opposite: it pays you a fixed monthly amount from your invested savings directly into your bank account. It acts as a tax-friendly monthly pension for retirees while the rest of your fund continues to grow.',
          bn: 'SIP কর্মজীবনে প্রতি মাসে অল্প অল্প টাকা জমানোর উপায়। আর SWP (Systematic Withdrawal Plan) ঠিক তার উল্টো—আপনার জমানো ফান্ড থেকে প্রতি মাসে পেনশনের মতো একটি নির্দিষ্ট টাকা আপনার ব্যাংক অ্যাকাউন্টে পাওয়ার সুবিধা। বাকি টাকা ফান্ডেই বাড়তে থাকে, যা অবসরপ্রাপ্ত ব্যক্তিদের জন্য অত্যন্ত কার্যকর।',
        },
      },
      {
        id: 'basics-4',
        question: {
          en: 'Can I pause, change, or stop my SIP anytime?',
          bn: 'জরুরি প্রয়োজনে কি SIP সাময়িক বন্ধ বা পরিবর্তন করা যায়?',
        },
        answer: {
          en: 'Yes, completely flexible. There are zero penalties or fees for pausing, modifying, or stopping your SIP. Just message us on WhatsApp and we will take care of it immediately.',
          bn: 'হ্যাঁ, সম্পূর্ণ ফ্লেক্সিবল। কোনো জরিমানা বা অতিরিক্ত চার্জ ছাড়াই আপনি যেকোনো সময় SIP বন্ধ, সাময়িক পজ বা টাকার পরিমাণ পরিবর্তন করতে পারেন। শুধু একটি WhatsApp মেসেজ করলেই ব্যবস্থা হয়ে যাবে।',
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
        id: 'safety-1',
        question: {
          en: 'Does my money go into your personal account?',
          bn: 'বিনিয়োগের টাকা কি আপনার ব্যক্তিগত অ্যাকাউন্টে যাবে?',
        },
        answer: {
          en: 'Never. We never accept investment capital into any personal account. All funds are debited directly from your verified bank account to SEBI-regulated fund houses through official exchange platforms (BSE Star MF / NSE NMF). Your investments remain 100% in your own name.',
          bn: 'কখনোই নয়। কোনো ক্লায়েন্টের টাকা ব্যক্তিগত অ্যাকাউন্টে নেওয়া হয় না। সমস্ত অর্থ সরাসরি আপনার নিজের ব্যাংক অ্যাকাউন্ট থেকে অফিসিয়াল এক্সচেঞ্জ প্ল্যাটফর্মের মাধ্যমে সংশ্লিষ্ট ফান্ড হাউসে জমা হয়। সমস্ত বিনিয়োগ ১০০% আপনার নিজের নামেই থাকে।',
        },
      },
      {
        id: 'safety-2',
        question: {
          en: 'Who protects my investment, and what if a fund company closes?',
          bn: 'আমার জমানো টাকা কতটা সুরক্ষিত? ফান্ড কোম্পানি বন্ধ হলে কী হবে?',
        },
        answer: {
          en: 'Mutual funds are regulated by SEBI. Your investments are never kept on a fund house\'s own balance sheet—they are held safely by an independent custodian bank. Even if an AMC shuts down, SEBI ensures your funds are transferred to another institution or credited directly back to your bank account.',
          bn: 'ভারতে সমস্ত মিউচুয়াল ফান্ড SEBI দ্বারা অত্যন্ত কঠোরভাবে নিয়ন্ত্রিত। আপনার টাকা ফান্ড কোম্পানির নিজস্ব অ্যাকাউন্টে থাকে না, বরং একটি স্বাধীন কাস্টোডিয়ান ব্যাংকের কাছে সুরক্ষিত থাকে। কোনো কোম্পানি বন্ধ হয়ে গেলেও SEBI-র নজরদারিতে আপনার টাকা অন্য বিশ্বস্ত ফান্ডে পাঠিয়ে দেওয়া হয় অথবা সরাসরি আপনার ব্যাংকে ফেরত দেওয়া হয়।',
        },
      },
      {
        id: 'safety-3',
        question: {
          en: 'Can I lose all my money in a mutual fund?',
          bn: 'মিউচুয়াল ফান্ডে কি সমস্ত টাকা ডুবে যাওয়ার ঝুঁকি থাকে?',
        },
        answer: {
          en: 'Because your money is diversified across 40 to 80+ leading companies, the risk of total loss is virtually zero in diversified funds. While market prices fluctuate in the short term, holding quality equity funds for 5+ years has consistently generated strong inflation-beating returns.',
          bn: 'না, কারণ একটি মিউচুয়াল ফান্ডে আপনার টাকা কোনো একটি কোম্পানিতে নয়, বরং ৪০ থেকে ৮০টি শীর্ষ কোম্পানিতে ভাগ করে রাখা হয়। ফলে সব টাকা হারানোর কোনো ঝুঁকি থাকে না। স্বল্পমেয়াদে বাজার ওঠানামা করলেও ৫ বছরের বেশি মেয়াদে ভালো ফান্ড সবসময় মূল্যবৃদ্ধি কাটিয়ে ভালো লাভ দিয়েছে।',
        },
      },
      {
        id: 'safety-4',
        question: {
          en: 'What happens to my investments after my lifetime?',
          bn: 'আমার অবর্তমানে এই জমানো টাকার কী হবে? নমিনি কীভাবে পাবেন?',
        },
        answer: {
          en: 'Every investment includes an official registered nominee. In any eventuality, we personally assist your nominee and family with the paperwork to ensure the money is transferred smoothly to their bank account without legal hurdles.',
          bn: 'প্রতিটি বিনিয়োগেই অফিশিয়াল নমিনি যুক্ত থাকে। কোনো অঘটন ঘটলে পরিবারের সদস্যদের কোথাও দৌড়াদৌড়ি করতে হয় না—নথিপত্র তৈরি থেকে শুরু করে নমিনির ব্যাংকে টাকা পৌঁছে দেওয়া পর্যন্ত সমস্ত পেপারওয়ার্কের দায়িত্ব আমরা ব্যক্তিগতভাবে নিই।',
        },
      },
    ],
  },
  {
    id: 'advisory',
    label: {
      en: 'Personal Advisory',
      bn: 'ব্যক্তিগত পরামর্শ',
    },
    items: [
      {
        id: 'advisory-1',
        question: {
          en: 'Why invest through an advisor instead of apps like Groww or Zerodha?',
          bn: 'Groww বা Zerodha-র মতো অ্যাপ থাকা সত্ত্বেও ব্যক্তিগত পরামর্শ কেন জরুরি?',
        },
        answer: {
          en: 'Discount apps are purely DIY transaction tools. They don\'t help you choose the right funds for your family goals, prevent emotional mistakes when markets drop, or rebalance your portfolio over time. We provide personalized planning, keep you disciplined during market swings, and handle all paperwork, tax queries, and nominee claims personally.',
          bn: 'Groww বা Zerodha কেবল নিজে নিজে কেনাবেচা করার অ্যাপ—সেখানে কোনো ব্যক্তিগত পরামর্শ বা দায়িত্ব থাকে না। আমরা আপনার পরিবারের লক্ষ্য অনুযায়ী সঠিক ফান্ড বেছে দিই, বাজার পড়লে ভয় পেয়ে লোকসানে বিক্রি না করার পরামর্শ দিই, নিয়মিত পোর্টফোলিও রিভিউ করি এবং যেকোনো প্রয়োজনে পরিবারের পাশে দাঁড়িয়ে সহায়তা দিই।',
        },
      },
    ],
  },
  {
    id: 'returns',
    label: {
      en: 'Returns & Withdrawals',
      bn: 'রিটার্ন ও টাকা তোলা',
    },
    items: [
      {
        id: 'returns-1',
        question: {
          en: 'What returns can I realistically expect?',
          bn: 'দীর্ঘমেয়াদে কেমন রিটার্ন আশা করা বাস্তবসম্মত?',
        },
        answer: {
          en: 'While returns in mutual funds are subject to market movements and never fixed, diversified equity funds in India have historically delivered average annual returns of 12% to 15% over 7–10 year horizons. Conservative hybrid and debt funds typically deliver 7% to 9%.',
          bn: 'মিউচুয়াল ফান্ডে কোনো নির্দিষ্ট রিটার্নের গ্যারান্টি থাকে না, তবে ভারতের ভালো ইকুইটি ফান্ডগুলো ৭ থেকে ১০ বছরের মেয়াদে গড়ে বার্ষিক ১২% থেকে ১৫% রিটার্ন দিয়েছে। আর অপেক্ষাকৃত কম ঝুঁকির হাইব্রিড বা ডেট ফান্ডে সাধারণত ৭% থেকে ৯% রিটার্ন পাওয়া যায়।',
        },
      },
      {
        id: 'returns-guide',
        hasCategoryTable: true,
        question: {
          en: 'Which fund category fits my goal? (Time Horizon & Return Guide)',
          bn: 'কোন ধরনের ফান্ড আমার লক্ষ্যের জন্য সঠিক? (মেয়াদ ও রিটার্ন গাইড)',
        },
        answer: {
          en: 'Different funds suit different goals and timelines. The table below is organized sequentially from shortest time horizon (emergency savings) to longest investment horizon (long-term compounding):',
          bn: 'বিভিন্ন মেয়াদের লক্ষ্যের জন্য আলাদা আলাদা ফান্ড রয়েছে। নিচের তালিকায় অতি স্বল্পমেয়াদ থেকে শুরু করে দীর্ঘমেয়াদের জন্য সঠিক ফান্ডের বিবরণ ক্রমানুসারে দেওয়া হলো:',
        },
      },
      {
        id: 'returns-2',
        question: {
          en: 'How quickly can I withdraw my money?',
          bn: 'দরকার হলে কত দ্রুত টাকা তুলে ব্যাংকে পাওয়া যায়?',
        },
        answer: {
          en: 'Most mutual funds are highly liquid. Open-ended equity fund redemptions are credited directly to your bank account within 2–3 business days. Liquid funds credit within 24 hours. Only tax-saving ELSS funds have a mandatory 3-year lock-in.',
          bn: 'খুব দ্রুত। সাধারণ ওপেন-এন্ডেড ফান্ড থেকে টাকা তোলার নির্দেশ দিলে ২ থেকে ৩ কার্যদিবসের মধ্যে সরাসরি আপনার ব্যাংক অ্যাকাউন্টে টাকা চলে আসে। লিকুইড ফান্ডের ক্ষেত্রে মাত্র ২৪ ঘণ্টার মধ্যে টাকা পাওয়া যায়। শুধু ট্যাক্স-সেভিং ELSS ফান্ডে ৩ বছরের লক-ইন থাকে।',
        },
      },
    ],
  },
  {
    id: 'tax',
    label: {
      en: 'Tax Rules',
      bn: 'ট্যাক্স নিয়মাবলী',
    },
    items: [
      {
        id: 'tax-1',
        question: {
          en: 'How are mutual fund profits taxed?',
          bn: 'মিউচুয়াল ফান্ডের মুনাফায় ট্যাক্স কীভাবে হিসেব হয়?',
        },
        answer: {
          en: 'Under current rules (Finance Act 2024): For equity funds held over 1 year (Long-Term Capital Gains), profits up to ₹1.25 Lakh per financial year are completely tax-free; gains above ₹1.25 Lakh are taxed at 12.5%. Equity gains held under 1 year (Short-Term Capital Gains) are taxed at 20%. Debt fund gains are taxed according to your personal income tax slab.',
          bn: 'বাজেট ২০২৪-এর সর্বশেষ নিয়ম অনুযায়ী: ইকুইটি ফান্ডে ১ বছরের বেশি টাকা রাখলে (LTCG), বছরে প্রথম ₹১.২৫ লাখ পর্যন্ত মুনাফা সম্পূর্ণ ট্যাক্স-ফ্রি। এর বেশি লাভের ওপর ১২.৫% ট্যাক্স লাগে। আর ১ বছরের কম সময়ে টাকা তুললে (STCG) লাভের ওপর ২০% ট্যাক্স দিতে হয়। ডেট ফান্ডের ক্ষেত্রে নিজস্ব ইনকাম ট্যাক্স স্ল্যাব অনুযায়ী ট্যাক্স হিসেব হয়।',
        },
      },
      {
        id: 'tax-2',
        question: {
          en: 'Can mutual funds help me save income tax?',
          bn: 'মিউচুয়াল ফান্ড কি ইনকাম ট্যাক্স (Section 80C) বাঁচাতে সাহায্য করে?',
        },
        answer: {
          en: 'Yes. ELSS (Equity Linked Savings Scheme) allows tax deductions up to ₹1.5 Lakh per year under Section 80C. ELSS also features the shortest lock-in period (3 years) of any 80C investment option.',
          bn: 'হ্যাঁ। ELSS ট্যাক্স-সেভার ফান্ডে বিনিয়োগ করে Section 80C অনুযায়ী বছরে সর্বোচ্চ ₹১.৫ লাখ টাকা পর্যন্ত ট্যাক্স ছাড় পাওয়া যায়। তাছাড়া PPF (১৫ বছর) বা ট্যাক্স-সেভিং FD (৫ বছর)-র তুলনায় ELSS-এর লক-ইন পিরিয়ড সবচেয়ে কম—মাত্র ৩ বছর।',
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
              ? "Clear answers on safety, returns, withdrawals, and taxes before you invest."
              : "টাকার নিরাপত্তা, রিটার্ন, উইথড্রয়াল ও ট্যাক্স সংক্রান্ত জরুরি তথ্য।"}
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
                          ? "* Based on historical market cycles. Organized from shortest to longest investment horizon."
                          : "* বিগত বছরগুলোর বাজারভিত্তিক গড়ের ওপর নির্ভরশীল। স্বল্পমেয়াদ থেকে দীর্ঘমেয়াদের ক্রমানুসারে সাজানো।"}
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
