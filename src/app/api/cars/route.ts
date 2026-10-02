import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const featured = searchParams.get("featured");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (category && category !== "All") {
      where.category = { equals: category };
    }

    if (brand && brand !== "All") {
      where.brand = { equals: brand };
    }

    if (featured === "true") {
      where.isFeatured = true;
    }

    if (minPrice || maxPrice) {
      where.pricePerDay = {};
      if (minPrice) where.pricePerDay.gte = parseFloat(minPrice);
      if (maxPrice) where.pricePerDay.lte = parseFloat(maxPrice);
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { brand: { contains: search } },
        { model: { contains: search } },
        { location: { contains: search } },
      ];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let orderBy: any = { createdAt: "desc" };

    if (sort === "price-low") {
      orderBy = { pricePerDay: "asc" };
    } else if (sort === "price-high") {
      orderBy = { pricePerDay: "desc" };
    } else if (sort === "power") {
      orderBy = { horsePower: "desc" };
    } else if (sort === "speed") {
      orderBy = { zeroToSixty: "asc" };
    } else if (sort === "rating") {
      orderBy = { rating: "desc" };
    }

    const cars = await prisma.car.findMany({
      where,
      orderBy,
      include: {
        reviews: {
          take: 3,
          orderBy: { date: "desc" },
        },
      },
    });

    return NextResponse.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json({ error: "Failed to fetch cars" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      brand,
      model,
      year,
      category,
      transmission,
      fuelType,
      seats,
      doors,
      horsePower,
      zeroToSixty,
      topSpeed,
      pricePerDay,
      deposit,
      location,
      image,
      images,
      features,
      description,
      mileageLimit,
      isFeatured,
    } = body;

    if (!name || !brand || !pricePerDay || !image) {
      return NextResponse.json(
        { error: "Name, brand, pricePerDay, and image are required" },
        { status: 400 }
      );
    }

    const newCar = await prisma.car.create({
      data: {
        name,
        brand,
        model: model || name,
        year: year ? parseInt(year) : 2024,
        category: category || "Supercar",
        transmission: transmission || "Automatic",
        fuelType: fuelType || "Gasoline",
        seats: seats ? parseInt(seats) : 2,
        doors: doors ? parseInt(doors) : 2,
        horsePower: horsePower ? parseInt(horsePower) : 500,
        zeroToSixty: zeroToSixty ? parseFloat(zeroToSixty) : 3.5,
        topSpeed: topSpeed ? parseInt(topSpeed) : 180,
        pricePerDay: parseFloat(pricePerDay),
        deposit: deposit ? parseFloat(deposit) : 1500,
        location: location || "Los Angeles, CA",
        image,
        images: images ? (typeof images === "string" ? images : JSON.stringify(images)) : JSON.stringify([image]),
        features: features ? (typeof features === "string" ? features : JSON.stringify(features)) : JSON.stringify(["Premium Sound", "Navigation", "Bluetooth"]),
        description: description || "Experience pure adrenaline and unparalleled luxury behind the wheel.",
        mileageLimit: mileageLimit ? parseInt(mileageLimit) : 150,
        isFeatured: Boolean(isFeatured),
        isAvailable: true,
      },
    });

    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    console.error("Error creating car:", error);
    return NextResponse.json({ error: "Failed to create car" }, { status: 500 });
  }
}
