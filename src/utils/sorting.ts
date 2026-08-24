import type { MarketplaceProperty } from "@/data/properties";

export function sortProperties(
  properties: MarketplaceProperty[],
  sortBy: string
): MarketplaceProperty[] {
  const list = [...properties];

  switch (sortBy) {
    case "price-low":
      return list.sort((a, b) => a.priceValue - b.priceValue);
    case "price-high":
      return list.sort((a, b) => b.priceValue - a.priceValue);
    case "newest":
      return list.sort(
        (a, b) =>
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      );
    case "area-low":
      return list.sort((a, b) => a.areaSqft - b.areaSqft);
    case "area-high":
      return list.sort((a, b) => b.areaSqft - a.areaSqft);
    case "recommended":
    default:
      return list.sort((a, b) => {
        if (a.verified !== b.verified) return a.verified ? -1 : 1;
        return (
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        );
      });
  }
}
