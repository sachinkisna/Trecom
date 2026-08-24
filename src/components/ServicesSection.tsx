"use client";

import Link from "next/link";

const services = [
  {
    title: "Home Loans",
    description: "Compare financing options and find a suitable home loan.",
    href: "/services/home-loans",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: "Legal Assistance",
    description: "Get professional assistance for your property documentation.",
    href: "/services/legal",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M12 3v18" />
        <path d="M5 7h14" />
        <path d="M7 7 4 14h6L7 7Z" />
        <path d="m17 7-3 7h6l-3-7Z" />
      </svg>
    ),
  },
  {
    title: "Property Valuation",
    description: "Understand the estimated market value of your property.",
    href: "/services/valuation",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M4 19V5" />
        <path d="M4 17h4v2H4zM10 13h4v6h-4zM16 8h4v11h-4z" />
      </svg>
    ),
  },
  {
    title: "Interior Design",
    description: "Transform your home with professional interior solutions.",
    href: "/services/interiors",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="m14 4 6 6" />
        <path d="M3 21l4.5-1 11-11-3.5-3.5-11 11L3 21Z" />
        <path d="m13 6 3.5 3.5" />
      </svg>
    ),
  },
  {
    title: "Property Management",
    description: "Reliable support for managing your property remotely.",
    href: "/services/property-management",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M4 10h16v10H4z" />
        <path d="M7 10V6a5 5 0 0 1 10 0v4" />
        <path d="M9 15h6" />
      </svg>
    ),
  },
  {
    title: "Home Services",
    description: "Find trusted professionals for everyday home needs.",
    href: "/services/home-services",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M4 20h16" />
        <path d="M6 20V9l6-5 6 5v11" />
        <path d="M9 20v-6h6v6" />
        <path d="M9 9h.01M12 9h.01M15 9h.01" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-slate-50 px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-[#064b35]" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#064b35]">
                TRECOM Services
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Everything you need,
              <span className="text-[#064b35]"> in one place.</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
              From finding a property to completing your purchase and
              managing your home, TRECOM connects you with useful property
              services.
            </p>
          </div>

          <Link
            href="/services"
            className="hidden items-center gap-2 text-sm font-semibold text-[#064b35] transition hover:gap-3 md:flex"
          >
            View all services
            <span>→</span>
          </Link>
        </div>

        {/* SERVICES */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#064b35]/20 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef7f2] text-[#064b35] transition group-hover:bg-[#064b35] group-hover:text-white">
                  {service.icon}
                </div>

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition group-hover:border-[#064b35] group-hover:bg-[#064b35] group-hover:text-white">
                  →
                </span>

              </div>

              <h3 className="mt-6 text-base font-bold text-slate-900">
                {service.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {service.description}
              </p>

              <div className="mt-5 text-xs font-semibold text-[#064b35]">
                Explore service →
              </div>
            </Link>
          ))}

        </div>

        {/* MOBILE */}
        <div className="mt-8 md:hidden">
          <Link
            href="/services"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-[#064b35]"
          >
            View all services
            <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}