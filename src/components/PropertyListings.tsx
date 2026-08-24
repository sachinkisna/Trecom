"use client";

import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { getFeaturedProperties } from "@/lib/search";

export default function PropertyListings() {
  const properties = getFeaturedProperties(6);

  return (
    <section className="bg-slate-50 px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-[#064b35]" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#064b35]">
                Featured Properties
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Properties you may like
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500 md:text-base">
              Discover verified properties selected for you.
            </p>
          </div>
          <Link
            href="/properties/"
            className="hidden items-center gap-2 text-sm font-semibold text-[#064b35] transition hover:gap-3 md:flex"
          >
            View all properties
            <span>→</span>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/properties/"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-[#064b35]"
          >
            View all properties
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
