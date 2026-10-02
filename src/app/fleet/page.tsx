"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import FleetFilter from "@/components/FleetFilter";
import { Car } from "@/types";
import { Sparkles, Car as CarIcon, AlertCircle } from "lucide-react";

function FleetContent() {
  const searchParams = useSearchParams();

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state initialized from query params
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [brand, setBrand] = useState(searchParams.get("brand") || "All");
  const [sort, setSort] = useState(searchParams.get("sort") || "featured");
  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 2000
  );

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category && category !== "All") params.set("category", category);
      if (brand && brand !== "All") params.set("brand", brand);
      if (search.trim()) params.set("search", search.trim());
      if (sort) params.set("sort", sort);
      if (maxPrice < 2000) params.set("maxPrice", maxPrice.toString());

      const res = await fetch(`/api/cars?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setCars(data);
      }
    } catch (err) {
      console.error("Failed to load cars", err);
    } finally {
      setLoading(false);
    }
  }, [category, brand, search, sort, maxPrice]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleReset = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setSort("featured");
    setMaxPrice(2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Showroom Inventory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          The Apex Fleet
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl">
          Explore our private collection of world-class supercars, exotic SUVs, and prestige grand tourers. Every vehicle is maintained to the highest factory standards.
        </p>
      </div>

      {/* Filter Bar */}
      <FleetFilter
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        brand={brand}
        onBrandChange={setBrand}
        sort={sort}
        onSortChange={setSort}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        onReset={handleReset}
        totalCount={cars.length}
      />

      {/* Cars Grid / Loading / Empty */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-neutral-900/40 border border-neutral-800/80 p-5 space-y-4 animate-pulse"
            >
              <div className="aspect-[16/10] bg-neutral-800 rounded-xl" />
              <div className="h-4 bg-neutral-800 rounded w-1/3" />
              <div className="h-6 bg-neutral-800 rounded w-3/4" />
              <div className="h-12 bg-neutral-800 rounded-xl" />
            </div>
          ))}
        </div>
      ) : cars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-3xl bg-neutral-900/30 border border-neutral-800 space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
            <AlertCircle className="w-7 h-7 text-amber-400" />
          </div>
          <h3 className="text-lg font-bold text-white">No vehicles match your criteria</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Try adjusting your search terms, changing the category, or resetting the price filters.
          </p>
          <button
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl bg-amber-400 text-neutral-950 text-xs font-bold hover:bg-amber-300 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function FleetPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-400 selection:text-neutral-950">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="text-center py-20 text-neutral-400">Loading fleet...</div>}>
          <FleetContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
