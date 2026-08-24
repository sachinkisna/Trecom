import type { Metadata } from "next";
import PropertyCategoryPage, { type CategoryConfig } from "@/components/PropertyCategoryPage";

export const metadata: Metadata = {
  title: "Rent Property in Bangalore",
  description:
    "Find furnished and semi-furnished homes for rent in Bangalore with TRECOM — verified listings, clear rents and direct owner contact.",
};

const config: CategoryConfig = {
  key: "rent",
  eyebrow: "Rent Property",
  title: "Rent a Comfortable Home",
  subtitle:
    "Discover furnished and semi-furnished homes for rent across Bangalore, with verified owners and transparent monthly rents.",
  marquee: [
    "Furnished & Semi-Furnished Homes",
    "Verified Owners",
    "Transparent Monthly Rents",
    "Move-in Ready Listings",
    "Pet-Friendly Options",
    "No Hidden Charges",
  ],
  highlights: [
    { icon: "🔑", title: "Ready to Move", desc: "Find homes you can move into without delays." },
    { icon: "📷", title: "Real Photos", desc: "Listings show actual property images and details." },
    { icon: "💸", title: "Clear Rent", desc: "See the monthly rent and deposit upfront." },
    { icon: "🤝", title: "Direct Contact", desc: "Reach owners and schedule visits easily." },
  ],
  stats: [
    { value: "9,800+", label: "Rental Homes" },
    { value: "₹18K", label: "Avg. Starting Rent" },
    { value: "120+", label: "Localities" },
    { value: "24h", label: "Avg. Response" },
  ],
  whyTitle: "Why rent with TRECOM",
  whyPoints: [
    { title: "Filters that matter", desc: "Narrow by furnishing, BHK, locality and budget in seconds." },
    { title: "Verified owners", desc: "We review owner identity so you deal with genuine landlords." },
    { title: "Transparent deals", desc: "Understand rent, deposit and included amenities clearly." },
    { title: "Quick moves", desc: "Shortlist, connect and schedule visits without the runaround." },
  ],
  cta: {
    title: "Looking for a place to rent?",
    subtitle: "Tell us your budget and preferred locality — we'll help you shortlist.",
    href: "/contact",
    label: "Find Rentals",
  },
};

export default function RentPage() {
  return <PropertyCategoryPage config={config} />;
}
