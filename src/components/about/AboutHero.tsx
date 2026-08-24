import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#064b35]">

      {/* Background decoration */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border-[70px] border-white/10" />

      <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full border-[70px] border-white/10" />

      <div className="relative mx-auto max-w-[1440px] px-6 py-16 lg:px-10 lg:py-20">

        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs text-white/60">
          <Link href="/" className="hover:text-white">
            Home
          </Link>

          <span>/</span>

          <span className="text-white">
            About TRECOM.ai
          </span>
        </div>

        {/* HERO GRID */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* LEFT CONTENT */}
          <div className="max-w-2xl">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              The Real Estate Community
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Why We Built
              <br />
              TRECOM.ai
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/80 md:text-lg">
              A real estate platform built from a real experience, with one
              simple mission — to make every property journey simple,
              transparent, and hassle-free.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white">
                Simple
              </span>

              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white">
                Transparent
              </span>

              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white">
                Trusted
              </span>

            </div>

            <Link
              href="#founder-story"
               className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#064b35] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Read Our Story
              <span>↓</span>
            </Link>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">

            {/* Image container */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white/10 shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85"
                alt="TRECOM real estate"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            </div>

            {/* Floating card */}
            <div className="absolute -bottom-5 -left-5 rounded-2xl border border-white/20 bg-white p-5 shadow-xl md:-left-8">

              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Our Mission
              </p>

              <p className="mt-1 max-w-[180px] text-sm font-bold leading-5 text-slate-900">
                Simple. Transparent. Hassle-Free.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}