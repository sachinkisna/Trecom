import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import { locations } from "@/lib/data";

export default function LocationsPage() {
  return (
    <>
      <Header />

      <main>
        <PageHeader
          eyebrow="Explore Locations"
          title="Popular Locations"
          subtitle="Explore properties in some of the most sought-after locations around Bangalore."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Locations" },
          ]}
        />

        <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Local Insights"
              title="Where do you want to live?"
              subtitle="Understand property prices, growth and available inventory before choosing your next location."
            />

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
              {locations.map((location) => (
                <Link
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  className="group relative h-[280px] overflow-hidden rounded-2xl bg-slate-200"
                >
                  <img
                    src={location.image}
                    alt={location.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white">{location.name}</h3>
                    <div className="mt-1 flex items-center justify-between">
                      <p className="text-xs text-white/70">{location.properties}</p>
                      <span className="translate-x-2 text-white opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
