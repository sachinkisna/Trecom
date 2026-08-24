"use client";

import Link from "next/link";
import { ShieldCheck, MapPin } from "lucide-react";
import { projects } from "@/lib/data";

export default function NewProjectsSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-[#1e293b] sm:text-3xl">
            New &amp; Upcoming Projects
          </h2>
          <Link href="/projects/" className="hidden text-sm font-semibold text-[#FF052B] sm:block">
            View all
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <article
              key={p.slug}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-lg"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                  <ShieldCheck size={11} />
                  Verified
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#1e293b]">{p.name}</h3>
                <p className="mt-1 text-xs text-slate-500">by {p.developer}</p>
                <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                  <MapPin size={12} />
                  {p.location}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-lg font-bold text-[#1e293b]">{p.priceFrom}</p>
                    <p className="text-xs text-slate-500">{p.configuration}</p>
                  </div>
                  <p className="text-xs text-slate-500">{p.possession}</p>
                </div>
                <Link
                  href={`/projects/${p.slug}/`}
                  className="mt-4 block rounded-xl bg-[#FF052B] py-2.5 text-center text-sm font-semibold text-white"
                >
                  View Project
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
