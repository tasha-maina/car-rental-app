"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Car, Search, ArrowRight } from "lucide-react";

export default function HeroSearch() {
  const router = useRouter();
  const [location, setLocation] = useState("Los Angeles, CA");
  const [category, setCategory] = useState("All");
  
  // Set default dates: tomorrow and +3 days
  const today = new Date();
  const defaultPickup = new Date(today);
  defaultPickup.setDate(today.getDate() + 1);
  const defaultReturn = new Date(today);
  defaultReturn.setDate(today.getDate() + 4);

  const [pickupDate, setPickupDate] = useState(defaultPickup.toISOString().split("T")[0]);
  const [returnDate, setReturnDate] = useState(defaultReturn.toISOString().split("T")[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category && category !== "All") params.set("category", category);
    if (location) params.set("location", location);
    if (pickupDate) params.set("pickupDate", pickupDate);
    if (returnDate) params.set("returnDate", returnDate);

    router.push(`/fleet?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-neutral-900/80 backdrop-blur-2xl border border-neutral-800 p-4 md:p-6 shadow-2xl shadow-neutral-950/80">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Location Selector */}
        <div className="flex flex-col space-y-1.5 p-3 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 hover:border-amber-400/40 transition-colors">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <MapPin className="w-3.5 h-3.5" />
            <span>Pickup & Delivery City</span>
          </div>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
          >
            <option value="Los Angeles, CA" className="bg-neutral-900 text-white">Los Angeles, CA (LAX/Beverly Hills)</option>
            <option value="Miami, FL" className="bg-neutral-900 text-white">Miami, FL (South Beach/FBO)</option>
            <option value="Las Vegas, NV" className="bg-neutral-900 text-white">Las Vegas, NV (The Strip)</option>
            <option value="New York, NY" className="bg-neutral-900 text-white">New York, NY (Manhattan/Hamptons)</option>
            <option value="San Francisco, CA" className="bg-neutral-900 text-white">San Francisco, CA (Silicon Valley)</option>
          </select>
        </div>

        {/* Fleet Category */}
        <div className="flex flex-col space-y-1.5 p-3 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 hover:border-amber-400/40 transition-colors">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Car className="w-3.5 h-3.5" />
            <span>Fleet Category</span>
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
          >
            <option value="All" className="bg-neutral-900 text-white">All Exotic & Luxury Fleet</option>
            <option value="Supercar" className="bg-neutral-900 text-white">Supercars & Track</option>
            <option value="Exotic SUV" className="bg-neutral-900 text-white">Exotic SUVs</option>
            <option value="Luxury Sedan" className="bg-neutral-900 text-white">Ultra-Luxury Sedans</option>
            <option value="Electric Hyper" className="bg-neutral-900 text-white">Electric Hypercars</option>
          </select>
        </div>

        {/* Dates Range */}
        <div className="flex flex-col space-y-1.5 p-3 rounded-2xl bg-neutral-950/70 border border-neutral-800/80 hover:border-amber-400/40 transition-colors">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>Trip Dates</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-neutral-400 block">Pickup</span>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-transparent text-white font-medium focus:outline-none cursor-pointer [color-scheme:dark]"
              />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 block">Return</span>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-transparent text-white font-medium focus:outline-none cursor-pointer [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        {/* Search Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full h-full min-h-[58px] rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Find Vehicles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
