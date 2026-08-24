"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SearchAutocomplete from "@/components/SearchAutocomplete";
import VoiceMicButton from "@/components/VoiceMicButton";
import {
  BUDGET_RANGES_BUY,
  BUDGET_RANGES_RENT,
  LOCATIONS,
  PROPERTY_TYPES,
  TAB_TO_CATEGORY,
} from "@/lib/constants";
import { buildSearchUrl } from "@/lib/search";
import { trackEvent } from "@/lib/analytics";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=85",
    title: "Discover Better",
    highlight: "Real Estate",
    description:
      "Find a property that fits your life. Search verified homes across Bangalore.",
    cta: { label: "Browse Properties", href: "/properties/?purpose=buy" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85",
    title: "Find Your",
    highlight: "Dream Home",
    description:
      "Explore apartments, villas and gated communities with trusted guidance.",
    cta: { label: "View Featured Homes", href: "/properties/?purpose=buy&sort=featured" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=85",
    title: "Invest in the",
    highlight: "Right Location",
    description:
      "Discover high-growth neighbourhoods with local market expertise.",
    cta: { label: "Explore Locations", href: "/locations/" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2200&q=85",
    title: "Premium Properties.",
    highlight: "Trusted Guidance.",
    description:
      "Verified listings, transparent pricing and dedicated property advisors.",
    cta: { label: "Talk to an Advisor", href: "/contact/" },
  },
];

const tabs = ["Buy", "Rent", "Commercial", "Plots", "Projects"] as const;

export default function HeroSlider() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Buy");
  const [paused, setPaused] = useState(false);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [propertyType, setPropertyType] = useState("all");
  const [budget, setBudget] = useState(0);
  const touchStartX = useRef(0);

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

  const handleSearch = () => {
    if (activeTab === "Projects") {
      router.push(`/projects/${search ? `?q=${encodeURIComponent(search)}` : ""}`);
      return;
    }

    const purpose = TAB_TO_CATEGORY[activeTab];
    const url = buildSearchUrl({
      purpose,
      location: location !== "Bangalore" ? location : undefined,
      type: propertyType,
      budget: String(budget),
      q: search || undefined,
    });

    trackEvent("search", { purpose, location, q: search });
    router.push(url);
  };

  const budgetRanges =
    activeTab === "Rent" ? BUDGET_RANGES_RENT : BUDGET_RANGES_BUY;

  return (
    <section
      className="relative min-h-[720px] overflow-hidden bg-slate-950 pb-16 md:h-[620px] md:pb-0"
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
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/65" />
        </div>
      ))}

      <button
        type="button"
        onClick={previousSlide}
        aria-label="Previous slide"
        className="absolute left-5 top-[40%] z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-2xl text-white backdrop-blur-md transition hover:bg-white/35"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-5 top-[40%] z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-2xl text-white backdrop-blur-md transition hover:bg-white/35"
      >
        ›
      </button>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center px-6 pt-20 text-center">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-[56px]">
            {slides[current].title}
            <span className="block text-emerald-400">{slides[current].highlight}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/90 md:text-base">
            {slides[current].description}
          </p>
          <button
            type="button"
            onClick={() => router.push(slides[current].cta.href)}
            className="mt-5 inline-flex rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            {slides[current].cta.label} →
          </button>
        </div>

        <div className="mt-8 w-full max-w-4xl rounded-2xl bg-white p-3 shadow-2xl md:rounded-3xl">
          <div className="flex gap-1 overflow-x-auto border-b border-slate-100 pb-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  setBudget(0);
                  if (tab === "Projects") router.push("/projects/");
                }}
                className={`whitespace-nowrap rounded-lg px-5 py-2 text-sm font-semibold transition ${
                  activeTab === tab
                    ? "bg-emerald-700 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-3 flex flex-col gap-3">
            <div className="flex gap-2 sm:gap-3">
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 sm:px-4 sm:py-3">
                <span className="shrink-0 text-slate-400">⌕</span>
                <SearchAutocomplete
                  value={search}
                  onChange={setSearch}
                  placeholder="Search locality, project, landmark or property ID"
                  className="min-w-0 flex-1"
                />
                <VoiceMicButton onResult={setSearch} />
              </div>
              <button
                type="button"
                onClick={handleSearch}
                aria-label="Search properties"
                className="flex shrink-0 items-center justify-center rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800 sm:px-7"
              >
                <span className="hidden sm:inline">Search Properties</span>
                <span className="sm:hidden">Search</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-left text-sm hover:bg-slate-50"
              >
                <option value="Bangalore">Bangalore, KA</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>

              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-left text-sm hover:bg-slate-50"
              >
                <option value="all">All Property Types</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <select
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="rounded-xl border border-slate-200 px-4 py-3 text-left text-sm hover:bg-slate-50"
              >
                {budgetRanges.map((range, i) => (
                  <option key={range.label} value={i}>
                    {range.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => {
                  const purpose = TAB_TO_CATEGORY[activeTab];
                  router.push(
                    buildSearchUrl({
                      purpose,
                      location: location !== "Bangalore" ? location : undefined,
                      type: propertyType,
                      budget: String(budget),
                      q: search || undefined,
                      view: "map",
                    })
                  );
                  trackEvent("map_view");
                }}
                className="rounded-xl border border-emerald-700 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Explore Map
              </button>
            </div>
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
