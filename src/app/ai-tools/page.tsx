import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import AiValuation from "@/components/ai/AiValuation";
import LocalityInsights from "@/components/ai/LocalityInsights";
import { locations } from "@/lib/data";

export const metadata: Metadata = {
  title: "AI Tools — Valuation, Insights & Locality Intelligence",
  description:
    "TRECOM AI helps you estimate property value, discover investment opportunities and explore surroundings like malls, schools and hospitals.",
};

const features = [
  { icon: "💡", title: "AI Valuation", desc: "Instant, locality-aware estimate of your property's market value." },
  { icon: "📈", title: "Investment Insights", desc: "AI ranks growth, demand and opportunity for every locality." },
  { icon: "🗺️", title: "Surrounding Intelligence", desc: "Malls, schools and hospitals around any locality, at a glance." },
  { icon: "🛡️", title: "Trust Score", desc: "Confidence built from verified listing information." },
  { icon: "🔎", title: "Price Trends", desc: "Understand how rates move across Bangalore corridors." },
  { icon: "🤝", title: "Smart Matching", desc: "Shortlists tuned to your budget and preferences." },
];

const marquee = [
  "AI Valuation",
  "Investment Opportunities",
  "Nearby Malls & Schools",
  "Hospital Intelligence",
  "Price Trend Analysis",
  "Trust Scoring",
];

export default function AiToolsPage() {
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
          eyebrow="TRECOM AI"
          title="AI tools for smarter decisions"
          subtitle="An AI-supported property portal that helps you value homes, spot investment opportunities and understand a locality before you decide."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "AI Tools" }]}
        />

        <div className="bg-[#043c2b] py-4">
          <Marquee items={marqueeItems} />
        </div>

        {/* FEATURES */}
        <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-8 bg-[#064b35]" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#064b35]">Capabilities</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">What TRECOM AI can do for you</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 60}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <div className="text-3xl">{f.icon}</div>
                    <h3 className="mt-4 text-base font-bold text-slate-900">{f.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* VALUATION */}
        <section className="bg-slate-50 px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-8 bg-[#064b35]" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#064b35]">Try it now</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">AI Property Valuation</h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-500">
                Select a locality, configuration and area to get an instant AI-assisted estimate.
              </p>
            </div>
            <AiValuation />
          </div>
        </section>

        {/* LOCALITY INSIGHTS */}
        <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-8 bg-[#064b35]" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#064b35]">Locality Intelligence</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">AI insights by locality</h2>
            </div>

            <div className="space-y-16">
              {locations.map((location) => (
                <Reveal key={location.slug}>
                  <LocalityInsights location={location} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl bg-[#064b35] px-8 py-12 lg:px-16">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[50px] border-white/5" />
              <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white">Put AI to work on your property journey</h2>
                  <p className="mt-3 max-w-xl text-sm text-white/70">
                    Post a property, talk to a broker or explore verified listings — all powered by TRECOM AI.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/post-property" className="rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#064b35] transition hover:-translate-y-0.5">
                    Post Property
                  </Link>
                  <Link href="/brokers" className="rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
                    Find a Broker
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
