import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { posts, getPost } from "@/lib/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Header />
      <main>
        <article>
          <div className="relative h-[320px] overflow-hidden bg-slate-900 lg:h-[420px]">
            <img src={post.image} alt={post.title} className="h-full w-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-auto max-w-4xl px-6 pb-10">
                <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                  {post.category}
                </span>
                <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">{post.title}</h1>
                <div className="mt-3 flex items-center gap-3 text-xs text-white/70">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-3xl px-6 py-12">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Link href="/blog" className="hover:text-[#064b35]">← Back to Blog</Link>
            </div>
            <div className="mt-8 space-y-6">
              {post.body.map((para, i) => (
                <p key={i} className="text-base leading-8 text-slate-600">{para}</p>
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-[#eef7f2] p-6">
              <p className="text-sm font-semibold text-[#064b35]">
                Explore verified properties on TRECOM →
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/properties" className="rounded-xl bg-[#064b35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#043c2b]">
                  Browse Properties
                </Link>
                <Link href="/contact" className="rounded-xl border border-[#064b35] px-5 py-3 text-sm font-semibold text-[#064b35] transition hover:bg-white">
                  Talk to Expert
                </Link>
              </div>
            </div>
          </div>
        </article>

        <section className="bg-slate-50 px-6 py-16 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-xl font-bold text-slate-900">More from the blog</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-xs text-slate-500">{item.readTime}</p>
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
