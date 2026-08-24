"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { EnrichedProperty } from "@/lib/property-meta";

type PropertyMapProps = {
  properties: EnrichedProperty[];
  selectedId?: number;
  onSelect?: (id: number) => void;
  className?: string;
};

export default function PropertyMap({
  properties,
  selectedId,
  onSelect,
  className = "",
}: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || properties.length === 0) return;

    let cancelled = false;

    async function init() {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !mapRef.current) return;

      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }

      const centerLat =
        properties.reduce((s, p) => s + p.lat, 0) / properties.length;
      const centerLng =
        properties.reduce((s, p) => s + p.lng, 0) / properties.length;

      const map = L.map(mapRef.current, { scrollWheelZoom: true }).setView(
        [centerLat, centerLng],
        11
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
      }).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: `<div style="background:#064b35;color:white;padding:4px 8px;border-radius:20px;font-size:11px;font-weight:700;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,.25);border:2px solid white;">₹</div>`,
        iconSize: [40, 24],
        iconAnchor: [20, 24],
      });

      for (const property of properties) {
        const marker = L.marker([property.lat, property.lng], { icon }).addTo(map);
        const popup = `
          <div style="min-width:180px;font-family:system-ui,sans-serif">
            <strong style="font-size:13px">${property.title}</strong>
            <div style="font-size:11px;color:#64748b;margin:4px 0">${property.location}</div>
            <div style="font-size:14px;font-weight:700;color:#064b35">${property.price}</div>
            <a href="/properties/${property.id}/" style="display:inline-block;margin-top:8px;font-size:12px;color:#064b35;font-weight:600">View Property →</a>
          </div>
        `;
        marker.bindPopup(popup);
        marker.on("click", () => onSelect?.(property.id));
        if (selectedId === property.id) marker.openPopup();
      }

      if (properties.length > 1) {
        const bounds = L.latLngBounds(properties.map((p) => [p.lat, p.lng]));
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
      }

      instanceRef.current = map;
    }

    init();

    return () => {
      cancelled = true;
      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }
    };
  }, [properties, selectedId, onSelect]);

  if (properties.length === 0) {
    return (
      <div className={`flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-100 ${className}`}>
        <p className="text-sm text-slate-500">No properties to show on map</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-slate-200 ${className}`}>
      <div ref={mapRef} className="h-full min-h-[400px] w-full" />
      {selectedId && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000]">
          {properties
            .filter((p) => p.id === selectedId)
            .map((p) => (
              <Link
                key={p.id}
                href={`/properties/${p.id}/`}
                className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-lg"
              >
                <img src={p.image} alt="" className="h-14 w-20 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-slate-900">{p.title}</div>
                  <div className="text-xs text-slate-500">{p.location}</div>
                  <div className="text-sm font-bold text-[#064b35]">{p.price}</div>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
