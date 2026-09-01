"use client";

import { useEffect, useState } from "react";
import type { Property, PropertyCategory } from "@/lib/data";
import type { EnrichedProperty } from "@/lib/property-meta";
import { listPropertiesApi } from "@/lib/api/properties";
import { mapApiPropertyToEnriched, mergeById } from "@/lib/property-mapper";
import { enrichProperty } from "@/lib/property-meta";
import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/ui/Reveal";

const purposeByCategory: Record<PropertyCategory, string> = {
  buy: "BUY",
  rent: "RENT",
  commercial: "COMMERCIAL",
  plots: "PLOTS",
};

export default function DatabasePropertyListing({
  category,
  fallback,
}: {
  category: PropertyCategory;
  fallback: Property[];
}) {
  const [properties, setProperties] = useState<EnrichedProperty[]>(() =>
    fallback.map(enrichProperty)
  );

  useEffect(() => {
    let cancelled = false;

    listPropertiesApi({
      purpose: purposeByCategory[category],
      sort: "newest",
      limit: 100,
    })
      .then((result) => {
        if (!cancelled) {
          setProperties(
            mergeById(result.data.map(mapApiPropertyToEnriched), fallback.map(enrichProperty))
          );
        }
      })
      .catch(() => {
        // Keep the bundled listings visible when the API is temporarily unavailable.
      });

    return () => {
      cancelled = true;
    };
  }, [category, fallback]);

  if (properties.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <p className="text-base font-semibold text-slate-700">New listings coming soon</p>
        <p className="mt-2 text-sm text-slate-500">Be the first to post a property in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property, index) => (
        <Reveal key={String(property.id)} delay={(index % 3) * 80}>
          <PropertyCard property={property} />
        </Reveal>
      ))}
    </div>
  );
}
