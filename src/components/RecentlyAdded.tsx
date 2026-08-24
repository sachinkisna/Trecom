"use client";

import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { getRecentProperties } from "@/lib/search";

export default function RecentlyAdded() {
  const properties = getRecentProperties(3);

  return (
    <section className="bg-white px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-8 bg-[#064b35]" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#064b35]">
              New Listings
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Recently Added Properties
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
