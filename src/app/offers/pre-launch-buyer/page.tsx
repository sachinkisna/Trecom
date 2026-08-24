import type { Metadata } from "next";
import OfferPage, { type OfferConfig } from "@/components/OfferPage";

export const metadata: Metadata = { title: "Offers for Pre-Launch Buyer" };

const config: OfferConfig = {
  eyebrow: "TC & Offers",
  title: "Offers for Pre-Launch Buyer",
  subtitle: "Special opportunities for early property buyers in upcoming and under-construction projects.",
  marquee: ["Early-Bird Pricing", "Priority Selection", "RERA Projects", "Flexible Plans", "Exclusive Previews"],
  offers: [
    {
      title: "Pre-Launch Pricing",
      desc: "Access launch-phase pricing before revisions on selected projects.",
      points: ["Better rates", "Locked pricing", "Limited inventory"],
    },
    {
      title: "Priority Unit Selection",
      desc: "Choose preferred floors, views and layouts before public launch.",
      points: ["Best layouts", "View preference", "Early access"],
    },
    {
      title: "Project Previews",
      desc: "Get invited to exclusive previews and developer sessions.",
      points: ["Virtual tours", "Expert walkthroughs", "Q&A with developers"],
    },
  ],
  cta: { title: "Don't miss the launch", subtitle: "Register your interest for early access to new projects.", href: "/properties/pre-launch", label: "View Pre-Launch" },
};

export default function PreLaunchBuyerPage() {
  return <OfferPage config={config} />;
}
