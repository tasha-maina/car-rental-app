import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const code = searchParams.get("code");
    const status = searchParams.get("status");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (email) {
      where.customerEmail = { equals: email.trim().toLowerCase() };
    }

    if (code) {
      where.bookingCode = { equals: code.trim().toUpperCase() };
    }

    if (status && status !== "ALL") {
      where.status = { equals: status };
    }

    const bookings = await prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        car: true,
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      carId,
      customerName,
      customerEmail,
      customerPhone,
      driverLicense,
      startDate,
      endDate,
      pickupLocation,
      dropoffLocation,
      insuranceTier = "Standard",
      insuranceAmount = 0,
      addOns = [],
      addOnsAmount = 0,
      paymentMethod = "CARD",
    } = body;

    if (!carId || !customerName || !customerEmail || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Missing required booking details" },
        { status: 400 }
      );
    }

    // Verify car exists
    const car = await prisma.car.findUnique({
      where: { id: carId },
    });

    if (!car) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    const rentalAmount = car.pricePerDay * totalDays;
    const totalAmount = rentalAmount + Number(insuranceAmount) + Number(addOnsAmount);

    // Generate random luxury booking code e.g. APX-93821
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const bookingCode = `APX-${randomNum}`;

    const newBooking = await prisma.booking.create({
      data: {
        carId: car.id,
        customerName,
        customerEmail: customerEmail.trim().toLowerCase(),
        customerPhone: customerPhone || "",
        driverLicense: driverLicense || "DL-PENDING",
        startDate: start,
        endDate: end,
        pickupLocation: pickupLocation || car.location,
        dropoffLocation: dropoffLocation || car.location,
        totalDays,
        pricePerDay: car.pricePerDay,
        rentalAmount,
        insuranceTier,
        insuranceAmount: Number(insuranceAmount),
        depositAmount: car.deposit,
        addOns: typeof addOns === "string" ? addOns : JSON.stringify(addOns),
        addOnsAmount: Number(addOnsAmount),
        totalAmount,
        status: "CONFIRMED",
        bookingCode,
        paymentMethod,
      },
      include: {
        car: true,
      },
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 });
  }
}
