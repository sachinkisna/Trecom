import type { Metadata } from "next";
import OfferPage, { type OfferConfig } from "@/components/OfferPage";

export const metadata: Metadata = { title: "Legal Support" };

const config: OfferConfig = {
  eyebrow: "TC & Offers",
  title: "Legal Support",
  subtitle: "Get assistance with property documentation, title verification and the legal side of transactions.",
  marquee: ["Title Verification", "Agreement Drafting", "Due Diligence", "Registration Help", "Expert Guidance"],
  offers: [
    {
      title: "Title Verification",
      desc: "Review ownership and title history of a property before you commit.",
      points: ["Ownership check", "Encumbrance review", "Khata status"],
    },
    {
      title: "Agreement Drafting",
      desc: "Assistance with sale and rental agreements tailored to your deal.",
      points: ["Sale agreement", "Rental agreement", "Clarity on terms"],
    },
    {
      title: "Registration Support",
      desc: "Guidance through the registration and stamping process.",
      points: ["Document checklist", "Process steps", "Coordination help"],
    },
  ],
  cta: { title: "Need legal assistance?", subtitle: "Connect with guidance for your property documentation.", href: "/services/legal", label: "Explore Legal Help" },
};

export default function LegalSupportPage() {
  return <OfferPage config={config} />;
}
