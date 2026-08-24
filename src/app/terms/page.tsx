import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Read the Terms & Conditions for using TRECOM's property marketplace and services.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      updated="August 2026"
      intro="These Terms & Conditions (“Terms”) govern your access to and use of the TRECOM website, mobile experience and related services. By using TRECOM, you agree to these Terms. If you do not agree, please do not use the platform."
      sections={[
        {
          heading: "1. About TRECOM",
          paragraphs: [
            "TRECOM is a real-estate discovery and community platform that helps users explore properties, connect with owners, agents and builders, and submit enquiries.",
            "TRECOM provides information and technology services. We are not a party to property transactions between users unless explicitly stated in writing.",
          ],
        },
        {
          heading: "2. Eligibility & account",
          paragraphs: [
            "You must be at least 18 years old and capable of entering into a binding agreement to use our services.",
            "You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.",
            "You agree to provide accurate, current and complete information when registering, posting a property or submitting an enquiry.",
          ],
        },
        {
          heading: "3. Use of the platform",
          paragraphs: [
            "You agree to use TRECOM lawfully and only for genuine property-related purposes.",
            "You must not misuse the platform, including by posting false listings, scraping data, spamming users, attempting unauthorized access, or interfering with platform operations.",
            "We may suspend or terminate access if we reasonably believe you have violated these Terms or applicable law.",
          ],
        },
        {
          heading: "4. Listings & property information",
          paragraphs: [
            "Property details, prices, photos, availability and amenities are provided by owners, agents, builders or other users and are for informational purposes only.",
            "TRECOM does not guarantee the accuracy, completeness or legality of any listing. Users must independently verify all information, approvals, ownership documents and physical condition before any transaction.",
            "We reserve the right to review, edit, reject or remove listings that appear misleading, incomplete, duplicate or non-compliant with our policies.",
          ],
        },
        {
          heading: "5. Enquiries & communications",
          paragraphs: [
            "When you submit an enquiry, contact form or lead, you consent to TRECOM and relevant property contacts using your details to respond to your request.",
            "Communications through the platform do not create a brokerage, agency or legal advisory relationship with TRECOM unless expressly agreed in writing.",
          ],
        },
        {
          heading: "6. Fees & promotions",
          paragraphs: [
            "Certain services, including property posting or premium visibility, may be offered free or paid as described on the platform at the time of use.",
            "Any promotional offer, including free listing campaigns, may be modified or withdrawn at TRECOM’s discretion subject to applicable law.",
          ],
        },
        {
          heading: "7. Intellectual property",
          paragraphs: [
            "The TRECOM name, logo, website design, software and content created by us are protected by applicable intellectual property laws.",
            "You may not copy, reproduce, distribute or create derivative works from our platform content without prior written permission, except as permitted by law.",
          ],
        },
        {
          heading: "8. Disclaimer",
          paragraphs: [
            "The platform is provided on an “as is” and “as available” basis. To the fullest extent permitted by law, TRECOM disclaims warranties regarding uninterrupted access, error-free operation or fitness for a particular purpose.",
          ],
        },
        {
          heading: "9. Limitation of liability",
          paragraphs: [
            "To the fullest extent permitted by law, TRECOM shall not be liable for any indirect, incidental, special or consequential loss arising from your use of the platform or reliance on listing information.",
            "TRECOM is not responsible for disputes, fraud, misrepresentation or non-performance between buyers, sellers, tenants, owners, agents or third parties.",
          ],
        },
        {
          heading: "10. Privacy",
          paragraphs: [
            "Your use of TRECOM is also governed by our Privacy Policy, which explains how we collect, use and protect personal information.",
          ],
        },
        {
          heading: "11. Changes to these Terms",
          paragraphs: [
            "We may update these Terms from time to time. The “Last updated” date at the top of this page will reflect the latest version.",
            "Continued use of the platform after changes are published constitutes acceptance of the revised Terms.",
          ],
        },
        {
          heading: "12. Governing law & contact",
          paragraphs: [
            "These Terms are governed by the laws of India. Courts in Bengaluru, Karnataka shall have exclusive jurisdiction, subject to applicable consumer protection laws.",
            "For questions about these Terms, contact us at support@trecom.ai or through our contact page.",
          ],
        },
      ]}
    />
  );
}
