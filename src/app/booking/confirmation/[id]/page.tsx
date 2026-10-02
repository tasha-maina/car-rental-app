import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { Booking, Car } from "@/types";
import {
  CheckCircle2,
  Calendar,
  MapPin,
  ShieldCheck,
  Printer,
  Sparkles,
  PhoneCall,
  ArrowRight,
  Clock,
  Car as CarIcon
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

export default async function BookingConfirmationPage({ params }: Props) {
  const { id } = await params;

  const booking = (await prisma.booking.findFirst({
    where: {
      OR: [{ id }, { bookingCode: id.toUpperCase() }],
    },
    include: {
      car: true,
    },
  })) as unknown as (Booking & { car: Car }) | null;

  if (!booking) {
    notFound();
  }

  let addOnsList: string[] = [];
  try {
    addOnsList = JSON.parse(booking.addOns);
  } catch {
    addOnsList = [];
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-400 selection:text-neutral-950">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Success Banner */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Reservation Confirmed
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Your Exotic Experience Is Locked In
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
                A confirmation itinerary has been dispatched to <span className="text-white font-semibold">{booking.customerEmail}</span>. Our fleet concierge will reach out via WhatsApp 2 hours prior to handover.
              </p>
            </div>

            {/* Booking Code Card */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-inner">
              <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Reservation Code:</span>
              <span className="text-xl font-mono font-black text-amber-400 tracking-wider">
                {booking.bookingCode}
              </span>
            </div>
          </div>

          {/* Main Confirmation Card */}
          <div className="rounded-3xl bg-neutral-900/60 border border-neutral-800 p-6 sm:p-8 space-y-8 shadow-2xl">
            {/* Vehicle Header */}
            <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-neutral-800 pb-6">
              <div className="relative w-full sm:w-48 aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shrink-0">
                <Image
                  src={booking.car.image}
                  alt={booking.car.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-1 text-center sm:text-left flex-1">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {booking.car.category}
                </span>
                <h3 className="text-2xl font-bold text-white">{booking.car.name}</h3>
                <p className="text-xs text-neutral-400">
                  {booking.car.horsePower} HP • 0-60 in {booking.car.zeroToSixty}s • {booking.car.transmission}
                </p>
                <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
                    Status: {booking.status}
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 font-medium">
                    Protection: {booking.insuranceTier}
                  </span>
                </div>
              </div>
            </div>

            {/* Trip Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 space-y-2">
                <span className="text-neutral-400 uppercase font-semibold text-[10px] block">
                  Dates & Duration
                </span>
                <div className="space-y-1">
                  <p className="text-neutral-200">
                    <span className="text-neutral-500">Pickup:</span>{" "}
                    <span className="font-semibold text-white">
                      {new Date(booking.startDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </p>
                  <p className="text-neutral-200">
                    <span className="text-neutral-500">Return:</span>{" "}
                    <span className="font-semibold text-white">
                      {new Date(booking.endDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </p>
                  <p className="text-amber-400 font-bold pt-1">
                    Total Duration: {booking.totalDays} {booking.totalDays === 1 ? "Day" : "Days"}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 space-y-2">
                <span className="text-neutral-400 uppercase font-semibold text-[10px] block">
                  Delivery & Handover Logistics
                </span>
                <div className="space-y-1">
                  <p className="text-neutral-200">
                    <span className="text-neutral-500">Handover Location:</span>{" "}
                    <span className="font-semibold text-white">{booking.pickupLocation}</span>
                  </p>
                  <p className="text-neutral-200">
                    <span className="text-neutral-500">Return Location:</span>{" "}
                    <span className="font-semibold text-white">{booking.dropoffLocation}</span>
                  </p>
                  <p className="text-emerald-400 font-semibold pt-1">
                    White-Glove Sanitized Handover Guaranteed
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 space-y-2">
                <span className="text-neutral-400 uppercase font-semibold text-[10px] block">
                  Primary Renter Information
                </span>
                <div className="space-y-1 text-neutral-300">
                  <p><span className="text-neutral-500">Name:</span> {booking.customerName}</p>
                  <p><span className="text-neutral-500">Email:</span> {booking.customerEmail}</p>
                  <p><span className="text-neutral-500">Phone:</span> {booking.customerPhone}</p>
                  <p><span className="text-neutral-500">Driver License:</span> {booking.driverLicense}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 space-y-2">
                <span className="text-neutral-400 uppercase font-semibold text-[10px] block">
                  Payment & Deposit Summary
                </span>
                <div className="space-y-1 text-neutral-300">
                  <p className="flex justify-between">
                    <span className="text-neutral-500">Rental Rate:</span>
                    <span>${booking.rentalAmount.toLocaleString()}</span>
                  </p>
                  {booking.insuranceAmount > 0 && (
                    <p className="flex justify-between">
                      <span className="text-neutral-500">Insurance ({booking.insuranceTier}):</span>
                      <span>+${booking.insuranceAmount.toLocaleString()}</span>
                    </p>
                  )}
                  {booking.addOnsAmount > 0 && (
                    <p className="flex justify-between">
                      <span className="text-neutral-500">Add-ons:</span>
                      <span>+${booking.addOnsAmount.toLocaleString()}</span>
                    </p>
                  )}
                  <p className="flex justify-between text-neutral-400 pt-1 border-t border-neutral-800">
                    <span>Refundable Security Hold:</span>
                    <span>${booking.depositAmount.toLocaleString()}</span>
                  </p>
                  <p className="flex justify-between text-sm font-bold text-white pt-1">
                    <span>Total Amount:</span>
                    <span className="text-amber-400">${booking.totalAmount.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Add-ons List if any */}
            {addOnsList.length > 0 && (
              <div className="p-4 rounded-2xl bg-neutral-950/40 border border-neutral-800/60 space-y-2">
                <span className="text-[10px] uppercase font-semibold tracking-wider text-neutral-400 block">
                  Included Concierge Services:
                </span>
                <div className="flex flex-wrap gap-2">
                  {addOnsList.map((addon, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{addon}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions: View Reservations, Contact Concierge */}
            <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/my-bookings"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>View My Reservations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center gap-3">
                <a
                  href="tel:+18005552739"
                  className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-amber-400/20"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Fleet Manager</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
