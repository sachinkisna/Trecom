"use client";

import Link from "next/link";

const neighbourhoods = [
  {
    name: "Electronic City",
    city: "Bangalore",
    price: "₹5,850 / sq.ft",
    growth: "+8.4%",
    properties: "2,340+",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Whitefield",
    city: "Bangalore",
    price: "₹8,950 / sq.ft",
    growth: "+11.2%",
    properties: "3,180+",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Sarjapur Road",
    city: "Bangalore",
    price: "₹7,200 / sq.ft",
    growth: "+9.7%",
    properties: "2,760+",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function NeighbourhoodSection() {
  return (
    <section className="bg-white px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-[#064b35]" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#064b35]">
                Local Insights
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Explore the neighbourhood
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
              Understand property prices, growth and available inventory
              before choosing your next location.
            </p>
          </div>

          <Link
            href="/locations"
            className="hidden items-center gap-2 text-sm font-semibold text-[#064b35] transition hover:gap-3 md:flex"
          >
            Explore all locations
            <span>→</span>
          </Link>
        </div>

        {/* CARDS */}
        <div className="grid gap-6 lg:grid-cols-3">

          {neighbourhoods.map((place) => (
            <Link
              key={place.name}
              href={`/locations/${place.name
                .toLowerCase()
                .replaceAll(" ", "-")}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* IMAGE */}
              <div className="relative h-56 overflow-hidden">

                <img
                  src={place.image}
                  alt={place.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <h3 className="text-xl font-bold text-white">
                    {place.name}
                  </h3>

                  <p className="mt-1 text-xs text-white/75">
                    {place.city}
                  </p>
                </div>

              </div>

              {/* INFO */}
              <div className="p-5">

                <div className="grid grid-cols-3 divide-x divide-slate-200">

                  <div className="pr-4">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      Avg. Price
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {place.price}
                    </p>
                  </div>

                  <div className="px-4">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      Growth
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#064b35]">
                      {place.growth}
                    </p>
                  </div>

                  <div className="pl-4">
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      Listings
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {place.properties}
                    </p>
                  </div>

                </div>

                {/* BOTTOM */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                  <span className="text-xs font-semibold text-slate-500">
                    View locality insights
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition group-hover:border-[#064b35] group-hover:bg-[#064b35] group-hover:text-white">
                    →
                  </span>

                </div>

              </div>

            </Link>
          ))}

        </div>

        {/* MOBILE */}
        <div className="mt-8 md:hidden">
          <Link
            href="/locations"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-[#064b35]"
          >
            Explore all locations
            <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}