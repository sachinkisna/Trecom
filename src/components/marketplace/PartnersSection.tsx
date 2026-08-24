const partners = [
  "Urban Developers",
  "Prestige Group",
  "TRECOM Projects",
  "Heritage Builders",
  "Skyline Corp",
  "Green Valley",
];

export default function PartnersSection() {
  return (
    <section className="bg-[#f8fafc] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-xl font-bold text-[#1e293b] sm:text-2xl">
          Trusted Real Estate Partners
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          {partners.map((name) => (
            <div
              key={name}
              className="flex h-14 min-w-[140px] items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-400"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
