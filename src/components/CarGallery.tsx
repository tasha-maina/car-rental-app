"use client";

import { useState } from "react";
import Image from "next/image";

interface CarGalleryProps {
  primaryImage: string;
  imagesJson: string;
  carName: string;
}

export default function CarGallery({ primaryImage, imagesJson, carName }: CarGalleryProps) {
  let images: string[] = [];
  try {
    images = JSON.parse(imagesJson);
  } catch {
    images = [primaryImage];
  }

  if (!images || images.length === 0) {
    images = [primaryImage];
  }

  const FALLBACK = "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80";
  const [activeImage, setActiveImage] = useState(images[0] || primaryImage || FALLBACK);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl">
        <Image
          src={activeImage}
          alt={carName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 65vw"
          className="object-cover transition-all duration-500"
          onError={() => setActiveImage(FALLBACK)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                activeImage === img
                  ? "border-amber-400 scale-105 shadow-lg shadow-amber-400/20"
                  : "border-neutral-800 opacity-60 hover:opacity-100 hover:border-neutral-600"
              }`}
            >
              <Image
                src={img}
                alt={`${carName} photo ${idx + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
