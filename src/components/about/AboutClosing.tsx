import Link from "next/link";

export default function AboutClosing() {
  return (
    <section className="relative overflow-hidden bg-[#064b35] px-6 py-24 md:py-32">

      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full border-[70px] border-white/10" />

      <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full border-[70px] border-white/10" />

      <div className="relative mx-auto max-w-4xl text-center">

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
          The TRECOM Vision
        </p>

        <h2 className="mt-5 text-3xl font-bold leading-tight text-white md:text-5xl">
          Every property represents someone's dream.
        </h2>

        <div className="mx-auto mt-8 max-w-3xl space-y-5 text-base leading-8 text-white/75 md:text-lg">

          <p>
            Every move marks a new beginning.
          </p>

          <p>
            And every satisfied{" "}
            <strong className="text-white">TRECOM Member</strong> inspires us
            to build a better real estate experience for everyone.
          </p>

        </div>

        <div className="mt-10">

          <p className="text-xl font-bold text-white md:text-2xl">
            Your Property Journey Begins with Trust.
          </p>

          <p className="mt-2 text-xl font-bold text-white/90 md:text-2xl">
            Your Future Begins with TRECOM.ai
          </p>

        </div>

        <Link
          href="/properties"
           className="mt-10 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#064b35] transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          Start Your Property Journey
          <span>→</span>
        </Link>

      </div>

    </section>
  );
}