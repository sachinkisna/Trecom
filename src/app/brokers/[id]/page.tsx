import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Rating from "@/components/ui/Rating";
import PropertyCard from "@/components/PropertyCard";
import { getBroker, brokers } from "@/lib/brokers";
import { properties } from "@/lib/data";

export function generateStaticParams() {
  return brokers.map((b) => ({ id: b.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const broker = getBroker(id);
  if (!broker) return { title: "Broker not found" };
  return { title: `${broker.name} — TRECOM Broker`, description: broker.about };
}

export default async function BrokerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const broker = getBroker(id);
  if (!broker) notFound();

  const listed = broker.postedPropertyIds
    .map((pid) => properties.find((p) => p.id === pid))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const whatsapp = `https://wa.me/9190000${broker.brokerCode.slice(-4)}?text=${encodeURIComponent(
    `Hi ${broker.name}, I'm interested in your listed properties on TRECOM.`
  )}`;

  return (
    <>
      <Header />
      <main>
        {/* BREADCRUMB */}
        <div className="border-b border-slate-100 bg-white">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-4 text-xs text-slate-500 lg:px-10">
            <Link href="/" className="hover:text-[#064b35]">Home</Link>
            <span>/</span>
            <Link href="/brokers" className="hover:text-[#064b35]">Brokers</Link>
            <span>/</span>
            <span className="text-slate-800">{broker.name}</span>
          </div>
        </div>

        {/* PROFILE HEADER */}
        <section className="bg-[#064b35] px-6 py-12 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 sm:flex-row sm:items-center">
            <img src={broker.photo} alt={broker.name} className="h-24 w-24 rounded-full border-4 border-white/20 object-cover" />
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-white">{broker.name}</h1>
              <p className="mt-1 text-sm text-white/70">TRECOM ID: {broker.brokerCode} · Member since {broker.since}</p>
              <div className="mt-2 flex justify-center sm:justify-start">
                <Rating value={broker.rating} reviews={broker.reviews} />
              </div>
            </div>
            <div className="ml-auto flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
              >
                Chat on WhatsApp
              </a>
              <Link href="/contact" className="rounded-xl border border-white/30 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10">
                Enquire
              </Link>
            </div>
          </div>
        </section>

        {/* ABOUT + POSTED */}
        <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_2fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
                <h2 className="text-lg font-bold text-slate-900">About {broker.name.split(" ")[0]}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{broker.about}</p>
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="text-slate-500">Speciality</span>
                    <span className="font-semibold text-slate-800">{broker.speciality}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="text-slate-500">Areas</span>
                    <span className="font-semibold text-slate-800">{broker.locations.join(", ")}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Phone</span>
                    <span className="font-semibold text-slate-800">{broker.phone}</span>
                  </div>
                </div>
              </div>
            </aside>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Properties posted by {broker.name.split(" ")[0]}
              </h2>
              {listed.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                  <p className="text-base font-semibold text-slate-700">No active listings right now</p>
                  <p className="mt-2 text-sm text-slate-500">Check back soon or contact {broker.name.split(" ")[0]} directly.</p>
                </div>
              ) : (
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {listed.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
