import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";

export const metadata: Metadata = {
  title: "Partners — Builders, Channels & Alliances",
  description:
    "Partner with TRECOM as a builder, channel partner, broker or enterprise. Grow with verified listings, leads and co-marketing.",
};

const partnerTypes = [
  { icon: "🏗️", title: "Builders & Developers", desc: "Showcase RERA-registered projects to genuine buyers and pre-launch interest." },
  { icon: "🤝", title: "Channel Partners", desc: "Earn on qualified leads with transparent, tracked referrals." },
  { icon: "🏢", title: "Brokers & Agents", desc: "List verified inventory and access a wider buyer pool." },
  { icon: "🏦", title: "Banks & NBFCs", desc: "Offer home-loan products to verified property seekers." },
  { icon: "🛋️", title: "Interior & Home Brands", desc: "Reach homeowners at the right moment in their journey." },
  { icon: "🏢", title: "Enterprises & HR", desc: "Relocation and housing assistance for your workforce." },
];

const steps = [
  { n: "01", title: "Apply", desc: "Tell us about your business and goals." },
  { n: "02", title: "Onboard", desc: "Get verified and set up your partner profile." },
  { n: "03", title: "Grow", desc: "Access leads, listings and co-marketing." },
];

const marquee = [
  "Builder Partnerships",
  "Channel Partners",
  "Broker Network",
  "Verified Leads",
  "Co-Marketing",
  "Transparent Payouts",
];

export default function PartnersPage() {
  const marqueeItems = marquee.map((text, i) => (
    <span key={i} className="mx-6 flex items-center gap-2 whitespace-nowrap text-sm font-medium text-white/90">
      <span className="live-dot h-1.5 w-1.5 rounded-full bg-white" />
      {text}
    </span>
  ));

  return (
    <>
      <Header />
      <main>
        <PageHeader
          eyebrow="TRECOM Partners"
          title="Grow with us"
          subtitle="Whether you build, broker or brand, partner with TRECOM to reach verified property seekers across Bangalore."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Partners" }]}
        />

        <div className="bg-[#043c2b] py-4">
          <Marquee items={marqueeItems} />
        </div>

        <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-8 bg-[#064b35]" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#064b35]">Who can partner</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Partner types we work with</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {partnerTypes.map((p, i) => (
                <Reveal key={p.title} delay={i * 60}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <div className="text-3xl">{p.icon}</div>
                    <h3 className="mt-4 text-base font-bold text-slate-900">{p.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">How partnership works</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                    <span className="text-3xl font-bold text-[#064b35]/30">{s.n}</span>
                    <h3 className="mt-3 text-base font-bold text-slate-900">{s.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl bg-[#064b35] px-8 py-12 lg:px-16">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[50px] border-white/5" />
              <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white">Become a TRECOM partner</h2>
                  <p className="mt-3 max-w-xl text-sm text-white/70">Fill the form and our partnerships team will reach out shortly.</p>
                </div>
                <Link href="/contact" className="shrink-0 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#064b35] transition hover:-translate-y-0.5">
                  Partner With Us →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
