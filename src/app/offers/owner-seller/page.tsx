import type { Metadata } from "next";
import OfferPage, { type OfferConfig } from "@/components/OfferPage";

export const metadata: Metadata = { title: "Offers for Owner / Seller" };

const config: OfferConfig = {
  eyebrow: "TC & Offers",
  title: "Offers for Owner / Seller",
  subtitle: "Solutions and benefits for property owners and sellers to reach genuine buyers and tenants.",
  marquee: ["Reach Genuine Buyers", "Easy Listing", "Manage Enquiries", "Verified Leads", "Faster Closures"],
  offers: [
    {
      title: "Free Property Listing",
      desc: "List your property easily and reach people looking for their next home or investment.",
      points: ["Quick listing flow", "Photo uploads", "Wide reach"],
    },
    {
      title: "Genuine Buyer Connect",
      desc: "Connect with verified buyers and tenants interested in your locality.",
      points: ["Verified leads", "Direct contact", "Less spam"],
    },
    {
      title: "Sell Faster",
      desc: "Tools and assistance to manage enquiries and close with confidence.",
      points: ["Enquiry dashboard", "Pricing insights", "Documentation help"],
    },
  ],
  cta: { title: "Have a property to sell or rent?", subtitle: "Post your property and reach genuine buyers in minutes.", href: "/post-property", label: "Post Property" },
};

export default function OwnerSellerPage() {
  return <OfferPage config={config} />;
}
