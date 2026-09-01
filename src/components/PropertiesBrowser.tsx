"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import type { PropertyCategory } from "@/lib/data";
import {
  filterProperties,
  getAvailableProperties,
  buildSearchUrl,
  parseCategory,
} from "@/lib/search";
import PropertyCard from "@/components/PropertyCard";
import {
  BUDGET_RANGES_BUY,
  BUDGET_RANGES_RENT,
  PROPERTY_TYPES,
  PROPERTY_STATUSES,
} from "@/lib/constants";
import { listPropertiesApi } from "@/lib/api/properties";
import { mapApiPropertyToEnriched, mergeById } from "@/lib/property-mapper";
import type { EnrichedProperty } from "@/lib/property-meta";

const PropertyMap = dynamic(() => import("@/components/PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center rounded-2xl bg-slate-100">
      <p className="text-sm text-slate-500">Loading map…</p>
    </div>
  ),
});

const categories: { key: PropertyCategory; label: string }[] = [
  { key: "buy", label: "Buy" },
  { key: "rent", label: "Rent" },
  { key: "commercial", label: "Commercial" },
  { key: "plots", label: "Plots" },
];

const bedroomOptions = ["Any", "1 BHK", "2 BHK", "3 BHK", "4 BHK"];
const bathroomOptions = ["Any", "1", "2", "3", "4"];

export default function PropertiesBrowser({
  initialCategory = "buy",
  initialLocation = "",
}: {
  initialCategory?: PropertyCategory;
  initialLocation?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState<PropertyCategory>(
    parseCategory(searchParams.get("purpose") ?? initialCategory)
  );
  const [location, setLocation] = useState(
    searchParams.get("location") ?? initialLocation
  );
  const [budget, setBudget] = useState(
    Number(searchParams.get("budget") ?? "0")
  );
  const [bedrooms, setBedrooms] = useState(
    searchParams.get("bedrooms") ?? "Any"
  );
  const [bathrooms, setBathrooms] = useState(
    searchParams.get("bathrooms") ?? "Any"
  );
  const [propertyType, setPropertyType] = useState(
    searchParams.get("type") ?? "all"
  );
  const [status, setStatus] = useState(searchParams.get("status") ?? "all");
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [sort, setSort] = useState(searchParams.get("sort") ?? "featured");
  const [tag, setTag] = useState(searchParams.get("tag") ?? "all");
  const [view, setView] = useState<"list" | "map">(
    searchParams.get("view") === "map" ? "map" : "list"
  );
  const [moreFilters, setMoreFilters] = useState(false);
  const [compareIds, setCompareIds] = useState<Array<number | string>>([]);
  const [selectedMapId, setSelectedMapId] = useState<number | string | undefined>();
  const [dbProperties, setDbProperties] = useState<EnrichedProperty[]>([]);

  useEffect(() => {
    const purposeMap: Record<string, string> = {
      buy: "BUY",
      rent: "RENT",
      commercial: "COMMERCIAL",
      plots: "PLOTS",
    };
    listPropertiesApi({
      purpose: purposeMap[category],
      sort: "newest",
      limit: 100,
    })
      .then((result) => setDbProperties(result.data.map(mapApiPropertyToEnriched)))
      .catch(() => setDbProperties([]));
  }, [category]);

  const allProperties = useMemo(
    () => mergeById(dbProperties, getAvailableProperties()),
    [dbProperties]
  );

  const filtered = useMemo(
    () =>
      filterProperties(allProperties, {
        category,
        location,
        search,
        propertyType,
        budgetIndex: budget,
        bedrooms,
        bathrooms,
        status,
        sort,
        tag: tag !== "all" ? tag : undefined,
      }),
    [
      allProperties,
      category,
      location,
      search,
      propertyType,
      budget,
      bedrooms,
      bathrooms,
      status,
      sort,
      tag,
    ]
  );

  const budgetRanges =
    category === "rent" ? BUDGET_RANGES_RENT : BUDGET_RANGES_BUY;

  const syncUrl = useCallback(() => {
    const url = buildSearchUrl({
      purpose: category,
      location: location || undefined,
      type: propertyType,
      budget: String(budget),
      bedrooms,
      q: search || undefined,
      view: view === "map" ? "map" : undefined,
      tag: tag !== "all" ? tag : undefined,
    });
    router.replace(url, { scroll: false });
  }, [category, location, propertyType, budget, bedrooms, search, view, tag, router]);

  useEffect(() => {
    syncUrl();
  }, [syncUrl]);

  const toggleCompare = (id: number | string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const clearFilters = () => {
    setLocation("");
    setBudget(0);
    setBedrooms("Any");
    setBathrooms("Any");
    setPropertyType("all");
    setStatus("all");
    setTag("all");
    setSearch("");
    setSort("featured");
  };

  return (
    <section className="bg-slate-50 px-6 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  setCategory(cat.key);
                  setBudget(0);
                }}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  category === cat.key
                    ? "bg-[#064b35] text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setView("list");
                trackEvent("map_view", { mode: "list" });
              }}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                view === "list"
                  ? "bg-[#064b35] text-white"
                  : "bg-white text-slate-600"
              }`}
            >
              List View
            </button>
            <button
              type="button"
              onClick={() => {
                setView("map");
                trackEvent("map_view", { mode: "map" });
              }}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                view === "map"
                  ? "bg-[#064b35] text-white"
                  : "bg-white text-slate-600"
              }`}
            >
              Map View
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <div className="flex flex-1 items-center rounded-xl border border-slate-200 bg-white px-4 py-3">
            <span className="mr-3 text-slate-400">⌕</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && trackEvent("search", { q: search })}
              placeholder="Search by locality, project, landmark or property ID"
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3">
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 md:w-48"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Property Type
              </h3>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="all">All Types</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Budget
              </h3>
              <div className="mt-3 space-y-2">
                {budgetRanges.map((range, index) => (
                  <label
                    key={range.label}
                    className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                  >
                    <input
                      type="radio"
                      name="budget"
                      checked={budget === index}
                      onChange={() => setBudget(index)}
                      className="accent-[#064b35]"
                    />
                    {range.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Bedrooms
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {bedroomOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setBedrooms(opt)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                      bedrooms === opt
                        ? "border-[#064b35] bg-[#eef7f2] text-[#064b35]"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMoreFilters(!moreFilters)}
              className="w-full rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-[#064b35] transition hover:bg-slate-50"
            >
              {moreFilters ? "Hide Filters" : "More Filters"}
            </button>

            {moreFilters && (
              <>
                <div className="border-t border-slate-100 pt-5">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Bathrooms
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {bathroomOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setBathrooms(opt)}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                          bathrooms === opt
                            ? "border-[#064b35] bg-[#eef7f2] text-[#064b35]"
                            : "border-slate-200 text-slate-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Property Status
                  </h3>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  >
                    <option value="all">All Statuses</option>
                    {PROPERTY_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div className="border-t border-slate-100 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Sort By
              </h3>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="score">Trust Score</option>
              </select>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                <span className="font-bold text-slate-900">{filtered.length}</span>{" "}
                properties found
              </p>
              {compareIds.length > 0 && (
                <Link
                  href={`/properties/compare/?ids=${compareIds.join(",")}`}
                  className="text-sm font-semibold text-[#064b35]"
                >
                  Compare ({compareIds.length})
                </Link>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <p className="text-base font-semibold text-slate-700">
                  No properties match your search
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Try adjusting your filters or search terms.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 inline-flex rounded-xl bg-[#064b35] px-5 py-3 text-sm font-semibold text-white"
                >
                  Clear Filters
                </button>
              </div>
            ) : view === "map" ? (
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="max-h-[600px] space-y-4 overflow-y-auto">
                  {filtered.map((property) => (
                    <div key={property.id} className="relative">
                      <PropertyCard
                        property={property}
                        onMapSelect={() => setSelectedMapId(property.id)}
                        compareSelected={compareIds.includes(property.id)}
                        onCompareToggle={() => toggleCompare(property.id)}
                      />
                    </div>
                  ))}
                </div>
                <PropertyMap
                  properties={filtered}
                  selectedId={selectedMapId}
                  onSelect={setSelectedMapId}
                  className="h-[600px] sticky top-28"
                />
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                {filtered.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    compareSelected={compareIds.includes(property.id)}
                    onCompareToggle={() => toggleCompare(property.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
