'use client';

import Image from "next/image";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

interface AdvisorInfo {
  name: string;
  profession: string;
  phone: string;
  email: string;
  address: string;
}

export function AdvisorSection({ advisor }: { advisor: AdvisorInfo }) {
  const formatWhatsAppNumber = (phone: string) => {
    const cleanPhone = phone.replace(/\s/g, '');
    return cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  };

  const whatsAppNumber = formatWhatsAppNumber(advisor.phone);

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-stone-200/80 p-4 sm:p-5 lg:p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row items-center gap-5 sm:gap-7">
          {/* Left - Portrait with natural headroom */}
          <div className="relative w-36 sm:w-40 aspect-[3/4] shrink-0 rounded-xl sm:rounded-2xl overflow-hidden border border-stone-200/90 shadow-2xs bg-stone-100">
            <Image
              src="/advisor_profile-pic.jpg"
              alt={advisor.name}
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 640px) 144px, 160px"
            />
          </div>

          {/* Right - Profile & Direct Channels */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-0">
            <div className="mb-3">
              <span className="text-[10.5px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 inline-block mb-1">
                Certified Financial Planner (CFP&reg;)
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 tracking-tight leading-snug">
                {advisor.name}
              </h2>
              <p className="text-xs sm:text-[13px] text-stone-600 mt-1 leading-relaxed">
                Over 19 years assisting families and business owners across Kolkata and West Bengal with insurance portfolios, mutual funds, tax compliance, and legal documentation.
              </p>
            </div>

            {/* Clean Contact Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 w-full">
              <a 
                href={`https://wa.me/${whatsAppNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2.5 sm:p-3 rounded-xl bg-stone-50 hover:bg-emerald-50/60 border border-stone-200/70 hover:border-emerald-200 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-stone-500 group-hover:text-emerald-800 mb-1">
                  <Phone className="w-3.5 h-3.5" />
                  <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[10.5px] text-stone-500 font-medium">WhatsApp / Call</span>
                <span className="text-xs font-bold text-stone-900 group-hover:text-emerald-900 mt-0.5">
                  {advisor.phone}
                </span>
              </a>

              <a 
                href={`mailto:${advisor.email}`}
                className="group p-3 rounded-xl bg-stone-50 hover:bg-emerald-50/60 border border-stone-200/70 hover:border-emerald-200 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-stone-500 group-hover:text-emerald-800 mb-1">
                  <Mail className="w-3.5 h-3.5" />
                  <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[10.5px] text-stone-500 font-medium">Direct Email</span>
                <span className="text-xs font-bold text-stone-900 group-hover:text-emerald-900 mt-0.5 truncate">
                  {advisor.email}
                </span>
              </a>

              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(advisor.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-stone-50 hover:bg-emerald-50/60 border border-stone-200/70 hover:border-emerald-200 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-stone-500 group-hover:text-emerald-800 mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[10.5px] text-stone-500 font-medium">Office Location</span>
                <span className="text-xs font-bold text-stone-900 group-hover:text-emerald-900 mt-0.5 line-clamp-1">
                  Budge Budge, Kolkata
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Advisor() {
  const advisorData: AdvisorInfo = {
    name: process.env.NEXT_PUBLIC_CLIENT_NAME || "Monotosh Sardar",
    profession: "Certified Financial Planner",
    phone: process.env.NEXT_PUBLIC_CLIENT_PHONE || "98364 72260",
    email: process.env.NEXT_PUBLIC_CLIENT_EMAIL || "moni22rick@gmail.com",
    address: process.env.NEXT_PUBLIC_CLIENT_ADDRESS || "Budge Budge, Kolkata, West Bengal, India"
  };

  return <AdvisorSection advisor={advisorData} />;
}