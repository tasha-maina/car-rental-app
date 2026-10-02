import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const car = await prisma.car.findUnique({
      where: { id },
      include: {
        reviews: {
          orderBy: { date: "desc" },
        },
      },
    });

    if (!car) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    return NextResponse.json(car);
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return NextResponse.json({ error: "Failed to fetch vehicle" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedCar = await prisma.car.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedCar);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return NextResponse.json({ error: "Failed to update vehicle" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.car.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return NextResponse.json({ error: "Failed to delete vehicle" }, { status: 500 });
  }
}
