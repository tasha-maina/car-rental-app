"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Car, Booking } from "@/types";
import {
  DollarSign,
  Car as CarIcon,
  TrendingUp,
  CalendarCheck,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Shield,
  RefreshCw,
  X,
  AlertCircle
} from "lucide-react";

interface AdminStats {
  totalRevenue: number;
  totalCars: number;
  availableCars: number;
  rentedCars: number;
  utilizationRate: number;
  totalBookings: number;
  activeBookings: number;
  confirmedBookings: number;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"fleet" | "bookings">("fleet");
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Add Car Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [savingCar, setSavingCar] = useState(false);
  const [newCarName, setNewCarName] = useState("");
  const [newCarBrand, setNewCarBrand] = useState("Porsche");
  const [newCarCategory, setNewCarCategory] = useState("Supercar");
  const [newCarPrice, setNewCarPrice] = useState("750");
  const [newCarHp, setNewCarHp] = useState("600");
  const [newCarSpeed, setNewCarSpeed] = useState("3.1");
  const [newCarLocation, setNewCarLocation] = useState("Los Angeles, CA");
  const [newCarImage, setNewCarImage] = useState("https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80");
  const [newCarDesc, setNewCarDesc] = useState("Bespoke luxury performance vehicle with flawless acceleration and immaculate cockpit design.");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, carsRes, bookingsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/cars"),
        fetch("/api/bookings"),
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (carsRes.ok) setCars(await carsRes.json());
      if (bookingsRes.ok) setBookings(await bookingsRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Toggle car availability
  const handleToggleAvailability = async (carId: string, current: boolean) => {
    try {
      const res = await fetch(`/api/cars/${carId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !current }),
      });
      if (res.ok) {
        setCars((prev) =>
          prev.map((c) => (c.id === carId ? { ...c, isAvailable: !current } : c))
        );
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete car
  const handleDeleteCar = async (carId: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently remove "${name}" from the fleet?`)) return;

    try {
      const res = await fetch(`/api/cars/${carId}`, { method: "DELETE" });
      if (res.ok) {
        setCars((prev) => prev.filter((c) => c.id !== carId));
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update booking status
  const handleUpdateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: status as any } : b)));
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add new vehicle
  const handleAddCarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCar(true);

    try {
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCarName,
          brand: newCarBrand,
          model: newCarName,
          year: 2024,
          category: newCarCategory,
          transmission: "Automatic / Paddle",
          fuelType: newCarCategory === "Electric Hyper" ? "Electric" : "Premium Gasoline",
          seats: 2,
          doors: 2,
          horsePower: Number(newCarHp),
          zeroToSixty: Number(newCarSpeed),
          topSpeed: 190,
          pricePerDay: Number(newCarPrice),
          deposit: 1500,
          location: newCarLocation,
          image: newCarImage,
          images: [newCarImage],
          features: ["Launch Control", "Sport Exhaust", "CarPlay", "Surround Sound"],
          description: newCarDesc,
          isFeatured: true,
        }),
      });

      if (res.ok) {
        const created = await res.json();
        setCars((prev) => [created, ...prev]);
        setShowAddModal(false);
        setNewCarName("");
        fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingCar(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-400 selection:text-neutral-950">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Admin Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800/80 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                <Shield className="w-3.5 h-3.5" />
                <span>Executive Operations</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Fleet Management & Dispatch Portal
              </h1>
              <p className="text-xs text-neutral-400">
                Live vehicle telemetry, availability toggles, reservation tracking, and fleet expansion.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchData}
                className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
                title="Refresh stats"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </button>

              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Fleet Vehicle</span>
              </button>
            </div>
          </div>

          {/* Operational Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400 uppercase font-semibold">
                <span>Gross Rental Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-3xl font-black text-white">
                ${(stats?.totalRevenue || 0).toLocaleString()}
              </p>
              <p className="text-[11px] text-emerald-400 font-medium">All active & completed bookings</p>
            </div>

            <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400 uppercase font-semibold">
                <span>Fleet Count</span>
                <CarIcon className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-3xl font-black text-white">
                {stats?.totalCars || 0}
              </p>
              <p className="text-[11px] text-neutral-400">
                <span className="text-emerald-400 font-semibold">{stats?.availableCars || 0} available</span> • {stats?.rentedCars || 0} deployed
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400 uppercase font-semibold">
                <span>Fleet Utilization</span>
                <TrendingUp className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-3xl font-black text-white">
                {stats?.utilizationRate || 0}%
              </p>
              <p className="text-[11px] text-neutral-400">Based on active reservations</p>
            </div>

            <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400 uppercase font-semibold">
                <span>Total Bookings</span>
                <CalendarCheck className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-3xl font-black text-white">
                {stats?.totalBookings || 0}
              </p>
              <p className="text-[11px] text-amber-400">
                {stats?.confirmedBookings || 0} pending departure
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Fleet vs Bookings) */}
          <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
            <button
              onClick={() => setActiveTab("fleet")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "fleet"
                  ? "bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
            >
              Fleet Management ({cars.length})
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "bookings"
                  ? "bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
            >
              Reservations & Clients ({bookings.length})
            </button>
          </div>

          {/* TAB 1: FLEET MANAGEMENT */}
          {activeTab === "fleet" && (
            <div className="rounded-3xl bg-neutral-900/60 border border-neutral-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead className="bg-neutral-950/80 uppercase text-[10px] tracking-wider text-neutral-400 border-b border-neutral-800 font-semibold">
                    <tr>
                      <th className="py-4 px-6">Vehicle</th>
                      <th className="py-4 px-4">Category</th>
                      <th className="py-4 px-4">Performance</th>
                      <th className="py-4 px-4">Daily Rate</th>
                      <th className="py-4 px-4">Location</th>
                      <th className="py-4 px-4">Availability</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60">
                    {cars.map((car) => (
                      <tr key={car.id} className="hover:bg-neutral-900/40 transition-colors">
                        <td className="py-4 px-6 flex items-center gap-3">
                          <div className="relative w-16 h-11 rounded-lg overflow-hidden bg-neutral-950 shrink-0 border border-neutral-800">
                            <Image
                              src={car.image}
                              alt={car.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">{car.name}</p>
                            <p className="text-[10px] text-neutral-400">{car.brand} • {car.year}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-[10px] font-semibold text-amber-400">
                            {car.category}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-white">{car.horsePower} HP</span> • {car.zeroToSixty}s 0-60
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-black text-amber-400 text-sm">${car.pricePerDay}</span> / day
                        </td>
                        <td className="py-4 px-4 text-neutral-400 truncate max-w-[150px]">
                          {car.location}
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleToggleAvailability(car.id, car.isAvailable)}
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all cursor-pointer ${
                              car.isAvailable
                                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                                : "bg-neutral-800 border border-neutral-700 text-neutral-400 hover:bg-neutral-700"
                            }`}
                          >
                            {car.isAvailable ? "Available" : "Maintenance / Reserved"}
                          </button>
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <Link
                            href={`/cars/${car.id}`}
                            className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-[11px] inline-block transition-colors"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleDeleteCar(car.id, car.name)}
                            className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-red-500/40 text-neutral-400 hover:text-red-400 transition-colors"
                            title="Delete Vehicle"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKINGS MANAGEMENT */}
          {activeTab === "bookings" && (
            <div className="rounded-3xl bg-neutral-900/60 border border-neutral-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-300">
                  <thead className="bg-neutral-950/80 uppercase text-[10px] tracking-wider text-neutral-400 border-b border-neutral-800 font-semibold">
                    <tr>
                      <th className="py-4 px-6">Booking Code</th>
                      <th className="py-4 px-4">Customer</th>
                      <th className="py-4 px-4">Vehicle</th>
                      <th className="py-4 px-4">Rental Window</th>
                      <th className="py-4 px-4">Total Amount</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-neutral-900/40 transition-colors">
                        <td className="py-4 px-6 font-mono font-bold text-amber-400">
                          {b.bookingCode}
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-white">{b.customerName}</p>
                          <p className="text-[10px] text-neutral-400">{b.customerEmail}</p>
                          <p className="text-[10px] text-neutral-500">{b.customerPhone}</p>
                        </td>
                        <td className="py-4 px-4 font-semibold text-white">
                          {b.car?.name || "Vehicle"}
                        </td>
                        <td className="py-4 px-4 text-neutral-300">
                          <p>{new Date(b.startDate).toLocaleDateString()} - {new Date(b.endDate).toLocaleDateString()}</p>
                          <span className="text-[10px] text-amber-400 font-semibold">{b.totalDays} Days</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-black text-white text-sm">${b.totalAmount.toLocaleString()}</span>
                          <p className="text-[10px] text-neutral-500">{b.paymentMethod}</p>
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={b.status}
                            onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                            className="bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                          >
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <Link
                            href={`/booking/confirmation/${b.id}`}
                            className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-[11px] inline-block transition-colors"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ADD VEHICLE MODAL */}
          {showAddModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
              <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 max-w-2xl w-full space-y-6 my-8 shadow-2xl">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <h3 className="text-lg font-black text-white uppercase tracking-wider">
                    Add New Exotic Vehicle
                  </h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-1 rounded-lg text-neutral-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddCarSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-neutral-300 font-semibold block">Vehicle Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. McLaren Artura Spider"
                        value={newCarName}
                        onChange={(e) => setNewCarName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-neutral-300 font-semibold block">Brand *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. McLaren"
                        value={newCarBrand}
                        onChange={(e) => setNewCarBrand(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-neutral-300 font-semibold block">Category</label>
                      <select
                        value={newCarCategory}
                        onChange={(e) => setNewCarCategory(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="Supercar">Supercar</option>
                        <option value="Exotic SUV">Exotic SUV</option>
                        <option value="Luxury Sedan">Luxury Sedan</option>
                        <option value="Electric Hyper">Electric Hyper</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-neutral-300 font-semibold block">Daily Rate ($/day) *</label>
                      <input
                        type="number"
                        required
                        value={newCarPrice}
                        onChange={(e) => setNewCarPrice(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-neutral-300 font-semibold block">Horsepower (HP)</label>
                      <input
                        type="number"
                        value={newCarHp}
                        onChange={(e) => setNewCarHp(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-neutral-300 font-semibold block">0-60 MPH (Seconds)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={newCarSpeed}
                        onChange={(e) => setNewCarSpeed(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold block">Delivery City / Base Location</label>
                    <input
                      type="text"
                      value={newCarLocation}
                      onChange={(e) => setNewCarLocation(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold block">Primary Photo URL</label>
                    <input
                      type="url"
                      required
                      value={newCarImage}
                      onChange={(e) => setNewCarImage(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-300 font-semibold block">Description</label>
                    <textarea
                      rows={3}
                      value={newCarDesc}
                      onChange={(e) => setNewCarDesc(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingCar}
                      className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold disabled:opacity-50"
                    >
                      {savingCar ? "Adding..." : "Add to Live Fleet"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
