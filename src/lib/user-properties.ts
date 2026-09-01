import type { Property, PropertyCategory } from "./data";
import type { EnrichedProperty } from "./property-meta";
import type { MarketplaceProperty } from "@/data/properties";

const STORAGE_KEY = "trecom_user_properties";

export function getUserProperties(): EnrichedProperty[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as EnrichedProperty[];
  } catch {
    return [];
  }
}

export function saveUserProperty(data: {
  title: string;
  intent: string; // "Sell" | "Rent"
  category: string; // "Apartment", "Independent House", "Villa", "Plot", "Resale", "Commercial", "Pre-Launch"
  config: string; // "1 BHK", "2 BHK", etc.
  furnishing: string;
  facing: string;
  ownerType: string;
  amenities: string[];
  images: string[];
  location: string;
  pincode?: string;
  price: string;
  builtup: string;
  carpet?: string;
  bathrooms?: string;
  floor?: string;
  parking?: string;
  description: string;
  name: string;
  phone: string;
  email?: string;
}): EnrichedProperty {
  const existing = getUserProperties();
  const nextId = 2000 + existing.length + 1;

  // Determine property category
  let cat: PropertyCategory = "buy";
  if (data.intent === "Rent") {
    cat = "rent";
  } else if (data.category === "Commercial") {
    cat = "commercial";
  } else if (data.category === "Plot") {
    cat = "plots";
  }

  // Calculate numeric price in Lakhs
  const parsedPrice = parseFloat(data.price.replace(/[^0-9.]/g, "")) || 50;
  const priceLakhs = data.price.toLowerCase().includes("cr")
    ? parsedPrice * 100
    : parsedPrice;

  const parsedArea = parseInt(data.builtup.replace(/[^0-9]/g, ""), 10) || 1200;

  const mainImage =
    data.images.length > 0
      ? data.images[0]
      : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85";

  const newProperty: EnrichedProperty = {
    id: nextId,
    title: data.title || `${data.config} ${data.category} in ${data.location}`,
    location: data.location || "Bangalore",
    city: "Bangalore",
    category: cat,
    propertyType: data.category || "Apartment",
    price: data.price ? `₹${data.price}` : "₹50 Lakh",
    priceLakhs,
    monthlyRent: cat === "rent" ? (parsedPrice > 1000 ? parsedPrice : parsedPrice * 1000) : undefined,
    area: `${parsedArea} sq ft`,
    areaSqft: parsedArea,
    bedrooms: data.config || "2 BHK",
    bathrooms: data.bathrooms ? `${data.bathrooms} Baths` : "2 Baths",
    furnishing: data.furnishing || "Semi-Furnished",
    floor: data.floor || "2nd Floor",
    facing: data.facing || "East",
    parking: data.parking || "1 Covered",
    score: 95,
    image: mainImage,
    amenities: data.amenities.length > 0 ? data.amenities : ["Parking", "Power Backup", "Security"],
    description:
      data.description ||
      `Beautiful ${data.config} ${data.category} available for ${data.intent.toLowerCase()} in ${data.location}. Listed by verified ${data.ownerType.toLowerCase()}. Contact ${data.name} at ${data.phone}.`,
    lat: 12.9716,
    lng: 77.5946,
    status: "Available", // Approved & Live immediately
    verified: true,
    verifiedOwner: true,
    images: data.images.length > 0 ? data.images : [mainImage],
    createdAt: new Date().toISOString().split("T")[0],
  };

  if (typeof window !== "undefined") {
    try {
      const updated = [newProperty, ...existing];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save user property to localStorage", e);
    }
  }

  return newProperty;
}

export function toMarketplaceProperty(p: EnrichedProperty): MarketplaceProperty {
  return {
    id: p.id,
    title: p.title,
    city: p.city,
    locality: p.location,
    area: p.location,
    pincode: "560001",
    propertyType: p.propertyType,
    bhk: p.bedrooms,
    price: p.price,
    priceValue: p.priceLakhs,
    areaSqft: p.areaSqft,
    furnishing: p.furnishing,
    possession: "Ready to Move",
    image: p.image,
    images: p.images,
    amenities: p.amenities,
    verified: p.verified,
    postedBy: "Owner",
    postedDate: p.createdAt,
    postedAgo: "Just now",
    purpose: p.category === "rent" ? "rent" : p.category === "commercial" ? "commercial" : p.category === "plots" ? "plots" : "buy",
    description: p.description,
  };
}
