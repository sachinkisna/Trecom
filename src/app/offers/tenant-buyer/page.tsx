import type { Metadata } from "next";
import OfferPage, { type OfferConfig } from "@/components/OfferPage";

export const metadata: Metadata = { title: "Offers for Tenant / Buyer" };

const config: OfferConfig = {
  eyebrow: "TC & Offers",
  title: "Offers for Tenant / Buyer",
  subtitle: "Discover exclusive property offers, benefits and assistance designed for tenants and property buyers.",
  marquee: ["Exclusive Buyer Deals", "Tenant Benefits", "Dedicated Assistance", "Verified Listings", "Free Locality Insights"],
  offers: [
    {
      title: "Property Buying Offers",
      desc: "Special opportunities and benefits for customers looking to purchase their next property.",
      points: ["Curated new-launch deals", "Priority unit selection", "Assistance with home loans"],
    },
    {
      title: "Tenant Benefits",
      desc: "Get access to selected rental opportunities and support throughout your property search.",
      points: ["Zero-brokerage rentals", "Verified owner listings", "Easy move-in support"],
    },
    {
      title: "Dedicated Assistance",
      desc: "Our team can help you understand properties, pricing, documentation and the buying process.",
      points: ["Personalised shortlists", "Schedule visits", "End-to-end guidance"],
    },
  ],
  cta: { title: "Start your search today", subtitle: "Browse verified homes and unlock buyer-exclusive benefits.", href: "/properties/buy", label: "Explore Properties" },
};

export default function TenantBuyerPage() {
  return <OfferPage config={config} />;
}
