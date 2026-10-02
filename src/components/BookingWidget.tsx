"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Shield, Sparkles, Check, Info, ArrowRight } from "lucide-react";
import { Car } from "@/types";

interface BookingWidgetProps {
  car: Car;
}

export default function BookingWidget({ car }: BookingWidgetProps) {
  const router = useRouter();

  const today = new Date();
  const defaultPickup = new Date(today);
  defaultPickup.setDate(today.getDate() + 1);
  const defaultReturn = new Date(today);
  defaultReturn.setDate(today.getDate() + 4);

  const [startDate, setStartDate] = useState(defaultPickup.toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(defaultReturn.toISOString().split("T")[0]);

  // Insurance tiers
  const [insuranceTier, setInsuranceTier] = useState<"standard" | "premium" | "vip">("premium");

  // Add-ons
  const [addOnAirport, setAddOnAirport] = useState(false);
  const [addOnDriver, setAddOnDriver] = useState(false);
  const [addOnFuel, setAddOnFuel] = useState(false);
  const [addOnChauffeur, setAddOnChauffeur] = useState(false);

  // Calculate days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.max(0, end.getTime() - start.getTime());
  const totalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Insurance daily rates
  const insuranceRates = {
    standard: 0,
    premium: 69,
    vip: 149,
  };
  const insuranceAmount = insuranceRates[insuranceTier] * totalDays;

  // Add-ons calculations
  let addOnsAmount = 0;
  const selectedAddOns: string[] = [];

  if (addOnAirport) {
    addOnsAmount += 100;
    selectedAddOns.push("VIP Airport / FBO Delivery ($100)");
  }
  if (addOnDriver) {
    addOnsAmount += 50 * totalDays;
    selectedAddOns.push(`Additional Approved Driver ($50/day x ${totalDays}d)`);
  }
  if (addOnFuel) {
    addOnsAmount += 80;
    selectedAddOns.push("Prepaid Fuel / Supercharge Return ($80)");
  }
  if (addOnChauffeur) {
    addOnsAmount += 350 * totalDays;
    selectedAddOns.push(`Executive Chauffeur ($350/day x ${totalDays}d)`);
  }

  const rentalAmount = car.pricePerDay * totalDays;
  const totalDueNow = rentalAmount + insuranceAmount + addOnsAmount;

  const handleCheckout = () => {
    const params = new URLSearchParams({
      carId: car.id,
      startDate,
      endDate,
      totalDays: totalDays.toString(),
      insuranceTier,
      insuranceAmount: insuranceAmount.toString(),
      addOns: JSON.stringify(selectedAddOns),
      addOnsAmount: addOnsAmount.toString(),
      totalDueNow: totalDueNow.toString(),
    });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="sticky top-24 rounded-3xl bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 p-6 shadow-2xl space-y-6">
      {/* Header Price */}
      <div className="flex items-baseline justify-between border-b border-neutral-800 pb-5">
        <div>
          <span className="text-3xl font-black text-white">${car.pricePerDay}</span>
          <span className="text-neutral-400 text-sm font-medium ml-1">/ day</span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            Instant Confirmation
          </span>
        </div>
      </div>

      {/* Date Pickers */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>Rental Duration ({totalDays} {totalDays === 1 ? "day" : "days"})</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 focus-within:border-amber-400">
            <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Pickup Date</span>
            <input
              type="date"
              value={startDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer [color-scheme:dark] mt-1"
            />
          </div>
          <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 focus-within:border-amber-400">
            <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Return Date</span>
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-transparent text-white text-xs font-medium focus:outline-none cursor-pointer [color-scheme:dark] mt-1"
            />
          </div>
        </div>
      </div>

      {/* Insurance Protection Tier Selection */}
      <div className="space-y-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>Protection Plan</span>
        </label>
        
        <div className="space-y-2">
          {/* Standard */}
          <div
            onClick={() => setInsuranceTier("standard")}
            className={`p-3 rounded-2xl border cursor-pointer transition-all ${
              insuranceTier === "standard"
                ? "bg-amber-400/5 border-amber-400/60"
                : "bg-neutral-950/60 border-neutral-800 hover:border-neutral-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  insuranceTier === "standard" ? "border-amber-400 bg-amber-400" : "border-neutral-600"
                }`}>
                  {insuranceTier === "standard" && <Check className="w-2.5 h-2.5 text-neutral-950 stroke-[3]" />}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Standard Protection</p>
                  <p className="text-[11px] text-neutral-400">State minimums, $2,500 deductible</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-neutral-300">Included</span>
            </div>
          </div>

          {/* Premium */}
          <div
            onClick={() => setInsuranceTier("premium")}
            className={`p-3 rounded-2xl border cursor-pointer transition-all ${
              insuranceTier === "premium"
                ? "bg-amber-400/10 border-amber-400/80 shadow-md shadow-amber-400/5"
                : "bg-neutral-950/60 border-neutral-800 hover:border-neutral-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  insuranceTier === "premium" ? "border-amber-400 bg-amber-400" : "border-neutral-600"
                }`}>
                  {insuranceTier === "premium" && <Check className="w-2.5 h-2.5 text-neutral-950 stroke-[3]" />}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-white">Premium Shield</p>
                    <span className="text-[9px] uppercase tracking-wider bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                      Recommended
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400">$500 deductible, tire/rim coverage</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-400">+$69/day</span>
            </div>
          </div>

          {/* VIP Black */}
          <div
            onClick={() => setInsuranceTier("vip")}
            className={`p-3 rounded-2xl border cursor-pointer transition-all ${
              insuranceTier === "vip"
                ? "bg-amber-400/10 border-amber-400/80 shadow-md shadow-amber-400/5"
                : "bg-neutral-950/60 border-neutral-800 hover:border-neutral-700"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  insuranceTier === "vip" ? "border-amber-400 bg-amber-400" : "border-neutral-600"
                }`}>
                  {insuranceTier === "vip" && <Check className="w-2.5 h-2.5 text-neutral-950 stroke-[3]" />}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">VIP Black Card Shield</p>
                  <p className="text-[11px] text-neutral-400">$0 deductible, complete waiver & concierge</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-400">+$149/day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add-ons List */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Tailored Concierge Add-Ons</span>
        </label>
        
        <div className="space-y-2 text-xs">
          <label className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800 cursor-pointer hover:border-neutral-700">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={addOnAirport}
                onChange={(e) => setAddOnAirport(e.target.checked)}
                className="accent-amber-400 rounded cursor-pointer"
              />
              <span className="text-neutral-200">Airport / FBO Tarmac Meet & Greet</span>
            </div>
            <span className="font-semibold text-neutral-300">+$100</span>
          </label>

          <label className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800 cursor-pointer hover:border-neutral-700">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={addOnDriver}
                onChange={(e) => setAddOnDriver(e.target.checked)}
                className="accent-amber-400 rounded cursor-pointer"
              />
              <span className="text-neutral-200">Additional Driver Permit</span>
            </div>
            <span className="font-semibold text-neutral-300">+$50/day</span>
          </label>

          <label className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800 cursor-pointer hover:border-neutral-700">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={addOnFuel}
                onChange={(e) => setAddOnFuel(e.target.checked)}
                className="accent-amber-400 rounded cursor-pointer"
              />
              <span className="text-neutral-200">Prepaid Refuel / Recharge Service</span>
            </div>
            <span className="font-semibold text-neutral-300">+$80</span>
          </label>

          <label className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800 cursor-pointer hover:border-neutral-700">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={addOnChauffeur}
                onChange={(e) => setAddOnChauffeur(e.target.checked)}
                className="accent-amber-400 rounded cursor-pointer"
              />
              <span className="text-neutral-200">Professional White-Glove Chauffeur</span>
            </div>
            <span className="font-semibold text-neutral-300">+$350/day</span>
          </label>
        </div>
      </div>

      {/* Itemized Price Breakdown */}
      <div className="border-t border-neutral-800/80 pt-4 space-y-2 text-xs">
        <div className="flex justify-between text-neutral-400">
          <span>${car.pricePerDay} x {totalDays} {totalDays === 1 ? "day" : "days"}</span>
          <span className="text-white font-medium">${rentalAmount.toLocaleString()}</span>
        </div>

        {insuranceAmount > 0 && (
          <div className="flex justify-between text-neutral-400">
            <span>Protection ({insuranceTier})</span>
            <span className="text-white font-medium">+${insuranceAmount.toLocaleString()}</span>
          </div>
        )}

        {addOnsAmount > 0 && (
          <div className="flex justify-between text-neutral-400">
            <span>Selected Concierge Add-ons</span>
            <span className="text-white font-medium">+${addOnsAmount.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between text-neutral-400">
          <span className="flex items-center gap-1">
            <span>Refundable Security Deposit</span>
            <Info className="w-3 h-3 text-neutral-500" />
          </span>
          <span className="text-neutral-300">${car.deposit.toLocaleString()} (Hold only)</span>
        </div>

        <div className="flex justify-between items-baseline pt-2 border-t border-neutral-800 text-sm font-bold text-white">
          <span>Total Due Now</span>
          <span className="text-2xl font-black text-amber-400">${totalDueNow.toLocaleString()}</span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleCheckout}
        disabled={!car.isAvailable}
        className={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl transition-all ${
          car.isAvailable
            ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-neutral-950 shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98]"
            : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
        }`}
      >
        <span>{car.isAvailable ? "Proceed to Secure Reservation" : "Currently Reserved"}</span>
        {car.isAvailable && <ArrowRight className="w-4 h-4 stroke-[2.5]" />}
      </button>

      {/* Reassurance notes */}
      <div className="text-center space-y-1">
        <p className="text-[11px] text-neutral-400">
          <span className="text-emerald-400 font-semibold">Free cancellation</span> up to 48h before pickup
        </p>
        <p className="text-[10px] text-neutral-500">
          Zero hidden fees • Verified mileage: {car.mileageLimit} mi/day included
        </p>
      </div>
    </div>
  );
}
