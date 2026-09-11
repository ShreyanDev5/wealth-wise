"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormattedInput } from "@/components/ui/formatted-input";
import { Button } from "@/components/ui/button";
import { formatLargeNumber } from "@/lib/format-large-number";
import { calculateMarriagePlan, MarriagePlanResult } from "@/lib/calculators";
import { CheckCircle, Heart, MessageSquare } from "lucide-react";

export default function ChildMarriageCalculatorRefined() {
  const [childName, setChildName] = useState("");
  const [currentAge, setCurrentAge] = useState("");
  const [marriageAge, setMarriageAge] = useState("");
  const [estimatedExpenditure, setEstimatedExpenditure] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [amountSaved, setAmountSaved] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Validation checks
  const errors = useMemo(() => {
    const errs: Record<string, string> = {};

    if (childName === "" && showResults) {
      errs.childName = "Please enter your child's name";
    }

    const age = parseInt(currentAge);
    if (currentAge !== "") {
      if (isNaN(age)) errs.currentAge = "Please enter a valid age";
      else if (age < 0 || age > 40) errs.currentAge = "Age must be between 0 and 40 years";
    }

    const marAge = parseInt(marriageAge);
    if (marriageAge !== "") {
      if (isNaN(marAge)) errs.marriageAge = "Please enter a valid age";
      else if (marAge < 0 || marAge > 40) errs.marriageAge = "Age must be between 0 and 40 years";
      else if (!isNaN(age) && marAge <= age) errs.marriageAge = "Marriage age must be greater than current age";
    }

    const cost = parseFloat(estimatedExpenditure);
    if (estimatedExpenditure !== "") {
      if (isNaN(cost)) errs.estimatedExpenditure = "Please enter a valid amount";
      else if (cost < 10000 || cost > 100000000) errs.estimatedExpenditure = "Amount must be between ₹10,000 and ₹10 Crores";
    }

    const inf = parseFloat(inflationRate);
    if (inflationRate !== "") {
      if (isNaN(inf)) errs.inflationRate = "Please enter a valid rate";
      else if (inf < 0 || inf > 30) errs.inflationRate = "Inflation rate must be between 0% and 30%";
    }

    const saved = parseFloat(amountSaved);
    if (amountSaved !== "") {
      if (isNaN(saved)) errs.amountSaved = "Please enter a valid amount";
      else if (saved < 0 || saved > 100000000) errs.amountSaved = "Amount must be between ₹0 and ₹10 Crores";
    }

    const ret = parseFloat(expectedReturn);
    if (expectedReturn !== "") {
      if (isNaN(ret)) errs.expectedReturn = "Please enter a valid rate";
      else if (ret < 0 || ret > 30) errs.expectedReturn = "Rate of return must be between 0% and 30%";
    }

    return errs;
  }, [childName, currentAge, marriageAge, estimatedExpenditure, inflationRate, amountSaved, expectedReturn, showResults]);

  const calculationResults = useMemo<MarriagePlanResult | null>(() => {
    if (Object.keys(errors).length > 0) return null;
    if (!currentAge || !marriageAge || !estimatedExpenditure || !inflationRate || !amountSaved || !expectedReturn) return null;

    const age = parseInt(currentAge);
    const marAge = parseInt(marriageAge);
    const cost = parseFloat(estimatedExpenditure);
    const inf = parseFloat(inflationRate);
    const saved = parseFloat(amountSaved);
    const ret = parseFloat(expectedReturn);

    return calculateMarriagePlan(age, marAge, cost, inf, saved, ret);
  }, [currentAge, marriageAge, estimatedExpenditure, inflationRate, amountSaved, expectedReturn, errors]);

  const handleCalculate = () => {
    setShowResults(true);
  };

  const renderResults = () => {
    if (!calculationResults) return null;
    const { futureCostOfMarriage, sipInvestment, lumpSumInvestment, yearsUntilMarriage } = calculationResults;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200/70 text-center">
          <div className="flex flex-col items-center justify-center p-2">
            <span className="text-stone-500 font-medium text-[11px] uppercase tracking-wider mb-1">Cost in {yearsUntilMarriage} Years</span>
            <span className="text-base sm:text-lg font-bold text-stone-900">
              {formatLargeNumber(futureCostOfMarriage)}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 border-t sm:border-t-0 sm:border-l border-stone-200/60">
            <span className="text-stone-500 font-medium text-[11px] uppercase tracking-wider mb-1">Monthly SIP Needed</span>
            <span className="text-base sm:text-lg font-bold text-emerald-800">
              {formatLargeNumber(sipInvestment)}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 border-t sm:border-t-0 sm:border-l border-stone-200/60">
            <span className="text-stone-500 font-medium text-[11px] uppercase tracking-wider mb-1">One-time Lump Sum</span>
            <span className="text-base sm:text-lg font-bold text-stone-900">
              {formatLargeNumber(lumpSumInvestment)}
            </span>
          </div>
        </div>

        {sipInvestment > 0 ? (
          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/70 text-left">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-700 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                Invest <span className="font-bold text-stone-900">{formatLargeNumber(sipInvestment)}</span>/month for <span className="font-bold">{yearsUntilMarriage} years</span>, or make a one-time investment of <span className="font-bold text-stone-900">{formatLargeNumber(lumpSumInvestment)}</span> today.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/70 text-left">
            <p className="text-xs sm:text-sm text-emerald-900 font-medium">
              Your current savings are on track to meet your child&apos;s goal.
            </p>
          </div>
        )}
      </div>
    );
  };

  const handleShare = () => {
    if (!calculationResults) return;
    const { futureCostOfMarriage, sipInvestment, lumpSumInvestment, yearsUntilMarriage } = calculationResults;

    const shareText = `Child Marriage Goal Projection for ${childName}:
Estimated Cost in ${yearsUntilMarriage} years: ${formatLargeNumber(futureCostOfMarriage)}
Required Monthly SIP: ${formatLargeNumber(sipInvestment)}
One-time Investment Alternative: ${formatLargeNumber(lumpSumInvestment)}`;

    const encodedText = encodeURIComponent(shareText);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white/90 backdrop-blur-xl border border-stone-200/80 shadow-sm rounded-3xl overflow-hidden">
      <CardHeader className="py-4 px-6 border-b border-stone-100 bg-stone-50/50 flex flex-row items-center justify-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-stone-200/60 text-stone-700 flex items-center justify-center">
          <Heart className="h-4 w-4" />
        </div>
        <CardTitle className="text-base sm:text-lg font-serif font-bold text-stone-900 tracking-tight">
          Child Marriage Expense Planner
        </CardTitle>
      </CardHeader>

      <CardContent className="p-5 sm:p-8">
        <div className="space-y-5 sm:space-y-6">
          <div className="space-y-1.5">
            <Label htmlFor="childMarriageChildName" className="text-xs sm:text-sm font-semibold text-stone-700">Child&apos;s Name</Label>
            <Input
              id="childMarriageChildName"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="e.g., Aarav"
              className="rounded-xl border-stone-200 bg-stone-50/60 font-medium text-stone-900 focus:border-emerald-600 focus:ring-emerald-600/10 text-sm py-2"
            />
            {errors.childName && <p className="text-red-500 text-xs">{errors.childName}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="childMarriageCurrentAge" className="text-xs sm:text-sm font-semibold text-stone-700">Child&apos;s Current Age</Label>
              <FormattedInput
                id="childMarriageCurrentAge"
                inputMode="numeric"
                value={currentAge}
                onFormattedChange={setCurrentAge}
                className="rounded-xl border-stone-200 bg-stone-50/60 font-medium text-stone-900 focus:border-emerald-600 focus:ring-emerald-600/10 text-sm py-2"
                placeholder="e.g., 5"
              />
              {errors.currentAge && <p className="text-red-500 text-xs">{errors.currentAge}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="childMarriageMarriageAge" className="text-xs sm:text-sm font-semibold text-stone-700">Planned Marriage Age</Label>
              <FormattedInput
                id="childMarriageMarriageAge"
                inputMode="numeric"
                value={marriageAge}
                onFormattedChange={setMarriageAge}
                className="rounded-xl border-stone-200 bg-stone-50/60 font-medium text-stone-900 focus:border-emerald-600 focus:ring-emerald-600/10 text-sm py-2"
                placeholder="e.g., 25"
              />
              {errors.marriageAge && <p className="text-red-500 text-xs">{errors.marriageAge}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="childMarriageEstimatedExpenditure" className="text-xs sm:text-sm font-semibold text-stone-700">Estimated Expense in Today&apos;s Value (₹)</Label>
            <FormattedInput
              id="childMarriageEstimatedExpenditure"
              inputMode="numeric"
              value={estimatedExpenditure}
              onFormattedChange={setEstimatedExpenditure}
              className="rounded-xl border-stone-200 bg-stone-50/60 font-medium text-stone-900 focus:border-emerald-600 focus:ring-emerald-600/10 text-sm py-2"
              placeholder="e.g., 1500000"
            />
            {errors.estimatedExpenditure && <p className="text-red-500 text-xs">{errors.estimatedExpenditure}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="childMarriageInflationRate" className="text-xs sm:text-sm font-semibold text-stone-700">Expected Inflation (% p.a.)</Label>
              <FormattedInput
                id="childMarriageInflationRate"
                inputMode="decimal"
                value={inflationRate}
                onFormattedChange={setInflationRate}
                className="rounded-xl border-stone-200 bg-stone-50/60 font-medium text-stone-900 focus:border-emerald-600 focus:ring-emerald-600/10 text-sm py-2"
                placeholder="e.g., 6"
              />
              {errors.inflationRate && <p className="text-red-500 text-xs">{errors.inflationRate}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="childMarriageExpectedReturn" className="text-xs sm:text-sm font-semibold text-stone-700">Expected Return (% p.a.)</Label>
              <FormattedInput
                id="childMarriageExpectedReturn"
                inputMode="decimal"
                value={expectedReturn}
                onFormattedChange={setExpectedReturn}
                className="rounded-xl border-stone-200 bg-stone-50/60 font-medium text-stone-900 focus:border-emerald-600 focus:ring-emerald-600/10 text-sm py-2"
                placeholder="e.g., 12"
              />
              {errors.expectedReturn && <p className="text-red-500 text-xs">{errors.expectedReturn}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="childMarriageAmountSaved" className="text-xs sm:text-sm font-semibold text-stone-700">Amount Already Saved (₹)</Label>
            <FormattedInput
              id="childMarriageAmountSaved"
              inputMode="numeric"
              value={amountSaved}
              onFormattedChange={setAmountSaved}
              className="rounded-xl border-stone-200 bg-stone-50/60 font-medium text-stone-900 focus:border-emerald-600 focus:ring-emerald-600/10 text-sm py-2"
              placeholder="e.g., 200000"
            />
            {errors.amountSaved && <p className="text-red-500 text-xs">{errors.amountSaved}</p>}
          </div>

          <Button
            onClick={handleCalculate}
            className="w-full py-2.5 h-11 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium tracking-wide transition-all shadow-xs"
            disabled={!childName || !currentAge || !marriageAge || !estimatedExpenditure || !inflationRate || !amountSaved || !expectedReturn || Object.keys(errors).length > 0}
          >
            Calculate Marriage Goal
          </Button>

          {showResults && calculationResults && (
            <div className="mt-6 pt-5 border-t border-stone-100 space-y-4">
              {renderResults()}

              <Button
                onClick={handleShare}
                className="w-full py-2.5 h-11 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-medium tracking-wide transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Share Projection via WhatsApp
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}