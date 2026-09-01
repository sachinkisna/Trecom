import type { Property, PropertyCategory, Project } from "./data";
import { properties, projects, locations } from "./data";
import { enrichProperty, type EnrichedProperty } from "./property-meta";
import { BUDGET_RANGES_BUY, BUDGET_RANGES_RENT } from "./constants";

export type SearchParams = {
  purpose?: string;
  location?: string;
  type?: string;
  budget?: string;
  bedrooms?: string;
  bathrooms?: string;
  q?: string;
  view?: "list" | "map";
  sort?: string;
  status?: string;
};

export type AutocompleteSuggestion = {
  label: string;
  sublabel?: string;
  type: "location" | "project" | "property" | "landmark";
  href?: string;
};

import { getUserProperties } from "./user-properties";

export function getEnrichedProperties(): EnrichedProperty[] {
  const staticProps = properties.map(enrichProperty);
  const userProps = getUserProperties();
  return [...userProps, ...staticProps];
}

export function getAvailableProperties(): EnrichedProperty[] {
  return getEnrichedProperties().filter(
    (p) =>
      p.status === "Available" ||
      p.status === "Ready to Move" ||
      p.status === "Under Construction"
  );
}

export function searchAutocomplete(query: string): AutocompleteSuggestion[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: AutocompleteSuggestion[] = [];

  for (const loc of locations) {
    if (loc.name.toLowerCase().includes(q)) {
      results.push({
        label: loc.name,
        sublabel: `${loc.city} · Location`,
        type: "location",
        href: `/properties/?purpose=buy&location=${encodeURIComponent(loc.name)}`,
      });
    }
    for (const sub of loc.subLocalities) {
      if (sub.name.toLowerCase().includes(q)) {
        results.push({
          label: sub.name,
          sublabel: `${loc.name} · Locality`,
          type: "landmark",
          href: `/properties/?purpose=buy&location=${encodeURIComponent(sub.name)}`,
        });
      }
    }
  }

  for (const project of projects) {
    if (
      project.name.toLowerCase().includes(q) ||
      project.developer.toLowerCase().includes(q)
    ) {
      results.push({
        label: project.name,
        sublabel: `${project.developer} · Project`,
        type: "project",
        href: `/projects/${project.slug}/`,
      });
    }
  }

  for (const property of getAvailableProperties()) {
    if (
      property.title.toLowerCase().includes(q) ||
      property.location.toLowerCase().includes(q) ||
      String(property.id) === q ||
      property.projectName?.toLowerCase().includes(q)
    ) {
      results.push({
        label: property.title,
        sublabel: `${property.location} · ID ${property.id}`,
        type: "property",
        href: `/properties/${property.id}/`,
      });
    }
  }

  return results.slice(0, 8);
}

export function parseCategory(purpose?: string): PropertyCategory {
  const map: Record<string, PropertyCategory> = {
    buy: "buy",
    rent: "rent",
    commercial: "commercial",
    plots: "plots",
  };
  return map[purpose?.toLowerCase() ?? ""] ?? "buy";
}

export function buildSearchUrl(params: {
  purpose?: string;
  location?: string;
  type?: string;
  budget?: string;
  bedrooms?: string;
  q?: string;
  view?: string;
  tag?: string;
}): string {
  const sp = new URLSearchParams();
  if (params.purpose) sp.set("purpose", params.purpose);
  if (params.location) sp.set("location", params.location);
  if (params.type && params.type !== "all") sp.set("type", params.type);
  if (params.budget && params.budget !== "0") sp.set("budget", params.budget);
  if (params.bedrooms && params.bedrooms !== "Any") sp.set("bedrooms", params.bedrooms);
  if (params.q) sp.set("q", params.q);
  if (params.view === "map") sp.set("view", "map");
  if (params.tag) sp.set("tag", params.tag);
  const qs = sp.toString();
  return `/properties/${qs ? `?${qs}` : ""}`;
}

export function filterProperties(
  list: EnrichedProperty[],
  filters: {
    category: PropertyCategory;
    location?: string;
    search?: string;
    propertyType?: string;
    budgetIndex?: number;
    bedrooms?: string;
    bathrooms?: string;
    status?: string;
    sort?: string;
    tag?: string;
  }
): EnrichedProperty[] {
  let result = list.filter((p) => p.category === filters.category);

  result = result.filter(
    (p) =>
      p.status === "Available" ||
      p.status === "Ready to Move" ||
      p.status === "Under Construction"
  );

  const budgetRanges =
    filters.category === "rent" ? BUDGET_RANGES_RENT : BUDGET_RANGES_BUY;
  const range = budgetRanges[filters.budgetIndex ?? 0];
  if (range && range.max !== Infinity) {
    if (filters.category === "rent") {
      result = result.filter(
        (p) =>
          (p.monthlyRent ?? 0) >= range.min &&
          (p.monthlyRent ?? 0) <= range.max
      );
    } else {
      result = result.filter(
        (p) => p.priceLakhs >= range.min && p.priceLakhs <= range.max
      );
    }
  } else if (range && range.max === Infinity && range.min > 0) {
    if (filters.category === "rent") {
      result = result.filter((p) => (p.monthlyRent ?? 0) >= range.min);
    } else {
      result = result.filter((p) => p.priceLakhs >= range.min);
    }
  }

  if (filters.bedrooms && filters.bedrooms !== "Any") {
    result = result.filter((p) => p.bedrooms === filters.bedrooms);
  }

  if (filters.bathrooms && filters.bathrooms !== "Any") {
    result = result.filter((p) => p.bathrooms.startsWith(filters.bathrooms!));
  }

  if (filters.propertyType && filters.propertyType !== "all") {
    result = result.filter(
      (p) => p.propertyType.toLowerCase() === filters.propertyType!.toLowerCase()
    );
  }

  if (filters.status && filters.status !== "all") {
    result = result.filter((p) => p.status === filters.status);
  }

  if (filters.tag && filters.tag !== "all") {
    result = result.filter((p) => p.tag === filters.tag);
  }

  if (filters.location?.trim()) {
    const loc = filters.location.trim().toLowerCase();
    result = result.filter(
      (p) =>
        p.location.toLowerCase().includes(loc) ||
        p.city.toLowerCase().includes(loc)
    );
  }

  if (filters.search?.trim()) {
    const q = filters.search.trim().toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.propertyType.toLowerCase().includes(q) ||
        p.projectName?.toLowerCase().includes(q) ||
        String(p.id) === q
    );
  }

  if (filters.sort === "price-low") {
    result = [...result].sort((a, b) =>
      filters.category === "rent"
        ? (a.monthlyRent ?? 0) - (b.monthlyRent ?? 0)
        : a.priceLakhs - b.priceLakhs
    );
  } else if (filters.sort === "price-high") {
    result = [...result].sort((a, b) =>
      filters.category === "rent"
        ? (b.monthlyRent ?? 0) - (a.monthlyRent ?? 0)
        : b.priceLakhs - a.priceLakhs
    );
  } else if (filters.sort === "score") {
    result = [...result].sort((a, b) => b.score - a.score);
  } else if (filters.sort === "newest") {
    result = [...result].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else {
    result = [...result].sort((a, b) => {
      const tagScore = (p: EnrichedProperty) =>
        p.tag === "featured" ? 4 : p.tag === "premium" ? 3 : p.tag === "trending" ? 2 : p.tag === "new" ? 1 : 0;
      return tagScore(b) - tagScore(a) || b.score - a.score;
    });
  }

  return result;
}

export function getSimilarProperties(
  property: EnrichedProperty,
  limit = 3
): EnrichedProperty[] {
  return getAvailableProperties()
    .filter((p) => p.id !== property.id && p.category === property.category)
    .map((p) => {
      let score = 0;
      if (p.location.split(",")[0] === property.location.split(",")[0]) score += 3;
      if (p.propertyType === property.propertyType) score += 2;
      if (p.bedrooms === property.bedrooms) score += 2;
      const priceDiff = Math.abs(p.priceLakhs - property.priceLakhs);
      if (priceDiff < 20) score += 2;
      const areaDiff = Math.abs(p.areaSqft - property.areaSqft);
      if (areaDiff < 300) score += 1;
      return { property: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.property);
}

export function getFeaturedProperties(limit = 6): EnrichedProperty[] {
  return getAvailableProperties()
    .filter((p) => p.tag === "featured" || p.tag === "premium" || p.tag === "trending")
    .slice(0, limit);
}

export function getRecentProperties(limit = 6): EnrichedProperty[] {
  return [...getAvailableProperties()]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);
}

export function getPropertyById(id: number | string): EnrichedProperty | undefined {
  const all = getEnrichedProperties();
  const numericId = typeof id === "string" ? Number(id) : id;
  if (Number.isFinite(numericId)) {
    const found = all.find((x) => x.id === numericId);
    if (found) return found;
  }
  return all.find((x) => String(x.id) === String(id));
}

export type { Property, Project, EnrichedProperty };
