import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PostPropertyCTA() {
  return (
    <section className="mx-4 mb-16 sm:mx-6 lg:mx-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#1e293b] px-8 py-14 text-center sm:px-12">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Have a Property to Sell or Rent?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300">
          Reach genuine property seekers and list your property with our trusted community.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/post-property/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#FF052B] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#e00426]"
          >
            Post Property
            <span className="rounded-md bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#FF052B]">
              FREE
            </span>
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/sell-property/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
