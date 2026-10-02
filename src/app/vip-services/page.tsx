"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Sparkles,
  Plane,
  Shield,
  Clock,
  Compass,
  CheckCircle2,
  Calendar,
  Users,
  MapPin,
  ChevronRight,
  Send,
  Check,
  Building2,
  Lock,
  PhoneCall
} from "lucide-react";

const VIP_EXPERIENCES = [
  {
    id: "chopper",
    badge: "Most Requested",
    title: "VIP Chopper & Helicopter Charter",
    subtitle: "Skyline transit & direct FBO heliport tarmac transfers",
    aircraft: "Twin-Engine Sikorsky S-76 / Airbus ACH130",
    description:
      "Bypass highway congestion with private rotary-wing charters. Fly directly between downtown executive heliports (LAX, Manhattan, Miami Beach) and our luxury fleet staging grounds. Your chosen supercar is parked directly adjacent to the landing skid with climate pre-set.",
    capacity: "Up to 5 Passengers + Luggage",
    rate: "From $2,800 / flight leg",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Zero TSA wait / direct tarmac boarding",
      "Executive leather captain chairs & noise-canceling Bose headsets",
      "Seamless vehicle-to-skid luggage transfer",
      "Champagne service & chilled bottled spring water",
    ],
  },
  {
    id: "jet-tarmac",
    badge: "FBO Aviation Access",
    title: "Private Jet FBO Tarmac Delivery",
    subtitle: "Ramp-side supercar handoff at Signature & Atlantic Aviation",
    aircraft: "Gulfstream, Bombardier & Citation Ramp Certified",
    description:
      "Arrive in style. Through our FAA and TSA-cleared ramp security credentials, we deliver your Rolls-Royce, Ferrari, or Lamborghini directly to the boarding stairs of your private aircraft at major executive airfields.",
    capacity: "Private Escort & White-Glove Hand-off",
    rate: "Included with VIP Black Protection / $250 a la carte",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Authorized ramp access at LAX, VNY, MIA, TEB, and LAS",
      "Vehicle temperature acclimated & pre-fueled",
      "Direct luggage transfer from jet cargo hold to car trunk",
      "Concierge welcome briefing and key presentation",
    ],
  },
  {
    id: "chauffeur",
    badge: "Security Trained",
    title: "White-Glove Executive Chauffeur Detail",
    subtitle: "Discreet personal drivers in Rolls-Royce or Mercedes-AMG G 63",
    aircraft: "Armored & Executive Fleet Available",
    description:
      "Relax in the starlight executive rear lounge while our professionally certified, discreet executive protection drivers manage city traffic, gala arrivals, or multi-day roadshows.",
    capacity: "Hourly, Daily or Multi-Day Retention",
    rate: "From $350 / day + vehicle rental",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Evasive driving & executive security trained chauffeurs",
      "Total client confidentiality and privacy non-disclosure",
      "In-cabin Wi-Fi, refreshments, and tailored acoustic environment",
      "Available 24/7 on standby for spontaneous itineraries",
    ],
  },
];

export default function VipServicesPage() {
  const [selectedService, setSelectedService] = useState("VIP Chopper & Helicopter Charter");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [location, setLocation] = useState("Los Angeles (LAX / Beverly Hills Helipad)");
  const [destination, setDestination] = useState("Malibu Private Estate");
  const [scheduledDate, setScheduledDate] = useState("");
  const [passengers, setPassengers] = useState("2");
  const [vehiclePairing, setVehiclePairing] = useState("Rolls-Royce Ghost Extended");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/vip-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType: selectedService,
          clientName,
          clientEmail,
          clientPhone,
          location,
          destination,
          scheduledDate: scheduledDate || new Date().toISOString(),
          passengers: Number(passengers),
          vehiclePairing,
          notes,
          estimatedCost: selectedService.includes("Chopper") ? 2800 : selectedService.includes("Chauffeur") ? 350 : 250,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit VIP request");
      }

      setSubmittedInquiry(data);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please contact concierge.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-400 selection:text-neutral-950">
      <Navbar />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>APEX Bespoke Aviation & VIP Services</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight leading-tight">
              VIP Chopper, Private Jet &amp; Executive Escort
            </h1>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Ultra-luxury travel is uninterrupted mobility. Book seamless private helicopter charters, tarmac-side supercar delivery, and armored security chauffeurs tailored for leaders, artists, and automobile enthusiasts.
            </p>
          </div>

          {/* Service Cards Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {VIP_EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="group rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
              >
                <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                      {exp.badge}
                    </span>
                    <span className="text-xs font-semibold text-neutral-400">{exp.rate}</span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-white">{exp.title}</h2>
                    <p className="text-xs text-amber-400/80 font-medium mt-1">{exp.subtitle}</p>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="pt-4 border-t border-neutral-800/80 space-y-2.5">
                    <p className="text-[11px] font-bold text-white uppercase tracking-wider">Service Inclusions:</p>
                    <ul className="space-y-2 text-xs text-neutral-300">
                      {exp.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-8 pt-0">
                  <button
                    onClick={() => {
                      setSelectedService(exp.title);
                      const el = document.getElementById("booking-form");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      selectedService === exp.title
                        ? "bg-amber-400 text-neutral-950 shadow-lg shadow-amber-400/20 scale-[1.02]"
                        : "bg-neutral-800 hover:bg-neutral-700 text-white"
                    }`}
                  >
                    <span>{selectedService === exp.title ? "Selected for Charter" : "Book This Experience"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Booking & Charter Form Section */}
          <section id="booking-form" className="rounded-3xl bg-neutral-900/90 border border-neutral-800 p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

            {submittedInquiry ? (
              <div className="max-w-2xl mx-auto text-center space-y-6 py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    VIP Inquiry Confirmed &amp; Dispatched
                  </span>
                  <h3 className="text-3xl font-black text-white uppercase">
                    Your Charter Request Is Active
                  </h3>
                  <p className="text-sm text-neutral-300">
                    Thank you, <span className="font-bold text-white">{submittedInquiry.clientName}</span>. Your request for <span className="text-amber-400 font-semibold">{submittedInquiry.serviceType}</span> has been logged with Apex Aviation Ops.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-left space-y-3 max-w-lg mx-auto text-xs">
                  <div className="flex justify-between border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">Inquiry Reference:</span>
                    <span className="font-mono text-white font-bold">{submittedInquiry.id.slice(-8).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">Scheduled Date:</span>
                    <span className="text-white font-medium">{new Date(submittedInquiry.scheduledDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">Pickup Zone:</span>
                    <span className="text-white font-medium">{submittedInquiry.location}</span>
                  </div>
                  {submittedInquiry.destination && (
                    <div className="flex justify-between border-b border-neutral-800 pb-2">
                      <span className="text-neutral-400">Destination:</span>
                      <span className="text-white font-medium">{submittedInquiry.destination}</span>
                    </div>
                  )}
                  {submittedInquiry.vehiclePairing && (
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Paired Supercar:</span>
                      <span className="text-amber-400 font-semibold">{submittedInquiry.vehiclePairing}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <a
                    href="tel:+18005552739"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call Concierge Now</span>
                  </a>
                  <button
                    onClick={() => setSubmittedInquiry(null)}
                    className="text-xs text-neutral-400 hover:text-white underline"
                  >
                    Submit Another VIP Request
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    Direct Concierge Dispatch
                  </span>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight">
                    Instant VIP Charter &amp; Transfer Request
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    Submit your itinerary details below. Our 24/7 Aviation and Executive Logistics officers coordinate flight corridors, landing zone permits, and vehicle tarmac positioning with zero friction.
                  </p>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80">
                      <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-white">Rapid 15-Minute Response</p>
                        <p className="text-[11px] text-neutral-400">Flight manifest and vehicle escort confirmation sent via encrypted SMS &amp; email.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80">
                      <Shield className="w-5 h-5 text-amber-400 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-white">Full Discretion &amp; Security</p>
                        <p className="text-[11px] text-neutral-400">All crew and chauffeurs operate under strict non-disclosure agreements.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
                      {errorMsg}
                    </div>
                  )}

                  {/* Service selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-neutral-300">Selected VIP Service</label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="VIP Chopper & Helicopter Charter">VIP Chopper &amp; Helicopter Charter (Rotary Wing)</option>
                      <option value="Private Jet FBO Tarmac Delivery">Private Jet FBO Tarmac Supercar Delivery</option>
                      <option value="White-Glove Executive Chauffeur Detail">White-Glove Executive Chauffeur Detail</option>
                      <option value="Superyacht Tender & Marina Transfer">Superyacht Tender &amp; Marina Transfer</option>
                    </select>
                  </div>

                  {/* Personal info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Lord / Lady / Executive"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="client@executive.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">Mobile Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Flight/Itinerary details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">Origin / Pick-up Helipad or FBO *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. LAX Helipad, Van Nuys FBO, Downtown Manhattan"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">Destination (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Bel Air Estate, South Beach Marina, Hamptons"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">Flight / Transfer Date</label>
                      <input
                        type="date"
                        required
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">Passengers</label>
                      <select
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="1">1 Passenger</option>
                        <option value="2">2 Passengers</option>
                        <option value="3">3 Passengers</option>
                        <option value="4">4 Passengers</option>
                        <option value="5">5+ Passengers (Heavy Heli)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">Pair Supercar</label>
                      <select
                        value={vehiclePairing}
                        onChange={(e) => setVehiclePairing(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Rolls-Royce Ghost Extended">Rolls-Royce Ghost Extended</option>
                        <option value="Mercedes-AMG G 63">Mercedes-AMG G 63</option>
                        <option value="Ferrari F8 Tributo">Ferrari F8 Tributo</option>
                        <option value="Porsche 911 GT3 RS">Porsche 911 GT3 RS</option>
                        <option value="Lamborghini Urus Performante">Lamborghini Urus Performante</option>
                        <option value="None - Aviation Transfer Only">None - Aviation Only</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-300">Special Flight Manifest or Security Notes</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Tail number, baggage requirements, security escort, Dom Pérignon vintage preferences..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-neutral-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Dispatching VIP Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit VIP Charter Request</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
