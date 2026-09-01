"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { marketplaceProperties } from "@/data/properties";
import { SORT_OPTIONS } from "@/data/categories";
import {
  searchProperties,
  filterByPurpose,
  filterByBHK,
  applyFilters,
  filterByCity,
  filterLuxury,
  defaultFilters,
  type FilterState,
} from "@/utils/filters";
import { sortProperties } from "@/utils/sorting";
import { searchPropertiesApi, listPropertiesApi } from "@/lib/api/properties";
import { mapApiPropertyToCard, mergeById } from "@/lib/property-mapper";
import type { SearchDetected, SearchSuggestion } from "@/lib/api/properties";
import HeroSearch, { saveRecentSearch } from "./HeroSearch";
import BHKFilter from "./BHKFilter";
import FilterPanel from "./FilterPanel";
import MarketplacePropertyCard from "./MarketplacePropertyCard";
import PopularLocationsSection from "./PopularLocationsSection";
import CategorySection from "./CategorySection";
import NewProjectsSection from "./NewProjectsSection";
import WhyChooseUs from "./WhyChooseUs";
import TestimonialsSection from "./TestimonialsSection";
import StatsSection from "./StatsSection";
import PartnersSection from "./PartnersSection";
import RecentlyAddedSection from "./RecentlyAddedSection";
import PostPropertyCTA from "./PostPropertyCTA";

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("buy");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBHK, setSelectedBHK] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sortBy, setSortBy] = useState("recommended");
  const [filterOpen, setFilterOpen] = useState(false);
  const [cityFilter, setCityFilter] = useState("");
  const [luxuryOnly, setLuxuryOnly] = useState(false);
  const [apiResults, setApiResults] = useState<ReturnType<typeof mapApiPropertyToCard>[] | null>(null);
  const [searchMeta, setSearchMeta] = useState<SearchDetected | null>(null);
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestion[]>([]);
  const [searchTotal, setSearchTotal] = useState<number | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [useApi, setUseApi] = useState(true);

  const localResults = useMemo(() => {
    let list = filterByPurpose(marketplaceProperties, activeTab);
    list = searchProperties(list, searchQuery);
    list = filterByBHK(list, selectedBHK);
    if (cityFilter) list = filterByCity(list, cityFilter);
    if (luxuryOnly) list = filterLuxury(list);
    list = applyFilters(list, filters);
    return sortProperties(list, sortBy);
  }, [activeTab, searchQuery, selectedBHK, filters, sortBy, cityFilter, luxuryOnly]);

  const loadFromApi = useCallback(async (query: string) => {
    setLoading(true);
    try {
      const purposeMap: Record<string, string> = {
        buy: "BUY",
        rent: "RENT",
        pg: "PG",
        commercial: "COMMERCIAL",
        plots: "PLOTS",
        sell: "BUY",
      };

      const sortMap: Record<string, string> = {
        recommended: "recommended",
        newest: "newest",
        "price-low": "price_low",
        "price-high": "price_high",
        "area-low": "area_low",
        "area-high": "area_high",
      };

      const response = query.trim()
        ? await searchPropertiesApi({
            q: query.trim(),
            city: cityFilter || undefined,
            purpose: purposeMap[activeTab],
            sort: sortMap[sortBy],
            limit: 50,
          })
        : await listPropertiesApi({
            city: cityFilter || undefined,
            purpose: purposeMap[activeTab],
            sort: sortMap[sortBy],
            limit: 50,
          }).then((result) => ({
            success: true,
            search: {
              original: "",
              detected: {
                bhk: null,
                propertyType: null,
                location: cityFilter || null,
              },
              exact: true,
            },
            properties: result.data,
            total: result.pagination.total,
            suggestions: [],
          }));

      const mapped = response.properties.map(mapApiPropertyToCard);
      const extras = query.trim()
        ? []
        : filterByPurpose(marketplaceProperties, activeTab);
      setApiResults(mergeById(mapped, extras));
      setSearchMeta(response.search.detected);
      setSearchSuggestions(response.suggestions || []);
      setSearchTotal(response.total);
      setUseApi(true);
    } catch {
      setApiResults(null);
      setUseApi(false);
    } finally {
      setLoading(false);
    }
  }, [activeTab, cityFilter, sortBy]);

  useEffect(() => {
    if (!hasSearched) {
      loadFromApi("");
    }
  }, [hasSearched, loadFromApi]);

  const results = useMemo(() => {
    if (useApi && apiResults) {
      let list = [...apiResults];
      if (selectedBHK) {
        list = list.filter(
          (item) => item.bhk.toLowerCase() === selectedBHK.toLowerCase()
        );
      }
      if (luxuryOnly) {
        list = list.filter((item) => item.priceValue >= 150);
      }
      return list;
    }
    return localResults;
  }, [useApi, apiResults, localResults, selectedBHK, luxuryOnly]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery);
    }
    setHasSearched(true);
    loadFromApi(searchQuery);
    document.getElementById("all-properties")?.scrollIntoView({ behavior: "smooth" });
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedBHK(null);
    setCityFilter("");
    setLuxuryOnly(false);
    setFilters(defaultFilters);
    setSearchMeta(null);
    setSearchSuggestions([]);
    setSearchTotal(null);
    setHasSearched(false);
    loadFromApi("");
  };

  const handleCitySelect = (city: string) => {
    setCityFilter(city);
    setFilters((f) => ({ ...f, city }));
    setHasSearched(true);
    loadFromApi(searchQuery);
  };

  const handleCategorySelect = (type: string, purpose?: string) => {
    if (purpose) setActiveTab(purpose);
    if (type) {
      setFilters((f) => ({ ...f, propertyTypes: [type] }));
    }
    if (type === "" && purpose === "buy") {
      setLuxuryOnly(true);
    }
  };

  const detectedLocation = searchMeta?.locality || searchMeta?.location;
  const resultCount = searchTotal ?? results.length;

  return (
    <main>
      <HeroSearch
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLocation={cityFilter}
        onLocationChange={(city) => {
          setCityFilter(city);
          setFilters((f) => ({ ...f, city }));
        }}
        onSearch={handleSearch}
        onFilterClick={() => setFilterOpen(true)}
      />

      <BHKFilter selected={selectedBHK} onSelect={setSelectedBHK} />

      <section id="all-properties" className="bg-[#f8fafc] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#1e293b] sm:text-3xl">
                {detectedLocation
                  ? `Properties in ${detectedLocation}`
                  : "All Properties"}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                {searchMeta?.bhk && (
                  <span className="rounded-full bg-[#FF052B]/10 px-3 py-1 font-semibold text-[#FF052B]">
                    {searchMeta.bhk}
                  </span>
                )}
                {searchMeta?.propertyType && (
                  <span className="rounded-full bg-slate-200 px-3 py-1 font-medium text-[#334155]">
                    {searchMeta.propertyType}
                  </span>
                )}
                <span>
                  <span className="font-semibold text-[#1e293b]">{resultCount}</span>{" "}
                  properties found
                </span>
                {loading && <span>Searching…</span>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFilterOpen(true)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-[#334155] lg:hidden"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-[#334155]"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      Sort: {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-8">
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              onApply={() => handleSearch()}
              onReset={clearSearch}
              open={filterOpen}
              onClose={() => setFilterOpen(false)}
            />

            <div className="min-w-0 flex-1">
              {cityFilter && (
                <button
                  type="button"
                  onClick={() => {
                    setCityFilter("");
                    handleSearch();
                  }}
                  className="mb-4 text-sm text-[#FF052B]"
                >
                  Clear city filter
                </button>
              )}

              {results.length === 0 && !loading ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
                  <p className="text-lg font-semibold text-[#1e293b]">
                    {searchSuggestions.length
                      ? "No exact matches found"
                      : "No properties found"}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Try adjusting your search or filters.
                  </p>

                  {searchSuggestions.length > 0 && (
                    <div className="mx-auto mt-8 max-w-lg text-left">
                      <p className="text-sm font-semibold text-[#1e293b]">
                        You may also like:
                      </p>
                      <div className="mt-3 space-y-2">
                        {searchSuggestions.map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => {
                              setSearchQuery(item.label);
                              loadFromApi(item.label);
                            }}
                            className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-left text-sm text-[#334155] hover:border-[#FF052B] hover:text-[#FF052B]"
                          >
                            {item.label}
                            {item.count ? ` (${item.count})` : ""}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={clearSearch}
                    className="mt-6 rounded-xl bg-[#FF052B] px-6 py-3 text-sm font-semibold text-white"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {results.map((p) => (
                    <MarketplacePropertyCard key={String(p.id)} property={p} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <PopularLocationsSection onSelectCity={handleCitySelect} />
      <CategorySection onCategorySelect={handleCategorySelect} />
      <NewProjectsSection />
      <RecentlyAddedSection />
      <WhyChooseUs />
      <StatsSection />
      <TestimonialsSection />
      <PartnersSection />
      <PostPropertyCTA />
    </main>
  );
}
