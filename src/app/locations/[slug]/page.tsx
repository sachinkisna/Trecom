import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLocation, locations } from "@/lib/data";
import AiValuation from "@/components/ai/AiValuation";
import LocalityInsights from "@/components/ai/LocalityInsights";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocation(slug);

  if (!location) {
    notFound();
  }

  return (
    <>
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[#064b35]">
          <div className="absolute inset-0">
            <img src={location.image} alt={location.name} className="h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-[#064b35]/85" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
            <nav className="mb-6 flex items-center gap-2 text-xs text-white/60">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/locations" className="hover:text-white">Locations</Link>
              <span>/</span>
              <span className="text-white">{location.name}</span>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {location.name}
            </h1>
            <p className="mt-3 text-sm text-white/70">{location.city}</p>

            <div className="mt-8 grid max-w-3xl grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-wide text-white/60">Avg. Price</p>
                <p className="mt-1 text-xl font-bold text-white">{location.avgPrice}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-wide text-white/60">Growth</p>
                <p className="mt-1 text-xl font-bold text-white">{location.growth}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-wide text-white/60">Listings</p>
                <p className="mt-1 text-xl font-bold text-white">{location.properties}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  About {location.name}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                  {location.description}
                </p>

                <h3 className="mt-10 text-xl font-bold text-slate-900">Popular sub-localities</h3>
                <div className="mt-5 space-y-3">
                  {location.subLocalities.map((sub) => (
                    <div
                      key={sub.name}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
                    >
                      <div>
                        <p className="text-sm font-bold text-slate-900">{sub.name}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{sub.properties} properties</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-900">{sub.price}</p>
                        <Link href={`/properties?location=${encodeURIComponent(sub.name)}`} className="text-xs font-semibold text-[#064b35]">
                          View →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
                  <h3 className="text-lg font-bold text-slate-900">Find properties here</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Browse verified homes, plots and commercial spaces across {location.name}.
                  </p>
                  <Link
                    href={`/properties?location=${encodeURIComponent(location.name)}`}
                    className="mt-5 block w-full rounded-xl bg-[#064b35] py-3.5 text-center text-sm font-bold text-white transition hover:bg-[#043c2b]"
                  >
                    Explore Properties
                  </Link>
                  <Link
                    href="/contact"
                    className="mt-3 block w-full rounded-xl border border-slate-200 py-3.5 text-center text-sm font-semibold text-slate-700 transition hover:border-[#064b35] hover:text-[#064b35]"
                  >
                    Talk to an Expert
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* AI INSIGHTS */}
        <section className="bg-slate-50 px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-8 bg-[#064b35]" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#064b35]">
                  Powered by TRECOM AI
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                AI insights for {location.name}
              </h2>
            </div>
            <div className="space-y-12">
              <AiValuation defaultLocality={location.slug} />
              <LocalityInsights location={location} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
