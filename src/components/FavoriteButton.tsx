"use client";

import { useEffect, useState } from "react";
import { getFavorites, toggleFavorite, isFavorite, type FavoriteId } from "@/lib/favorites";
import { trackEvent } from "@/lib/analytics";

export default function FavoriteButton({
  propertyId,
  className = "",
}: {
  propertyId: FavoriteId;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isFavorite(propertyId));
    const handler = () => setSaved(isFavorite(propertyId));
    window.addEventListener("trecom:favorites", handler);
    return () => window.removeEventListener("trecom:favorites", handler);
  }, [propertyId]);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const nowSaved = toggleFavorite(propertyId);
        setSaved(nowSaved);
        if (nowSaved) trackEvent("favorite", { propertyId });
      }}
      aria-label={saved ? "Remove from saved" : "Save property"}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm transition hover:scale-105 ${saved ? "text-red-500" : "hover:text-red-500"} ${className}`}
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
      </svg>
    </button>
  );
}
