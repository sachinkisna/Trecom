"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

interface SubLink {
  label: string;
  href: string;
}

interface NavLink {
  label: string;
  href: string;
  dropdown?: SubLink[];
}

const navLinks: NavLink[] = [
  {
    label: "Home",
    href: "/",
    dropdown: [
      { label: "About Us", href: "/about/" },
      { label: "Blog", href: "/blog/" },
    ],
  },
  {
    label: "Property",
    href: "/properties/",
    dropdown: [
      { label: "Rental", href: "/properties/rent/" },
      { label: "Lease", href: "/properties/?purpose=lease" },
      { label: "Resale", href: "/properties/buy/" },
      { label: "Plot/Land", href: "/properties/plots/" },
      { label: "Pre-Launch", href: "/properties/pre-launch/" },
      { label: "Commercial", href: "/properties/commercial/" },
    ],
  },
  { label: "Management", href: "/property-management/" },
  { label: "T&C Offers", href: "/offers/" },
  { label: "Enquiry", href: "/contact/" },
  { label: "Invest-JV", href: "/invest-jv/" },
  { label: "Brokers", href: "/brokers/" },
];

export default function MarketplaceHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<Record<string, boolean>>({});

  const toggleMobileSubmenu = (label: string) => {
    setExpandedMobile((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

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

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1.5">
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div key={link.label} className="group relative">
                  <div className="flex items-center">
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-xs font-semibold text-[#334155] transition hover:bg-slate-50 hover:text-[#FF052B] xl:px-3 xl:text-sm"
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-[#FF052B]" />
                    </Link>
                  </div>
                  {/* Dropdown Menu */}
                  <div className="absolute left-0 top-full hidden pt-1.5 group-hover:block z-50 min-w-[200px]">
                    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white p-1.5 shadow-xl ring-1 ring-slate-900/5">
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block rounded-lg px-3.5 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#FF052B] xl:text-sm"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-2.5 py-2 text-xs font-semibold text-[#334155] transition hover:bg-slate-50 hover:text-[#FF052B] xl:px-3 xl:text-sm"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button: ONLY Post Property */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/post-property/"
            className="inline-flex items-center gap-2 rounded-lg bg-[#FF052B] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#e00426] xl:px-5 xl:py-2.5 xl:text-sm"
          >
            Post Property
            <span className="rounded-md bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#FF052B]">
              FREE
            </span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-[#334155] lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col">
            {navLinks.map((link) => {
              if (link.dropdown) {
                const isExpanded = !!expandedMobile[link.label];
                return (
                  <div key={link.label} className="border-b border-slate-50 py-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="py-1.5 text-sm font-semibold text-[#334155]"
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleMobileSubmenu(link.label)}
                        className="p-2 text-slate-500 hover:text-[#FF052B]"
                        aria-label={`Toggle ${link.label} submenu`}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-[#FF052B]" : ""
                          }`}
                        />
                      </button>
                    </div>
                    {isExpanded && (
                      <div className="ml-3 mt-1 flex flex-col space-y-1 border-l-2 border-slate-100 pl-3">
                        {link.dropdown.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setMobileOpen(false)}
                            className="py-2 text-xs font-medium text-slate-600 transition hover:text-[#FF052B]"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-slate-50 py-3.5 text-sm font-medium text-[#334155]"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 flex flex-col gap-2">
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
