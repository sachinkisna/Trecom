import type { Metadata } from "next";
import PropertyCategoryPage, { type CategoryConfig } from "@/components/PropertyCategoryPage";

export const metadata: Metadata = {
  title: "Pre-Launch Projects in Bangalore",
  description:
    "Register interest for exclusive pre-launch and under-construction projects in Bangalore with early-bird pricing on TRECOM.",
};

const config: CategoryConfig = {
  key: "pre-launch",
  eyebrow: "Pre-Launch",
  title: "Get In Early",
  subtitle:
    "Be the first to know about upcoming and under-construction projects across Bangalore — with early-bird pricing and priority unit selection.",
  marquee: [
    "Early-Bird Pricing",
    "Priority Unit Selection",
    "RERA-Registered Projects",
    "Trusted Developers",
    "Flexible Payment Plans",
    "Exclusive Previews",
  ],
  highlights: [
    { icon: "🚀", title: "Early Access", desc: "Explore projects before public launch." },
    { icon: "💰", title: "Better Pricing", desc: "Pre-launch phases often come with attractive rates." },
    { icon: "🏗️", title: "Trusted Builders", desc: "Curated developers with a track record." },
    { icon: "📅", title: "Flexible Plans", desc: "Construction-linked payment options." },
  ],
  stats: [
    { value: "30+", label: "Upcoming Projects" },
    { value: "5–10%", label: "Launch Benefit" },
    { value: "25+", label: "Developers" },
    { value: "100%", label: "RERA Registered" },
  ],
  whyTitle: "Why register for pre-launch",
  whyPoints: [
    { title: "First choice", desc: "Pick the best floors, views and unit layouts early." },
    { title: "Price advantage", desc: "Lock in launch-phase pricing before revisions." },
    { title: "Verified projects", desc: "We list only RERA-registered developments." },
    { title: "Guided decisions", desc: "Compare configurations, possession and amenities." },
  ],
  cta: {
    title: "Don't miss the launch",
    subtitle: "Register your interest and get priority access to new project previews.",
    href: "/contact",
    label: "Register Interest",
  },
};

export default function PreLaunchPage() {
  return <PropertyCategoryPage config={config} />;
}
