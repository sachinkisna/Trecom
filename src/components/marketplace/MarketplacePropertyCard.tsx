"use client";

import Link from "next/link";
import {
  MapPin,
  Bed,
  Ruler,
  ShieldCheck,
  Heart,
  Share2,
  ArrowRight,
  Images,
} from "lucide-react";
import type { MarketplaceProperty } from "@/data/properties";
import { toggleFavorite, isFavorite } from "@/lib/favorites";
import { useEffect, useState } from "react";

export default function MarketplacePropertyCard({
  property,
}: {
  property: MarketplaceProperty;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isFavorite(property.id));
  }, [property.id]);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/property/${property.id}/`;
    if (navigator.share) {
      await navigator.share({ title: property.title, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(toggleFavorite(property.id));
  };

  return (
    <Link
      href={`/property/${property.id}/`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {property.verified && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-emerald-700 shadow-sm">
            <ShieldCheck size={12} strokeWidth={2.5} />
            Verified
          </span>
        )}
        <span className="absolute bottom-3 left-3 rounded-md bg-black/50 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
          {property.propertyType}
        </span>
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md bg-black/50 px-2 py-1 text-[10px] text-white backdrop-blur-sm">
          <Images size={11} />
          {property.images.length}
        </span>
        <div className="absolute right-3 top-3 flex gap-1.5">
          <button
            type="button"
            onClick={handleFavorite}
            aria-label="Save property"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-sm transition hover:text-[#FF052B]"
          >
            <Heart
              size={15}
              fill={saved ? "#FF052B" : "none"}
              className={saved ? "text-[#FF052B]" : ""}
            />
          </button>
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share property"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-sm transition hover:text-[#334155]"
          >
            <Share2 size={15} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Bed size={13} />
          <span className="font-medium text-[#334155]">{property.bhk}</span>
          <span className="text-slate-300">|</span>
          <span>{property.postedBy}</span>
        </div>

        <h3 className="mt-2 line-clamp-1 text-base font-bold text-[#1e293b]">
          {property.title}
        </h3>

        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
          <MapPin size={12} className="shrink-0" />
          {property.locality}, {property.city}
        </p>

        <p className="mt-3 text-lg font-bold text-[#1e293b]">{property.price}</p>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Ruler size={12} />
            {property.areaSqft.toLocaleString()} sq.ft
          </span>
          <span className="rounded bg-slate-100 px-2 py-0.5">{property.furnishing}</span>
          <span
            className={`rounded px-2 py-0.5 ${
              property.possession === "Ready to Move"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700"
            }`}
          >
            {property.possession}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-[10px] text-slate-400">{property.postedAgo}</span>
          <span className="flex items-center gap-1 text-sm font-semibold text-[#FF052B] opacity-0 transition group-hover:opacity-100">
            View Details
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
