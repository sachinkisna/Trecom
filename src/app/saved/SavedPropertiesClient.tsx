"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { getFavorites } from "@/lib/favorites";
import { getPropertyById } from "@/lib/search";

export default function SavedPropertiesClient() {
  const [saved, setSaved] = useState<ReturnType<typeof getPropertyById>[]>([]);

  useEffect(() => {
    const load = () => {
      const ids = getFavorites();
      setSaved(ids.map((id) => getPropertyById(id)).filter(Boolean));
    };
    load();
    window.addEventListener("trecom:favorites", load);
    return () => window.removeEventListener("trecom:favorites", load);
  }, []);

  return (
    <section className="bg-slate-50 px-6 py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            <span className="font-bold text-slate-900">{saved.length}</span> saved
          </p>
          <Link href="/properties/" className="text-sm font-semibold text-[#064b35]">
            Browse more →
          </Link>
        </div>

        {saved.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-base font-semibold text-slate-800">No saved properties yet</p>
            <p className="mt-2 max-w-md text-sm text-slate-500">
              Tap the heart on any listing to keep it here. Sign in to sync across devices.
            </p>
            <Link
              href="/properties/"
              className="mt-5 rounded-xl bg-[#064b35] px-6 py-3 text-sm font-bold text-white"
            >
              Explore Properties
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((property) => (
              <PropertyCard key={property!.id} property={property!} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
