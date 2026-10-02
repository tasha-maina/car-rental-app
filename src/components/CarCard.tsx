"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Gauge, Zap, Users, Star, ArrowRight, Heart } from "lucide-react";
import { Car } from "@/types";

interface CarCardProps {
  car: Car;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80";

export default function CarCard({ car }: CarCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imgSrc, setImgSrc] = useState(car.image || FALLBACK_IMAGE);

  return (
    <div className="group relative rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-amber-500/50 transition-all duration-300 overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-amber-500/10">
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950">
        <Image
          src={imgSrc}
          alt={car.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-neutral-900/80 backdrop-blur-md text-amber-400 border border-amber-400/20 shadow">
            {car.category}
          </span>
          {car.isFeatured && (
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-amber-500 text-neutral-950 shadow">
              Featured
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-neutral-900/70 backdrop-blur-md border border-neutral-700/60 text-white hover:text-red-400 hover:scale-110 transition-all"
          aria-label="Save vehicle"
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
        </button>

        {/* Rating overlay bottom left of image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-neutral-950/80 backdrop-blur-sm border border-neutral-800 text-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold text-white">{car.rating.toFixed(1)}</span>
          <span className="text-[11px] text-neutral-400">({car.reviewsCount})</span>
        </div>

        {/* Availability pill */}
        <div className="absolute bottom-3 right-3">
          <span
            className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
              car.isAvailable
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            {car.isAvailable ? "Available Now" : "Reserved"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
              {car.brand} • {car.year}
            </p>
            <p className="text-xs text-neutral-500 truncate max-w-[140px]">{car.location.split(",")[0]}</p>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 mt-0.5">
            {car.name}
          </h3>
        </div>

        {/* Performance Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-[10px] text-neutral-400">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>0-60 MPH</span>
            </div>
            <p className="text-xs font-bold text-white mt-0.5">{car.zeroToSixty}s</p>
          </div>

          <div className="border-x border-neutral-800">
            <div className="flex items-center justify-center gap-1 text-[10px] text-neutral-400">
              <Gauge className="w-3 h-3 text-amber-400" />
              <span>POWER</span>
            </div>
            <p className="text-xs font-bold text-white mt-0.5">{car.horsePower} HP</p>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-[10px] text-neutral-400">
              <Users className="w-3 h-3 text-amber-400" />
              <span>SEATS</span>
            </div>
            <p className="text-xs font-bold text-white mt-0.5">{car.seats} Seats</p>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2 border-t border-neutral-800/70 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-white">${car.pricePerDay}</span>
              <span className="text-xs text-neutral-400 font-medium">/ day</span>
            </div>
            <p className="text-[10px] text-neutral-500">${car.deposit} ref. deposit</p>
          </div>

          <Link
            href={`/cars/${car.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-amber-400 hover:text-neutral-950 text-white transition-all duration-200 group-hover:border-amber-400/40"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
