import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyDetailClient, {
  PropertyDetailSidebar,
} from "@/components/PropertyDetailClient";
import { properties } from "@/lib/data";
import { getPropertyById, getSimilarProperties } from "@/lib/search";
import AiValuation from "@/components/ai/AiValuation";
import LocalityInsights from "@/components/ai/LocalityInsights";
import { locations } from "@/lib/data";

export function generateStaticParams() {
  return properties.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(Number(id));
  if (!property) return { title: "Property Not Found" };

  return {
    title: `${property.title} in ${property.location}`,
    description: property.description,
    openGraph: {
      title: property.title,
      description: property.description,
      images: [{ url: property.image }],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getPropertyById(Number(id));

  if (!property) {
    notFound();
  }

  const related = getSimilarProperties(property);
  const localitySlug = locations.find((l) =>
    property.location.toLowerCase().includes(l.name.toLowerCase())
  )?.slug;

  return (
    <>
      <Header />

      <main className="pb-20 lg:pb-0">
        <div className="border-b border-slate-100 bg-white">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-4 text-xs text-slate-500 lg:px-10">
            <Link href="/" className="hover:text-[#064b35]">
              Home
            </Link>
            <span>/</span>
            <Link href="/properties/" className="hover:text-[#064b35]">
              Properties
            </Link>
            <span>/</span>
            <span className="text-slate-800">{property.title}</span>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1.6fr_1fr] lg:px-10">
          <PropertyDetailClient property={property} related={related} />
          <div className="hidden lg:block">
            <PropertyDetailSidebar property={property} />
          </div>
        </div>

        {localitySlug && (
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
                  AI insights for this locality
                </h2>
              </div>
              <div className="space-y-12">
                <AiValuation defaultLocality={localitySlug} />
                <LocalityInsights
                  location={locations.find((l) => l.slug === localitySlug)!}
                />
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
