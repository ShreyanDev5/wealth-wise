"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Coins, Wallet, BookOpen } from "lucide-react";
import { ChildEducationCalculatorCardRefined } from "@/components/ui/child-education-calculator-card-refined";

export function ChildEducationCalculatorToggleRefined({ 
  calculatorType, 
  onCalculatorTypeChange 
}: { 
  calculatorType: string; 
  onCalculatorTypeChange: (type: string) => void; 
}) {
  return (
    <ToggleGroup
      type="single"
      value={calculatorType}
      onValueChange={(val) => val && onCalculatorTypeChange(val)}
      className="bg-stone-100/90 border border-stone-200/70 rounded-full p-1 shadow-2xs"
      variant="outline"
    >
      <ToggleGroupItem
        value="sip"
        aria-label="SIP"
        className="rounded-full data-[state=on]:bg-white data-[state=on]:text-stone-900 data-[state=on]:shadow-2xs border border-transparent h-8 px-4 text-xs font-medium transition-all text-stone-600 hover:text-stone-900"
      >
        <Coins className="mr-1.5 h-3.5 w-3.5" /> SIP
      </ToggleGroupItem>
      <ToggleGroupItem
        value="sip-swp"
        aria-label="SIP with SWP"
        className="rounded-full data-[state=on]:bg-white data-[state=on]:text-stone-900 data-[state=on]:shadow-2xs border border-transparent h-8 px-4 text-xs font-medium transition-all text-stone-600 hover:text-stone-900"
      >
        <Wallet className="mr-1.5 h-3.5 w-3.5" /> SIP + SWP
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function ChildEducationCalculatorWithToggleRefined() {
  const [calculatorType, setCalculatorType] = useState("sip");

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="flex justify-center">
        <ChildEducationCalculatorToggleRefined 
          calculatorType={calculatorType} 
          onCalculatorTypeChange={setCalculatorType} 
        />
      </div>
      <ChildEducationCalculatorRefined 
        calculatorType={calculatorType} 
      />
    </div>
  );
}

export default function ChildEducationCalculatorRefined({ 
  calculatorType
}: { 
  calculatorType?: string;
}) {
  const [internalCalculatorType] = useState("sip");
  const effectiveCalculatorType = calculatorType !== undefined ? calculatorType : internalCalculatorType;

  return (
    <div className="w-full bg-white/95 rounded-2xl sm:rounded-3xl border border-stone-200/80 shadow-2xs hover:shadow-xs hover:border-stone-300 transition-all duration-200 overflow-hidden text-left">
      <div className="py-4 px-6 border-b border-stone-100 bg-stone-50/50 flex flex-row items-center justify-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-stone-200/60 text-stone-700 flex items-center justify-center">
          <BookOpen className="h-4 w-4" />
        </div>
        <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 tracking-tight">
          Child Education Planner
        </h3>
      </div>
      <div className="p-5 sm:p-8">
        <div className="w-full">
          <ChildEducationCalculatorCardRefined calculatorType={effectiveCalculatorType} key={effectiveCalculatorType} />
        </div>
      </div>
    </div>
  );
}