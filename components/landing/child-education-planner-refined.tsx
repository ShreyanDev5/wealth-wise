"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      className="bg-stone-100/80 border border-stone-200/70 rounded-full p-1 shadow-xs"
      variant="outline"
    >
      <ToggleGroupItem
        value="sip"
        aria-label="SIP"
        className="rounded-full data-[state=on]:bg-white data-[state=on]:text-stone-900 data-[state=on]:shadow-xs border border-transparent h-8 px-4 text-xs font-medium transition-all text-stone-600 hover:text-stone-900"
      >
        <Coins className="mr-1.5 h-3.5 w-3.5" /> SIP
      </ToggleGroupItem>
      <ToggleGroupItem
        value="sip-swp"
        aria-label="SIP with SWP"
        className="rounded-full data-[state=on]:bg-white data-[state=on]:text-stone-900 data-[state=on]:shadow-xs border border-transparent h-8 px-4 text-xs font-medium transition-all text-stone-600 hover:text-stone-900"
      >
        <Wallet className="mr-1.5 h-3.5 w-3.5" /> SIP + SWP
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function ChildEducationCalculatorWithToggleRefined() {
  const [calculatorType, setCalculatorType] = useState("sip");

  return (
    <div className="space-y-6 w-full">
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
    <Card className="w-full max-w-3xl mx-auto bg-white/90 backdrop-blur-xl border border-stone-200/80 shadow-sm rounded-3xl overflow-hidden">
      <CardHeader className="py-4 px-6 border-b border-stone-100 bg-stone-50/50 flex flex-row items-center justify-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-stone-200/60 text-stone-700 flex items-center justify-center">
          <BookOpen className="h-4 w-4" />
        </div>
        <CardTitle className="text-base sm:text-lg font-serif font-bold text-stone-900 tracking-tight">
          Child Education Planner
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 sm:p-8">
        <div className="w-full">
          <ChildEducationCalculatorCardRefined calculatorType={effectiveCalculatorType} key={effectiveCalculatorType} />
        </div>
      </CardContent>
    </Card>
  );
}