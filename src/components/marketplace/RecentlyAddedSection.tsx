"use client";

import { useEffect, useState } from "react";
import { marketplaceProperties } from "@/data/properties";
import { sortProperties } from "@/utils/sorting";
import MarketplacePropertyCard from "./MarketplacePropertyCard";
import { listPropertiesApi } from "@/lib/api/properties";
import { mapApiPropertyToCard, mergeById } from "@/lib/property-mapper";
import type { MarketplaceProperty } from "@/data/properties";

export default function RecentlyAddedSection() {
  const fallback = sortProperties(marketplaceProperties, "newest").slice(0, 4);
  const [recent, setRecent] = useState<MarketplaceProperty[]>(fallback);

  useEffect(() => {
    listPropertiesApi({ sort: "newest", limit: 8 })
      .then((result) => {
        const fromDb = result.data.map(mapApiPropertyToCard);
        setRecent(mergeById(fromDb, fallback).slice(0, 4));
      })
      .catch(() => {
        setRecent(fallback);
      });
  }, []);

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-[#1e293b] sm:text-3xl">Recently Added</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {recent.map((p) => (
            <MarketplacePropertyCard key={String(p.id)} property={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
