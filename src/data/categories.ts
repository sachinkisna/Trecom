export const popularLocations = [
  { name: "Bengaluru", count: "12,400+", slug: "bengaluru" },
  { name: "Mumbai", count: "18,200+", slug: "mumbai" },
  { name: "Hyderabad", count: "9,800+", slug: "hyderabad" },
  { name: "Pune", count: "8,600+", slug: "pune" },
  { name: "Chennai", count: "7,200+", slug: "chennai" },
  { name: "Delhi NCR", count: "15,500+", slug: "delhi-ncr" },
  { name: "Noida", count: "5,400+", slug: "noida" },
  { name: "Gurgaon", count: "6,100+", slug: "gurgaon" },
  { name: "Ahmedabad", count: "4,900+", slug: "ahmedabad" },
  { name: "Kolkata", count: "5,700+", slug: "kolkata" },
];

export const propertyCategories = [
  { name: "Apartments", type: "Apartment", icon: "building" },
  { name: "Villas", type: "Villa", icon: "home" },
  { name: "Independent Houses", type: "Independent House", icon: "house" },
  { name: "Plots", type: "Plot", purpose: "plots", icon: "map" },
  { name: "Commercial", purpose: "commercial", icon: "briefcase" },
  { name: "PG", purpose: "pg", icon: "bed" },
  { name: "Luxury Homes", tag: "luxury", icon: "sparkles" },
  { name: "New Projects", href: "/projects/", icon: "building2" },
];

export const BHK_OPTIONS = [
  "1 RK",
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "5+ BHK",
] as const;

export const PURPOSE_TABS = [
  { key: "buy", label: "Buy" },
  { key: "rent", label: "Rent" },
  { key: "sell", label: "Sell" },
  { key: "commercial", label: "Commercial" },
  { key: "pg", label: "PG" },
  { key: "plots", label: "Plots" },
] as const;

export const PROPERTY_TYPES = [
  "Apartment",
  "Villa",
  "Independent House",
  "Plot",
  "Studio",
  "Penthouse",
  "Office",
  "Shop",
  "Warehouse",
];

export const FURNISHING_OPTIONS = [
  "Fully Furnished",
  "Semi Furnished",
  "Unfurnished",
];

export const POSSESSION_OPTIONS = ["Ready to Move", "Under Construction"];

export const AMENITY_OPTIONS = [
  "Parking",
  "Lift",
  "Security",
  "Swimming Pool",
  "Gym",
  "Power Backup",
  "Garden",
  "Clubhouse",
];

export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "area-low", label: "Area: Low to High" },
  { value: "area-high", label: "Area: High to Low" },
];
