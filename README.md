# APEX EXOTICS — Luxury & Exotic Car Rental App

An exotic and luxury car rental platform built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM with SQLite**.

---

## ✨ Features

### 🏎️ Customer Experience
- **High-Impact Landing Page**: Modern dark luxury aesthetic with hero search widget, trust metrics, category shortcuts, bespoke service pillars, and verified renter reviews.
- **Fleet Catalog & Real-Time Filtering**: Dynamic vehicle search, category pills (*Supercars, Exotic SUVs, Ultra-Luxury Sedans, Electric Hyper*), automaker filter (*Porsche, Ferrari, Lamborghini, Rolls-Royce, etc.*), price range slider, and multi-criteria sorting (*Price, 0-60 MPH, Horsepower, Rating*).
- **Vehicle Details Page (`/cars/[id]`)**: High-resolution gallery switcher, detailed technical specifications (0-60, HP, top speed, transmission, mileage allowances), feature equipment tags, and verified customer reviews.
- **Interactive Booking Widget**: Dynamic calculation of rental days, multi-tier protection plans (*Standard, Premium Shield, VIP Black Card*), concierge add-ons (*FBO airport delivery, additional drivers, prepaid refuel, private chauffeur*), and itemized pricing breakdown.
- **Streamlined Checkout (`/checkout`)**: Driver identification, doorstep & airport delivery logistics, encrypted payment sandbox, and instant confirmation code generation (`APX-XXXXX`).
- **Confirmation & Itinerary (`/booking/confirmation/[id]`)**: Complete trip details, booking reference code, delivery logistics, and concierge hotline.
- **Client Reservations Dashboard (`/my-bookings`)**: Search trips by email or booking code, view active/upcoming/past trips, and real-time cancellation.

### 🛡️ Fleet Management & Admin Portal (`/admin`)
- **Real-Time Operational Analytics**: Gross rental revenue, fleet size, utilization rate, and active trip counters.
- **Fleet Management**: View all vehicles, toggle availability in real-time (*Available* vs *Maintenance/Reserved*), delete vehicles, and add new exotic cars via the built-in modal.
- **Reservations Manager**: Manage all customer bookings, change trip statuses (*Confirmed, Active, Completed, Cancelled*).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [SQLite](https://www.sqlite.org/) with [Prisma ORM](https://www.prisma.io/)
- **Seeding**: Realistic luxury vehicles with high-resolution photography and technical specs

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up the Database
```bash
# Push schema to SQLite
npx prisma db push

# Seed realistic fleet data
npm run seed # or npx prisma db seed
```

### 3. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧭 Page Routes

| Route | Description |
|---|---|
| `/` | Landing page with hero search, featured supercars & experiences |
| `/fleet` | Full vehicle inventory with search, filters, and sorting |
| `/cars/[id]` | Vehicle detail page with specs and interactive booking widget |
| `/checkout` | Secure driver identification and booking reservation |
| `/booking/confirmation/[id]` | Reservation confirmation code and trip itinerary |
| `/my-bookings` | Customer portal to manage, search, and cancel bookings |
| `/admin` | Fleet management portal with revenue analytics and car controls |

---

## 🔌 API Endpoints

- `GET /api/cars` - List fleet with filters (`category`, `brand`, `search`, `minPrice`, `maxPrice`, `sort`)
- `POST /api/cars` - Add new vehicle to the fleet
- `GET /api/cars/[id]` - Retrieve single vehicle details with reviews
- `PATCH /api/cars/[id]` - Update vehicle availability or specs
- `DELETE /api/cars/[id]` - Remove vehicle from fleet
- `GET /api/bookings` - List reservations (optional filters by `email`, `code`, `status`)
- `POST /api/bookings` - Create new reservation
- `GET /api/bookings/[id]` - Retrieve reservation details by ID or booking code
- `PATCH /api/bookings/[id]` - Update reservation status (`CONFIRMED`, `ACTIVE`, `COMPLETED`, `CANCELLED`)
- `GET /api/admin/stats` - Real-time fleet metrics and gross revenue analytics
