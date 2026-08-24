import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyEnquiryForm from "@/components/PropertyEnquiryForm";
import { projects } from "@/lib/data";
import { getProject } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.name} by ${project.developer}`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <div className="border-b border-slate-100 bg-white">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-4 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#064b35]">Home</Link>
            <span>/</span>
            <Link href="/projects/" className="hover:text-[#064b35]">Projects</Link>
            <span>/</span>
            <span className="text-slate-800">{project.name}</span>
          </div>
        </div>

        <div className="relative h-[400px] overflow-hidden bg-slate-200">
          <img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-8 left-0 right-0 mx-auto max-w-7xl px-6">
            <h1 className="text-3xl font-bold text-white md:text-4xl">{project.name}</h1>
            <p className="mt-2 text-white/80">by {project.developer}</p>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Starting Price", value: project.priceFrom },
                { label: "Configuration", value: project.configuration },
                { label: "Possession", value: project.possession },
                { label: "Status", value: project.status },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-200 p-4">
                  <p className="text-[10px] uppercase text-slate-400">{item.label}</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-xl font-bold text-slate-900">Project Overview</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{project.description}</p>

            <h2 className="mt-10 text-xl font-bold text-slate-900">Amenities</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.amenities.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700"
                >
                  {a}
                </span>
              ))}
            </div>

            <h2 className="mt-10 text-xl font-bold text-slate-900">RERA Details</h2>
            <p className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700">
              RERA Registration: <strong>{project.rera}</strong>
            </p>

            <h2 className="mt-10 text-xl font-bold text-slate-900">Location</h2>
            <p className="mt-3 text-sm text-slate-600">{project.location}, {project.city}</p>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <p className="text-2xl font-bold text-[#064b35]">{project.priceFrom}</p>
              <p className="mt-1 text-sm text-slate-500">{project.configuration}</p>
              <div className="mt-6">
                <PropertyEnquiryForm type="site_visit" compact />
              </div>
              <Link
                href={`/properties/?purpose=buy&location=${encodeURIComponent(project.location.split(",")[0])}`}
                className="mt-4 block w-full rounded-xl border border-[#064b35] py-3 text-center text-sm font-semibold text-[#064b35] transition hover:bg-emerald-50"
              >
                View Properties in {project.location.split(",")[0]}
              </Link>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
