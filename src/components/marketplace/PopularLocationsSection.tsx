"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { popularLocations } from "@/data/categories";

export default function PopularLocationsSection({
  onSelectCity,
}: {
  onSelectCity?: (city: string) => void;
}) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-[#1e293b] sm:text-3xl">
          Explore Popular Locations
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {popularLocations.map((loc) => (
            <button
              key={loc.name}
              type="button"
              onClick={() => {
                onSelectCity?.(loc.name);
                document.getElementById("all-properties")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-[#FF052B]/30 hover:shadow-md"
            >
              <MapPin
                size={20}
                className="text-[#FF052B] transition group-hover:scale-110"
                strokeWidth={1.75}
              />
              <h3 className="mt-3 font-bold text-[#1e293b]">{loc.name}</h3>
              <p className="mt-1 text-xs text-slate-500">{loc.count} properties</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
