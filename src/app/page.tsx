import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSearch from "@/components/HeroSearch";
import CarCard from "@/components/CarCard";
import { prisma } from "@/lib/prisma";
import { Car } from "@/types";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Award,
  Clock,
  Compass,
  ArrowRight,
  Plane,
  KeyRound,
  CheckCircle2,
  ChevronRight,
  PhoneCall
} from "lucide-react";

export const revalidate = 0; // Ensure fresh data

export default async function HomePage() {
  const featuredCars = (await prisma.car.findMany({
    where: { isFeatured: true },
    take: 6,
    orderBy: { pricePerDay: "desc" },
  })) as unknown as Car[];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-400 selection:text-neutral-950">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-16 pb-24 md:pt-24 md:pb-36 overflow-hidden">
          {/* Subtle Ambient Background Glows */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
          <div className="absolute top-40 right-10 w-[400px] h-[400px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            {/* Supercar Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-semibold text-neutral-300 shadow-md">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              <span>THE ULTIMATE EXOTIC & LUXURY CAR RENTAL</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto uppercase leading-[1.08]">
              Drive The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600">Extraordinary.</span> <br />
              Unleash Pure Power.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto font-normal leading-relaxed">
              Curated fleet of Ferrari, Porsche GT, Lamborghini, Rolls-Royce, and hyper EVs. Delivered directly to your private jet, penthouse, or luxury resort.
            </p>

            {/* Real-time Hero Search Widget */}
            <div className="pt-6">
              <HeroSearch />
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
              <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Guaranteed Model</p>
                  <p className="text-xs text-neutral-400">Exact car pictured</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">FBO & Villa Handover</p>
                  <p className="text-xs text-neutral-400">White-glove delivery</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Zero Hidden Fees</p>
                  <p className="text-xs text-neutral-400">Transparent pricing</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">24/7 VIP Concierge</p>
                  <p className="text-xs text-neutral-400">Dedicated manager</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED FLEET SHOWCASE */}
        <section className="py-20 border-t border-neutral-800/80 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-amber-400 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Apex Collection</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Featured Exotic & Luxury Fleet
                </h2>
                <p className="text-sm text-neutral-400 mt-1 max-w-xl">
                  From track-bred Weissach supercars to whisper-quiet V12 grand tourers, each vehicle is kept in showroom condition.
                </p>
              </div>

              <Link
                href="/fleet"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/10 self-start md:self-auto"
              >
                <span>View All 12 Vehicles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Cars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            {/* Category Quick Filter Links */}
            <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Browse by Category:
              </span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/fleet?category=Supercar"
                  className="px-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-amber-400/40 text-xs font-semibold text-neutral-200 hover:text-white"
                >
                  Supercars (Ferrari, Porsche, Huracán)
                </Link>
                <Link
                  href="/fleet?category=Exotic+SUV"
                  className="px-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-amber-400/40 text-xs font-semibold text-neutral-200 hover:text-white"
                >
                  Exotic SUVs (G63, Urus, Range Rover)
                </Link>
                <Link
                  href="/fleet?category=Luxury+Sedan"
                  className="px-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-amber-400/40 text-xs font-semibold text-neutral-200 hover:text-white"
                >
                  Ultra-Luxury Sedans (Rolls-Royce, Aston Martin)
                </Link>
                <Link
                  href="/fleet?category=Electric+Hyper"
                  className="px-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-amber-400/40 text-xs font-semibold text-neutral-200 hover:text-white"
                >
                  Electric Hyper (Taycan, Plaid, RS e-tron)
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BESPOKE EXPERIENCES & SERVICES */}
        <section id="experiences" className="py-20 border-t border-neutral-800/80 bg-neutral-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Bespoke Concierge
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                More Than A Rental. An Unrivaled Experience.
              </h2>
              <p className="text-sm text-neutral-400">
                Tailored services designed for discerning executives, travelers, and automobile enthusiasts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-amber-500/40 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <Plane className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Private Aviation FBO Tarmac Delivery</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Stepping off your Gulfstream or Bombardier? Your chosen supercar will be waiting on the tarmac with engine running, temperature acclimated, and chilled spring water inside.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-amber-500/40 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Curated Scenic Drive Navigation</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Every car comes with custom waypoint GPS routes through Malibu Canyon, Red Rock Scenic Loop, or Florida Keys Overseas Highway, optimized for spirited driving.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4 hover:border-amber-500/40 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">White-Glove Executive Chauffeur</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Prefer to sit back in the rear executive lounge of our Rolls-Royce Ghost or Mercedes-AMG G 63? Professional, discreet security-trained chauffeurs are on call 24/7.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS / 3 STEPS */}
        <section id="services" className="py-20 border-t border-neutral-800/80 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Effortless Process
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                How Apex Reservation Works
              </h2>
              <p className="text-sm text-neutral-400">
                Seamless from selection to ignition in under 5 minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800 space-y-4">
                <div className="text-3xl font-black text-amber-400">01</div>
                <h3 className="text-base font-bold text-white">Select Your Supercar</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Browse our real-time inventory. View horsepower, acceleration, and real interior/exterior photography. Guaranteed exact car upon delivery.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800 space-y-4">
                <div className="text-3xl font-black text-amber-400">02</div>
                <h3 className="text-base font-bold text-white">Instant Online Verification</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Upload driver details, select your protection plan, and choose custom add-ons like child seats or airport delivery in a 1-minute checkout.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800 space-y-4">
                <div className="text-3xl font-black text-amber-400">03</div>
                <h3 className="text-base font-bold text-white">Doorstep Key Handover</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Our professional concierge delivers the detailed vehicle to your specified hotel, airport terminal, or address with full vehicle orientation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 border-t border-neutral-800/80 bg-neutral-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Verified Reviews
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                What Our Clients Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {"★★★★★"}
                </div>
                <p className="text-xs text-neutral-300 italic leading-relaxed">
                  “Rented the Porsche GT3 RS for a drive along the Pacific Coast Highway. The concierge met me at the hotel with keys in hand. The car was pristine with barely 2,000 miles on it. Absolutely unforgettable experience.”
                </p>
                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">Julian Sterling</p>
                    <p className="text-[11px] text-neutral-500">Tech Founder • Los Angeles</p>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Verified Trip</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {"★★★★★"}
                </div>
                <p className="text-xs text-neutral-300 italic leading-relaxed">
                  “The Ferrari F8 Tributo was delivered straight to our private hangar at Miami Executive. Zero paperwork delays, vehicle was impeccably detailed, and their WhatsApp support answered my questions in seconds.”
                </p>
                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">Marcus Vance</p>
                    <p className="text-[11px] text-neutral-500">Managing Director • Miami</p>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Verified Trip</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {"★★★★★"}
                </div>
                <p className="text-xs text-neutral-300 italic leading-relaxed">
                  “The Rolls-Royce Ghost was immaculate for our weekend wedding gala in Manhattan. The starlight headliner, the chauffeur option, and the effortless ride made it a magical weekend. APEX is leagues above any standard rental.”
                </p>
                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">Seraphina Dubois</p>
                    <p className="text-[11px] text-neutral-500">Fashion Director • New York</p>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Verified Trip</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-20 border-t border-neutral-800 bg-neutral-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Frequently Asked Questions
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                Everything You Need To Know
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2">
                <h4 className="text-sm font-bold text-white">What are the age requirements to rent an exotic supercar?</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  The primary driver must be at least 21 years of age for our performance SUV and luxury sedans, and 25 years of age for our highest-tier supercars (Ferrari, Lamborghini, McLaren). A valid government-issued driver&apos;s license and proof of full coverage insurance or our VIP Black protection plan is required.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2">
                <h4 className="text-sm font-bold text-white">How does the security deposit work?</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  A pre-authorization hold is placed on your credit card at vehicle delivery (typically $1,000 to $3,000 depending on the vehicle tier). This is not a charge; the hold is automatically released immediately upon return inspection.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2">
                <h4 className="text-sm font-bold text-white">Can you deliver the car to my private flight or hotel?</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Yes, white-glove doorstep delivery is our specialty. We deliver directly to FBO private airports (Signature, Atlantic Aviation), five-star hotel valet entrances, and private residences across Los Angeles, Miami, Las Vegas, and New York.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-2">
                <h4 className="text-sm font-bold text-white">Are international driver&apos;s licenses accepted?</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Yes, international guests are welcomed. We accept valid foreign driver&apos;s licenses alongside a passport. International renters simply select our comprehensive protection coverage during checkout.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="py-20 border-t border-neutral-800 bg-gradient-to-b from-neutral-950 to-neutral-900 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              Ready For The Drive Of Your Life?
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
              Choose your vehicle today or consult with our private concierge for customized multi-day itineraries and fleet delivery.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/fleet"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
              >
                Browse The Fleet
              </Link>
              <a
                href="tel:+18005552739"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Call VIP Concierge</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
