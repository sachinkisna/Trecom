export const CONTACT = {
  phone: "+919844442668",
  phoneDisplay: "+91 98444 42668",
  whatsapp: "919844442668",
  email: "care.trecom@gmail.com",
  address: "Bangalore, Karnataka, India",
  hours: "Mon – Sat, 9:00 AM – 7:00 PM",
} as const;

export const PROPERTY_TYPES = [
  "Apartment",
  "Villa",
  "Independent House",
  "Plot",
  "Farm Land",
  "Commercial",
  "Office Space",
  "Shop",
  "Warehouse",
  "Retail",
] as const;

export const PROPERTY_STATUSES = [
  "Available",
  "Sold",
  "Booked",
  "Under Construction",
  "Ready to Move",
  "Rented",
  "Inactive",
] as const;

export const BUDGET_RANGES_BUY = [
  { label: "Any Budget", min: 0, max: Infinity },
  { label: "Under ₹50 Lakh", min: 0, max: 50 },
  { label: "₹50 Lakh – ₹80 Lakh", min: 50, max: 80 },
  { label: "₹80 Lakh – ₹1.2 Cr", min: 80, max: 120 },
  { label: "Above ₹1.2 Cr", min: 120, max: Infinity },
] as const;

export const BUDGET_RANGES_RENT = [
  { label: "Any Budget", min: 0, max: Infinity },
  { label: "Under ₹20,000/mo", min: 0, max: 20000 },
  { label: "₹20,000 – ₹35,000/mo", min: 20000, max: 35000 },
  { label: "₹35,000 – ₹50,000/mo", min: 35000, max: 50000 },
  { label: "Above ₹50,000/mo", min: 50000, max: Infinity },
] as const;

export const LOCATIONS = [
  "Whitefield",
  "Electronic City",
  "Sarjapur Road",
  "Hosur Road",
  "Indiranagar",
  "MG Road",
  "Anekal",
  "Attibele",
  "Yelahanka",
  "Hebbal",
  "Devanahalli",
] as const;

export const TAB_TO_CATEGORY = {
  Buy: "buy",
  Rent: "rent",
  Commercial: "commercial",
  Plots: "plots",
  Projects: "projects",
} as const;

export const CATEGORY_TO_TAB: Record<string, string> = {
  buy: "Buy",
  rent: "Rent",
  commercial: "Commercial",
  plots: "Plots",
};
