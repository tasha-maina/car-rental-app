export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  category: "Supercar" | "Luxury Sedan" | "Exotic SUV" | "Electric Hyper" | string;
  transmission: string;
  fuelType: string;
  seats: number;
  doors: number;
  horsePower: number;
  zeroToSixty: number;
  topSpeed: number;
  pricePerDay: number;
  deposit: number;
  rating: number;
  reviewsCount: number;
  location: string;
  image: string;
  images: string; // JSON string array
  features: string; // JSON string array
  description: string;
  isAvailable: boolean;
  isFeatured: boolean;
  mileageLimit: number;
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  carId: string;
  car?: Car;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  driverLicense: string;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  totalDays: number;
  pricePerDay: number;
  rentalAmount: number;
  insuranceTier: string;
  insuranceAmount: number;
  depositAmount: number;
  addOns: string; // JSON string
  addOnsAmount: number;
  totalAmount: number;
  status: "CONFIRMED" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  bookingCode: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  carId: string;
  author: string;
  avatar?: string | null;
  rating: number;
  comment: string;
  date: string;
}

export interface FilterState {
  category: string;
  brand: string;
  minPrice?: number;
  maxPrice?: number;
  search: string;
  sort: string;
  pickupDate?: string;
  dropoffDate?: string;
  location?: string;
}

export interface VipInquiry {
  id: string;
  serviceType: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  location: string;
  destination?: string | null;
  scheduledDate: string;
  passengers: number;
  vehiclePairing?: string | null;
  notes?: string | null;
  status: "PENDING" | "CONTACTED" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  estimatedCost?: number | null;
  createdAt: string;
  updatedAt: string;
}
