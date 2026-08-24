"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MapPin, Search, SlidersHorizontal, Clock, TrendingUp } from "lucide-react";
import { PURPOSE_TABS, popularLocations } from "@/data/categories";
import { getSearchSuggestionsApi } from "@/lib/api/properties";
import VoiceMicButton from "@/components/VoiceMicButton";

const RECENT_KEY = "trecom_recent_searches";

const POPULAR_SEARCHES = [
  "2bhk in Koramangala",
  "3bhk in Whitefield",
  "villa in Whitefield",
  "2bhk flat in HSR Layout",
  "1rk in Indiranagar",
  "apartment in Hyderabad",
  "house in Pune",
  "commercial property in Mumbai",
];

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=85",
    title: "Find a Place You'll",
    highlight: "Love to Call Home",
    description:
      "Discover verified properties, apartments, homes, plots and commercial spaces from trusted owners, agents and builders.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85",
    title: "Find Your",
    highlight: "Dream Home",
    description:
      "Explore apartments, villas and gated communities with trusted guidance across India.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=85",
    title: "Invest in the",
    highlight: "Right Location",
    description:
      "Discover high-growth neighbourhoods with local market expertise and verified listings.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2200&q=85",
    title: "Premium Properties.",
    highlight: "Trusted Community.",
    description:
      "Verified listings, transparent pricing and dedicated property advisors you can rely on.",
  },
];

type HeroSearchProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  onSearch: () => void;
  onFilterClick?: () => void;
};

function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveRecentSearch(query: string) {
  const trimmed = query.trim();
  if (!trimmed) return;
  const recent = getRecentSearches().filter((item) => item !== trimmed);
  recent.unshift(trimmed);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, 6)));
}

export default function HeroSearch({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  selectedLocation,
  onLocationChange,
  onSearch,
  onFilterClick,
}: HeroSearchProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<{ label: string; query: string }[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const touchStartX = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent((index + slides.length) % slides.length);
    setPaused(true);
  }, []);

  const nextSlide = useCallback(() => goTo(current + 1), [current, goTo]);
  const previousSlide = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") previousSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextSlide, previousSlide]);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setSuggestionsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const result = await getSearchSuggestionsApi(searchQuery);
        setSuggestions(result.data || []);
      } catch {
        setSuggestions([]);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchQuery]);

  const applySearch = (query: string) => {
    onSearchChange(query);
    saveRecentSearch(query);
    setRecentSearches(getRecentSearches());
    setSuggestionsOpen(false);
    onSearch();
  };

  const slide = slides[current];

  return (
    <section
      className="relative min-h-[680px] overflow-hidden bg-slate-950 md:min-h-[720px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) nextSlide();
          else previousSlide();
        }
      }}
    >
      {slides.map((s, index) => (
        <div
          key={s.image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={s.image}
            alt=""
            className="h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/25 to-black/70" />
        </div>
      ))}

      <button
        type="button"
        onClick={previousSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-2xl text-white backdrop-blur-md transition hover:bg-white/35 sm:left-6 sm:h-11 sm:w-11"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-2xl text-white backdrop-blur-md transition hover:bg-white/35 sm:right-6 sm:h-11 sm:w-11"
      >
        ›
      </button>

      <div className="relative z-10 mx-auto flex min-h-[680px] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 md:min-h-[720px]">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {slide.title}
          <span className="block text-white/95">{slide.highlight}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
          {slide.description}
        </p>

        <div className="mx-auto mt-8 w-full max-w-3xl rounded-2xl bg-white p-4 shadow-2xl sm:p-5">
          <div className="flex gap-1 overflow-x-auto border-b border-slate-100 pb-3">
            {PURPOSE_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => onTabChange(tab.key)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab.key
                    ? "bg-[#FF052B] text-white"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div ref={wrapperRef} className="relative mt-4">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-slate-50/50 sm:flex-row sm:items-center">
                <div className="flex items-center gap-1.5 border-b border-slate-200 px-3 py-2.5 sm:border-b-0 sm:border-r sm:py-0 sm:pl-3 sm:pr-2">
                  <MapPin className="h-4 w-4 shrink-0 text-[#FF052B]" strokeWidth={2} />
                  <select
                    value={selectedLocation}
                    onChange={(e) => onLocationChange(e.target.value)}
                    aria-label="Select city"
                    className="max-w-[140px] cursor-pointer bg-transparent text-sm font-semibold text-[#1e293b] outline-none sm:max-w-[150px]"
                  >
                    <option value="">All Cities</option>
                    {popularLocations.map((loc) => (
                      <option key={loc.slug} value={loc.name}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3">
                  <Search className="hidden h-5 w-5 shrink-0 text-slate-400 sm:block" strokeWidth={1.75} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={() => setSuggestionsOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") applySearch(searchQuery);
                    }}
                    placeholder="Try: 2bhk in Koramangala"
                    className="min-w-0 flex-1 bg-transparent text-sm text-[#1e293b] outline-none placeholder:text-slate-400"
                  />
                  <VoiceMicButton onResult={onSearchChange} />
                </div>
              </div>
              {onFilterClick && (
                <button
                  type="button"
                  onClick={onFilterClick}
                  className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#334155] transition hover:border-[#FF052B] hover:text-[#FF052B] sm:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </button>
              )}
              <button
                type="button"
                onClick={() => applySearch(searchQuery)}
                className="flex shrink-0 items-center gap-2 rounded-xl bg-[#FF052B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e00426] sm:px-8"
              >
                <Search className="h-4 w-4 sm:hidden" />
                <span className="hidden sm:inline">Search</span>
                <span className="sm:hidden">Go</span>
              </button>
            </div>

            {suggestionsOpen && (
              <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-xl">
                {searchQuery.trim().length >= 2 && suggestions.length > 0 && (
                  <div className="border-b border-slate-100 p-2">
                    {suggestions.map((item) => (
                      <button
                        key={item.query}
                        type="button"
                        onClick={() => applySearch(item.query)}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-[#334155] hover:bg-slate-50"
                      >
                        <Search className="h-4 w-4 shrink-0 text-slate-400" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}

                {recentSearches.length > 0 && (
                  <div className="border-b border-slate-100 p-3">
                    <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                      <Clock className="h-3.5 w-3.5" />
                      Recent Searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => applySearch(item)}
                          className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-[#334155] hover:bg-slate-200"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-3">
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => applySearch(item)}
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-[#334155] hover:border-[#FF052B] hover:text-[#FF052B]"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              index === current
                ? "w-7 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
