import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="August 2026"
      intro="This Privacy Policy explains how TRECOM collects, uses and safeguards information when you use our website and services. By using TRECOM, you agree to the practices described here."
      sections={[
        {
          heading: "Information we collect",
          paragraphs: [
            "We collect information you provide directly, such as your name, phone number, email and property requirements when you register, post a property or contact us.",
            "We may also collect usage data such as pages visited and device information to improve our services.",
          ],
        },
        {
          heading: "How we use information",
          paragraphs: [
            "To provide and personalise our services, match you with relevant properties and respond to your enquiries.",
            "To send service-related communications and, where permitted, updates about new features and offers.",
          ],
        },
        {
          heading: "Sharing of information",
          paragraphs: [
            "We do not sell your personal information. We may share it with trusted partners strictly to fulfil your requests, such as connecting you with owners or service providers.",
            "We may disclose information where required by law or to protect our rights and users.",
          ],
        },
        {
          heading: "Your choices",
          paragraphs: [
            "You can request access to, correction of, or deletion of your personal information by contacting us.",
            "You may opt out of promotional communications at any time.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "For privacy-related questions, write to us at support@trecom.ai or through our contact page.",
          ],
        },
      ]}
    />
  );
}
