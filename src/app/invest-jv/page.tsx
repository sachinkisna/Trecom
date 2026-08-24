import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";

export const metadata: Metadata = {
  title: "Invest JV — Joint Venture Investment",
  description:
    "Explore joint venture (JV) real estate investment opportunities in Bangalore with TRECOM — partner on land, development and plotted projects.",
};

const benefits = [
  { icon: "🤝", title: "Shared Risk", desc: "Pool capital with partners to access larger, higher-upside opportunities." },
  { icon: "🏗️", title: "Development JVs", desc: "Partner with developers on land aggregation and construction." },
  { icon: "🌳", title: "Plotted JVs", desc: "Co-invest in gated plotted layouts with clear approvals." },
  { icon: "📊", title: "Transparent Structuring", desc: "Clear agreements, timelines and profit-sharing models." },
  { icon: "⚖️", title: "Legal Safeguards", desc: "Documented JV agreements reviewed by professionals." },
  { icon: "📈", title: "Aligned Interests", desc: "Structures designed so all partners benefit from success." },
];

const models = [
  { title: "Land Aggregation", desc: "Combine parcels to unlock development potential and better pricing." },
  { title: "Build & Sell", desc: "Co-invest in construction with defined exit and profit share." },
  { title: "Plotted Development", desc: "Develop and sell plotted layouts with approved layouts." },
];

const marquee = [
  "Curated JV Opportunities",
  "Vetted Developer Partners",
  "Clear Profit Sharing",
  "RERA-Aligned Projects",
  "Legal Document Support",
  "Institutional-Grade Structuring",
];

export default function InvestJVPage() {
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
          eyebrow="TRECOM Invest JV"
          title="Invest through Joint Ventures"
          subtitle="Access larger real estate opportunities by partnering on land, development and plotted projects — with structured, transparent agreements."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Invest JV" }]}
        />

        <div className="bg-[#043c2b] py-4">
          <Marquee items={marqueeItems} />
        </div>

        <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 rounded-3xl bg-[#064b35] p-8 text-white md:grid-cols-4">
              {[
                { value: "₹25L+", label: "Min. ticket size" },
                { value: "18–30%", label: "Indicative IRR (selected)" },
                { value: "3–5 yr", label: "Typical horizon" },
                { value: "100%", label: "Documented JVs" },
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="mt-2 text-xs text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <div className="mb-10 flex items-end justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-px w-8 bg-[#064b35]" />
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#064b35]">Why JV</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Benefits of investing together</h2>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {benefits.map((b, i) => (
                  <Reveal key={b.title} delay={i * 60}>
                    <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6">
                      <div className="text-3xl">{b.icon}</div>
                      <h3 className="mt-4 text-base font-bold text-slate-900">{b.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{b.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">JV models we explore</h2>
              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {models.map((m, i) => (
                  <Reveal key={m.title} delay={i * 80}>
                    <div className="h-full rounded-2xl border border-slate-200 bg-white p-7">
                      <h3 className="text-lg font-bold text-slate-900">{m.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-500">{m.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl bg-[#043c2b] px-8 py-12 lg:px-16">
              <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full border-[50px] border-white/5" />
              <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white">Explore a JV opportunity</h2>
                  <p className="mt-3 max-w-xl text-sm text-white/70">Register your interest and our investment team will share vetted opportunities.</p>
                </div>
                <Link href="/contact" className="shrink-0 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#064b35] transition hover:-translate-y-0.5">
                  Talk to Us →
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
