import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [totalCars, availableCars, bookings, vipInquiries] = await Promise.all([
      prisma.car.count(),
      prisma.car.count({ where: { isAvailable: true } }),
      prisma.booking.findMany({
        include: { car: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.vipInquiry.findMany({
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const totalBookings = bookings.length;
    const activeBookings = bookings.filter((b) => b.status === "ACTIVE").length;
    const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED").length;

    // Calculate revenue (excluding cancelled)
    const validBookings = bookings.filter((b) => b.status !== "CANCELLED");
    const totalRevenue = validBookings.reduce((sum, b) => sum + b.totalAmount, 0);

    // Fleet utilization rate
    const rentedCars = totalCars - availableCars;
    const utilizationRate = totalCars > 0 ? Math.round((rentedCars / totalCars) * 100) : 0;

    // VIP metrics
    const totalVipInquiries = vipInquiries.length;
    const pendingVipInquiries = vipInquiries.filter((v) => v.status === "PENDING").length;

    return NextResponse.json({
      totalRevenue,
      totalCars,
      availableCars,
      rentedCars,
      utilizationRate,
      totalBookings,
      activeBookings,
      confirmedBookings,
      totalVipInquiries,
      pendingVipInquiries,
      recentBookings: bookings.slice(0, 8),
      recentVipInquiries: vipInquiries.slice(0, 5),
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
