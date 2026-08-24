"use client";

import Link from "next/link";

export default function PropertyCTA() {
  return (
    <section className="px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-[#064b35]">

          {/* Decorative shapes */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[50px] border-white/5" />
          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full border-[50px] border-white/5" />

          <div className="relative grid items-center gap-10 px-7 py-12 md:px-12 lg:grid-cols-[1fr_auto] lg:px-16 lg:py-16">

            {/* CONTENT */}
            <div className="max-w-2xl">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />

                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/80">
                  For Property Owners
                </span>
              </div>

              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                Have a property to sell or rent?
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 md:text-base">
                List your property on TRECOM and connect with people looking
                for their next home, investment or commercial space.
              </p>

              {/* BENEFITS */}
              <div className="mt-7 grid gap-3 sm:grid-cols-3">

                <div className="flex items-center gap-2 text-xs text-white/80">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px]">
                    ✓
                  </span>
                  Easy listing
                </div>

                <div className="flex items-center gap-2 text-xs text-white/80">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px]">
                    ✓
                  </span>
                  Reach genuine buyers
                </div>

                <div className="flex items-center gap-2 text-xs text-white/80">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[10px]">
                    ✓
                  </span>
                  Manage enquiries
                </div>

              </div>

            </div>

            {/* ACTION */}
            <div className="lg:pr-2">

              <Link
                href="/post-property"
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#064b35] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
              >
                Post Your Property
                <span className="text-lg">→</span>
              </Link>

              <p className="mt-3 text-center text-[10px] text-white/45">
                Takes only a few minutes
              </p>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}