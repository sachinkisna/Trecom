import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";

const reasons = [
  {
    title: "Steady Appreciation",
    description: "Bangalore has consistently delivered long-term capital appreciation across established and emerging corridors.",
    icon: "📈",
  },
  {
    title: "Strong Rental Demand",
    description: "A large professional workforce drives healthy rental yields, especially near IT hubs and metro corridors.",
    icon: "🏠",
  },
  {
    title: "Diverse Options",
    description: "From affordable plots to premium villas and commercial spaces, there is an investment for every budget.",
    icon: "🏢",
  },
  {
    title: "Infrastructure Growth",
    description: "Metro expansion, ring roads and tech parks continue to unlock value in new micro-markets.",
    icon: "🚇",
  },
];

const options = [
  { label: "Residential Apartments", detail: "From ₹42 Lakh", href: "/properties?type=buy" },
  { label: "Plots & Land", detail: "From ₹38 Lakh", href: "/properties?type=plots" },
  { label: "Commercial Spaces", detail: "From ₹1.85 Cr", href: "/properties?type=commercial" },
  { label: "Under-Construction", detail: "Higher upside", href: "/projects" },
];

export default function InvestPage() {
  return (
    <>
      <Header />

      <main>
        <PageHeader
          eyebrow="TRECOM Invest"
          title="Invest in Bangalore Real Estate"
          subtitle="Make informed property investments with verified listings, locality insights and expert guidance."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Invest" },
          ]}
        />

        <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 rounded-3xl bg-[#064b35] p-8 text-white md:grid-cols-4">
              {[
                { value: "8–13%", label: "Annual growth (selected areas)" },
                { value: "3–5%", label: "Indicative rental yield" },
                { value: "120+", label: "Localities covered" },
                { value: "95%", label: "Verified listings" },
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="mt-2 text-xs text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <SectionHeading
                eyebrow="Why Invest"
                title="Why Bangalore remains a top choice"
                subtitle="A combination of demand, infrastructure and diversity makes the city resilient for property investors."
              />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {reasons.map((reason) => (
                  <div key={reason.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                    <div className="text-3xl">{reason.icon}</div>
                    <h3 className="mt-4 text-base font-bold text-slate-900">{reason.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{reason.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16">
              <SectionHeading
                eyebrow="Where to Start"
                title="Investment options to explore"
                subtitle="Browse opportunities across categories and project stages."
              />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {options.map((option) => (
                  <Link
                    key={option.label}
                    href={option.href}
                    className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-[#064b35]/20 hover:shadow-lg"
                  >
                    <h3 className="text-base font-bold text-slate-900">{option.label}</h3>
                    <p className="mt-2 text-sm text-[#064b35] font-semibold">{option.detail}</p>
                    <p className="mt-4 text-xs font-semibold text-slate-500 group-hover:text-[#064b35]">
                      Explore →
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-16 overflow-hidden rounded-3xl bg-slate-50 p-8 md:p-12">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    Get a personalised investment plan
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Tell us your budget and goals. Our team will shortlist verified opportunities and share locality insights.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 md:justify-end">
                  <Link href="/contact" className="rounded-xl bg-[#064b35] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#043c2b]">
                    Talk to an Expert
                  </Link>
                  <Link href="/properties" className="rounded-xl border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-[#064b35] hover:text-[#064b35]">
                    Browse Properties
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
