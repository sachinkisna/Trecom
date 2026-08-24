import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";

export type OfferConfig = {
  eyebrow: string;
  title: string;
  subtitle: string;
  marquee: string[];
  offers: { title: string; desc: string; points: string[] }[];
  cta: { title: string; subtitle: string; href: string; label: string };
};

export default function OfferPage({ config }: { config: OfferConfig }) {
  const marqueeItems = config.marquee.map((text, i) => (
    <span key={i} className="mx-6 flex items-center gap-2 whitespace-nowrap text-sm font-medium text-white/90">
      <span className="live-dot h-1.5 w-1.5 rounded-full bg-white" />
      {text}
    </span>
  ));

  return (
    <>
      <Header />
      <PageHeader
        eyebrow={config.eyebrow}
        title={config.title}
        subtitle={config.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "TC & Offers", href: "/offers/tenant-buyer" },
          { label: config.title },
        ]}
      />

      <div className="bg-[#043c2b] py-4">
        <Marquee items={marqueeItems} />
      </div>

      <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {config.offers.map((offer, i) => (
              <Reveal key={offer.title} delay={i * 70}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-7">
                  <h3 className="text-lg font-bold text-slate-900">{offer.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{offer.desc}</p>
                  <ul className="mt-5 space-y-2.5">
                    {offer.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eef7f2] text-[10px] text-[#064b35]">
                          ✓
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-[#064b35] px-8 py-12 lg:px-16">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[50px] border-white/5" />
            <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-3xl font-bold text-white">{config.cta.title}</h2>
                <p className="mt-3 max-w-xl text-sm text-white/70">{config.cta.subtitle}</p>
              </div>
              <Link href={config.cta.href} className="shrink-0 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#064b35] transition hover:-translate-y-0.5">
                {config.cta.label} →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
