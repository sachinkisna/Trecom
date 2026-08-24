import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Sitemap" };

const groups = [
  {
    title: "Property",
    links: [
      { label: "Buy", href: "/properties/buy" },
      { label: "Rent", href: "/properties/rent" },
      { label: "Commercial", href: "/properties/commercial" },
      { label: "Plots", href: "/properties/plots" },
      { label: "Pre Launch", href: "/properties/pre-launch" },
      { label: "All Properties", href: "/properties" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Locations", href: "/locations" },
      { label: "Services", href: "/services" },
      { label: "Invest", href: "/invest" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Property Management", href: "/property-management" },
      { label: "Invest JV", href: "/invest-jv" },
      { label: "Partners", href: "/partners" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Account & Legal",
    links: [
      { label: "Login", href: "/login" },
      { label: "Saved", href: "/saved" },
      { label: "Post Property", href: "/post-property" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Help Center", href: "/help" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader
          eyebrow="Navigation"
          title="Sitemap"
          subtitle="Quick links to every section of the TRECOM website."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sitemap" }]}
        />

        <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-bold uppercase tracking-wide text-[#064b35]">{group.title}</h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-slate-600 transition hover:text-[#064b35]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
