"use client";

import Link from "next/link";
import type { Property } from "@/lib/data";
import { enrichProperty, type EnrichedProperty } from "@/lib/property-meta";
import FavoriteButton from "@/components/FavoriteButton";
import ShareButton from "@/components/ShareButton";

export default function PropertyCard({
  property: raw,
  compareSelected,
  onCompareToggle,
  onMapSelect,
}: {
  property: Property | EnrichedProperty;
  compareSelected?: boolean;
  onCompareToggle?: () => void;
  onMapSelect?: () => void;
}) {
  const property = "lat" in raw ? raw : enrichProperty(raw);
  const statusColors: Record<string, string> = {
    Available: "bg-emerald-100 text-emerald-800",
    "Ready to Move": "bg-blue-100 text-blue-800",
    "Under Construction": "bg-amber-100 text-amber-800",
  };

  return (
    <Link
      href={`/properties/${property.id}/`}
      onClick={onMapSelect}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
    >
      <div className="relative h-[220px] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {property.verified && (
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[#064b35] shadow-sm">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#064b35] text-[9px] text-white">
              ✓
            </span>
            Verified Property
          </div>
        )}

        {property.tag && (
          <div className="absolute left-4 top-14 rounded-full bg-[#064b35] px-2.5 py-1 text-[10px] font-bold uppercase text-white">
            {property.tag}
          </div>
        )}

        <div className="absolute right-4 top-4 flex gap-2">
          <FavoriteButton propertyId={property.id} />
          <ShareButton title={property.title} />
        </div>

        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="rounded-md bg-black/45 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
            {property.propertyType}
          </span>
          <span
            className={`rounded-md px-3 py-1.5 text-[11px] font-medium backdrop-blur-sm ${statusColors[property.status] ?? "bg-slate-100 text-slate-700"}`}
          >
            {property.status}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">{property.title}</h3>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {property.location}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-lg font-bold text-slate-900">{property.price}</div>
            <div className="mt-1 text-[10px] text-slate-400">
              {property.category === "rent" ? "Rent" : "Starting price"}
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center divide-x divide-slate-200 border-y border-slate-100 py-4">
          <div className="flex-1 text-center">
            <div className="text-xs font-semibold text-slate-800">{property.bedrooms}</div>
            <div className="mt-1 text-[10px] text-slate-400">Bedrooms</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-xs font-semibold text-slate-800">{property.bathrooms}</div>
            <div className="mt-1 text-[10px] text-slate-400">Bathrooms</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-xs font-semibold text-slate-800">{property.area}</div>
            <div className="mt-1 text-[10px] text-slate-400">Built-up</div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {property.verifiedOwner && (
              <span className="text-[10px] font-medium text-emerald-700">✓ Owner</span>
            )}
            {property.verifiedAgent && (
              <span className="text-[10px] font-medium text-emerald-700">✓ Agent</span>
            )}
            {property.reraVerified && (
              <span className="text-[10px] font-medium text-emerald-700">✓ RERA</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {onCompareToggle && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onCompareToggle();
                }}
                className={`rounded-lg border px-2 py-1 text-[10px] font-semibold ${
                  compareSelected
                    ? "border-[#064b35] bg-[#eef7f2] text-[#064b35]"
                    : "border-slate-200 text-slate-500"
                }`}
              >
                Compare
              </button>
            )}
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition group-hover:border-[#064b35] group-hover:bg-[#064b35] group-hover:text-white">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
