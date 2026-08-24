"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Buy", href: "/properties/?purpose=buy" },
  { label: "Rent", href: "/properties/?purpose=rent" },
  { label: "Sell", href: "/sell-property/" },
  { label: "Projects", href: "/projects/" },
  { label: "Properties", href: "/properties/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export default function MarketplaceHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[80px] lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <img
            src="/images/trecom.jpeg"
            alt="TRECOM"
            className="h-10 w-auto shrink-0 object-contain lg:h-11"
          />
          <div className="min-w-0">
            <p className="truncate text-base font-bold tracking-tight text-[#1e293b] lg:text-lg">
              TRECOM
            </p>
            <p className="flex items-center gap-1 text-[10px] font-medium text-slate-500 sm:text-[11px]">
              <ShieldCheck className="h-3 w-3 shrink-0 text-emerald-600" strokeWidth={2.5} />
              <span className="truncate">Trusted Real Estate Community</span>
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-[#334155] transition hover:bg-slate-50 hover:text-[#FF052B]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isLoggedIn ? (
            <button
              type="button"
              onClick={logout}
              className="rounded-lg px-4 py-2 text-sm font-medium text-[#334155] transition hover:text-[#FF052B]"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login/"
                className="rounded-lg px-4 py-2 text-sm font-medium text-[#334155] transition hover:text-[#FF052B]"
              >
                Login
              </Link>
              <Link
                href="/login/"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-[#334155] transition hover:border-[#FF052B] hover:text-[#FF052B]"
              >
                Sign Up
              </Link>
            </>
          )}
          <Link
            href="/post-property/"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FF052B] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e00426]"
          >
            Post Property
            <span className="rounded-md bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#FF052B]">
              FREE
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-[#334155] md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-slate-50 py-3.5 text-sm font-medium text-[#334155]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              href="/login/"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg border border-slate-200 py-3 text-center text-sm font-medium"
            >
              Login / Sign Up
            </Link>
            <Link
              href="/post-property/"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF052B] py-3 text-center text-sm font-semibold text-white"
            >
              Post Property
              <span className="rounded-md bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#FF052B]">
                FREE
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
