'use client';

import { useMemo } from "react";
import { Banknote, CheckCircle, FileText, UserRoundCheck, MessageCircle } from "lucide-react";
import { AnimatedSection } from "./animated-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ServiceCardProps {
  title: string;
  description: string;
  benefits: string[];
  documents?: string[];
  process?: string[];
  costs?: string[];
  icon: React.ElementType;
  ctaText?: string;
  delay?: number;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-in" | "elegant-fade";
  colorScheme?: string;
  className?: string;
  whatsAppMessage?: string;
  whatsAppNumber?: string;
}

const clientFirstName = process.env.NEXT_PUBLIC_CLIENT_FIRST_NAME || "Monotosh";
const rawPhone = process.env.NEXT_PUBLIC_CLIENT_PHONE || "98364 72260";
const cleanPhone = rawPhone.replace(/\s/g, '');
const resolvedWhatsAppNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

export function ServiceCard({
  title,
  description,
  benefits,
  documents,
  process,
  costs,
  icon: Icon,
  ctaText = "Inquire on WhatsApp",
  delay = 0,
  animation = "fade-up",
  className = "",
  whatsAppMessage,
  whatsAppNumber = "919836472260",
}: ServiceCardProps) {

  const waHref = useMemo(() => {
    const defaultMessage = whatsAppMessage || `Hi ${clientFirstName}, I'm interested in your ${title} service. Could we connect to discuss details?`;
    const encoded = encodeURIComponent(defaultMessage);
    const targetNumber = whatsAppNumber === "919836472260" ? resolvedWhatsAppNumber : whatsAppNumber;
    return `https://wa.me/${targetNumber}?text=${encoded}`;
  }, [whatsAppMessage, whatsAppNumber, title]);

  const hasTabs = (documents && documents.length > 0) || (process && process.length > 0) || (costs && costs.length > 0);

  const getDefaultTab = () => {
    if (documents && documents.length > 0) return "documents";
    if (process && process.length > 0) return "process";
    if (costs && costs.length > 0) return "costs";
    return "";
  };

  return (
    <AnimatedSection animation={animation} delay={delay} duration={350}>
      <div className={`relative bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-sm border border-stone-200/80 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-stone-300 ${className}`}>
        
        <div className="p-5 sm:p-7 text-left">
          {/* Header */}
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center bg-stone-100 text-stone-800 border border-stone-200/60 flex-shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 leading-tight">{title}</h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-stone-600 mb-5 leading-relaxed">{description}</p>

          {/* Key Benefits */}
          {benefits && benefits.length > 0 && (
            <div className="mb-5 bg-stone-50/70 p-3.5 sm:p-4 rounded-xl border border-stone-200/60">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2.5">Key Highlights</h4>
              <ul className={`grid gap-2 ${benefits.length > 1 ? 'sm:grid-cols-2 sm:gap-x-5' : ''}`}>
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs sm:text-[13px] text-stone-700 leading-relaxed font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Direct CTA when no tabs */}
          {!hasTabs && (
            <div className="flex justify-center mt-5">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-medium text-xs sm:text-sm shadow-xs hover:shadow transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200" />
                {ctaText}
              </a>
            </div>
          )}
        </div>

        {/* Supporting Details Tabs */}
        {hasTabs && (
          <div className="px-5 pb-5 sm:px-7 sm:pb-6 bg-stone-50/40 border-t border-stone-100">
            <Tabs defaultValue={getDefaultTab()} className="w-full pt-3">
              <TabsList className="flex w-full bg-stone-100/90 p-1 rounded-xl border border-stone-200/60 mb-3">
                {documents && documents.length > 0 && (
                  <TabsTrigger 
                    value="documents" 
                    className="flex-1 rounded-lg text-xs py-1.5 text-stone-600 font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-stone-900 data-[state=active]:shadow-xs"
                  >
                    Documents
                  </TabsTrigger>
                )}
                {process && process.length > 0 && (
                  <TabsTrigger 
                    value="process" 
                    className="flex-1 rounded-lg text-xs py-1.5 text-stone-600 font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-stone-900 data-[state=active]:shadow-xs"
                  >
                    Process
                  </TabsTrigger>
                )}
                {costs && costs.length > 0 && (
                  <TabsTrigger 
                    value="costs" 
                    className="flex-1 rounded-lg text-xs py-1.5 text-stone-600 font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-stone-900 data-[state=active]:shadow-xs"
                  >
                    Costs &amp; Fees
                  </TabsTrigger>
                )}
              </TabsList>

              {/* Documents Tab */}
              {documents && documents.length > 0 && (
                <TabsContent value="documents" className="pt-1 text-left focus-visible:outline-none">
                  <ul className={`grid gap-2 ${documents.length > 1 ? 'sm:grid-cols-2 sm:gap-x-5' : ''}`}>
                    {documents.map((doc, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs sm:text-[13px] text-stone-700 leading-relaxed">
                        <FileText className="w-3.5 h-3.5 text-stone-400 mt-0.5 flex-shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              )}

              {/* Process Tab */}
              {process && process.length > 0 && (
                <TabsContent value="process" className="pt-1 text-left focus-visible:outline-none">
                  <ul className={`grid gap-2 ${process.length > 1 ? 'sm:grid-cols-2 sm:gap-x-5' : ''}`}>
                    {process.map((step, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs sm:text-[13px] text-stone-700 leading-relaxed">
                        <UserRoundCheck className="w-3.5 h-3.5 text-stone-400 mt-0.5 flex-shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              )}

              {/* Costs Tab */}
              {costs && costs.length > 0 && (
                <TabsContent value="costs" className="pt-1 text-left focus-visible:outline-none">
                  <ul className={`grid gap-2 ${costs.length > 1 ? 'sm:grid-cols-2 sm:gap-x-5' : ''}`}>
                    {costs.map((cost, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs sm:text-[13px] text-stone-700 leading-relaxed">
                        <Banknote className="w-3.5 h-3.5 text-stone-400 mt-0.5 flex-shrink-0" />
                        <span>{cost}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              )}
            </Tabs>

            {/* Action button */}
            <div className="flex justify-center mt-5">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-medium text-xs sm:text-sm shadow-xs hover:shadow transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200" />
                {ctaText}
              </a>
            </div>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
