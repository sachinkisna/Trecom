import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <>
      <Header />

      <main>
        <PageHeader
          eyebrow="New Developments"
          title="Featured Projects"
          subtitle="Explore carefully selected residential projects from trusted developers across Bangalore."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Projects" },
          ]}
        />

        <section className="bg-slate-50 px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Curated Listings"
              title="Projects you can explore"
              subtitle="From ready-to-move homes to upcoming launches, find a project that fits your timeline."
            />

            <div className="grid gap-6 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.slug}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-[260px] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[#064b35]">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#064b35] text-[9px] text-white">✓</span>
                      Verified Project
                    </div>
                    <div className="absolute bottom-4 left-4 rounded-md bg-black/50 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
                      {project.status === "Ready to Move" ? "Ready to Move" : `Possession ${project.possession}`}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{project.name}</h3>
                        <p className="mt-1 text-xs text-slate-500">By {project.developer}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-lg font-bold text-slate-900">{project.priceFrom}</div>
                        <div className="text-[10px] text-slate-400">Starting from</div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                      {project.location}
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 border-y border-slate-100 py-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-slate-400">Configuration</p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">{project.configuration}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-slate-400">Possession</p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">{project.possession}</p>
                      </div>
                    </div>

                    <Link
                      href="/contact"
                      className="mt-5 block flex-1 rounded-xl bg-[#064b35] py-3 text-center text-xs font-semibold text-white transition hover:bg-[#043c2b]"
                    >
                      Enquire Now
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
