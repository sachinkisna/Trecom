import type { Metadata } from "next";
import OfferPage, { type OfferConfig } from "@/components/OfferPage";

export const metadata: Metadata = { title: "T&C & Special Offers | TRECOM" };

const config: OfferConfig = {
  eyebrow: "TC & Offers",
  title: "T&C & Special Offers",
  subtitle: "Explore our exclusive offers and transparent terms for Buyers, Tenants, Owners, Sellers, and Pre-Launch Projects.",
  marquee: ["Verified Offers", "Zero Hidden Charges", "Pre-Launch Access", "Owner Benefits", "Tenant Deals"],
  offers: [
    {
      title: "Offers for Tenants & Buyers",
      desc: "Zero brokerage options, verified listings, and direct owner connections.",
      points: ["Verified property listings", "Direct owner contact", "Transparent pricing"],
    },
    {
      title: "Offers for Owners & Sellers",
      desc: "List your property for free and reach thousands of active buyers and tenants.",
      points: ["Free property posting", "Verified buyer leads", "Dedicated support"],
    },
    {
      title: "Pre-Launch Opportunities",
      desc: "Early bird pricing and priority unit selection for upcoming projects.",
      points: ["Pre-launch discounts", "Best floor selection", "Flexible payment plans"],
    },
  ],
  cta: {
    title: "Looking for Exclusive Property Deals?",
    subtitle: "Browse our complete range of verified properties across top locations.",
    href: "/properties",
    label: "Explore Properties",
  },
};

export default function OffersPage() {
  return <OfferPage config={config} />;
}
