"use client";

import Link from "next/link";
import { projects } from "@/lib/data";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section className="bg-slate-50 px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-[#064b35]" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#064b35]">
                New Developments
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
              Explore carefully selected residential projects from trusted developers.
            </p>
          </div>
          <Link
            href="/projects/"
            className="hidden items-center gap-2 text-sm font-semibold text-[#064b35] transition hover:gap-3 md:flex"
          >
            View all projects
            <span>→</span>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((project) => (
            <article
              key={project.slug}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-[260px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[#064b35]">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#064b35] text-[9px] text-white">
                    ✓
                  </span>
                  RERA Registered
                </div>
                <div className="absolute bottom-4 left-4 rounded-md bg-black/50 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
                  {project.possession}
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
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">Status</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">{project.status}</p>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/projects/${project.slug}/`}
                    className="flex-1 rounded-xl bg-[#064b35] py-3 text-center text-xs font-semibold text-white transition hover:bg-[#043c2b]"
                  >
                    View Project
                  </Link>
                  <Link
                    href="/contact/"
                    className="rounded-xl border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-700 transition hover:border-[#064b35] hover:text-[#064b35]"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/projects/"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-[#064b35]"
          >
            View all projects
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
