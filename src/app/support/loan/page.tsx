import type { Metadata } from "next";
import OfferPage, { type OfferConfig } from "@/components/OfferPage";

export const metadata: Metadata = { title: "Loan Support" };

const config: OfferConfig = {
  eyebrow: "TC & Offers",
  title: "Loan Support",
  subtitle: "Get assistance in understanding property financing, documentation and the home loan process.",
  marquee: ["Compare Lenders", "Eligibility Check", "Document Guidance", "Process Support", "Better Rates"],
  offers: [
    {
      title: "Loan Guidance",
      desc: "Understand the basic stages involved in obtaining property finance.",
      points: ["How loans work", "EMI explainers", "Tenure choices"],
    },
    {
      title: "Documentation Assistance",
      desc: "Get guidance on the documents generally required during the loan process.",
      points: ["Income proof", "Identity & address", "Property papers"],
    },
    {
      title: "Financial Support",
      desc: "Our team can help you navigate the property financing process.",
      points: ["Lender comparison", "Application help", "Status tracking"],
    },
  ],
  cta: { title: "Need help with a home loan?", subtitle: "Talk to our team for guidance on financing your purchase.", href: "/services/home-loans", label: "Explore Home Loans" },
};

export default function LoanSupportPage() {
  return <OfferPage config={config} />;
}
