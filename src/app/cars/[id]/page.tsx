import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarGallery from "@/components/CarGallery";
import BookingWidget from "@/components/BookingWidget";
import { prisma } from "@/lib/prisma";
import { Car } from "@/types";
import {
  Zap,
  Gauge,
  Users,
  ShieldCheck,
  MapPin,
  Star,
  Fuel,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Info,
  Clock,
  KeyRound
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

export default async function CarDetailPage({ params }: Props) {
  const { id } = await params;

  const car = (await prisma.car.findUnique({
    where: { id },
    include: {
      reviews: {
        orderBy: { date: "desc" },
      },
    },
  })) as unknown as (Car & { reviews: Array<{ id: string; author: string; rating: number; comment: string; date: string }> }) | null;

  if (!car) {
    notFound();
  }

  let featuresList: string[] = [];
  try {
    featuresList = JSON.parse(car.features);
  } catch {
    featuresList = ["Sport Exhaust", "Apple CarPlay", "Premium Sound", "Heated Seats"];
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-400 selection:text-neutral-950">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-neutral-400">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <Link href="/fleet" className="hover:text-amber-400 transition-colors">The Fleet</Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-white font-medium">{car.name}</span>
          </nav>

          {/* Title & Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800/80 pb-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  {car.category}
                </span>
                <span className="text-xs text-neutral-400 font-semibold">
                  {car.brand} • Model Year {car.year}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
                {car.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{car.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-white">{car.rating.toFixed(2)}</span>
                  <span>({car.reviewsCount} verified reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>White-Glove Delivery Ready</span>
                </div>
              </div>
            </div>

            {/* Quick Pricing Header */}
            <div className="text-left md:text-right">
              <div className="flex items-baseline gap-1 md:justify-end">
                <span className="text-4xl font-black text-white">${car.pricePerDay}</span>
                <span className="text-sm font-medium text-neutral-400">/ day</span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                ${car.deposit} refundable security hold
              </p>
            </div>
          </div>

          {/* Two-Column Grid (Gallery & Specs vs Sticky Booking Widget) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Left 2 Cols: Gallery, Specs, Details, Features, Reviews */}
            <div className="lg:col-span-2 space-y-10">
              {/* Photo Gallery */}
              <CarGallery
                primaryImage={car.image}
                imagesJson={car.images}
                carName={car.name}
              />

              {/* Performance Metrics Block */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Technical Specifications</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center">
                    <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <span className="text-[10px] text-neutral-400 uppercase font-semibold block">0-60 MPH</span>
                    <span className="text-xl font-black text-white">{car.zeroToSixty}s</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center">
                    <Gauge className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Horsepower</span>
                    <span className="text-xl font-black text-white">{car.horsePower} HP</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center">
                    <Clock className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Top Speed</span>
                    <span className="text-xl font-black text-white">{car.topSpeed} MPH</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-center">
                    <Users className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Capacity</span>
                    <span className="text-xl font-black text-white">{car.seats} Seats</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-neutral-900/30 border border-neutral-800/80 flex items-center justify-between">
                    <span className="text-neutral-400">Transmission</span>
                    <span className="font-semibold text-white">{car.transmission}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-900/30 border border-neutral-800/80 flex items-center justify-between">
                    <span className="text-neutral-400">Fuel / Engine</span>
                    <span className="font-semibold text-white">{car.fuelType}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-900/30 border border-neutral-800/80 flex items-center justify-between">
                    <span className="text-neutral-400">Mileage Allowance</span>
                    <span className="font-semibold text-amber-400">{car.mileageLimit} mi / day</span>
                  </div>
                </div>
              </div>

              {/* Vehicle Description */}
              <div className="space-y-4 rounded-3xl bg-neutral-900/40 border border-neutral-800 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                  The Driving Experience
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                  {car.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-neutral-800/60 text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Detailed & sanitized 30 min before handover</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>GPS pre-loaded with scenic regional routes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Complimentary chilled refreshments included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct WhatsApp line to fleet vehicle engineer</span>
                  </div>
                </div>
              </div>

              {/* Key Features & Amenities */}
              <div className="space-y-4 rounded-3xl bg-neutral-900/40 border border-neutral-800 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                  Vehicle Highlights & Equipment
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {featuresList.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/80 text-xs text-neutral-200"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rental Terms & Guidelines */}
              <div className="space-y-4 rounded-3xl bg-neutral-900/30 border border-neutral-800 p-6 sm:p-8 text-xs text-neutral-400 space-y-3">
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Rental Policies & Guidelines
                </h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Minimum driver age is 25 for supercars (21 for SUVs/sedans).</li>
                  <li>Must possess a valid physical driver&apos;s license and major credit card matching name.</li>
                  <li>Refundable security deposit (${car.deposit}) pre-authorized at vehicle delivery.</li>
                  <li>Free cancellation up to 48 hours prior to scheduled delivery time.</li>
                  <li>Smoking or track racing is strictly prohibited on road-going fleet vehicles.</li>
                </ul>
              </div>

              {/* Customer Reviews Section */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                    Client Reviews
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-white">{car.rating.toFixed(2)}</span>
                    <span className="text-neutral-400">({car.reviewsCount} trips)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {car.reviews && car.reviews.length > 0 ? (
                    car.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs">{rev.author}</span>
                          <span className="text-amber-400 text-xs">{"★".repeat(rev.rating)}</span>
                        </div>
                        <p className="text-xs text-neutral-300 leading-relaxed">{rev.comment}</p>
                        <span className="text-[10px] text-neutral-500 block">
                          Verified Renter • {new Date(rev.date).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-neutral-500 italic">No reviews yet for this vehicle.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Booking Widget */}
            <div className="lg:col-span-1">
              <BookingWidget car={car} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
