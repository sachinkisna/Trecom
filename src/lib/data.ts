export type PropertyCategory =
  | "buy"
  | "rent"
  | "commercial"
  | "plots";

export type Property = {
  id: number;
  title: string;
  location: string;
  city: string;
  category: PropertyCategory;
  propertyType: string;
  price: string;
  priceLakhs: number;
  area: string;
  areaSqft: number;
  bedrooms: string;
  bathrooms: string;
  furnishing: string;
  floor: string;
  facing: string;
  parking: string;
  score: number;
  image: string;
  amenities: string[];
  description: string;
};

export type Project = {
  slug: string;
  name: string;
  developer: string;
  location: string;
  city: string;
  priceFrom: string;
  priceLakhs: number;
  configuration: string;
  possession: string;
  status: "Ready to Move" | "Under Construction";
  rera: string;
  image: string;
  amenities: string[];
  description: string;
};

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: ServiceIcon;
  features: { title: string; description: string }[];
};

export type ServiceIcon =
  | "home"
  | "legal"
  | "valuation"
  | "interiors"
  | "management"
  | "support";

export type Location = {
  slug: string;
  name: string;
  city: string;
  properties: string;
  avgPrice: string;
  growth: string;
  image: string;
  description: string;
  subLocalities: { name: string; properties: string; price: string }[];
};

const IMG = {
  a: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
  b: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
  c: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
  d: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
  e: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85",
  f: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
  g: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=85",
  h: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=85",
};

export const properties: Property[] = [
  {
    id: 1,
    title: "Premium 2 BHK Apartment",
    location: "Electronic City, Bangalore",
    city: "Bangalore",
    category: "buy",
    propertyType: "Apartment",
    price: "₹48 Lakh",
    priceLakhs: 48,
    area: "1,150 sq.ft",
    areaSqft: 1150,
    bedrooms: "2 BHK",
    bathrooms: "2 Bath",
    furnishing: "Semi-Furnished",
    floor: "7th of 12",
    facing: "East",
    parking: "1 Car",
    score: 94,
    image: IMG.a,
    amenities: ["Lift", "Power Backup", "Gym", "Security", "Park"],
    description:
      "A well-designed 2 BHK apartment in the heart of Electronic City with excellent connectivity to IT parks and the metro corridor.",
  },
  {
    id: 2,
    title: "Modern 3 BHK Villa",
    location: "Sarjapur Road, Bangalore",
    city: "Bangalore",
    category: "buy",
    propertyType: "Villa",
    price: "₹1.25 Cr",
    priceLakhs: 125,
    area: "2,100 sq.ft",
    areaSqft: 2100,
    bedrooms: "3 BHK",
    bathrooms: "3 Bath",
    furnishing: "Unfurnished",
    floor: "Ground + 2",
    facing: "North",
    parking: "2 Car",
    score: 97,
    image: IMG.b,
    amenities: ["Clubhouse", "Swimming Pool", "Garden", "Security", "Power Backup"],
    description:
      "Spacious independent villa on Sarjapur Road with premium finishes, private garden and a dedicated community clubhouse.",
  },
  {
    id: 3,
    title: "Contemporary Family Home",
    location: "Whitefield, Bangalore",
    city: "Bangalore",
    category: "buy",
    propertyType: "Apartment",
    price: "₹78 Lakh",
    priceLakhs: 78,
    area: "1,650 sq.ft",
    areaSqft: 1650,
    bedrooms: "3 BHK",
    bathrooms: "2 Bath",
    furnishing: "Furnished",
    floor: "9th of 18",
    facing: "South-East",
    parking: "1 Car",
    score: 91,
    image: IMG.c,
    amenities: ["Lift", "Gym", "Children's Play Area", "Security", "Rainwater Harvesting"],
    description:
      "A bright, fully-furnished 3 BHK in Whitefield close to schools, hospitals and the ITSEZ, ideal for families.",
  },
  {
    id: 4,
    title: "Luxury 2 BHK Residence",
    location: "Hosur Road, Bangalore",
    city: "Bangalore",
    category: "buy",
    propertyType: "Apartment",
    price: "₹62 Lakh",
    priceLakhs: 62,
    area: "1,280 sq.ft",
    areaSqft: 1280,
    bedrooms: "2 BHK",
    bathrooms: "2 Bath",
    furnishing: "Semi-Furnished",
    floor: "11th of 20",
    facing: "West",
    parking: "1 Car",
    score: 95,
    image: IMG.d,
    amenities: ["Lift", "Power Backup", "Gym", "Security", "Jogging Track"],
    description:
      "A contemporary 2 BHK residence on Hosur Road with panoramic city views and quick access to the ORR.",
  },
  {
    id: 5,
    title: "Spacious 4 BHK Villa",
    location: "Anekal, Bangalore",
    city: "Bangalore",
    category: "buy",
    propertyType: "Villa",
    price: "₹1.48 Cr",
    priceLakhs: 148,
    area: "2,750 sq.ft",
    areaSqft: 2750,
    bedrooms: "4 BHK",
    bathrooms: "4 Bath",
    furnishing: "Unfurnished",
    floor: "Ground + 2",
    facing: "East",
    parking: "2 Car",
    score: 96,
    image: IMG.e,
    amenities: ["Clubhouse", "Swimming Pool", "Garden", "Security", "EV Charging"],
    description:
      "An expansive 4 BHK villa in Anekal offering privacy, greenery and a thoughtfully planned layout for large families.",
  },
  {
    id: 6,
    title: "Elegant 2 BHK Home",
    location: "Attibele, Bangalore",
    city: "Bangalore",
    category: "buy",
    propertyType: "Apartment",
    price: "₹42 Lakh",
    priceLakhs: 42,
    area: "1,080 sq.ft",
    areaSqft: 1080,
    bedrooms: "2 BHK",
    bathrooms: "2 Bath",
    furnishing: "Semi-Furnished",
    floor: "5th of 10",
    facing: "North",
    parking: "1 Car",
    score: 90,
    image: IMG.f,
    amenities: ["Lift", "Security", "Park", "Power Backup"],
    description:
      "An elegant and affordable 2 BHK near Attibele with good access to the highway and upcoming social infrastructure.",
  },
  {
    id: 7,
    title: "Ready-to-Move 3 BHK Apartment",
    location: "Electronic City, Bangalore",
    city: "Bangalore",
    category: "buy",
    propertyType: "Apartment",
    price: "₹72 Lakh",
    priceLakhs: 72,
    area: "1,720 sq.ft",
    areaSqft: 1720,
    bedrooms: "3 BHK",
    bathrooms: "3 Bath",
    furnishing: "Furnished",
    floor: "14th of 22",
    facing: "South",
    parking: "1 Car",
    score: 93,
    image: IMG.g,
    amenities: ["Lift", "Gym", "Swimming Pool", "Security", "Clubhouse"],
    description:
      "A ready-to-move 3 BHK with premium interiors and resort-style amenities in a gated community on Electronic City.",
  },
  {
    id: 8,
    title: "Furnished 2 BHK for Rent",
    location: "Whitefield, Bangalore",
    city: "Bangalore",
    category: "rent",
    propertyType: "Apartment",
    price: "₹32,000/mo",
    priceLakhs: 0,
    area: "1,200 sq.ft",
    areaSqft: 1200,
    bedrooms: "2 BHK",
    bathrooms: "2 Bath",
    furnishing: "Furnished",
    floor: "8th of 16",
    facing: "East",
    parking: "1 Car",
    score: 92,
    image: IMG.c,
    amenities: ["Lift", "Power Backup", "Gym", "Security", "Wi-Fi"],
    description:
      "A fully-furnished 2 BHK for rent in Whitefield, perfect for working professionals with easy access to the metro.",
  },
  {
    id: 9,
    title: "Semi-Furnished 3 BHK for Rent",
    location: "Sarjapur Road, Bangalore",
    city: "Bangalore",
    category: "rent",
    propertyType: "Apartment",
    price: "₹45,000/mo",
    priceLakhs: 0,
    area: "1,650 sq.ft",
    areaSqft: 1650,
    bedrooms: "3 BHK",
    bathrooms: "3 Bath",
    furnishing: "Semi-Furnished",
    floor: "6th of 14",
    facing: "North",
    parking: "1 Car",
    score: 89,
    image: IMG.b,
    amenities: ["Lift", "Security", "Park", "Power Backup", "Clubhouse"],
    description:
      "A spacious semi-furnished 3 BHK for rent on Sarjapur Road with a large balcony and community amenities.",
  },
  {
    id: 10,
    title: "Prime Commercial Office Space",
    location: "MG Road, Bangalore",
    city: "Bangalore",
    category: "commercial",
    propertyType: "Office Space",
    price: "₹2.10 Cr",
    priceLakhs: 210,
    area: "3,400 sq.ft",
    areaSqft: 3400,
    bedrooms: "Office",
    bathrooms: "2 Bath",
    furnishing: "Furnished",
    floor: "5th of 9",
    facing: "Road",
    parking: "3 Car",
    score: 95,
    image: IMG.h,
    amenities: ["Central AC", "Power Backup", "Lift", "Security", "Meeting Rooms"],
    description:
      "A premium furnished office space on MG Road suitable for startups and established businesses with excellent visibility.",
  },
  {
    id: 11,
    title: "Retail Shop in High-Street Complex",
    location: "Indiranagar, Bangalore",
    city: "Bangalore",
    category: "commercial",
    propertyType: "Retail",
    price: "₹1.85 Cr",
    priceLakhs: 185,
    area: "1,200 sq.ft",
    areaSqft: 1200,
    bedrooms: "Shop",
    bathrooms: "1 Bath",
    furnishing: "Unfurnished",
    floor: "Ground",
    facing: "Main Road",
    parking: "2 Car",
    score: 93,
    image: IMG.a,
    amenities: ["Lift", "Power Backup", "Security", "High Footfall", "Signage"],
    description:
      "A high-visibility retail shop in a busy Indiranagar complex with strong footfall and excellent brand exposure.",
  },
  {
    id: 12,
    title: "Residential Plot near Hosur Road",
    location: "Attibele, Bangalore",
    city: "Bangalore",
    category: "plots",
    propertyType: "Plot",
    price: "₹38 Lakh",
    priceLakhs: 38,
    area: "1,500 sq.ft",
    areaSqft: 1500,
    bedrooms: "Plot",
    bathrooms: "-",
    furnishing: "Open",
    floor: "Ground",
    facing: "East",
    parking: "-",
    score: 88,
    image: IMG.d,
    amenities: ["Clear Title", "Corner Plot", "BDA Approved", "Gated Layout", "Water Connection"],
    description:
      "A BDA-approved corner plot in a gated layout near Hosur Road, ideal for building your dream home or investment.",
  },
];

export const projects: Project[] = [
  {
    slug: "prestige-lakeside-habitat",
    name: "Prestige Lakeside Habitat",
    developer: "Prestige Group",
    location: "Whitefield, Bangalore",
    city: "Bangalore",
    priceFrom: "₹1.12 Cr",
    priceLakhs: 112,
    configuration: "2, 3 & 4 BHK",
    possession: "Ready to Move",
    status: "Ready to Move",
    rera: "PRM/KA/RERA/1251/310/AG/171018",
    image: IMG.d,
    amenities: ["Lake View", "Clubhouse", "Swimming Pool", "Sports Court", "Landscaped Gardens"],
    description:
      "A flagship township by Prestige Group offering lake-facing homes, world-class amenities and a self-contained community lifestyle.",
  },
  {
    slug: "modern-green-valley",
    name: "Modern Green Valley",
    developer: "TRECOM Projects",
    location: "Sarjapur Road, Bangalore",
    city: "Bangalore",
    priceFrom: "₹78 Lakh",
    priceLakhs: 78,
    configuration: "2 & 3 BHK",
    possession: "Dec 2027",
    status: "Under Construction",
    rera: "PRM/KA/RERA/1251/446/AG/220307",
    image: IMG.b,
    amenities: ["Eco Design", "Solar Power", "Clubhouse", "Children's Play Area", "Jogging Track"],
    description:
      "An environmentally conscious development on Sarjapur Road with energy-efficient homes and abundant green spaces.",
  },
  {
    slug: "urban-heights",
    name: "Urban Heights",
    developer: "Urban Developers",
    location: "Electronic City, Bangalore",
    city: "Bangalore",
    priceFrom: "₹64 Lakh",
    priceLakhs: 64,
    configuration: "2 & 3 BHK",
    possession: "Jun 2027",
    status: "Under Construction",
    rera: "PRM/KA/RERA/1251/308/AG/190824",
    image: IMG.c,
    amenities: ["Sky Lounge", "Gym", "Swimming Pool", "Co-working Space", "Security"],
    description:
      "A modern high-rise community in Electronic City designed for the way young professionals live and work.",
  },
  {
    slug: "lakeview-residences",
    name: "Lakeview Residences",
    developer: "TRECOM Projects",
    location: "Hosur Road, Bangalore",
    city: "Bangalore",
    priceFrom: "₹55 Lakh",
    priceLakhs: 55,
    configuration: "1 & 2 BHK",
    possession: "Mar 2028",
    status: "Under Construction",
    rera: "PRM/KA/RERA/1251/772/AG/230110",
    image: IMG.a,
    amenities: ["Lake View", "Clubhouse", "Gym", "Children's Play Area", "Power Backup"],
    description:
      "Compact, thoughtfully designed homes near Hosur Road with resort-style amenities at an accessible price point.",
  },
  {
    slug: "heritage-crest",
    name: "Heritage Crest",
    developer: "Heritage Builders",
    location: "Anekal, Bangalore",
    city: "Bangalore",
    priceFrom: "₹95 Lakh",
    priceLakhs: 95,
    configuration: "3 & 4 BHK",
    possession: "Ready to Move",
    status: "Ready to Move",
    rera: "PRM/KA/RERA/1251/519/AG/180402",
    image: IMG.e,
    amenities: ["Gated Community", "Swimming Pool", "Clubhouse", "Garden", "Sports Court"],
    description:
      "Low-density villas and row houses in Anekal with generous plots, privacy and a strong sense of community.",
  },
  {
    slug: "metro-grand",
    name: "Metro Grand",
    developer: "Urban Developers",
    location: "Indiranagar, Bangalore",
    city: "Bangalore",
    priceFrom: "₹1.40 Cr",
    priceLakhs: 140,
    configuration: "2 & 3 BHK",
    possession: "Sep 2026",
    status: "Under Construction",
    rera: "PRM/KA/RERA/1251/633/AG/210815",
    image: IMG.h,
    amenities: ["Metro Proximity", "Sky Deck", "Gym", "Swimming Pool", "Concierge"],
    description:
      "Premium homes in Indiranagar moments from the metro, dining and the city's most vibrant social scene.",
  },
];

export const services: Service[] = [
  {
    slug: "home-loans",
    title: "Home Loans",
    shortDescription: "Compare financing options and find a suitable home loan.",
    longDescription:
      "TRECOM helps you understand home loan options from leading banks and financial institutions. Compare interest rates, eligibility and repayment plans so you can choose financing that fits your budget.",
    icon: "home",
    features: [
      { title: "Loan Comparison", description: "Compare rates and tenures across multiple lenders." },
      { title: "Eligibility Check", description: "Understand how much you can borrow before you apply." },
      { title: "Document Guidance", description: "Know the documents generally required for a home loan." },
      { title: "Process Support", description: "Step-by-step assistance through the loan journey." },
    ],
  },
  {
    slug: "legal",
    title: "Legal Assistance",
    shortDescription: "Get professional assistance for your property documentation.",
    longDescription:
      "Property transactions involve important documentation. TRECOM connects you with guidance on title verification, sale agreements and the paperwork needed to complete your transaction with confidence.",
    icon: "legal",
    features: [
      { title: "Title Verification", description: "Review ownership and title history of a property." },
      { title: "Agreement Drafting", description: "Assistance with sale and rental agreements." },
      { title: "Due Diligence", description: "Understand encumbrances and approvals." },
      { title: "Registration Support", description: "Guidance through the registration process." },
    ],
  },
  {
    slug: "valuation",
    title: "Property Valuation",
    shortDescription: "Understand the estimated market value of your property.",
    longDescription:
      "Whether you are buying, selling or planning, understanding a property's estimated market value helps you make informed decisions. TRECOM provides indicative valuation insights based on location and market trends.",
    icon: "valuation",
    features: [
      { title: "Market Insights", description: "Understand price trends in your locality." },
      { title: "Comparable Analysis", description: "See how similar properties are priced." },
      { title: "Indicative Value", description: "Get an estimated value range for your property." },
      { title: "Investment View", description: "Assess potential appreciation over time." },
    ],
  },
  {
    slug: "interiors",
    title: "Interior Design",
    shortDescription: "Transform your home with professional interior solutions.",
    longDescription:
      "Turn your property into a home with interior design solutions tailored to your space and lifestyle. From modular kitchens to complete makeovers, explore design options that fit your budget.",
    icon: "interiors",
    features: [
      { title: "Modular Kitchens", description: "Functional, stylish kitchen designs." },
      { title: "Space Planning", description: "Make the most of every square foot." },
      { title: "Custom Furniture", description: "Tailored furniture for your home." },
      { title: "End-to-End Execution", description: "From concept to completion." },
    ],
  },
  {
    slug: "property-management",
    title: "Property Management",
    shortDescription: "Reliable support for managing your property remotely.",
    longDescription:
      "Own a property but live elsewhere? TRECOM offers property management support including tenant handling, maintenance and periodic updates so your asset is cared for in your absence.",
    icon: "management",
    features: [
      { title: "Tenant Management", description: "Find and manage tenants responsibly." },
      { title: "Maintenance", description: "Coordinate repairs and upkeep." },
      { title: "Regular Updates", description: "Periodic reports on your property." },
      { title: "Rent Collection", description: "Hassle-free rent handling." },
    ],
  },
  {
    slug: "home-services",
    title: "Home Services",
    shortDescription: "Find trusted professionals for everyday home needs.",
    longDescription:
      "From plumbing and electrical work to cleaning and moving, TRECOM helps you discover trusted home service professionals for the everyday needs of your household.",
    icon: "support",
    features: [
      { title: "Repairs & Maintenance", description: "Verified technicians for quick fixes." },
      { title: "Cleaning Services", description: "Deep cleaning for homes and offices." },
      { title: "Packers & Movers", description: "Reliable relocation assistance." },
      { title: "Appliance Services", description: "Installation and servicing support." },
    ],
  },
];

export const locations: Location[] = [
  {
    slug: "electronic-city",
    name: "Electronic City",
    city: "Bangalore",
    properties: "2,340+ Properties",
    avgPrice: "₹5,850 / sq.ft",
    growth: "+8.4%",
    image: IMG.g,
    description:
      "Home to major IT campuses, Electronic City offers strong rental demand and steady appreciation, making it a favourite for professionals and investors.",
    subLocalities: [
      { name: "Phase 1", properties: "820+", price: "₹6,100 / sq.ft" },
      { name: "Phase 2", properties: "910+", price: "₹5,700 / sq.ft" },
      { name: "Neeladri Nagar", properties: "610+", price: "₹6,300 / sq.ft" },
    ],
  },
  {
    slug: "whitefield",
    name: "Whitefield",
    city: "Bangalore",
    properties: "3,180+ Properties",
    avgPrice: "₹8,950 / sq.ft",
    growth: "+11.2%",
    image: IMG.e,
    description:
      "A well-established hub with IT parks, malls and international schools, Whitefield combines liveability with strong long-term value.",
    subLocalities: [
      { name: "ITPL Road", properties: "1,040+", price: "₹9,200 / sq.ft" },
      { name: "Hagadur", properties: "760+", price: "₹8,400 / sq.ft" },
      { name: "Seegehalli", properties: "540+", price: "₹7,900 / sq.ft" },
    ],
  },
  {
    slug: "sarjapur-road",
    name: "Sarjapur Road",
    city: "Bangalore",
    properties: "2,760+ Properties",
    avgPrice: "₹7,200 / sq.ft",
    growth: "+9.7%",
    image: IMG.c,
    description:
      "Sarjapur Road bridges major employment centres and offers a mix of apartments and villas with excellent future growth potential.",
    subLocalities: [
      { name: "Kasavanahalli", properties: "880+", price: "₹7,400 / sq.ft" },
      { name: "Ambalipura", properties: "640+", price: "₹7,000 / sq.ft" },
      { name: "Choodasandra", properties: "510+", price: "₹6,800 / sq.ft" },
    ],
  },
  {
    slug: "indiranagar",
    name: "Indiranagar",
    city: "Bangalore",
    properties: "1,560+ Properties",
    avgPrice: "₹12,400 / sq.ft",
    growth: "+7.1%",
    image: IMG.h,
    description:
      "One of Bangalore's most sought-after addresses, Indiranagar offers premium homes, vibrant nightlife and unmatched connectivity.",
    subLocalities: [
      { name: "100 Feet Road", properties: "520+", price: "₹13,200 / sq.ft" },
      { name: "Defence Colony", properties: "430+", price: "₹12,000 / sq.ft" },
      { name: "Thippasandra", properties: "380+", price: "₹11,600 / sq.ft" },
    ],
  },
  {
    slug: "anekal",
    name: "Anekal",
    city: "Bangalore",
    properties: "1,120+ Properties",
    avgPrice: "₹4,200 / sq.ft",
    growth: "+13.5%",
    image: IMG.d,
    description:
      "An emerging belt with large plotted developments and villas, Anekal appeals to buyers seeking space and long-term appreciation.",
    subLocalities: [
      { name: "Attibele", properties: "460+", price: "₹4,400 / sq.ft" },
      { name: "Huskur", properties: "340+", price: "₹4,000 / sq.ft" },
      { name: "Marasur", properties: "300+", price: "₹3,800 / sq.ft" },
    ],
  },
  {
    slug: "mg-road",
    name: "MG Road",
    city: "Bangalore",
    properties: "740+ Properties",
    avgPrice: "₹14,800 / sq.ft",
    growth: "+6.3%",
    image: IMG.a,
    description:
      "The commercial heart of the city, MG Road is ideal for office spaces and retail with premium valuations and constant demand.",
    subLocalities: [
      { name: "Brigade Road", properties: "260+", price: "₹15,200 / sq.ft" },
      { name: "Trinity", properties: "240+", price: "₹14,400 / sq.ft" },
      { name: "Vasant Nagar", properties: "210+", price: "₹14,100 / sq.ft" },
    ],
  },
];

export function getProperty(id: number): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export const categoryLabels: Record<PropertyCategory, string> = {
  buy: "Buy",
  rent: "Rent",
  commercial: "Commercial",
  plots: "Plots",
};
