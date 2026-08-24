import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import SavedPropertiesClient from "./SavedPropertiesClient";

export const metadata: Metadata = {
  title: "Saved Properties",
  description: "View the properties you've saved on TRECOM.",
};

export default function SavedPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader
          eyebrow="Your Shortlist"
          title="Saved Properties"
          subtitle="Properties you've saved for later. Sign in to sync your shortlist across devices."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Saved" }]}
        />
        <SavedPropertiesClient />
      </main>
      <Footer />
    </>
  );
}
