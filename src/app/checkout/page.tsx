"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Car } from "@/types";
import {
  ShieldCheck,
  CreditCard,
  Lock,
  Calendar,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronLeft,
  Info
} from "lucide-react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const carId = searchParams.get("carId");
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const totalDays = Number(searchParams.get("totalDays") || 1);
  const insuranceTier = searchParams.get("insuranceTier") || "Standard";
  const insuranceAmount = Number(searchParams.get("insuranceAmount") || 0);
  const addOnsAmount = Number(searchParams.get("addOnsAmount") || 0);

  let parsedAddOns: string[] = [];
  try {
    const raw = searchParams.get("addOns");
    if (raw) parsedAddOns = JSON.parse(raw);
  } catch {
    parsedAddOns = [];
  }

  const [car, setCar] = useState<Car | null>(null);
  const [loadingCar, setLoadingCar] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Customer Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [driverLicense, setDriverLicense] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Payment mock state
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8921");
  const [cardExp, setCardExp] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("892");
  const [agreedTerms, setAgreedTerms] = useState(true);

  useEffect(() => {
    if (!carId) return;
    async function fetchCar() {
      try {
        const res = await fetch(`/api/cars/${carId}`);
        if (res.ok) {
          const data = await res.json();
          setCar(data);
          setPickupLocation(data.location || "Los Angeles, CA");
          setDropoffLocation(data.location || "Los Angeles, CA");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCar(false);
      }
    }
    fetchCar();
  }, [carId]);

  if (!carId) {
    return (
      <div className="max-w-md mx-auto py-24 text-center space-y-4">
        <p className="text-white font-bold">No vehicle selected for reservation.</p>
        <Link href="/fleet" className="text-xs text-amber-400 underline">
          Browse The Fleet
        </Link>
      </div>
    );
  }

  const rentalAmount = (car?.pricePerDay || 0) * totalDays;
  const totalDueNow = rentalAmount + insuranceAmount + addOnsAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !phone.trim() || !driverLicense.trim()) {
      setErrorMessage("Please complete all driver details and license information.");
      return;
    }

    if (!agreedTerms) {
      setErrorMessage("Please accept the rental terms and security deposit authorization.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId,
          customerName: name.trim(),
          customerEmail: email.trim(),
          customerPhone: phone.trim(),
          driverLicense: driverLicense.trim(),
          startDate,
          endDate,
          pickupLocation: pickupLocation.trim(),
          dropoffLocation: dropoffLocation.trim(),
          insuranceTier,
          insuranceAmount,
          addOns: parsedAddOns,
          addOnsAmount,
          paymentMethod: "CARD",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create reservation");
      }

      const booking = await res.json();
      router.push(`/booking/confirmation/${booking.id}`);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong creating your reservation.");
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href={`/cars/${carId}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Vehicle Details</span>
        </Link>
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Confirm Your Exotic Reservation
        </h1>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left 2 Cols: Driver Info, Delivery Details, Payment Simulation */}
        <div className="lg:col-span-2 space-y-8">
          {/* Step 1: Driver Information */}
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
              <span className="w-7 h-7 rounded-full bg-amber-400 text-neutral-950 font-black text-xs flex items-center justify-center">
                1
              </span>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Primary Driver Identification
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-neutral-300 font-semibold block">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Christian Sterling"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 font-semibold block">Email Address (for Itinerary) *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 font-semibold block">Mobile Phone (WhatsApp Delivery Updates) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (310) 555-0198"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 font-semibold block">Driver&apos;s License Number / Country *</label>
                <input
                  type="text"
                  required
                  placeholder="DL-8942189 (California / USA)"
                  value={driverLicense}
                  onChange={(e) => setDriverLicense(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Delivery & Return Logistics */}
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
              <span className="w-7 h-7 rounded-full bg-amber-400 text-neutral-950 font-black text-xs flex items-center justify-center">
                2
              </span>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Doorstep & Airport Delivery Logistics
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-neutral-300 font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Delivery Address / Hotel / FBO Terminal *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Beverly Hills Hotel or Signature Flight FBO LAX"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-300 font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Return Location / Address *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Same as pickup or return address"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="text-neutral-300 font-semibold block">
                Special Delivery Notes (Optional Flight # or Valet Instructions)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Flight arrives at 3:15 PM on Gulfstream G650; please coordinate with FBO front desk."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Step 3: Payment & Guarantee Simulation */}
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-amber-400 text-neutral-950 font-black text-xs flex items-center justify-center">
                  3
                </span>
                <h2 className="text-base font-bold text-white uppercase tracking-wider">
                  Payment Method
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <Lock className="w-3.5 h-3.5" />
                <span>Encrypted Simulation</span>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-neutral-950 border border-amber-400/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-white">Credit Card (Visa / Mastercard / Amex Centurion)</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-semibold">Demo Sandbox Mode</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 space-y-1">
                    <span className="text-[10px] text-neutral-400 font-medium">Card Number</span>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white font-mono text-xs focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-400 font-medium">Expires</span>
                      <input
                        type="text"
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white font-mono text-xs focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-400 font-medium">CVC</span>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white font-mono text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms check */}
              <label className="flex items-start gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800 cursor-pointer text-neutral-300">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="accent-amber-400 rounded mt-0.5"
                />
                <span className="text-[11px] leading-relaxed">
                  I authorize APEX EXOTICS to reserve this vehicle, place a refundable pre-authorization security hold of ${car?.deposit || 1500} upon delivery, and agree to the 48-hour free cancellation policy.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Col: Sticky Reservation Summary & Complete Booking Button */}
        <div className="lg:col-span-1 sticky top-24 space-y-6">
          <div className="rounded-3xl bg-neutral-900/90 border border-neutral-800 p-6 space-y-6 shadow-2xl">
            <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-3">
              Trip Itinerary Summary
            </h3>

            {loadingCar ? (
              <div className="animate-pulse space-y-4">
                <div className="aspect-[16/10] bg-neutral-800 rounded-xl" />
                <div className="h-4 bg-neutral-800 rounded" />
              </div>
            ) : car ? (
              <div className="space-y-4">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-neutral-900/80 text-[10px] font-bold text-amber-400 border border-amber-400/20">
                    {car.category}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-neutral-400 font-semibold uppercase">{car.brand} • {car.year}</p>
                  <h4 className="text-lg font-bold text-white">{car.name}</h4>
                  <p className="text-xs text-neutral-500">{car.location}</p>
                </div>

                {/* Dates summary */}
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Pickup Date:</span>
                    <span className="text-white font-semibold">{startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Return Date:</span>
                    <span className="text-white font-semibold">{endDate}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-neutral-800 text-amber-400 font-bold">
                    <span>Duration:</span>
                    <span>{totalDays} {totalDays === 1 ? "Day" : "Days"}</span>
                  </div>
                </div>

                {/* Itemized Pricing */}
                <div className="space-y-2 text-xs border-t border-neutral-800 pt-3">
                  <div className="flex justify-between text-neutral-400">
                    <span>Vehicle Rate (${car.pricePerDay}/day x {totalDays}d)</span>
                    <span className="text-white font-medium">${rentalAmount.toLocaleString()}</span>
                  </div>

                  {insuranceAmount > 0 && (
                    <div className="flex justify-between text-neutral-400">
                      <span>Protection Plan ({insuranceTier})</span>
                      <span className="text-white font-medium">+${insuranceAmount.toLocaleString()}</span>
                    </div>
                  )}

                  {addOnsAmount > 0 && (
                    <div className="flex justify-between text-neutral-400">
                      <span>VIP Add-ons</span>
                      <span className="text-white font-medium">+${addOnsAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-400">
                    <span className="flex items-center gap-1">
                      <span>Refundable Security Hold</span>
                      <Info className="w-3 h-3 text-neutral-500" />
                    </span>
                    <span className="text-neutral-300">${car.deposit.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-baseline pt-2 border-t border-neutral-800 text-sm font-bold text-white">
                    <span>Total Due Now</span>
                    <span className="text-2xl font-black text-amber-400">${totalDueNow.toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-neutral-950 shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Confirming Reservation..." : "Complete & Confirm Reservation"}
                </button>

                <p className="text-[10px] text-center text-neutral-500">
                  Instant confirmation • Confirmation code delivered on next screen
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-400 selection:text-neutral-950">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="text-center py-20 text-neutral-400">Loading checkout...</div>}>
          <CheckoutContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
