import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getService, services } from "@/lib/data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Header />

      <main>
        <section className="bg-[#064b35] px-6 py-14 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <nav className="mb-6 flex items-center gap-2 text-xs text-white/60">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white">Services</Link>
              <span>/</span>
              <span className="text-white">{service.title}</span>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
              {service.shortDescription}
            </p>
          </div>
        </section>

        <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                About this service
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                {service.longDescription}
              </p>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <div key={feature.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef7f2] text-[#064b35]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-base font-bold text-slate-900">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
                <h3 className="text-lg font-bold text-slate-900">Talk to our team</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Share your requirement and our team will guide you through {service.title.toLowerCase()}.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 block w-full rounded-xl bg-[#064b35] py-3.5 text-center text-sm font-bold text-white transition hover:bg-[#043c2b]"
                >
                  Get Assistance
                </Link>
                <Link
                  href="/post-property"
                  className="mt-3 block w-full rounded-xl border border-slate-200 py-3.5 text-center text-sm font-semibold text-slate-700 transition hover:border-[#064b35] hover:text-[#064b35]"
                >
                  Post a Property
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-xl font-bold text-slate-900">Other services</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {others.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">{item.shortDescription}</p>
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
