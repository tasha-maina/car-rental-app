"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, PhoneCall, ShieldCheck, Car } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "The Fleet", href: "/fleet" },
    { name: "VIP Services & Chopper", href: "/vip-services" },
    { name: "My Trips", href: "/my-bookings" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-neutral-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <Car className="w-5 h-5 text-neutral-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-wider text-white">APEX</span>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                  EXOTICS
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium -mt-0.5">
                Luxury & Supercar Fleet
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-amber-400 bg-neutral-900 border border-neutral-800"
                      : "text-neutral-300 hover:text-white hover:bg-neutral-900/60"
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+18005552739"
              className="flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-amber-400 transition-colors px-3 py-2 rounded-lg bg-neutral-900/50 border border-neutral-800"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>24/7 VIP Concierge</span>
            </a>

            <Link
              href="/fleet"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all hover:scale-102 active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              <span>Reserve a Car</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/fleet"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-950 bg-amber-400"
            >
              Fleet
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-neutral-200 hover:bg-neutral-900 hover:text-amber-400"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            <Link
              href="/fleet"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 rounded-lg text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300"
            >
              Explore Full Fleet
            </Link>
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 py-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Identity & Insured Guarantee</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
