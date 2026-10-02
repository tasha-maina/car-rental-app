import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleCars = [
  {
    name: "Porsche 911 GT3 RS",
    brand: "Porsche",
    model: "911 GT3 RS",
    year: 2024,
    category: "Supercar",
    transmission: "Automatic (7-Speed PDK)",
    fuelType: "Premium Gasoline",
    seats: 2,
    doors: 2,
    horsePower: 518,
    zeroToSixty: 3.0,
    topSpeed: 184,
    pricePerDay: 850,
    deposit: 2000,
    rating: 4.98,
    reviewsCount: 42,
    location: "Los Angeles, CA (Beverly Hills)",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"
    ]),
    features: JSON.stringify([
      "Weissach Package Carbon Fiber",
      "Active Aerodynamic DRS Wing",
      "Bose Surround Sound System",
      "PCCB Carbon Ceramic Brakes",
      "Apple CarPlay & Navigation",
      "Track Telemetry App",
      "Full Bucket Race Seats"
    ]),
    description: "The pinnacle of track engineering made street-legal. The naturally aspirated 4.0L flat-six shrieks up to 9,000 RPM while active DRS aerodynamics glue you to the tarmac along Pacific Coast Highway.",
    isAvailable: true,
    isFeatured: true,
    mileageLimit: 150,
  },
  {
    name: "Ferrari F8 Tributo",
    brand: "Ferrari",
    model: "F8 Tributo",
    year: 2023,
    category: "Supercar",
    transmission: "7-Speed Dual-Clutch",
    fuelType: "Premium Gasoline",
    seats: 2,
    doors: 2,
    horsePower: 710,
    zeroToSixty: 2.9,
    topSpeed: 211,
    pricePerDay: 1250,
    deposit: 3000,
    rating: 5.0,
    reviewsCount: 38,
    location: "Miami, FL (South Beach)",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80"
    ]),
    features: JSON.stringify([
      "Scuderia Ferrari Carbon Shields",
      "Twin-Turbo V8 Engine",
      "Side Slip Angle Control 6.1",
      "JBL Premium Audio",
      "Rosso Corsa Paint",
      "Titanium Exhaust System"
    ]),
    description: "A celebration of Ferrari's greatest mid-rear-engined V8 in history. Zero turbo lag, blinding acceleration, and unmatched Italian design ready for cruising Ocean Drive or tearing up open coastal corridors.",
    isAvailable: true,
    isFeatured: true,
    mileageLimit: 125,
  },
  {
    name: "Lamborghini Huracán EVO Spyder",
    brand: "Lamborghini",
    model: "Huracán EVO Spyder",
    year: 2024,
    category: "Supercar",
    transmission: "7-Speed Dual Clutch",
    fuelType: "Premium Gasoline",
    seats: 2,
    doors: 2,
    horsePower: 631,
    zeroToSixty: 3.1,
    topSpeed: 202,
    pricePerDay: 1100,
    deposit: 2500,
    rating: 4.95,
    reviewsCount: 51,
    location: "Las Vegas, NV (The Strip)",
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80"
    ]),
    features: JSON.stringify([
      "Retractable Power Soft-Top",
      "Naturally Aspirated 5.2L V10",
      "LDVI Vehicle Dynamics",
      "Sensonum Luxury Sound",
      "Front Axle Lift System",
      "Sport Sportivo Leather"
    ]),
    description: "Open-top exhilaration powered by the soul-stirring roar of an Italian V10. Complete with all-wheel steering, torque vectoring, and unmistakable stealth-fighter angular styling.",
    isAvailable: true,
    isFeatured: true,
    mileageLimit: 150,
  },
  {
    name: "Mercedes-AMG G 63",
    brand: "Mercedes-Benz",
    model: "G 63 AMG",
    year: 2024,
    category: "Exotic SUV",
    transmission: "9-Speed AMG SPEEDSHIFT",
    fuelType: "Premium Gasoline",
    seats: 5,
    doors: 5,
    horsePower: 577,
    zeroToSixty: 4.5,
    topSpeed: 149,
    pricePerDay: 650,
    deposit: 1500,
    rating: 4.96,
    reviewsCount: 64,
    location: "Los Angeles, CA (Beverly Hills)",
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80"
    ]),
    features: JSON.stringify([
      "Handcrafted AMG 4.0L V8 Biturbo",
      "Burmester 3D Surround Sound",
      "AMG Performance Side-Pipes",
      "Exclusive Nappa Leather Interior",
      "Triple Locking Differentials",
      "Panoramic Heated Seats & Massage"
    ]),
    description: "The indisputable king of luxury SUVs. Unmatched road presence, iconic rumble from the twin side-exit exhausts, and ultra-plush cabin luxury for VIP transportation or weekend escapades.",
    isAvailable: true,
    isFeatured: true,
    mileageLimit: 175,
  },
  {
    name: "Lamborghini Urus Performante",
    brand: "Lamborghini",
    model: "Urus Performante",
    year: 2024,
    category: "Exotic SUV",
    transmission: "8-Speed Automatic",
    fuelType: "Premium Gasoline",
    seats: 5,
    doors: 5,
    horsePower: 657,
    zeroToSixty: 3.1,
    topSpeed: 190,
    pricePerDay: 1050,
    deposit: 2500,
    rating: 4.97,
    reviewsCount: 29,
    location: "Miami, FL (Brickell)",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
    ]),
    features: JSON.stringify([
      "Carbon Fiber Hood & Aero Wing",
      "Akrapovič Titanium Exhaust",
      "RALLY Driving Mode",
      "Bang & Olufsen 3D Sound",
      "Alcantara Sport Seats"
    ]),
    description: "Supercar speed in an aggressive SUV stance. The Urus Performante shatters physics with 657 horsepower, titanium exhaust symphony, and supercar agility tailored for five passengers.",
    isAvailable: true,
    isFeatured: false,
    mileageLimit: 150,
  },
  {
    name: "Rolls-Royce Ghost Extended",
    brand: "Rolls-Royce",
    model: "Ghost Extended",
    year: 2024,
    category: "Luxury Sedan",
    transmission: "8-Speed Satellite Aided",
    fuelType: "Premium Gasoline",
    seats: 4,
    doors: 4,
    horsePower: 563,
    zeroToSixty: 4.6,
    topSpeed: 155,
    pricePerDay: 1400,
    deposit: 3500,
    rating: 5.0,
    reviewsCount: 22,
    location: "New York, NY (Manhattan)",
    image: "https://images.unsplash.com/photo-1631295868223-63265840d001?auto=format&fit=crop&w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1631295868223-63265840d001?auto=format&fit=crop&w=1200&q=80"
    ]),
    features: JSON.stringify([
      "Starlight Headliner with Shooting Stars",
      "Effortless Power Doors",
      "Bespoke Audio System",
      "Rear Champagne Cooler & Flutes",
      "Planar Magic Carpet Ride Suspension",
      "Lambswool Footmats"
    ]),
    description: "The pinnacle of ultra-luxury motoring. Whisper-quiet twin-turbo V12 power, hand-stitched bespoke leather, starry celestial roof, and the world-renowned 'Magic Carpet Ride'.",
    isAvailable: true,
    isFeatured: true,
    mileageLimit: 120,
  },
  {
    name: "Porsche Taycan Turbo S",
    brand: "Porsche",
    model: "Taycan Turbo S",
    year: 2024,
    category: "Electric Hyper",
    transmission: "2-Speed Rear / 1-Speed Front",
    fuelType: "Electric",
    seats: 4,
    doors: 4,
    horsePower: 750,
    zeroToSixty: 2.6,
    topSpeed: 161,
    pricePerDay: 580,
    deposit: 1500,
    rating: 4.94,
    reviewsCount: 35,
    location: "San Francisco, CA (Silicon Valley)",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"
    ]),
    features: JSON.stringify([
      "Overboost Power Launch Control",
      "800-Volt Architecture Fast Charge",
      "Burmester High-End 3D Surround",
      "Porsche Dynamic Chassis Control Sport",
      "Passenger Display Screen",
      "Zero Emissions Pure Electric"
    ]),
    description: "Electrifying performance without compromise. Hits 60 mph in 2.6 seconds with laser-sharp Porsche handling and instant dual-motor torque response.",
    isAvailable: true,
    isFeatured: false,
    mileageLimit: 200,
  },
  {
    name: "Tesla Model S Plaid",
    brand: "Tesla",
    model: "Model S Plaid",
    year: 2024,
    category: "Electric Hyper",
    transmission: "Single-Speed Fixed Gear",
    fuelType: "Electric",
    seats: 5,
    doors: 4,
    horsePower: 1020,
    zeroToSixty: 1.99,
    topSpeed: 200,
    pricePerDay: 390,
    deposit: 1000,
    rating: 4.92,
    reviewsCount: 78,
    location: "San Francisco, CA (Silicon Valley)",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80"
    ]),
    features: JSON.stringify([
      "Tri-Motor All-Wheel Drive",
      "Full Self-Driving Capability Included",
      "Yoke Steering Wheel",
      "17-Inch Cinematic Gaming Console",
      "Sub-2.0s 0-60 Launch Mode",
      "Supercharger Access Worldwide"
    ]),
    description: "The fastest accelerating production sedan on earth. Over 1,000 electric horsepower catapults you beyond imagination, paired with full self-driving autonomy and minimalist luxury.",
    isAvailable: true,
    isFeatured: true,
    mileageLimit: 250,
  },
  {
    name: "Audi RS e-tron GT",
    brand: "Audi",
    model: "RS e-tron GT",
    year: 2024,
    category: "Electric Hyper",
    transmission: "2-Speed Automatic",
    fuelType: "Electric",
    seats: 4,
    doors: 4,
    horsePower: 637,
    zeroToSixty: 3.1,
    topSpeed: 155,
    pricePerDay: 450,
    deposit: 1200,
    rating: 4.93,
    reviewsCount: 31,
    location: "Los Angeles, CA (Santa Monica)",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80"
    ]),
    features: JSON.stringify([
      "quattro All-Wheel Drive with e-torque vectoring",
      "Bang & Olufsen 3D Sound",
      "Carbon Roof & Exterior Package",
      "Matrix LED Headlights with Laser Light",
      "e-tron Sport Sound Synthesizer"
    ]),
    description: "Sculptural aerodynamic beauty combined with instant electric thrust. Gran Turismo comfort meets racing precision and head-turning presence.",
    isAvailable: true,
    isFeatured: false,
    mileageLimit: 200,
  },
  {
    name: "Aston Martin DB12",
    brand: "Aston Martin",
    model: "DB12 Super Tourer",
    year: 2024,
    category: "Supercar",
    transmission: "8-Speed Automatic",
    fuelType: "Premium Gasoline",
    seats: 4,
    doors: 2,
    horsePower: 671,
    zeroToSixty: 3.5,
    topSpeed: 202,
    pricePerDay: 950,
    deposit: 2500,
    rating: 4.97,
    reviewsCount: 19,
    location: "Miami, FL (Bal Harbour)",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80"
    ]),
    features: JSON.stringify([
      "Twin-Turbo 4.0L V8 Engine",
      "Bowers & Wilkins 1,170W Sound",
      "Bridge of Weir Semi-Aniline Leather",
      "Electronic Rear Differential (E-Diff)",
      "Next-Gen Connected Infotainment"
    ]),
    description: "The world's first Super Tourer. Aston Martin redefined the grand tourer with ferocious 671 bhp twin-turbo firepower, bespoke British craftsmanship, and athletic poise.",
    isAvailable: true,
    isFeatured: true,
    mileageLimit: 150,
  },
  {
    name: "Range Rover SV Autobiography",
    brand: "Land Rover",
    model: "Range Rover SV",
    year: 2024,
    category: "Exotic SUV",
    transmission: "8-Speed Automatic",
    fuelType: "Premium Gasoline",
    seats: 5,
    doors: 5,
    horsePower: 523,
    zeroToSixty: 4.4,
    topSpeed: 162,
    pricePerDay: 550,
    deposit: 1500,
    rating: 4.95,
    reviewsCount: 44,
    location: "New York, NY (Hamptons / JFK)",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80"
    ]),
    features: JSON.stringify([
      "Executive Class Rear Suite",
      "Meridian Signature Sound System",
      "Active Noise Cancellation",
      "All-Wheel Steering & Electronic Air Suspension",
      "Refrigerator Compartment & Deployable Tables"
    ]),
    description: "Peerless refinement and calm. The Range Rover SV offers first-class airline luxury in the rear cabin with twin massage seats, personal screens, and serene road isolation.",
    isAvailable: true,
    isFeatured: false,
    mileageLimit: 175,
  },
  {
    name: "McLaren 720S Performance",
    brand: "McLaren",
    model: "720S",
    year: 2023,
    category: "Supercar",
    transmission: "7-Speed Dual Clutch (SSG)",
    fuelType: "Premium Gasoline",
    seats: 2,
    doors: 2,
    horsePower: 710,
    zeroToSixty: 2.8,
    topSpeed: 212,
    pricePerDay: 1200,
    deposit: 3000,
    rating: 4.99,
    reviewsCount: 27,
    location: "Las Vegas, NV (The Strip)",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80"
    ]),
    features: JSON.stringify([
      "Dihedral Butterfly Doors",
      "Carbon Fiber Monocage II",
      "Proactive Chassis Control II",
      "Folding Driver Display",
      "Variable Drift Control"
    ]),
    description: "Savage hypercar acceleration masked in futuristic organic sculpting. Dihedral butterfly doors make every arrival unforgettable.",
    isAvailable: true,
    isFeatured: false,
    mileageLimit: 125,
  }
];

async function main() {
  console.log("Seeding luxury car rental database...");

  // Clear existing
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.car.deleteMany();

  for (const carData of sampleCars) {
    const car = await prisma.car.create({
      data: carData,
    });

    // Add realistic reviews
    await prisma.review.createMany({
      data: [
        {
          carId: car.id,
          author: "Alexander Wright",
          rating: 5,
          comment: `Rented this ${car.name} for our anniversary weekend. The vehicle condition was immaculate, delivery right to our hotel lobby was seamless. Unbelievable machine!`,
        },
        {
          carId: car.id,
          author: "Elena Rostova",
          rating: 5,
          comment: `5 stars without hesitation. The concierge service was top tier, communication via WhatsApp was instant, and the driving experience was out of this world.`,
        }
      ]
    });

    // Create a sample past booking for stats
    if (car.brand === "Porsche" || car.brand === "Mercedes-Benz") {
      const now = new Date();
      const start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const end = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000);

      await prisma.booking.create({
        data: {
          carId: car.id,
          customerName: "David Sterling",
          customerEmail: "david.sterling@example.com",
          customerPhone: "+1 (310) 555-0198",
          driverLicense: "DL-CA-992144A",
          startDate: start,
          endDate: end,
          pickupLocation: car.location,
          dropoffLocation: car.location,
          totalDays: 3,
          pricePerDay: car.pricePerDay,
          rentalAmount: car.pricePerDay * 3,
          insuranceTier: "VIP Concierge Shield",
          insuranceAmount: 149 * 3,
          depositAmount: car.deposit,
          addOns: JSON.stringify(["Airport Meet & Greet", "Child Seat"]),
          addOnsAmount: 150,
          totalAmount: car.pricePerDay * 3 + 149 * 3 + 150,
          status: "COMPLETED",
          bookingCode: `APX-${Math.floor(10000 + Math.random() * 90000)}`,
          paymentMethod: "CARD",
        }
      });
    }
  }

  console.log(`Seeded ${sampleCars.length} cars successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
