import Link from "next/link";
import { Car, ShieldCheck, Clock, Award, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-400 text-sm">
      {/* Trust Highlights */}
      <div className="border-b border-neutral-800/60 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Comprehensive Coverage</p>
                <p className="text-xs text-neutral-400">Multi-tier VIP protection plans</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">24/7 White-Glove Delivery</p>
                <p className="text-xs text-neutral-400">Delivered directly to hotel or airport</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Guaranteed Exact Model</p>
                <p className="text-xs text-neutral-400">You drive the exact car you book</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Premier Metro Locations</p>
                <p className="text-xs text-neutral-400">LA, Miami, Las Vegas & New York</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-black shadow-md">
                <Car className="w-4 h-4 text-neutral-950" />
              </div>
              <span className="text-xl font-bold tracking-wider text-white">APEX <span className="text-amber-400">EXOTICS</span></span>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              The premier destination for exotic, luxury, and hypercar rentals. Delivering extraordinary driving thrills and tailored concierge experiences nationwide.
            </p>
            <div className="space-y-1.5 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>+1 (800) 555-APEX (2739) • Available 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>concierge@apexexotics.com</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Fleet Categories</p>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/fleet?category=Supercar" className="hover:text-amber-400 transition-colors">Supercars</Link></li>
              <li><Link href="/fleet?category=Exotic+SUV" className="hover:text-amber-400 transition-colors">Exotic SUVs</Link></li>
              <li><Link href="/fleet?category=Luxury+Sedan" className="hover:text-amber-400 transition-colors">Luxury Grand Tourers</Link></li>
              <li><Link href="/fleet?category=Electric+Hyper" className="hover:text-amber-400 transition-colors">Electric Hypercars</Link></li>
              <li><Link href="/fleet" className="text-amber-400 hover:underline">View All Vehicles →</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Locations</p>
            <ul className="space-y-2.5 text-xs">
              <li><span className="text-neutral-300">Los Angeles</span> (Beverly Hills / LAX)</li>
              <li><span className="text-neutral-300">Miami</span> (South Beach / MIA FBO)</li>
              <li><span className="text-neutral-300">Las Vegas</span> (The Strip / LAS)</li>
              <li><span className="text-neutral-300">New York</span> (Manhattan / Hamptons)</li>
              <li><span className="text-neutral-300">San Francisco</span> (Silicon Valley)</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Quick Links</p>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/my-bookings" className="hover:text-amber-400 transition-colors">Manage Reservations</Link></li>
              <li><Link href="/fleet" className="hover:text-amber-400 transition-colors">Instant Booking</Link></li>
              <li><Link href="/admin" className="hover:text-amber-400 transition-colors">Fleet Admin Portal</Link></li>
              <li><Link href="/#faq" className="hover:text-amber-400 transition-colors">Rental FAQ & Policies</Link></li>
              <li><a href="#experiences" className="hover:text-amber-400 transition-colors">Chauffeur & Escort</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} APEX EXOTICS Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Rental</span>
            <span className="hover:text-neutral-400 cursor-pointer">Insurance Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
