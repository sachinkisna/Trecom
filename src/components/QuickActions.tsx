"use client";

import Link from "next/link";

const actions = [
  {
    title: "Buy a Home",
    description: "Find your perfect home",
    href: "/properties/?purpose=buy",
    icon: (
      <svg
        width="28"
        height="28"
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
    title: "Rent a Home",
    description: "Comfortable homes for rent",
    href: "/properties/?purpose=rent",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M4 10h16" />
        <path d="M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" />
        <path d="M3 10h18v8H3z" />
        <path d="M6 18v2M18 18v2" />
      </svg>
    ),
  },
  {
    title: "Sell Property",
    description: "Reach genuine buyers",
    href: "/sell-property/",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M12 3v18" />
        <path d="M17 7.5c0-2-2-3.5-5-3.5s-5 1.5-5 3.5 1.7 3 5 4 5 2 5 4-2 3.5-5 3.5-5-1.5-5-3.5" />
      </svg>
    ),
  },
  {
    title: "Post Property",
    description: "List your property easily",
    href: "/post-property",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
    ),
  },
];

export default function QuickActions() {
  return (
    <section className="relative z-20 -mt-8 px-6">
      <div className="mx-auto max-w-7xl">

        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] sm:grid-cols-2 lg:grid-cols-4">

          {actions.map((action, index) => (
            <Link
              key={action.title}
              href={action.href}
              className={`group flex items-center gap-4 px-6 py-6 transition duration-200 hover:bg-slate-50 ${
                index !== actions.length - 1
                  ? "border-b border-slate-100 lg:border-b-0 lg:border-r"
                  : ""
              }`}
            >

              {/* ICON */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#eef7f2] text-[#064b35] transition duration-200 group-hover:bg-[#064b35] group-hover:text-white">
                {action.icon}
              </div>

              {/* TEXT */}
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {action.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {action.description}
                </p>
              </div>

              {/* ARROW */}
              <div className="ml-auto text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#064b35]">
                →
              </div>

            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}