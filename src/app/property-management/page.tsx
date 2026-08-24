import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";

export const metadata: Metadata = {
  title: "Property Management",
  description:
    "End-to-end property management services in Bangalore — tenant handling, maintenance, rent collection and regular updates while you're away.",
};

const services = [
  { icon: "🧑‍💼", title: "Tenant Management", desc: "Find, screen and manage reliable tenants for your property." },
  { icon: "🛠️", title: "Maintenance & Repairs", desc: "Coordinate plumbing, electrical and general upkeep on your behalf." },
  { icon: "💳", title: "Rent Collection", desc: "Hassle-free rent handling with timely settlements." },
  { icon: "📋", title: "Regular Updates", desc: "Periodic reports and photos so you always know the status." },
  { icon: "🔐", title: "Key Handling", desc: "Secure key custody and scheduled property access." },
  { icon: "📞", title: "Dedicated Manager", desc: "A single point of contact for all your property needs." },
];

const steps = [
  { n: "01", title: "Onboard", desc: "Share property details and we set up a management plan." },
  { n: "02", title: "Market & Tenant", desc: "We list, screen and place a verified tenant." },
  { n: "03", title: "Manage", desc: "Ongoing maintenance, rent collection and updates." },
  { n: "04", title: "Report", desc: "Transparent monthly reporting on status and earnings." },
];

const marquee = [
  "Tenant Verification",
  "Zero Hassle Maintenance",
  "Timely Rent Collection",
  "Regular Photo Updates",
  "Dedicated Manager",
  "Transparent Reporting",
];

export default function PropertyManagementPage() {
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
          eyebrow="Property Management"
          title="Your property, cared for"
          subtitle="Own a property but live elsewhere? TRECOM manages tenants, maintenance and rent so your asset is looked after in your absence."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Property Management" }]}
        />

        <div className="bg-[#043c2b] py-4">
          <Marquee items={marqueeItems} />
        </div>

        <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-px w-8 bg-[#064b35]" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#064b35]">What we handle</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Services included</h2>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <div className="text-3xl">{s.icon}</div>
                    <h3 className="mt-4 text-base font-bold text-slate-900">{s.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">How it works</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <Reveal key={step.n} delay={i * 80}>
                  <div className="relative h-full rounded-2xl border border-slate-200 bg-white p-6">
                    <span className="text-3xl font-bold text-[#064b35]/30">{step.n}</span>
                    <h3 className="mt-3 text-base font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{step.desc}</p>
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
                  <h2 className="text-3xl font-bold text-white">Let us manage your property</h2>
                  <p className="mt-3 max-w-xl text-sm text-white/70">Share your details and our team will design a management plan for you.</p>
                </div>
                <Link href="/contact" className="shrink-0 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#064b35] transition hover:-translate-y-0.5">
                  Get Started →
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
