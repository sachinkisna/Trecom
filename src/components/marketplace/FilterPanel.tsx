"use client";

import { X } from "lucide-react";
import {
  PROPERTY_TYPES,
  FURNISHING_OPTIONS,
  POSSESSION_OPTIONS,
  AMENITY_OPTIONS,
  BHK_OPTIONS,
  popularLocations,
} from "@/data/categories";
import type { FilterState } from "@/utils/filters";
import { defaultFilters } from "@/utils/filters";

type FilterPanelProps = {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onApply: () => void;
  onReset: () => void;
  open: boolean;
  onClose: () => void;
};

export default function FilterPanel({
  filters,
  onChange,
  onApply,
  onReset,
  open,
  onClose,
}: FilterPanelProps) {
  const toggleArray = (key: keyof FilterState, value: string) => {
    const arr = filters[key] as string[];
    const next = arr.includes(value)
      ? arr.filter((v) => v !== value)
      : [...arr, value];
    onChange({ ...filters, [key]: next });
  };

  const panel = (
    <div className="space-y-6">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Property Type
        </h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggleArray("propertyTypes", t)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                filters.propertyTypes.includes(t)
                  ? "border-[#FF052B] bg-[#FF052B]/5 text-[#FF052B]"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-600">Min Price</label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
            placeholder="Min"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#FF052B]"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600">Max Price</label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
            placeholder="Max"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#FF052B]"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600">City</label>
        <select
          value={filters.city}
          onChange={(e) => onChange({ ...filters, city: e.target.value })}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="">All Cities</option>
          {popularLocations.map((l) => (
            <option key={l.name} value={l.name}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600">Locality</label>
        <input
          value={filters.locality}
          onChange={(e) => onChange({ ...filters, locality: e.target.value })}
          placeholder="Enter locality"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#FF052B]"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600">Pincode</label>
        <input
          value={filters.pincode}
          onChange={(e) => onChange({ ...filters, pincode: e.target.value })}
          placeholder="Enter pincode"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#FF052B]"
        />
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500">BHK</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {BHK_OPTIONS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => toggleArray("bhk", b)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                filters.bhk.includes(b)
                  ? "border-[#FF052B] bg-[#FF052B]/5 text-[#FF052B]"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Furnishing
        </h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {FURNISHING_OPTIONS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => toggleArray("furnishing", f)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                filters.furnishing.includes(f)
                  ? "border-[#FF052B] bg-[#FF052B]/5 text-[#FF052B]"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Possession
        </h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {POSSESSION_OPTIONS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => toggleArray("possession", p)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                filters.possession.includes(p)
                  ? "border-[#FF052B] bg-[#FF052B]/5 text-[#FF052B]"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Amenities
        </h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {AMENITY_OPTIONS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => toggleArray("amenities", a)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                filters.amenities.includes(a)
                  ? "border-[#FF052B] bg-[#FF052B]/5 text-[#FF052B]"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => {
            onApply();
            onClose();
          }}
          className="flex-1 rounded-xl bg-[#FF052B] py-3 text-sm font-semibold text-white"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={() => {
            onChange(defaultFilters);
            onReset();
          }}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600"
        >
          Reset
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-bold text-[#1e293b]">Filters</h3>
          <div className="mt-4">{panel}</div>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#1e293b]">Filters</h3>
              <button type="button" onClick={onClose} aria-label="Close">
                <X size={22} />
              </button>
            </div>
            {panel}
          </div>
        </div>
      )}
    </>
  );
}
