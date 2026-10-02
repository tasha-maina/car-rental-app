import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APEX EXOTICS | Luxury & Exotic Car Rental",
  description:
    "Rent world-class exotic cars, supercars, and prestige SUVs. Ferrari, Porsche, Lamborghini, and Rolls-Royce delivered white-glove to your hotel or private jet.",
  keywords: [
    "exotic car rental",
    "luxury car hire",
    "supercar rental",
    "Ferrari rental",
    "Lamborghini rental",
    "Porsche rental",
    "Rolls-Royce rental",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100 selection:bg-amber-400 selection:text-neutral-950 font-sans">
        {children}
      </body>
    </html>
  );
}
