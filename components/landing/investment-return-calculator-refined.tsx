"use client";

import { useState } from "react";
import { InvestmentCalculatorCardRefined } from "@/components/ui/investment-calculator-card-refined";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Coins, LineChart as LineChartIcon, Wallet } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function InvestmentCalculatorRefined() {
  const [investmentType, setInvestmentType] = useState("sip");

  const handleInvestmentTypeChange = (type: string) => {
    setInvestmentType(type);
  };

  return (
    <AnimatedSection animation="fade-up" delay={0} duration={350}>
      <div className="w-full max-w-3xl mx-auto space-y-6 font-sans">
        <div className="flex justify-center px-2 sm:px-0">
          <ToggleGroup
            type="single"
            value={investmentType}
            onValueChange={(val) => val && handleInvestmentTypeChange(val)}
            className="bg-stone-100/90 border-stone-200/70 rounded-full p-1 shadow-2xs sm:p-1.5 border"
            variant="outline"
          >
            <ToggleGroupItem
              value="sip"
              aria-label="SIP"
              className="rounded-full data-[state=on]:bg-white data-[state=on]:text-stone-900 data-[state=on]:border-stone-200/80 data-[state=on]:shadow-2xs border border-transparent h-9 px-3.5 py-1.5 min-w-[4rem] sm:h-10 sm:px-4 sm:min-w-[4.5rem] text-xs sm:text-xs touch-manipulation transition-all duration-200 ease-out text-stone-600 hover:text-stone-900 font-medium"
            >
              <Coins className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" /> SIP
            </ToggleGroupItem>
            <ToggleGroupItem
              value="lumpsum"
              aria-label="Lump Sum"
              className="rounded-full data-[state=on]:bg-white data-[state=on]:text-stone-900 data-[state=on]:border-stone-200/80 data-[state=on]:shadow-2xs border border-transparent h-9 px-3.5 py-1.5 min-w-[5.2rem] sm:h-10 sm:px-4 sm:min-w-[6rem] text-xs sm:text-xs touch-manipulation transition-all duration-200 ease-out text-stone-600 hover:text-stone-900 font-medium"
            >
              <LineChartIcon className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" /> Lump Sum
            </ToggleGroupItem>
            <ToggleGroupItem
              value="swp"
              aria-label="SWP"
              className="rounded-full data-[state=on]:bg-white data-[state=on]:text-stone-900 data-[state=on]:border-stone-200/80 data-[state=on]:shadow-2xs border border-transparent h-9 px-3.5 py-1.5 min-w-[4rem] sm:h-10 sm:px-4 sm:min-w-[4.5rem] text-xs sm:text-xs touch-manipulation transition-all duration-200 ease-out text-stone-600 hover:text-stone-900 font-medium"
            >
              <Wallet className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" /> SWP
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div>
          <InvestmentCalculatorCardRefined investmentType={investmentType} key={investmentType} />
        </div>
      </div>
    </AnimatedSection>
  );
}