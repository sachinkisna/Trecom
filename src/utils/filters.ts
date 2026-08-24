import type { MarketplaceProperty } from "@/data/properties";

export type FilterState = {
  propertyTypes: string[];
  minPrice: string;
  maxPrice: string;
  city: string;
  locality: string;
  pincode: string;
  bhk: string[];
  furnishing: string[];
  possession: string[];
  amenities: string[];
};

export const defaultFilters: FilterState = {
  propertyTypes: [],
  minPrice: "",
  maxPrice: "",
  city: "",
  locality: "",
  pincode: "",
  bhk: [],
  furnishing: [],
  possession: [],
  amenities: [],
};

export function searchProperties(
  properties: MarketplaceProperty[],
  query: string
): MarketplaceProperty[] {
  const q = query.trim().toLowerCase();
  if (!q) return properties;

  return properties.filter((p) => {
    const haystack = [
      p.title,
      p.city,
      p.locality,
      p.area,
      p.propertyType,
      p.bhk,
      p.pincode,
      p.projectName ?? "",
      p.description,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}

export function filterByPurpose(
  properties: MarketplaceProperty[],
  purpose: string
): MarketplaceProperty[] {
  if (purpose === "sell") {
    return properties.filter(
      (p) => p.purpose === "sell" || p.purpose === "buy"
    );
  }
  return properties.filter((p) => p.purpose === purpose);
}

export function filterByBHK(
  properties: MarketplaceProperty[],
  bhk: string | null
): MarketplaceProperty[] {
  if (!bhk) return properties;
  return properties.filter((p) => p.bhk === bhk);
}

export function applyFilters(
  properties: MarketplaceProperty[],
  filters: FilterState
): MarketplaceProperty[] {
  let result = [...properties];

  if (filters.propertyTypes.length) {
    result = result.filter((p) =>
      filters.propertyTypes.includes(p.propertyType)
    );
  }

  if (filters.minPrice) {
    const min = Number(filters.minPrice);
    if (!Number.isNaN(min)) {
      result = result.filter((p) => p.priceValue >= min);
    }
  }

  if (filters.maxPrice) {
    const max = Number(filters.maxPrice);
    if (!Number.isNaN(max)) {
      result = result.filter((p) => p.priceValue <= max);
    }
  }

  if (filters.city) {
    result = result.filter(
      (p) => p.city.toLowerCase() === filters.city.toLowerCase()
    );
  }

  if (filters.locality) {
    const loc = filters.locality.toLowerCase();
    result = result.filter(
      (p) =>
        p.locality.toLowerCase().includes(loc) ||
        p.area.toLowerCase().includes(loc)
    );
  }

  if (filters.pincode) {
    result = result.filter((p) => p.pincode.includes(filters.pincode));
  }

  if (filters.bhk.length) {
    result = result.filter((p) => filters.bhk.includes(p.bhk));
  }

  if (filters.furnishing.length) {
    result = result.filter((p) => filters.furnishing.includes(p.furnishing));
  }

  if (filters.possession.length) {
    result = result.filter((p) => filters.possession.includes(p.possession));
  }

  if (filters.amenities.length) {
    result = result.filter((p) =>
      filters.amenities.every((a) => p.amenities.includes(a))
    );
  }

  return result;
}

export function filterByCity(
  properties: MarketplaceProperty[],
  city: string
): MarketplaceProperty[] {
  return properties.filter(
    (p) => p.city.toLowerCase() === city.toLowerCase()
  );
}

export function filterByPropertyType(
  properties: MarketplaceProperty[],
  type: string
): MarketplaceProperty[] {
  return properties.filter((p) => p.propertyType === type);
}

export function filterLuxury(
  properties: MarketplaceProperty[]
): MarketplaceProperty[] {
  return properties.filter((p) => p.priceValue >= 150);
}
