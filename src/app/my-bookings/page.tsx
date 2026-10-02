"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Booking } from "@/types";
import {
  Calendar,
  MapPin,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldAlert,
  Car
} from "lucide-react";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"ALL" | "CONFIRMED" | "ACTIVE" | "COMPLETED" | "CANCELLED">("ALL");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      let url = "/api/bookings";
      const params = new URLSearchParams();
      if (searchTerm.trim()) {
        if (searchTerm.includes("@")) {
          params.set("email", searchTerm.trim());
        } else {
          params.set("code", searchTerm.trim());
        }
      }
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleCancelBooking = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this reservation? Free cancellation policy applies.")) {
      return;
    }

    setCancellingId(id);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: "CANCELLED" } : b))
        );
      }
    } catch (err) {
      console.error("Failed to cancel booking", err);
    } finally {
      setCancellingId(null);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "ALL") return true;
    return b.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-400 selection:text-neutral-950">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800/80 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Client Portal
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                My Trips & Reservations
              </h1>
              <p className="text-xs text-neutral-400">
                Track active exotic deliveries, view trip itineraries, or manage booking details.
              </p>
            </div>

            <Link
              href="/fleet"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors self-start md:self-auto"
            >
              <span>Book Another Vehicle</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Search bar & Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by reservation code (APX-...) or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-neutral-900 border border-neutral-800 text-xs">
              {(["ALL", "CONFIRMED", "ACTIVE", "COMPLETED", "CANCELLED"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    activeTab === tab
                      ? "bg-amber-400 text-neutral-950 shadow"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {tab === "ALL" ? "All Trips" : tab.charAt(0) + tab.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings List */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-neutral-900/40 border border-neutral-800 animate-pulse space-y-4"
                >
                  <div className="h-6 bg-neutral-800 rounded w-1/4" />
                  <div className="h-16 bg-neutral-800 rounded" />
                </div>
              ))}
            </div>
          ) : filteredBookings.length > 0 ? (
            <div className="space-y-4">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="rounded-3xl bg-neutral-900/60 border border-neutral-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-neutral-700 transition-colors"
                >
                  {/* Left: Thumbnail & Car Info */}
                  <div className="flex items-center gap-5">
                    {b.car?.image ? (
                      <div className="relative w-28 h-20 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shrink-0">
                        <Image
                          src={b.car.image}
                          alt={b.car.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-neutral-800 flex items-center justify-center shrink-0">
                        <Car className="w-8 h-8 text-neutral-500" />
                      </div>
                    )}

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-400">
                          {b.bookingCode}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            b.status === "CONFIRMED"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : b.status === "ACTIVE"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : b.status === "COMPLETED"
                              ? "bg-neutral-800 text-neutral-400"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white">{b.car?.name || "Luxury Vehicle"}</h3>
                      <p className="text-xs text-neutral-400">
                        {new Date(b.startDate).toLocaleDateString()} — {new Date(b.endDate).toLocaleDateString()} ({b.totalDays} {b.totalDays === 1 ? "day" : "days"})
                      </p>
                    </div>
                  </div>

                  {/* Middle: Pickup & Delivery City */}
                  <div className="text-xs text-neutral-300 space-y-1 hidden lg:block">
                    <p className="flex items-center gap-1.5 text-neutral-400">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>Delivery Location:</span>
                    </p>
                    <p className="font-medium text-white truncate max-w-[200px]">{b.pickupLocation}</p>
                  </div>

                  {/* Right: Price & Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto justify-between border-t md:border-t-0 pt-4 md:pt-0 border-neutral-800">
                    <div className="text-left md:text-right">
                      <span className="text-xl font-black text-white">${b.totalAmount.toLocaleString()}</span>
                      <p className="text-[10px] text-neutral-500">Protection: {b.insuranceTier}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/booking/confirmation/${b.id}`}
                        className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
                      >
                        Itinerary
                      </Link>

                      {b.status === "CONFIRMED" && (
                        <button
                          onClick={() => handleCancelBooking(b.id)}
                          disabled={cancellingId === b.id}
                          className="px-3 py-2 rounded-xl bg-neutral-900 border border-red-500/30 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                        >
                          {cancellingId === b.id ? "Cancelling..." : "Cancel"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-3xl bg-neutral-900/30 border border-neutral-800 space-y-4 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
                <Car className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white">No reservations found</h3>
              <p className="text-xs text-neutral-400">
                You don&apos;t have any active or past reservations matching this filter.
              </p>
              <Link
                href="/fleet"
                className="inline-block px-5 py-2.5 rounded-xl bg-amber-400 text-neutral-950 text-xs font-bold hover:bg-amber-300 transition-colors"
              >
                Browse The Fleet
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
