import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NRI Real Estate Services | TRECOM",
  description: "Specialized property investment, management, legal, and taxation support for Non-Resident Indians.",
};

const nriFeatures = [
  {
    title: "Remote Property Investment",
    desc: "Complete end-to-end assistance in purchasing verified pre-launch, resale, and commercial properties across India from abroad.",
    points: ["Verified developer projects", "Virtual site visits & video tours", "Transparent transaction process"],
  },
  {
    title: "Property Management & Care",
    desc: "Dedicated property management including tenant finding, rent collection, routine inspections, and property maintenance.",
    points: ["Tenant screening & lease agreements", "Timely rent collection & remittance", "Periodic physical property updates"],
  },
  {
    title: "Legal & Regulatory Advisory",
    desc: "Comprehensive legal assistance covering FEMA regulations, property title search, power of attorney (POA), and RBI guidelines.",
    points: ["Power of Attorney documentation", "FEMA & RBI compliance", "Title verification & search reports"],
  },
  {
    title: "Taxation & Financial Support",
    desc: "Expert tax advice on capital gains, TDS under section 195, repatriation of funds (Form 15CA/CB), and home loans for NRIs.",
    points: ["TDS advice on property sales", "Funds repatriation assistance (NRE/NRO)", "NRI home loan coordination"],
  },
];

export default function NRIPage() {
  return (
    <>
      <Header />
      <PageHeader
        eyebrow="NRI Services"
        title="NRI Real Estate Services"
        subtitle="Trusted real estate advisory, management, legal, and financial solutions for Non-Resident Indians worldwide."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "NRI Services" },
        ]}
      />

      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            {nriFeatures.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-7 sm:p-8">
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
                  <ul className="mt-6 space-y-2.5">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">
                          ✓
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-[#064b35] px-8 py-12 lg:px-16">
            <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-3xl font-bold text-white">Need Customized NRI Assistance?</h2>
                <p className="mt-3 max-w-xl text-sm text-white/80">
                  Connect with our dedicated NRI real estate specialists to discuss investment, management, or legal queries.
                </p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#064b35] transition hover:-translate-y-0.5"
              >
                Contact NRI Team →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
