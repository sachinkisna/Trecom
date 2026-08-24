import type { Metadata } from "next";
import PropertyCategoryPage, { type CategoryConfig } from "@/components/PropertyCategoryPage";

export const metadata: Metadata = {
  title: "Residential Plots in Bangalore",
  description:
    "Buy verified residential plots and land parcels in Bangalore with clear titles, BDA approvals and gated-layout options on TRECOM.",
};

const config: CategoryConfig = {
  key: "plots",
  eyebrow: "Plots & Land",
  title: "Build on Verified Land",
  subtitle:
    "Explore residential plots and land parcels with clear titles and approvals across Bangalore's emerging and established belts.",
  marquee: [
    "BDA-Approved Plots",
    "Clear Title Land",
    "Gated Layouts",
    "Corner & Park-Facing",
    "EMI & Loan Support",
    "Verified Documents",
  ],
  highlights: [
    { icon: "🌳", title: "Approved Layouts", desc: "BDA and reputed developer-gated plotted developments." },
    { icon: "📄", title: "Clear Title", desc: "We review documentation for greater peace of mind." },
    { icon: "💡", title: "Future Growth", desc: "Identify corridors with strong appreciation potential." },
    { icon: "🏗️", title: "Build Ready", desc: "Plots suited for custom homes and villas." },
  ],
  stats: [
    { value: "1,900+", label: "Plots Listed" },
    { value: "+12%", label: "Avg. Growth" },
    { value: "60+", label: "Layouts" },
    { value: "100%", label: "Title Check" },
  ],
  whyTitle: "Why buy plots with TRECOM",
  whyPoints: [
    { title: "Verified documents", desc: "Review approvals, khata and encumbrance status." },
    { title: "Location clarity", desc: "Understand connectivity and upcoming infrastructure." },
    { title: "Flexible budgets", desc: "From compact plots to large land parcels." },
    { title: "Build support", desc: "Connect with architects and interior partners." },
  ],
  cta: {
    title: "Planning to build your home?",
    subtitle: "Explore verified plots and talk to our team about the right locality.",
    href: "/contact",
    label: "Explore Plots",
  },
};

export default function PlotsPage() {
  return <PropertyCategoryPage config={config} />;
}
