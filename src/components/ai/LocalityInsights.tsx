import type { Location } from "@/lib/data";

const nearbyBySlug: Record<string, { malls: string[]; schools: string[]; hospitals: string[] }> = {
  "electronic-city": {
    malls: ["Neo Mall", "Central Silk Board Arcade", "Royal Pearl Mall"],
    schools: ["Delhi Public School", "Shiksha School", "Ecity Public School"],
    hospitals: ["Springleaf Hospital", "Vydehi Satellite", "Apathy General"],
  },
  whitefield: {
    malls: ["Phoenix Marketcity", "VR Bengaluru", "Inorbit Mall"],
    schools: ["Ryan International", "Whitefield Global School", "Glentree Academy"],
    hospitals: ["Columbia Asia", "Manipal Whitefield", "Vydehi Hospital"],
  },
  "sarjapur-road": {
    malls: ["Market Square", "Total Mall", "Sarjapur Central"],
    schools: ["Harvest International", "Primus Public School", "Oakridge"],
    hospitals: ["Sakra World Hospital", "Apollo Clinic", "Motherhood"],
  },
  indiranagar: {
    malls: ["1 MG-Lido", "Garuda Mall", "UB City"],
    schools: ["National Public School", "Bishop Cotton", "Mallikarjun School"],
    hospitals: ["Manipal Hospital", "Cloudnine", "Sakra Express"],
  },
  anekal: {
    malls: ["Anekal Mart", "Town Square", "Green Bazaar"],
    schools: ["Sorsfort School", "Anekal Public School", "Vivekananda Vidya"],
    hospitals: ["Anekal Govt Hospital", "Sri Maruthi Care", "Town Clinic"],
  },
  "mg-road": {
    malls: ["UB City", "Garuda Mall", "Commercial Street"],
    schools: ["Bishop Cotton", "St. Joseph's", "Baldwin"],
    hospitals: ["Mallya Hospital", "Agrawal Clinic", "Manipal Express"],
  },
};

export default function LocalityInsights({ location }: { location: Location }) {
  const nearby = nearbyBySlug[location.slug] ?? {
    malls: ["City Mall", "Central Plaza", "Local Market"],
    schools: ["Public School", "International School", "Grammar School"],
    hospitals: ["General Hospital", "Care Clinic", "Multi-speciality Centre"],
  };

  const growth = parseFloat(location.growth.replace(/[^0-9.]/g, "")) || 0;

  const opportunities = [
    {
      title: "Price Trend",
      value: location.growth,
      desc:
        growth >= 10
          ? "Among the fastest-appreciating corridors in the city."
          : "Steady, resilient appreciation over recent years.",
      tag: growth >= 10 ? "High Growth" : "Stable",
    },
    {
      title: "Inventory & Demand",
      value: location.properties,
      desc: "Active listings indicate healthy buyer and tenant interest in the area.",
      tag: "Liquid",
    },
    {
      title: "Opportunity",
      value: growth >= 10 ? "Early Bets" : "Value Buy",
      desc:
        growth >= 10
          ? "Consider plotted and under-construction options before further price discovery."
          : "Resale and ready homes offer attractive entry points today.",
      tag: "AI Pick",
    },
  ];

  return (
    <div className="space-y-12">
      {/* AI INVESTMENT OPPORTUNITIES */}
      <div>
        <div className="mb-6 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#064b35] text-[11px] font-bold text-white">
            AI
          </span>
          <h3 className="text-xl font-bold tracking-tight text-slate-900">
            AI Investment Opportunities · {location.name}
          </h3>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {opportunities.map((o) => (
            <div key={o.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{o.title}</p>
                <span className="rounded-full bg-[#eef7f2] px-2.5 py-1 text-[10px] font-bold text-[#064b35]">{o.tag}</span>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">{o.value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AROUND THE LOCALITY */}
      <div>
        <div className="mb-6 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#064b35] text-[11px] font-bold text-white">
            AI
          </span>
          <h3 className="text-xl font-bold tracking-tight text-slate-900">
            Around {location.name}
          </h3>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { label: "Malls & Lifestyle", icon: "🛍️", items: nearby.malls },
            { label: "Schools", icon: "🏫", items: nearby.schools },
            { label: "Hospitals", icon: "🏥", items: nearby.hospitals },
          ].map((col) => (
            <div key={col.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">{col.icon}</span>
                <p className="text-sm font-bold text-slate-900">{col.label}</p>
              </div>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#064b35]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-slate-400">
          Nearby places are indicative and generated by TRECOM AI from locality data — verify before site visits.
        </p>
      </div>
    </div>
  );
}
