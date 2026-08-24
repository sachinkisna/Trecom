"use client";

import { Suspense } from "react";
import PropertiesBrowser from "@/components/PropertiesBrowser";
import type { PropertyCategory } from "@/lib/data";

function BrowserWrapper({
  initialCategory,
  initialLocation,
}: {
  initialCategory: PropertyCategory;
  initialLocation: string;
}) {
  return (
    <PropertiesBrowser
      initialCategory={initialCategory}
      initialLocation={initialLocation}
    />
  );
}

export default function PropertiesPageClient({
  initialCategory = "buy",
  initialLocation = "",
}: {
  initialCategory?: PropertyCategory;
  initialLocation?: string;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-24">
          <p className="text-sm text-slate-500">Loading properties…</p>
        </div>
      }
    >
      <BrowserWrapper
        initialCategory={initialCategory}
        initialLocation={initialLocation}
      />
    </Suspense>
  );
}
