import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Careers" };

export default function CareersPage() {
  return (
    <LegalPage
      eyebrow="Company"
      title="Careers at TRECOM"
      intro="We're building a simpler, more transparent way to experience real estate. If you care about customers and craft, we'd love to meet you."
      sections={[
        {
          heading: "Why join us",
          paragraphs: [
            "Work on products used by thousands of property seekers across Bangalore, with the autonomy to make a real impact.",
            "A small, focused team that values ownership, clarity and continuous learning.",
          ],
        },
        {
          heading: "Open roles",
          paragraphs: [
            "Product Designer — own end-to-end design for web and mobile.",
            "Frontend Engineer — build fast, accessible interfaces with React and Next.js.",
            "Growth & Partnerships — work with builders, brokers and enterprises.",
            "Customer Success — help users through their property journey.",
          ],
        },
        {
          heading: "How to apply",
          paragraphs: [
            "Tell us what you'd like to work on and why. Reach out via our contact page and our team will get back to you.",
          ],
        },
      ]}
    />
  );
}
