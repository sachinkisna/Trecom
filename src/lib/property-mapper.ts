import type { ApiProperty } from "@/lib/api/properties";
import type { MarketplaceProperty } from "@/data/properties";

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
  const id = property.id || property._id || "";
  const images = property.images?.length
    ? property.images
    : ["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85"];

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
