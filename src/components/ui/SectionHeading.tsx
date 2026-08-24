import type { ReactNode } from "react";
import Link from "next/link";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  actionHref,
  actionLabel,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mb-10 flex items-end justify-between">
      <div>
        {eyebrow && (
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-8 bg-[#064b35]" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#064b35]">
              {eyebrow}
            </span>
          </div>
        )}

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="hidden items-center gap-2 text-sm font-semibold text-[#064b35] transition hover:gap-3 md:flex"
        >
          {actionLabel}
          <span>→</span>
        </Link>
      )}
    </div>
  );
}
