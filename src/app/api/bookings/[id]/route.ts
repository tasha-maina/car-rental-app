import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Can find by ID or bookingCode
    const booking = await prisma.booking.findFirst({
      where: {
        OR: [
          { id },
          { bookingCode: id.toUpperCase() },
        ],
      },
      include: {
        car: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const booking = await prisma.booking.findFirst({
      where: {
        OR: [
          { id },
          { bookingCode: id.toUpperCase() },
        ],
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 });
    }

    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data: body,
      include: {
        car: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json({ error: "Failed to update reservation" }, { status: 500 });
  }
}
