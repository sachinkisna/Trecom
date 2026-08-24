import Header from "@/components/Header";
import Footer from "@/components/Footer";

import AboutHero from "@/components/about/AboutHero";
import FounderStory from "@/components/about/FounderStory";
import MemberBenefits from "@/components/about/MemberBenefits";
import CoreValues from "@/components/about/CoreValues";
import AboutClosing from "@/components/about/AboutClosing";

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>
        <AboutHero />
        <FounderStory />
        <MemberBenefits />
        <CoreValues />
        <AboutClosing />
      </main>

      <Footer />
    </>
  );
}