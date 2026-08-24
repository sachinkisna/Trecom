import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Help Center" };

export default function HelpPage() {
  return (
    <LegalPage
      eyebrow="Support"
      title="Help Center"
      intro="Find quick answers to common questions about using TRECOM. Still stuck? Our team is a message away."
      sections={[
        {
          heading: "Buying & Renting",
          paragraphs: [
            "Use the search and filters to narrow by locality, budget and configuration. Save listings to compare later.",
            "Tap 'Contact Owner' on a property to get the owner's details and schedule a visit.",
          ],
        },
        {
          heading: "Posting a property",
          paragraphs: [
            "Go to Post Property, choose sell or rent, add details and photos, then submit. Our team reviews and publishes verified listings.",
          ],
        },
        {
          heading: "Services",
          paragraphs: [
            "Explore home loans, legal assistance, valuation, interiors and property management under the Services section.",
          ],
        },
        {
          heading: "Account & safety",
          paragraphs: [
            "Keep your login details secure. Report suspicious listings or users to our support team immediately.",
          ],
        },
      ]}
    />
  );
}
