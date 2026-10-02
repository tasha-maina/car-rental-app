"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Car, Booking, VipInquiry } from "@/types";
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
  AlertCircle,
  Plane,
  LayoutDashboard,
  ExternalLink,
  ChevronRight,
  Filter,
  Phone,
  Mail,
  MapPin,
  Users,
  Search,
  Check,
  Sparkles,
  Eye,
  Lock,
  KeyRound
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
  totalVipInquiries?: number;
  pendingVipInquiries?: number;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [activeTab, setActiveTab] = useState<"overview" | "fleet" | "bookings" | "vip">("overview");
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vipInquiries, setVipInquiries] = useState<VipInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("apex_admin_auth");
      if (stored === "true") {
        setIsAuthenticated(true);
      }
      setCheckingAuth(false);
    }
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "apex2026" || passcode.trim() === "admin") {
      sessionStorage.setItem("apex_admin_auth", "true");
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid access key. Please verify credentials.");
    }
  };

  // Search & Filter state
  const [fleetSearch, setFleetSearch] = useState("");
  const [fleetCategory, setFleetCategory] = useState("All");
  const [bookingFilterStatus, setBookingFilterStatus] = useState("ALL");
  const [vipFilterStatus, setVipFilterStatus] = useState("ALL");

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
      const [statsRes, carsRes, bookingsRes, vipRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/cars"),
        fetch("/api/bookings"),
        fetch("/api/vip-inquiries"),
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (carsRes.ok) setCars(await carsRes.json());
      if (bookingsRes.ok) setBookings(await bookingsRes.json());
      if (vipRes.ok) setVipInquiries(await vipRes.json());
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

  // Update VIP inquiry status
  const handleUpdateVipStatus = async (inquiryId: string, status: string) => {
    try {
      const res = await fetch(`/api/vip-inquiries/${inquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setVipInquiries((prev) => prev.map((v) => (v.id === inquiryId ? { ...v, status: status as any } : v)));
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete VIP inquiry
  const handleDeleteVipInquiry = async (inquiryId: string) => {
    if (!confirm("Are you sure you want to remove this VIP inquiry?")) return;
    try {
      const res = await fetch(`/api/vip-inquiries/${inquiryId}`, { method: "DELETE" });
      if (res.ok) {
        setVipInquiries((prev) => prev.filter((v) => v.id !== inquiryId));
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

  // Filtered cars
  const filteredCars = cars.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(fleetSearch.toLowerCase()) ||
      c.brand.toLowerCase().includes(fleetSearch.toLowerCase()) ||
      c.location.toLowerCase().includes(fleetSearch.toLowerCase());
    const matchCat = fleetCategory === "All" || c.category === fleetCategory;
    return matchSearch && matchCat;
  });

  // Filtered bookings
  const filteredBookings = bookings.filter((b) => {
    if (bookingFilterStatus === "ALL") return true;
    return b.status === bookingFilterStatus;
  });

  // Filtered VIP Inquiries
  const filteredVipInquiries = vipInquiries.filter((v) => {
    if (vipFilterStatus === "ALL") return true;
    return v.status === vipFilterStatus;
  });

  const pendingVipCount = vipInquiries.filter((v) => v.status === "PENDING").length;

  if (checkingAuth) {
    return <div className="min-h-screen bg-[#0a0a0c]" />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-neutral-100 flex items-center justify-center p-4 selection:bg-amber-400 selection:text-neutral-950 font-sans">
        <div className="w-full max-w-md bg-[#121217] border border-neutral-800 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 blur-[80px] pointer-events-none rounded-full" />
          
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-400/10">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                Restricted Operations Area
              </span>
              <h1 className="text-2xl font-black text-white uppercase tracking-tight mt-1">
                Apex Fleet Command
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                This portal is reserved for authorized fleet dispatch and concierge officers.
              </p>
            </div>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center">
                {authError}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">Admin Security Passcode</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Enter access key (e.g. apex2026)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20 cursor-pointer"
            >
              Authenticate &amp; Enter Console
            </button>

            <button
              type="button"
              onClick={() => {
                sessionStorage.setItem("apex_admin_auth", "true");
                setIsAuthenticated(true);
              }}
              className="w-full py-2.5 rounded-xl text-xs font-medium text-neutral-400 hover:text-amber-400 transition-colors border border-neutral-800 hover:border-neutral-700 bg-neutral-900/50"
            >
              Quick Unlock (Demo Passcode)
            </button>
          </form>

          <div className="pt-4 border-t border-neutral-800/80 text-center">
            <Link
              href="/"
              className="text-xs text-neutral-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              &larr; Return to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-neutral-100 flex flex-col md:flex-row antialiased selection:bg-amber-400 selection:text-neutral-950 font-sans">
      {/* ISOLATED ADMIN SIDEBAR */}
      <aside className="w-full md:w-72 bg-[#0e0e12] border-r border-neutral-800/80 flex flex-col justify-between shrink-0">
        <div className="p-6 space-y-8">
          {/* Logo & Ops Badge */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-neutral-950 font-black shadow-lg shadow-amber-500/20">
                <Shield className="w-5 h-5 text-neutral-950 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-base font-black tracking-wider uppercase text-white">APEX COMMAND</span>
                <p className="text-[10px] text-amber-400 font-mono tracking-widest uppercase">Fleet Operations</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEM ONLINE • DISPATCH READY</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 px-3 pb-1">
              Operations Console
            </p>

            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "overview"
                  ? "bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/10 font-bold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview Dashboard</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 ${activeTab === "overview" ? "text-neutral-950" : "text-neutral-600"}`} />
            </button>

            <button
              onClick={() => setActiveTab("fleet")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "fleet"
                  ? "bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/10 font-bold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <CarIcon className="w-4 h-4" />
                <span>Fleet Inventory</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === "fleet" ? "bg-neutral-950/20 text-neutral-950" : "bg-neutral-800 text-neutral-400"
              }`}>
                {cars.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("bookings")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "bookings"
                  ? "bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/10 font-bold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <CalendarCheck className="w-4 h-4" />
                <span>Reservations</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === "bookings" ? "bg-neutral-950/20 text-neutral-950" : "bg-neutral-800 text-neutral-400"
              }`}>
                {bookings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("vip")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "vip"
                  ? "bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/10 font-bold"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Plane className="w-4 h-4 rotate-45" />
                <span>VIP &amp; Chopper Charters</span>
              </div>
              {pendingVipCount > 0 ? (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500 text-neutral-950 animate-pulse">
                  {pendingVipCount} New
                </span>
              ) : (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === "vip" ? "bg-neutral-950/20 text-neutral-950" : "bg-neutral-800 text-neutral-400"
                }`}>
                  {vipInquiries.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Sidebar Footer: Back to Storefront */}
        <div className="p-6 border-t border-neutral-800/80 space-y-4">
          <Link
            href="/"
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white border border-neutral-800 transition-all group"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Exit to Storefront</span>
            </div>
            <span className="text-[10px] uppercase text-neutral-400">Client UI</span>
          </Link>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs font-bold text-amber-400">
                AD
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">Chief of Fleet Ops</p>
                <p className="text-[10px] text-neutral-400">Role: Super Admin</p>
              </div>
            </div>
            <button
              onClick={() => {
                sessionStorage.removeItem("apex_admin_auth");
                setIsAuthenticated(false);
              }}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-amber-400 hover:bg-neutral-800 transition-colors"
              title="Lock Console / Sign Out"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN ADMIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Operational Bar */}
        <header className="sticky top-0 z-30 bg-[#0e0e12]/90 backdrop-blur-xl border-b border-neutral-800/80 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <span>Admin Console</span>
              <ChevronRight className="w-3 h-3 text-neutral-600" />
              <span className="text-amber-400 font-semibold capitalize">{activeTab}</span>
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              {activeTab === "overview" && "Executive Fleet Operations Overview"}
              {activeTab === "fleet" && "Showroom Fleet Inventory & Status"}
              {activeTab === "bookings" && "Client Rental Reservations"}
              {activeTab === "vip" && "VIP Chopper & Bespoke Aviation Charters"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
              title="Refresh telemetry"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-amber-400" : ""}`} />
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Exotic Vehicle</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Executive KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-6 rounded-3xl bg-[#121217] border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-400 uppercase font-semibold">
                    <span>Gross Rental Revenue</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-3xl font-black text-white">
                    ${(stats?.totalRevenue || 0).toLocaleString()}
                  </p>
                  <p className="text-[11px] text-emerald-400 font-medium">All active &amp; completed bookings</p>
                </div>

                <div className="p-6 rounded-3xl bg-[#121217] border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-400 uppercase font-semibold">
                    <span>Fleet Size &amp; Status</span>
                    <CarIcon className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-3xl font-black text-white">
                    {stats?.totalCars || 0}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    <span className="text-emerald-400 font-semibold">{stats?.availableCars || 0} available</span> • {stats?.rentedCars || 0} deployed
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#121217] border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-400 uppercase font-semibold">
                    <span>Fleet Utilization</span>
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                  </div>
                  <p className="text-3xl font-black text-white">
                    {stats?.utilizationRate || 0}%
                  </p>
                  <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden mt-2">
                    <div
                      className="bg-blue-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${stats?.utilizationRate || 0}%` }}
                    />
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-[#121217] border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-400 uppercase font-semibold">
                    <span>VIP Aviation Requests</span>
                    <Plane className="w-4 h-4 text-amber-400 rotate-45" />
                  </div>
                  <p className="text-3xl font-black text-white">
                    {vipInquiries.length}
                  </p>
                  <p className="text-[11px] text-amber-400 font-medium">
                    {pendingVipCount} awaiting concierge confirmation
                  </p>
                </div>
              </div>

              {/* Quick Actions & Recent Activity Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Bookings preview */}
                <div className="p-6 rounded-3xl bg-[#121217] border border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4 text-amber-400" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Latest Reservations</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab("bookings")}
                      className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
                    >
                      View All ({bookings.length})
                    </button>
                  </div>

                  {bookings.length === 0 ? (
                    <p className="text-xs text-neutral-500 py-6 text-center">No reservations logged yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {bookings.slice(0, 4).map((b) => (
                        <div
                          key={b.id}
                          className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between gap-4"
                        >
                          <div>
                            <p className="text-xs font-bold text-white">{b.car?.name || "Exotic Vehicle"}</p>
                            <p className="text-[11px] text-neutral-400">
                              {b.customerName} • {new Date(b.startDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-amber-400">${b.totalAmount.toLocaleString()}</p>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              b.status === "CONFIRMED" ? "bg-emerald-500/10 text-emerald-400" :
                              b.status === "ACTIVE" ? "bg-blue-500/10 text-blue-400" :
                              b.status === "COMPLETED" ? "bg-neutral-800 text-neutral-400" : "bg-red-500/10 text-red-400"
                            }`}>
                              {b.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* VIP Charters Preview */}
                <div className="p-6 rounded-3xl bg-[#121217] border border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Plane className="w-4 h-4 text-amber-400 rotate-45" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">VIP Chopper &amp; Charters</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab("vip")}
                      className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
                    >
                      Manage Charters ({vipInquiries.length})
                    </button>
                  </div>

                  {vipInquiries.length === 0 ? (
                    <p className="text-xs text-neutral-500 py-6 text-center">No VIP inquiries submitted yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {vipInquiries.slice(0, 4).map((v) => (
                        <div
                          key={v.id}
                          className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between gap-4"
                        >
                          <div>
                            <p className="text-xs font-bold text-white">{v.serviceType}</p>
                            <p className="text-[11px] text-neutral-400">
                              {v.clientName} • {v.location.split("(")[0]}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                              v.status === "PENDING" ? "bg-amber-400/20 text-amber-400 border border-amber-400/30" :
                              v.status === "CONTACTED" ? "bg-blue-500/10 text-blue-400" :
                              v.status === "CONFIRMED" ? "bg-emerald-500/10 text-emerald-400" : "bg-neutral-800 text-neutral-400"
                            }`}>
                              {v.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FLEET MANAGEMENT */}
          {activeTab === "fleet" && (
            <div className="space-y-6">
              {/* Filter and Search Bar */}
              <div className="p-4 rounded-2xl bg-[#121217] border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by car, brand, location..."
                    value={fleetSearch}
                    onChange={(e) => setFleetSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {["All", "Supercar", "Exotic SUV", "Luxury Sedan", "Electric Hyper"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFleetCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        fleetCategory === cat
                          ? "bg-amber-400 text-neutral-950 font-bold"
                          : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <div
                    key={car.id}
                    className="rounded-3xl bg-[#121217] border border-neutral-800 overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition-all shadow-lg"
                  >
                    <div>
                      {/* Car Image with Badge */}
                      <div className="relative aspect-[16/10] w-full bg-neutral-950">
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          sizes="350px"
                          className="object-cover"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-900/90 text-amber-400 border border-amber-400/20">
                            {car.category}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <button
                            onClick={() => handleToggleAvailability(car.id, car.isAvailable)}
                            className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full cursor-pointer transition-all ${
                              car.isAvailable
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                                : "bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30"
                            }`}
                          >
                            {car.isAvailable ? "● Live / Available" : "● Reserved / Deployed"}
                          </button>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-6 space-y-4">
                        <div>
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-white">{car.name}</h3>
                            <span className="text-xs font-bold text-amber-400">${car.pricePerDay}/day</span>
                          </div>
                          <p className="text-xs text-neutral-400">{car.brand} • {car.year} • {car.location}</p>
                        </div>

                        {/* Specs Pill */}
                        <div className="grid grid-cols-3 gap-2 py-2 border-y border-neutral-800/80 text-[11px] text-neutral-300">
                          <div>
                            <span className="text-neutral-500 block text-[9px] uppercase">Power</span>
                            <span className="font-semibold">{car.horsePower} HP</span>
                          </div>
                          <div>
                            <span className="text-neutral-500 block text-[9px] uppercase">0-60 MPH</span>
                            <span className="font-semibold">{car.zeroToSixty}s</span>
                          </div>
                          <div>
                            <span className="text-neutral-500 block text-[9px] uppercase">Top Speed</span>
                            <span className="font-semibold">{car.topSpeed} MPH</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-neutral-800/80 pt-4">
                      <Link
                        href={`/cars/${car.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Listing</span>
                      </Link>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleAvailability(car.id, car.isAvailable)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-neutral-200"
                        >
                          Toggle Status
                        </button>
                        <button
                          onClick={() => handleDeleteCar(car.id, car.name)}
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete car"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BOOKINGS MANAGEMENT */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              {/* Filter */}
              <div className="p-4 rounded-2xl bg-[#121217] border border-neutral-800 flex items-center justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Filter By Status:</span>
                <div className="flex flex-wrap items-center gap-2">
                  {["ALL", "CONFIRMED", "ACTIVE", "COMPLETED", "CANCELLED"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setBookingFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        bookingFilterStatus === st
                          ? "bg-amber-400 text-neutral-950 font-bold"
                          : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bookings Table */}
              <div className="rounded-3xl bg-[#121217] border border-neutral-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-900/80 border-b border-neutral-800 text-neutral-400 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-4 px-6">Booking Code</th>
                        <th className="py-4 px-6">Client &amp; Contact</th>
                        <th className="py-4 px-6">Vehicle</th>
                        <th className="py-4 px-6">Rental Dates</th>
                        <th className="py-4 px-6">Financials</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/80">
                      {filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-neutral-900/30 transition-colors">
                          <td className="py-4 px-6 font-mono font-bold text-amber-400">
                            {b.bookingCode}
                          </td>
                          <td className="py-4 px-6 space-y-0.5">
                            <p className="font-bold text-white">{b.customerName}</p>
                            <p className="text-[11px] text-neutral-400">{b.customerEmail}</p>
                            <p className="text-[11px] text-neutral-400">{b.customerPhone}</p>
                          </td>
                          <td className="py-4 px-6 font-semibold text-white">
                            {b.car?.name || "Vehicle"}
                          </td>
                          <td className="py-4 px-6 space-y-0.5">
                            <p className="text-white">
                              {new Date(b.startDate).toLocaleDateString()} &rarr; {new Date(b.endDate).toLocaleDateString()}
                            </p>
                            <p className="text-[11px] text-neutral-400">{b.totalDays} Days</p>
                          </td>
                          <td className="py-4 px-6 space-y-0.5">
                            <p className="font-bold text-white">${b.totalAmount.toLocaleString()}</p>
                            <p className="text-[10px] text-neutral-400">Deposit: ${b.depositAmount}</p>
                            <span className="inline-block mt-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-amber-400">
                              {b.paymentMethod === "CARD" && "💳 Card (Stripe)"}
                              {b.paymentMethod === "APPLE_PAY" && " Apple Pay"}
                              {b.paymentMethod === "CRYPTO" && "🪙 Crypto (USDT)"}
                              {b.paymentMethod === "WIRE_TRANSFER" && "🏦 Wire Transfer"}
                              {!["CARD", "APPLE_PAY", "CRYPTO", "WIRE_TRANSFER"].includes(b.paymentMethod) && b.paymentMethod}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                              b.status === "CONFIRMED" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                              b.status === "ACTIVE" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                              b.status === "COMPLETED" ? "bg-neutral-800 text-neutral-300" : "bg-red-500/10 text-red-400 border border-red-500/20"
                            }`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right space-x-1.5 whitespace-nowrap">
                            {b.status !== "ACTIVE" && b.status !== "COMPLETED" && (
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, "ACTIVE")}
                                className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 text-[10px] font-bold"
                              >
                                Mark Active
                              </button>
                            )}
                            {b.status === "ACTIVE" && (
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, "COMPLETED")}
                                className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-[10px] font-bold"
                              >
                                Complete
                              </button>
                            )}
                            {b.status !== "CANCELLED" && (
                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, "CANCELLED")}
                                className="px-2 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 text-[10px] font-bold"
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: VIP AVIATION & CHOPPER CHARTERS */}
          {activeTab === "vip" && (
            <div className="space-y-6">
              {/* Filter */}
              <div className="p-4 rounded-2xl bg-[#121217] border border-neutral-800 flex items-center justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Filter VIP Status:</span>
                <div className="flex flex-wrap items-center gap-2">
                  {["ALL", "PENDING", "CONTACTED", "CONFIRMED", "COMPLETED", "CANCELLED"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setVipFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        vipFilterStatus === st
                          ? "bg-amber-400 text-neutral-950 font-bold"
                          : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* VIP Table */}
              <div className="rounded-3xl bg-[#121217] border border-neutral-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-900/80 border-b border-neutral-800 text-neutral-400 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-4 px-6">Service Type</th>
                        <th className="py-4 px-6">VIP Client</th>
                        <th className="py-4 px-6">Flight / Landing Corridors</th>
                        <th className="py-4 px-6">Scheduled Date</th>
                        <th className="py-4 px-6">Vehicle Pairing</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/80">
                      {filteredVipInquiries.map((v) => (
                        <tr key={v.id} className="hover:bg-neutral-900/30 transition-colors">
                          <td className="py-4 px-6 space-y-1">
                            <div className="flex items-center gap-2">
                              <Plane className="w-3.5 h-3.5 text-amber-400 rotate-45" />
                              <span className="font-bold text-white">{v.serviceType}</span>
                            </div>
                            {v.notes && (
                              <p className="text-[11px] text-neutral-400 italic max-w-xs truncate" title={v.notes}>
                                “{v.notes}”
                              </p>
                            )}
                          </td>
                          <td className="py-4 px-6 space-y-0.5">
                            <p className="font-bold text-white">{v.clientName}</p>
                            <p className="text-[11px] text-neutral-400">{v.clientEmail}</p>
                            <p className="text-[11px] text-neutral-400">{v.clientPhone}</p>
                          </td>
                          <td className="py-4 px-6 space-y-0.5">
                            <p className="text-white font-medium">{v.location}</p>
                            {v.destination && (
                              <p className="text-[11px] text-amber-400/80">&rarr; {v.destination}</p>
                            )}
                            <p className="text-[10px] text-neutral-400">{v.passengers} Passenger(s)</p>
                          </td>
                          <td className="py-4 px-6 text-white font-medium">
                            {new Date(v.scheduledDate).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-6 text-amber-400 font-semibold">
                            {v.vehiclePairing || "None (Aviation Only)"}
                          </td>
                          <td className="py-4 px-6">
                            <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                              v.status === "PENDING" ? "bg-amber-400/20 text-amber-400 border border-amber-400/30" :
                              v.status === "CONTACTED" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                              v.status === "CONFIRMED" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                              "bg-neutral-800 text-neutral-400"
                            }`}>
                              {v.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right space-x-1.5 whitespace-nowrap">
                            {v.status === "PENDING" && (
                              <button
                                onClick={() => handleUpdateVipStatus(v.id, "CONTACTED")}
                                className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 text-[10px] font-bold"
                              >
                                Contacted
                              </button>
                            )}
                            {v.status !== "CONFIRMED" && (
                              <button
                                onClick={() => handleUpdateVipStatus(v.id, "CONFIRMED")}
                                className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-[10px] font-bold"
                              >
                                Confirm
                              </button>
                            )}
                            {v.status !== "COMPLETED" && (
                              <button
                                onClick={() => handleUpdateVipStatus(v.id, "COMPLETED")}
                                className="px-2 py-1 rounded bg-neutral-800 text-neutral-300 hover:bg-neutral-700 text-[10px] font-bold"
                              >
                                Complete
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteVipInquiry(v.id)}
                              className="p-1 rounded text-neutral-500 hover:text-red-400 inline-block align-middle"
                              title="Delete inquiry"
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
            </div>
          )}
        </div>
      </main>

      {/* ADD CAR MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121217] border border-neutral-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white uppercase">Add New Fleet Exotic</h3>
                <p className="text-xs text-neutral-400">Deploy a new high-performance vehicle into the active showroom catalog.</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCarSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Vehicle Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ferrari 296 GTB"
                    value={newCarName}
                    onChange={(e) => setNewCarName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Brand</label>
                  <select
                    value={newCarBrand}
                    onChange={(e) => setNewCarBrand(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Ferrari">Ferrari</option>
                    <option value="Porsche">Porsche</option>
                    <option value="Lamborghini">Lamborghini</option>
                    <option value="Rolls-Royce">Rolls-Royce</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Aston Martin">Aston Martin</option>
                    <option value="McLaren">McLaren</option>
                    <option value="Tesla">Tesla</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Category</label>
                  <select
                    value={newCarCategory}
                    onChange={(e) => setNewCarCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Supercar">Supercar</option>
                    <option value="Exotic SUV">Exotic SUV</option>
                    <option value="Luxury Sedan">Luxury Sedan</option>
                    <option value="Electric Hyper">Electric Hyper</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Daily Rate ($)</label>
                  <input
                    type="number"
                    required
                    value={newCarPrice}
                    onChange={(e) => setNewCarPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Horsepower</label>
                  <input
                    type="number"
                    required
                    value={newCarHp}
                    onChange={(e) => setNewCarHp(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">0-60 MPH (Seconds)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newCarSpeed}
                    onChange={(e) => setNewCarSpeed(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Location Base</label>
                  <input
                    type="text"
                    required
                    value={newCarLocation}
                    onChange={(e) => setNewCarLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Image URL (Unsplash or CDN)</label>
                <input
                  type="url"
                  required
                  value={newCarImage}
                  onChange={(e) => setNewCarImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Vehicle Description</label>
                <textarea
                  rows={3}
                  value={newCarDesc}
                  onChange={(e) => setNewCarDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingCar}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20 disabled:opacity-50"
                >
                  {savingCar ? "Saving Vehicle..." : "Deploy to Showroom"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
