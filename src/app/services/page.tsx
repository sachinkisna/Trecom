import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import { services, type ServiceIcon } from "@/lib/data";

function ServiceGlyph({ icon }: { icon: ServiceIcon }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
  } as const;

  switch (icon) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
          <path d="M9 21v-6h6v6" />
        </svg>
      );
    case "legal":
      return (
        <svg {...common}>
          <path d="M12 3v18" />
          <path d="M5 7h14" />
          <path d="M7 7 4 14h6L7 7Z" />
          <path d="m17 7-3 7h6l-3-7Z" />
        </svg>
      );
    case "valuation":
      return (
        <svg {...common}>
          <path d="M4 19V5" />
          <path d="M4 17h4v2H4zM10 13h4v6h-4zM16 8h4v11h-4z" />
        </svg>
      );
    case "interiors":
      return (
        <svg {...common}>
          <path d="m14 4 6 6" />
          <path d="M3 21l4.5-1 11-11-3.5-3.5-11 11L3 21Z" />
          <path d="m13 6 3.5 3.5" />
        </svg>
      );
    case "management":
      return (
        <svg {...common}>
          <path d="M4 10h16v10H4z" />
          <path d="M7 10V6a5 5 0 0 1 10 0v4" />
          <path d="M9 15h6" />
        </svg>
      );
    case "support":
      return (
        <svg {...common}>
          <path d="M4 20h16" />
          <path d="M6 20V9l6-5 6 5v11" />
          <path d="M9 20v-6h6v6" />
          <path d="M9 9h.01M12 9h.01M15 9h.01" />
        </svg>
      );
  }
}

export default function ServicesPage() {
  return (
    <>
      <Header />

      <main>
        <PageHeader
          eyebrow="TRECOM Services"
          title="Everything you need, in one place"
          subtitle="From finding a property to completing your purchase and managing your home, TRECOM connects you with useful property services."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services" },
          ]}
        />

        <section className="bg-slate-50 px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Our Offerings"
              title="Explore our services"
              subtitle="Professional assistance designed to make every step of your property journey easier."
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#064b35]/20 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef7f2] text-[#064b35] transition group-hover:bg-[#064b35] group-hover:text-white">
                      <ServiceGlyph icon={service.icon} />
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition group-hover:border-[#064b35] group-hover:bg-[#064b35] group-hover:text-white">
                      →
                    </span>
                  </div>
                  <h3 className="mt-6 text-base font-bold text-slate-900">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{service.shortDescription}</p>
                  <div className="mt-5 text-xs font-semibold text-[#064b35]">Explore service →</div>
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
