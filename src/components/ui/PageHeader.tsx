import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  align?: "left" | "center";
}) {
  return (
    <section className="relative overflow-hidden bg-[#1e293b]">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border-[70px] border-white/10" />
      <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full border-[70px] border-white/10" />

      <div
        className={`relative mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20 ${
          align === "center" ? "text-center" : ""
        }`}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6 flex items-center gap-2 text-xs text-white/60">
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link href={crumb.href} className="transition hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <span>/</span>}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
            {eyebrow}
          </p>
        )}

        <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>

        {subtitle && (
          <p
            className={`mt-5 max-w-2xl text-base leading-8 text-white/80 md:text-lg ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
