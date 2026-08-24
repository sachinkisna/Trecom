"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPropertyById } from "@/lib/search";

function CompareContent() {
  const searchParams = useSearchParams();
  const ids = (searchParams.get("ids") ?? "")
    .split(",")
    .map(Number)
    .filter(Boolean);

  const properties = useMemo(
    () => ids.map((id) => getPropertyById(id)).filter(Boolean),
    [ids]
  );

  if (properties.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <p className="font-semibold text-slate-700">No properties selected</p>
        <Link
          href="/properties/"
          className="mt-4 inline-block text-sm font-semibold text-[#064b35]"
        >
          Browse Properties →
        </Link>
      </div>
    );
  }

  const rows = [
    { label: "Price", key: "price" as const },
    { label: "Location", key: "location" as const },
    { label: "Type", key: "propertyType" as const },
    { label: "BHK", key: "bedrooms" as const },
    { label: "Bathrooms", key: "bathrooms" as const },
    { label: "Area", key: "area" as const },
    { label: "Status", key: "status" as const },
    { label: "Facing", key: "facing" as const },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="p-4 text-left font-semibold text-slate-500">Feature</th>
            {properties.map((p) => (
              <th key={p!.id} className="p-4 text-left">
                <img
                  src={p!.image}
                  alt=""
                  className="mb-2 h-24 w-full rounded-lg object-cover"
                />
                <Link
                  href={`/properties/${p!.id}/`}
                  className="font-bold text-slate-900 hover:text-[#064b35]"
                >
                  {p!.title}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-slate-50">
              <td className="p-4 font-medium text-slate-500">{row.label}</td>
              {properties.map((p) => (
                <td key={p!.id} className="p-4 text-slate-800">
                  {String(p![row.key])}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="p-4 font-medium text-slate-500">Amenities</td>
            {properties.map((p) => (
              <td key={p!.id} className="p-4 text-xs text-slate-600">
                {p!.amenities.join(", ")}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function ComparePage() {
  return (
    <>
      <Header />
      <main className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-slate-900">Compare Properties</h1>
          <p className="mt-2 text-sm text-slate-500">
            Compare up to 3 properties side by side.
          </p>
          <div className="mt-8">
            <Suspense fallback={<p className="text-sm text-slate-500">Loading…</p>}>
              <CompareContent />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
