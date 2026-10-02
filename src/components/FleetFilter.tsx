"use client";

import { Search, RotateCcw } from "lucide-react";

interface FleetFilterProps {
  search: string;
  onSearchChange: (val: string) => void;
  category: string;
  onCategoryChange: (val: string) => void;
  brand: string;
  onBrandChange: (val: string) => void;
  sort: string;
  onSortChange: (val: string) => void;
  maxPrice: number;
  onMaxPriceChange: (val: number) => void;
  onReset: () => void;
  totalCount: number;
}

const categories = [
  "All",
  "Supercar",
  "Exotic SUV",
  "Luxury Sedan",
  "Electric Hyper",
];

const brands = [
  "All",
  "Porsche",
  "Ferrari",
  "Lamborghini",
  "Mercedes-Benz",
  "Rolls-Royce",
  "Aston Martin",
  "McLaren",
  "Tesla",
  "Audi",
  "Land Rover",
];

export default function FleetFilter({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  brand,
  onBrandChange,
  sort,
  onSortChange,
  maxPrice,
  onMaxPriceChange,
  onReset,
  totalCount,
}: FleetFilterProps) {
  return (
    <div className="space-y-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 p-6">
      {/* Search & Counter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by model, brand, or features..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400/60"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Sorting */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Sort:</span>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-neutral-950 border border-neutral-800 text-white text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="featured" className="bg-neutral-900">Featured & Popular</option>
              <option value="price-low" className="bg-neutral-900">Price: Low to High</option>
              <option value="price-high" className="bg-neutral-900">Price: High to Low</option>
              <option value="power" className="bg-neutral-900">Most Horsepower (HP)</option>
              <option value="speed" className="bg-neutral-900">Fastest (0-60 MPH)</option>
              <option value="rating" className="bg-neutral-900">Top Rated</option>
            </select>
          </div>

          {/* Reset Filters */}
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-2.5">
          Vehicle Category
        </span>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = category === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? "bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20"
                    : "bg-neutral-950 text-neutral-300 border border-neutral-800 hover:border-neutral-700 hover:text-white"
                }`}
              >
                {cat === "All" ? "All Categories" : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand & Price Filter Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-800/60 items-center">
        {/* Brand Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
            Automaker / Brand
          </label>
          <select
            value={brand}
            onChange={(e) => onBrandChange(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 text-white text-xs font-semibold px-3 py-2.5 rounded-xl focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            {brands.map((b) => (
              <option key={b} value={b} className="bg-neutral-900">
                {b === "All" ? "All Marques & Brands" : b}
              </option>
            ))}
          </select>
        </div>

        {/* Max Daily Rate Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold uppercase tracking-wider text-neutral-400">Max Daily Rate:</span>
            <span className="font-bold text-amber-400">${maxPrice}/day</span>
          </div>
          <input
            type="range"
            min={300}
            max={2000}
            step={50}
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(Number(e.target.value))}
            className="w-full accent-amber-400 bg-neutral-800 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-neutral-500">
            <span>$300</span>
            <span>$1,000</span>
            <span>$2,000+</span>
          </div>
        </div>
      </div>

      {/* Showing results count */}
      <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800/40">
        <p>
          Showing <span className="font-bold text-white">{totalCount}</span> luxury & exotic vehicles
        </p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[11px] text-neutral-300">Live Availability Sync</span>
        </div>
      </div>
    </div>
  );
}
