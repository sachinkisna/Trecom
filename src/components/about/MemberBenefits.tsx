const benefits = [
  {
    number: "01",
    title: "Refund & Royalty Programs",
    description:
      "Eligible TRECOM transactions may provide access to refund and royalty programs.",
  },
  {
    number: "02",
    title: "Legal Support",
    description:
      "Get access to property-related legal guidance and support.",
  },
  {
    number: "03",
    title: "Maintenance Support",
    description:
      "Continue receiving support even after possession of your property.",
  },
  {
    number: "04",
    title: "Future Property Assistance",
    description:
      "Get continued assistance whenever you plan to rent, buy, sell, lease, or invest again.",
  },
  {
    number: "05",
    title: "TRECOM Community",
    description:
      "Be part of a growing community where members can share trusted property recommendations and opportunities.",
  },
];

export default function MemberBenefits() {
  return (
    <section className="bg-slate-50 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">

          {/* LEFT */}
          <div className="lg:sticky lg:top-24 lg:self-start">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff0033]">
              More Than Just Property Listings
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
              A relationship that continues
              <span className="text-[#ff0033]"> beyond the deal.</span>
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600">
              At TRECOM.ai, we don't believe our responsibility ends when a
              deal is closed.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600">
              We believe every successful property transaction should lead to
              a long-term relationship.
            </p>

            <div className="mt-8 rounded-2xl bg-[#ff0033] p-6 text-white">
              <p className="text-sm font-bold">
                TRECOM Member Benefits
              </p>

              <p className="mt-2 text-sm leading-6 text-white/75">
                Designed to provide value before, during, and after your
                property journey.
              </p>
            </div>

          </div>

          {/* BENEFITS */}
          <div className="space-y-4">

            {benefits.map((benefit) => (
              <div
                key={benefit.number}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#ff0033]/20 hover:shadow-lg md:p-8"
              >
                <div className="flex gap-5">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff0f3] text-xs font-bold text-[#ff0033]">
                    {benefit.number}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {benefit.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      {benefit.description}
                    </p>
                  </div>

                </div>
              </div>
            ))}

            <p className="pt-3 text-xs leading-5 text-slate-400">
              * As per applicable Terms & Conditions.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}