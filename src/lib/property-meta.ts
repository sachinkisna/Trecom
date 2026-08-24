import type { Property } from "./data";

export type PropertyStatus =
  | "Available"
  | "Sold"
  | "Booked"
  | "Under Construction"
  | "Ready to Move"
  | "Rented"
  | "Inactive";

export type PropertyTag = "featured" | "new" | "trending" | "premium";

export type PropertyMeta = {
  lat: number;
  lng: number;
  status: PropertyStatus;
  verified: boolean;
  verifiedOwner?: boolean;
  verifiedAgent?: boolean;
  reraVerified?: boolean;
  tag?: PropertyTag;
  images: string[];
  projectName?: string;
  monthlyRent?: number;
  createdAt: string;
};

const meta: Record<number, PropertyMeta> = {
  1: {
    lat: 12.8456,
    lng: 77.6603,
    status: "Available",
    verified: true,
    verifiedAgent: true,
    tag: "featured",
    images: [],
    projectName: "Urban Heights",
    createdAt: "2025-11-12",
  },
  2: {
    lat: 12.9166,
    lng: 77.6761,
    status: "Available",
    verified: true,
    verifiedOwner: true,
    tag: "premium",
    images: [],
    createdAt: "2025-10-28",
  },
  3: {
    lat: 12.9698,
    lng: 77.7499,
    status: "Ready to Move",
    verified: true,
    verifiedAgent: true,
    reraVerified: true,
    tag: "trending",
    images: [],
    projectName: "Prestige Lakeside Habitat",
    createdAt: "2026-01-05",
  },
  4: {
    lat: 12.9028,
    lng: 77.6512,
    status: "Available",
    verified: true,
    tag: "new",
    images: [],
    createdAt: "2026-02-14",
  },
  5: {
    lat: 12.7083,
    lng: 77.6956,
    status: "Available",
    verified: true,
    verifiedOwner: true,
    tag: "premium",
    images: [],
    createdAt: "2025-09-20",
  },
  6: {
    lat: 12.7812,
    lng: 77.7701,
    status: "Available",
    verified: false,
    images: [],
    createdAt: "2026-01-22",
  },
  7: {
    lat: 12.8389,
    lng: 77.6518,
    status: "Ready to Move",
    verified: true,
    verifiedAgent: true,
    reraVerified: true,
    tag: "featured",
    images: [],
    projectName: "Urban Heights",
    createdAt: "2025-12-01",
  },
  8: {
    lat: 12.9712,
    lng: 77.751,
    status: "Available",
    verified: true,
    verifiedOwner: true,
    tag: "trending",
    images: [],
    monthlyRent: 32000,
    createdAt: "2026-02-01",
  },
  9: {
    lat: 12.9189,
    lng: 77.6721,
    status: "Available",
    verified: true,
    verifiedAgent: true,
    images: [],
    monthlyRent: 45000,
    createdAt: "2026-01-18",
  },
  10: {
    lat: 12.9756,
    lng: 77.6063,
    status: "Available",
    verified: true,
    verifiedAgent: true,
    reraVerified: true,
    tag: "premium",
    images: [],
    createdAt: "2025-11-30",
  },
  11: {
    lat: 12.9784,
    lng: 77.6408,
    status: "Available",
    verified: true,
    images: [],
    createdAt: "2025-10-15",
  },
  12: {
    lat: 12.7798,
    lng: 77.7823,
    status: "Available",
    verified: true,
    verifiedOwner: true,
    images: [],
    createdAt: "2026-01-08",
  },
};

export type EnrichedProperty = Property & PropertyMeta;

export function enrichProperty(property: Property): EnrichedProperty {
  const extra = meta[property.id] ?? {
    lat: 12.9716,
    lng: 77.5946,
    status: "Available" as PropertyStatus,
    verified: false,
    images: [property.image],
    createdAt: "2025-01-01",
  };

  return {
    ...property,
    ...extra,
    images:
      extra.images.length > 0
        ? extra.images
        : [property.image, property.image, property.image],
  };
}
