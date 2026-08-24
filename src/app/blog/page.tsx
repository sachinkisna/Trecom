import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Insights, Guides & Market Trends",
  description:
    "Read TRECOM's blog for Bangalore real estate insights, buying guides, finance tips and market trends.",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <Header />
      <main>
        <PageHeader
          eyebrow="TRECOM Blog"
          title="Insights for smarter property decisions"
          subtitle="Guides, market trends and tips to help you buy, rent and invest with confidence in Bangalore."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        />

        <section className="bg-white px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            {/* FEATURED */}
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 transition hover:shadow-xl lg:grid-cols-2"
              >
                <div className="relative h-64 overflow-hidden lg:h-auto">
                  <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center p-8">
                  <span className="w-fit rounded-full bg-[#eef7f2] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#064b35]">
                    {featured.category}
                  </span>
                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">{featured.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{featured.excerpt}</p>
                  <div className="mt-5 flex items-center gap-3 text-xs text-slate-400">
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span>{featured.readTime}</span>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* GRID */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <Reveal key={post.slug} delay={i * 60}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img src={post.image} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#064b35]">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-base font-bold text-slate-900">{post.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">{post.excerpt}</p>
                      <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/properties" className="inline-flex items-center gap-2 rounded-xl bg-[#064b35] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#043c2b]">
                Explore Properties →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
