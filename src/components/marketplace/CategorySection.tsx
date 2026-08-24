"use client";

import {
  Building2,
  Home,
  LandPlot,
  Map,
  Briefcase,
  Bed,
  Sparkles,
  Building,
} from "lucide-react";
import { propertyCategories } from "@/data/categories";

const icons: Record<string, React.ElementType> = {
  building: Building,
  home: Home,
  house: LandPlot,
  map: Map,
  briefcase: Briefcase,
  bed: Bed,
  sparkles: Sparkles,
  building2: Building2,
};

export default function CategorySection({
  onCategorySelect,
}: {
  onCategorySelect?: (type: string, purpose?: string) => void;
}) {
  return (
    <section className="bg-[#f8fafc] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-[#1e293b] sm:text-3xl">
          Explore Property Types
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {propertyCategories.map((cat) => {
            const Icon = icons[cat.icon] ?? Building;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => {
                  if (cat.href) {
                    window.location.href = cat.href;
                    return;
                  }
                  onCategorySelect?.(
                    cat.type ?? "",
                    cat.purpose ?? (cat.tag === "luxury" ? "buy" : undefined)
                  );
                  document.getElementById("all-properties")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-[#FF052B]/30 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-[#334155]">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <span className="mt-3 text-sm font-semibold text-[#1e293b]">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
