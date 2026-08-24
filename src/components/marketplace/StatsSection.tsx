const stats = [
  { value: "50,000+", label: "Properties" },
  { value: "25,000+", label: "Verified Owners" },
  { value: "100+", label: "Cities" },
  { value: "1M+", label: "Happy Users" },
];

export default function StatsSection() {
  return (
    <section className="border-y border-slate-200 bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl font-bold text-[#1e293b] sm:text-3xl">{s.value}</p>
            <p className="mt-1 text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
