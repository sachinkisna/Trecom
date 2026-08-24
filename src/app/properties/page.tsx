import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import PropertiesPageClient from "./PropertiesPageClient";

export const metadata: Metadata = {
  title: "Explore Verified Properties in Bangalore",
  description:
    "Browse buy, rent, commercial and plotted properties across Bangalore. Filter by location, budget, BHK and more.",
};

export default function PropertiesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader
          eyebrow="Property Listings"
          title="Explore Verified Properties"
          subtitle="Browse buy, rent, commercial and plotted developments across Bangalore with trusted information and TRECOM verification."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Properties" },
          ]}
        />
        <PropertiesPageClient />
      </main>
      <Footer />
    </>
  );
}
