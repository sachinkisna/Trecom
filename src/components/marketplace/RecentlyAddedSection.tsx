"use client";

import { marketplaceProperties } from "@/data/properties";
import { sortProperties } from "@/utils/sorting";
import MarketplacePropertyCard from "./MarketplacePropertyCard";

export default function RecentlyAddedSection() {
  const recent = sortProperties(marketplaceProperties, "newest").slice(0, 4);

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-[#1e293b] sm:text-3xl">Recently Added</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {recent.map((p) => (
            <MarketplacePropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
