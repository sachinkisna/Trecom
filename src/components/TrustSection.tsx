"use client";

const verificationItems = [
  {
    number: "01",
    title: "Owner Verified",
    description:
      "We verify the identity and contact information of property owners and listing partners.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M20 11.5V6l-8-3-8 3v5.5c0 4.8 3.4 8.3 8 10.5 4.6-2.2 8-5.7 8-10.5Z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Property Verified",
    description:
      "Important property information is reviewed to help you make a more informed decision.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="m3 11 9-7 9 7" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
        <path d="M16.5 5.5 19 3" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Location Verified",
    description:
      "Understand where a property is located and explore nearby roads, schools, transport and services.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Document Reviewed",
    description:
      "Where available, relevant property documents can be reviewed as part of the TRECOM verification process.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    ),
  },
];

export default function TrustSection() {
  return (
    <section className="bg-white px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">

        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">

          {/* LEFT */}
          <div>

            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-8 bg-[#064b35]" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#064b35]">
                TRECOM Trust
              </span>
            </div>

            <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
              Search with
              <span className="text-[#064b35]"> confidence.</span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-500 md:text-base">
              Real estate decisions deserve better information. TRECOM brings
              verification, property information and local insights together
              so you can explore properties with greater confidence.
            </p>

            {/* TRUST SCORE CARD */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Example
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    TRECOM Trust Score
                  </h3>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-full border-[5px] border-[#064b35] bg-white">
                  <span className="text-lg font-bold text-[#064b35]">
                    94
                  </span>
                </div>

              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[94%] rounded-full bg-[#064b35]" />
              </div>

              <div className="mt-3 flex justify-between text-[11px] text-slate-400">
                <span>Information available</span>
                <span>94 / 100</span>
              </div>

            </div>

            <button className="mt-7 rounded-xl bg-[#064b35] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#043c2b]">
              Learn about TRECOM Verification
            </button>

          </div>

          {/* RIGHT */}
          <div className="grid gap-4 sm:grid-cols-2">

            {verificationItems.map((item) => (
              <div
                key={item.number}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#064b35]/20 hover:shadow-lg"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef7f2] text-[#064b35] transition group-hover:bg-[#064b35] group-hover:text-white">
                    {item.icon}
                  </div>

                  <span className="text-xs font-bold text-slate-300">
                    {item.number}
                  </span>

                </div>

                <h3 className="mt-6 text-base font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#064b35]">
                  Learn more
                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}