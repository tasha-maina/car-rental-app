import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const serviceType = searchParams.get("serviceType");
    const search = searchParams.get("search");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (status && status !== "ALL") {
      where.status = { equals: status };
    }

    if (serviceType && serviceType !== "ALL") {
      where.serviceType = { contains: serviceType };
    }

    if (search) {
      where.OR = [
        { clientName: { contains: search } },
        { clientEmail: { contains: search } },
        { location: { contains: search } },
        { destination: { contains: search } },
        { vehiclePairing: { contains: search } },
      ];
    }

    const inquiries = await prisma.vipInquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("Error fetching VIP inquiries:", error);
    return NextResponse.json({ error: "Failed to fetch VIP inquiries" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      serviceType,
      clientName,
      clientEmail,
      clientPhone,
      location,
      destination,
      scheduledDate,
      passengers = 1,
      vehiclePairing,
      notes,
      estimatedCost,
    } = body;

    if (!serviceType || !clientName || !clientEmail || !clientPhone || !location) {
      return NextResponse.json(
        { error: "Missing required fields (serviceType, clientName, clientEmail, clientPhone, location)" },
        { status: 400 }
      );
    }

    const inquiry = await prisma.vipInquiry.create({
      data: {
        serviceType,
        clientName,
        clientEmail: clientEmail.trim().toLowerCase(),
        clientPhone,
        location,
        destination: destination || null,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : new Date(),
        passengers: Number(passengers) || 1,
        vehiclePairing: vehiclePairing || null,
        notes: notes || null,
        status: "PENDING",
        estimatedCost: estimatedCost ? Number(estimatedCost) : null,
      },
    });

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error("Error creating VIP inquiry:", error);
    return NextResponse.json({ error: "Failed to submit VIP inquiry" }, { status: 500 });
  }
}
