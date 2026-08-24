import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";

export type LegalSection = { heading: string; paragraphs: string[] };

export default function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Header />
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={updated ? `Last updated: ${updated}` : undefined}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]}
      />

      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-3xl">
          {intro && <p className="text-base leading-8 text-slate-600">{intro}</p>}

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((para, i) => (
                    <p key={i} className="text-sm leading-7 text-slate-600">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-4 rounded-2xl bg-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Have questions?{" "}
              <Link href="/contact/" className="font-semibold text-[#FF052B]">
                Contact our team →
              </Link>
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/privacy/" className="font-medium text-slate-600 transition hover:text-[#FF052B]">
                Privacy Policy
              </Link>
              <Link href="/terms/" className="font-medium text-slate-600 transition hover:text-[#FF052B]">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
