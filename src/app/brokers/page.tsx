import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import Rating from "@/components/ui/Rating";
import { brokers } from "@/lib/brokers";

export const metadata: Metadata = {
  title: "Brokers — Verified Property Brokers",
  description:
    "Connect with verified TRECOM brokers, see their ID, ratings and the properties they've posted across Bangalore.",
};

export default function BrokersPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader
          eyebrow="TRECOM Brokers"
          title="Meet our verified brokers"
          subtitle="Every broker is verified with a TRECOM ID and rated by clients. Browse their posted properties and connect directly."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Brokers" }]}
        />

        <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {brokers.map((broker, i) => (
                <Reveal key={broker.id} delay={i * 60}>
                  <Link
                    href={`/brokers/${broker.id}`}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={broker.photo}
                        alt={broker.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{broker.name}</h3>
                        <p className="text-xs text-slate-400">ID: {broker.brokerCode}</p>
                        <div className="mt-1">
                          <Rating value={broker.rating} reviews={broker.reviews} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {broker.locations.map((loc) => (
                        <span key={loc} className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600">
                          {loc}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 text-xs text-slate-500">
                      Speciality: <span className="font-semibold text-slate-700">{broker.speciality}</span>
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Listings posted: <span className="font-semibold text-slate-700">{broker.postedPropertyIds.length}</span>
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#064b35] group-hover:gap-3">
                      View profile →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
