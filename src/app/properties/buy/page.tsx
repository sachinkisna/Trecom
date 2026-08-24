import type { Metadata } from "next";
import PropertyCategoryPage, { type CategoryConfig } from "@/components/PropertyCategoryPage";

export const metadata: Metadata = {
  title: "Buy Property in Bangalore",
  description:
    "Browse verified apartments, villas and homes for sale across Bangalore with TRECOM's trusted listings and locality insights.",
};

const config: CategoryConfig = {
  key: "buy",
  eyebrow: "Buy Property",
  title: "Buy a Home You'll Love",
  subtitle:
    "Explore verified apartments, villas and independent homes for sale across Bangalore — with transparent information and TRECOM Trust Scores.",
  marquee: [
    "25,000+ Verified Listings",
    "Owner-Posted Properties",
    "TRECOM Trust Score on Every Home",
    "Free Locality Insights",
    "RERA-Registered Projects",
    "No Brokerage Listings",
  ],
  highlights: [
    { icon: "🏠", title: "Verified Homes", desc: "Every listing is reviewed for authenticity before it goes live." },
    { icon: "📍", title: "Locality Insights", desc: "Understand prices, growth and amenities before you decide." },
    { icon: "💰", title: "Clear Pricing", desc: "See indicative prices and compare similar homes easily." },
    { icon: "🛡️", title: "Safe Transactions", desc: "Guidance on documentation and legal checks." },
  ],
  stats: [
    { value: "25K+", label: "Properties Listed" },
    { value: "95%", label: "Verified Listings" },
    { value: "120+", label: "Localities" },
    { value: "18K+", label: "Happy Buyers" },
  ],
  whyTitle: "Why buy with TRECOM",
  whyPoints: [
    { title: "Shortlisted for you", desc: "Filter by budget, bedrooms and locality to find matches fast." },
    { title: "Trust you can see", desc: "Each home carries a TRECOM Trust Score built from available information." },
    { title: "Talk to owners directly", desc: "Connect with genuine owners and avoid unnecessary middle layers." },
    { title: "End-to-end help", desc: "From home loans to legal assistance, support is just a click away." },
  ],
  cta: {
    title: "Ready to find your next home?",
    subtitle: "Post a requirement or talk to our team for personalised shortlists.",
    href: "/contact",
    label: "Get Assistance",
  },
};

export default function BuyPage() {
  return <PropertyCategoryPage config={config} />;
}
