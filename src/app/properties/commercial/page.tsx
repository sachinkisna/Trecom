import type { Metadata } from "next";
import PropertyCategoryPage, { type CategoryConfig } from "@/components/PropertyCategoryPage";

export const metadata: Metadata = {
  title: "Commercial Property in Bangalore",
  description:
    "Explore verified office spaces, retail shops and commercial properties for sale and rent in Bangalore with TRECOM.",
};

const config: CategoryConfig = {
  key: "commercial",
  eyebrow: "Commercial Property",
  title: "Commercial Spaces That Work",
  subtitle:
    "From office suites to high-street retail, explore verified commercial properties for sale and rent across Bangalore's business hubs.",
  marquee: [
    "Office Spaces",
    "Retail & High-Street Shops",
    "Co-working Suites",
    "Warehouses & Godowns",
    "Prime Business Addresses",
    "RERA-Verified Listings",
  ],
  highlights: [
    { icon: "🏢", title: "Offices", desc: "Furnished and bare-shell offices in prime towers." },
    { icon: "🛍️", title: "Retail", desc: "High-footfall shops in established complexes." },
    { icon: "📈", title: "Investment Grade", desc: "Options with strong rental yield potential." },
    { icon: "📍", title: "Connected", desc: "Locations near metro, ORR and business parks." },
  ],
  stats: [
    { value: "3,200+", label: "Commercial Listings" },
    { value: "6–9%", label: "Indicative Yield" },
    { value: "40+", label: "Business Hubs" },
    { value: "95%", label: "Verified Listings" },
  ],
  whyTitle: "Why commercial with TRECOM",
  whyPoints: [
    { title: "Right footprint", desc: "Filter by carpet area, configuration and fit-out status." },
    { title: "Location intelligence", desc: "Compare hubs by connectivity and tenant demand." },
    { title: "Investor view", desc: "Understand yields and appreciation for each micro-market." },
    { title: "Deal support", desc: "Home loan and legal assistance for commercial buys." },
  ],
  cta: {
    title: "Need a business address?",
    subtitle: "Share your space requirement and we'll shortlist matching options.",
    href: "/contact",
    label: "Talk to Expert",
  },
};

export default function CommercialPage() {
  return <PropertyCategoryPage config={config} />;
}
