"use client";

import Link from "next/link";

const locations = [
  {
    name: "Bangalore",
    properties: "12,480+ Properties",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Electronic City",
    properties: "2,340+ Properties",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Whitefield",
    properties: "3,180+ Properties",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Sarjapur",
    properties: "2,760+ Properties",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Anekal",
    properties: "1,120+ Properties",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Attibele",
    properties: "860+ Properties",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function PopularLocations() {
  return (
    <section className="bg-white px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* SECTION HEADER */}
        <div className="mb-10 flex items-end justify-between">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-[#064b35]" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#064b35]">
                Explore Locations
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Popular locations
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
              Explore properties in some of the most sought-after locations
              around Bangalore.
            </p>
          </div>

          <Link
            href="/locations"
            className="hidden items-center gap-2 text-sm font-semibold text-[#064b35] transition hover:gap-3 md:flex"
          >
            View all locations
            <span>→</span>
          </Link>

        </div>

        {/* LOCATION GRID */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">

          {locations.map((location) => (
            <Link
              key={location.name}
              href={`/properties?location=${encodeURIComponent(
                location.name
              )}`}
              className="group relative h-[250px] overflow-hidden rounded-2xl bg-slate-200"
            >

              {/* IMAGE */}
              <img
                src={location.image}
                alt={location.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5" />

              {/* CONTENT */}
              <div className="absolute inset-x-0 bottom-0 p-5">

                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </div>

                <h3 className="text-base font-bold text-white">
                  {location.name}
                </h3>

                <div className="mt-1 flex items-center justify-between">
                  <p className="text-xs text-white/70">
                    {location.properties}
                  </p>

                  <span className="translate-x-2 text-white opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </div>

              </div>

            </Link>
          ))}

        </div>

        {/* MOBILE VIEW ALL */}
        <div className="mt-6 md:hidden">
          <Link
            href="/locations"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-[#064b35]"
          >
            View all locations
            <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}