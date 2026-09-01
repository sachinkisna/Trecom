import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import {
  properties,
  projects,
  type PropertyCategory,
  type Project,
} from "@/lib/data";
import DatabasePropertyListing from "@/components/DatabasePropertyListing";

export type CategoryConfig = {
  key: PropertyCategory | "pre-launch";
  eyebrow: string;
  title: string;
  subtitle: string;
  marquee: string[];
  highlights: { icon: string; title: string; desc: string }[];
  stats: { value: string; label: string }[];
  whyTitle: string;
  whyPoints: { title: string; desc: string }[];
  cta: { title: string; subtitle: string; href: string; label: string };
};

function ProjectMiniCard({ project }: { project: Project }) {
  return (
    <Link
      href="/contact"
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[#064b35]">
          ✓ Verified
        </div>
        <div className="absolute bottom-4 left-4 text-[11px] font-medium text-white backdrop-blur-sm">
          Pre-Launch · {project.possession}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-base font-bold text-slate-900">{project.name}</h3>
        <p className="mt-1 text-xs text-slate-500">By {project.developer}</p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-sm font-bold text-slate-900">{project.priceFrom}</span>
          <span className="text-xs font-semibold text-[#064b35]">Enquire →</span>
        </div>
      </div>
    </Link>
  );
}

export default function PropertyCategoryPage({ config }: { config: CategoryConfig }) {
  const isPreLaunch = config.key === "pre-launch";

  const listing = isPreLaunch
    ? (projects.filter((p) => p.status === "Under Construction") as unknown as never[])
    : properties.filter((p) => p.category === config.key);

  const marqueeItems = config.marquee.map((text, i) => (
    <span
      key={i}
      className="mx-6 flex items-center gap-2 whitespace-nowrap text-sm font-medium text-white/90"
    >
      <span className="live-dot h-1.5 w-1.5 rounded-full bg-white" />
      {text}
    </span>
  ));

  return (
    <>
      <Header />
      <PageHeader
        eyebrow={config.eyebrow}
        title={config.title}
        subtitle={config.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Property", href: "/properties" },
          { label: config.title },
        ]}
      />

      {/* SLIDING PREMIUM INFO */}
      <div className="bg-[#043c2b] py-4">
        <Marquee items={marqueeItems} />
      </div>

      {/* HIGHLIGHTS */}
      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {config.highlights.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className="mt-4 text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LISTING */}
      <section className="bg-slate-50 px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-8 bg-[#064b35]" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#064b35]">
                  {isPreLaunch ? "Pre-Launch Opportunities" : "Available Listings"}
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {config.title} in Bangalore
              </h2>
            </div>
            <Link
              href="/post-property"
              className="hidden rounded-xl border border-[#064b35] px-5 py-3 text-sm font-semibold text-[#064b35] transition hover:bg-[#064b35] hover:text-white md:block"
            >
              Post a Property
            </Link>
          </div>

          {isPreLaunch && listing.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="text-base font-semibold text-slate-700">New listings coming soon</p>
              <p className="mt-2 text-sm text-slate-500">
                Register your interest and we'll notify you when new {config.title.toLowerCase()} are added.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#064b35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#043c2b]"
              >
                Register Interest →
              </Link>
            </div>
          ) : isPreLaunch ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listing.map((item, i) => (
                <Reveal key={i} delay={(i % 3) * 80}>
                  <ProjectMiniCard project={item as unknown as Project} />
                </Reveal>
              ))}
            </div>
          ) : (
            <DatabasePropertyListing
              category={config.key as PropertyCategory}
              fallback={listing}
            />
          )}
        </div>
      </section>

      {/* WHY + STATS */}
      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">{config.whyTitle}</h2>
              <div className="mt-8 space-y-6">
                {config.whyPoints.map((point, i) => (
                  <Reveal key={point.title} delay={i * 80}>
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef7f2] text-[#064b35]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{point.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-500">{point.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={120}>
              <div className="overflow-hidden rounded-3xl bg-[#064b35] p-8 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                  TRECOM Advantage
                </p>
                <div className="mt-6 grid grid-cols-2 gap-6">
                  {config.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-3xl font-bold">{stat.value}</div>
                      <div className="mt-1 text-xs text-white/70">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <Link
                  href={config.cta.href}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#064b35] transition hover:-translate-y-0.5"
                >
                  {config.cta.label} →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-[#043c2b] px-8 py-12 lg:px-16">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[50px] border-white/5" />
            <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-3xl font-bold text-white">{config.cta.title}</h2>
                <p className="mt-3 max-w-xl text-sm text-white/70">{config.cta.subtitle}</p>
              </div>
              <Link
                href={config.cta.href}
                className="shrink-0 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#064b35] transition hover:-translate-y-0.5"
              >
                {config.cta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
