const values = [
  {
    number: "01",
    title: "Transparency",
    description:
      "Clear information, honest guidance, and no hidden surprises.",
  },
  {
    number: "02",
    title: "Trust",
    description:
      "Building lifelong relationships with our Members and Partners.",
  },
  {
    number: "03",
    title: "Support",
    description:
      "Standing beside you before, during, and long after your property journey.",
  },
];

export default function CoreValues() {
  return (
    <section className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">

        <div className="text-center">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff0033]">
            What Guides Us
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Built on Three Core Values
          </h2>

        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {values.map((value) => (
            <div
              key={value.number}
              className="group rounded-2xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-[#ff0033]/20 hover:shadow-xl"
            >

              <span className="text-sm font-bold text-[#ff0033]">
                {value.number}
              </span>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                {value.title}
              </h3>

              <div className="mt-4 h-1 w-10 rounded-full bg-[#ff0033] transition-all group-hover:w-16" />

              <p className="mt-6 text-sm leading-7 text-slate-500">
                {value.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}