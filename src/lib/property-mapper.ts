import type { ApiProperty } from "@/lib/api/properties";
import { resolveMediaUrl } from "@/lib/api/properties";
import type { MarketplaceProperty } from "@/data/properties";
import type { EnrichedProperty } from "@/lib/property-meta";
import type { PropertyCategory } from "@/lib/data";

function formatIndianPrice(amount: number, purpose?: string) {
  if (purpose === "RENT" || purpose === "rent") {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakh/mo`;
    }
    return `₹${amount.toLocaleString("en-IN")}/mo`;
  }

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

function formatPostedAgo(date?: string) {
  if (!date) return "Recently posted";
  const created = new Date(date).getTime();
  const diffHours = Math.max(1, Math.floor((Date.now() - created) / (1000 * 60 * 60)));
  if (diffHours < 24) return `Posted ${diffHours} hours ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `Posted ${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

function mapPurpose(purpose: string): MarketplaceProperty["purpose"] {
  const map: Record<string, MarketplaceProperty["purpose"]> = {
    BUY: "buy",
    RENT: "rent",
    PG: "pg",
    COMMERCIAL: "commercial",
    PLOTS: "plots",
  };
  return map[purpose.toUpperCase()] || "buy";
}

export function mapApiPropertyToCard(property: ApiProperty): MarketplaceProperty {
  const id = String(property.id || property._id || "");
  const rawImages = property.images?.length
    ? property.images
    : ["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85"];
  const images = rawImages.map((src) => resolveMediaUrl(src) || src);

  return {
    id,
    title: property.title,
    city: property.city,
    locality: property.locality,
    area: property.locality,
    pincode: property.pincode || "",
    propertyType: property.propertyType,
    bhk: property.bhk || "",
    price: formatIndianPrice(property.price, property.purpose),
    priceValue: property.price / 100000,
    areaSqft: property.area || 0,
    furnishing: property.furnishing || "Unfurnished",
    possession: property.possession || "Ready to Move",
    image: images[0],
    images,
    amenities: property.amenities || [],
    verified: Boolean(property.verified),
    postedBy: (property.postedBy as MarketplaceProperty["postedBy"]) || "Owner",
    postedDate: property.createdAt?.slice(0, 10) || "",
    postedAgo: formatPostedAgo(property.createdAt),
    purpose: mapPurpose(property.purpose),
    projectName: property.projectName,
    floor: property.floor,
    totalFloors: property.totalFloors,
    parking: property.parking,
    description: property.description || "",
  };
}

export function mapApiPropertyToEnriched(property: ApiProperty): EnrichedProperty {
  const card = mapApiPropertyToCard(property);
  const purpose = mapPurpose(property.purpose);
  const category: PropertyCategory =
    purpose === "rent"
      ? "rent"
      : purpose === "commercial"
        ? "commercial"
        : purpose === "plots"
          ? "plots"
          : "buy";

  return {
    id: card.id,
    title: card.title,
    location: `${card.locality}, ${card.city}`,
    city: card.city,
    category,
    propertyType: card.propertyType,
    price: card.price,
    priceLakhs: card.priceValue,
    area: `${card.areaSqft} sq ft`,
    areaSqft: card.areaSqft,
    bedrooms: card.bhk || "",
    bathrooms: property.bathrooms ? `${property.bathrooms} Baths` : "",
    furnishing: card.furnishing,
    floor: card.floor || "",
    facing: property.facing || "",
    parking: card.parking || "",
    score: 92,
    image: card.image,
    amenities: card.amenities,
    description: card.description,
    lat: 12.9716,
    lng: 77.5946,
    status: "Available",
    verified: card.verified,
    verifiedOwner: card.postedBy === "Owner",
    images: card.images,
    createdAt: card.postedDate || new Date().toISOString().slice(0, 10),
    monthlyRent: category === "rent" ? property.price : undefined,
    tag: "new",
  };
}

export function listingHref(id: number | string) {
  const value = String(id);
  if (/^[a-f0-9]{24}$/i.test(value)) return `/property/${value}/`;
  return `/properties/${value}/`;
}

export function mergeById<T extends { id: string | number }>(primary: T[], secondary: T[]) {
  const seen = new Set(primary.map((item) => String(item.id)));
  return [...primary, ...secondary.filter((item) => !seen.has(String(item.id)))];
}
