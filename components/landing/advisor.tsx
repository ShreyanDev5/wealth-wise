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
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-stone-200/70 p-5 sm:p-7 shadow-2xs">
        <div className="flex flex-col md:flex-row items-center gap-5 sm:gap-7">
          {/* Left - Portrait */}
          <div className="relative w-32 sm:w-36 aspect-[3/4] shrink-0 rounded-xl sm:rounded-2xl overflow-hidden border border-stone-200/60 bg-stone-100">
            <Image
              src="/advisor_profile-pic.jpg"
              alt={advisor.name}
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 640px) 128px, 144px"
            />
          </div>

          {/* Right - Profile & Direct Channels */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-0">
            <div>
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider inline-block mb-1">
                Certified Financial Planner (CFP&reg;)
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 tracking-tight leading-tight">
                {advisor.name}
              </h2>
              <p className="text-xs sm:text-[13px] text-stone-600 mt-2 leading-snug text-pretty">
                Guiding families and business owners across Kolkata to make clear, confident financial decisions with personalized attention and zero sales pressure.
              </p>
            </div>

            {/* Streamlined Contact Channels */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-stretch sm:items-center justify-center md:justify-start gap-2 sm:gap-2.5 mt-4 sm:mt-5 w-full">
              <a 
                href={`https://wa.me/${whatsAppNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between sm:justify-start gap-2 px-3.5 py-2.5 sm:px-3 sm:py-1.5 rounded-xl bg-stone-50/80 hover:bg-emerald-50 active:bg-emerald-50 active:scale-[0.99] text-stone-700 hover:text-emerald-900 border border-stone-200/60 hover:border-emerald-200/80 transition-all duration-200 text-xs font-medium w-full sm:w-auto whitespace-nowrap"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-stone-500 group-hover:text-emerald-700 transition-colors shrink-0" />
                  <span>{advisor.phone}</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
              </a>

              <a 
                href={`mailto:${advisor.email}`}
                className="group inline-flex items-center justify-between sm:justify-start gap-2 px-3.5 py-2.5 sm:px-3 sm:py-1.5 rounded-xl bg-stone-50/80 hover:bg-emerald-50 active:bg-emerald-50 active:scale-[0.99] text-stone-700 hover:text-emerald-900 border border-stone-200/60 hover:border-emerald-200/80 transition-all duration-200 text-xs font-medium w-full sm:w-auto whitespace-nowrap"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-stone-500 group-hover:text-emerald-700 transition-colors shrink-0" />
                  <span>{advisor.email}</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
              </a>

              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(advisor.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between sm:justify-start gap-2 px-3.5 py-2.5 sm:px-3 sm:py-1.5 rounded-xl bg-stone-50/80 hover:bg-emerald-50 active:bg-emerald-50 active:scale-[0.99] text-stone-700 hover:text-emerald-900 border border-stone-200/60 hover:border-emerald-200/80 transition-all duration-200 text-xs font-medium w-full sm:w-auto whitespace-nowrap"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-stone-500 group-hover:text-emerald-700 transition-colors shrink-0" />
                  <span>Budge Budge, Kolkata</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
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