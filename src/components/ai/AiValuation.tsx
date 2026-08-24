"use client";

import { useMemo, useState } from "react";
import { locations } from "@/lib/data";

const TYPE_MULTIPLIER: Record<string, number> = {
  Apartment: 1,
  Villa: 1.25,
  Plot: 0.82,
  Commercial: 1.6,
};

function parsePerSqft(value: string): number {
  const digits = value.replace(/[^0-9]/g, "");
  return Number(digits) || 0;
}

function formatINR(n: number): string {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} Lakh`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export default function AiValuation({ defaultLocality }: { defaultLocality?: string }) {
  const [locality, setLocality] = useState(
    defaultLocality && locations.some((l) => l.slug === defaultLocality)
      ? defaultLocality
      : locations[0].slug
  );
  const [type, setType] = useState("Apartment");
  const [area, setArea] = useState(1200);
  const [bedrooms, setBedrooms] = useState("2 BHK");

  const location = locations.find((l) => l.slug === locality)!;
  const perSqft = parsePerSqft(location.avgPrice);

  const result = useMemo(() => {
    const multiplier = TYPE_MULTIPLIER[type] ?? 1;
    const base = perSqft * area * multiplier;
    const low = base * 0.92;
    const high = base * 1.08;
    const confidence = Math.min(96, 78 + Math.round(perSqft / 500));
    const growth = parseFloat(location.growth.replace(/[^0-9.]/g, "")) || 0;
    let view = "Stable demand with steady interest from end-users.";
    if (growth >= 11) view = "High-growth corridor — strong appreciation potential.";
    else if (growth >= 8) view = "Healthy growth with good rental and resale demand.";
    return { base, low, high, confidence, growth, view };
  }, [perSqft, area, type, location]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      {/* FORM */}
      <div className="rounded-3xl border border-slate-200 bg-white p-7">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#064b35] text-[11px] font-bold text-white">
            AI
          </span>
          <h3 className="text-lg font-bold text-slate-900">AI Valuation</h3>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Estimate your property's market value using locality rates and configuration.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600">Locality</label>
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
            >
              {locations.map((l) => (
                <option key={l.slug} value={l.slug}>
                  {l.name}, {l.city}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600">Property Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
              >
                {Object.keys(TYPE_MULTIPLIER).map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Bedrooms</label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
              >
                {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Plot / Other"].map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600">Built-up Area (sq.ft)</label>
            <input
              type="number"
              min={100}
              value={area}
              onChange={(e) => setArea(Number(e.target.value) || 0)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
            />
          </div>
        </div>
      </div>

      {/* RESULT */}
      <div className="relative overflow-hidden rounded-3xl bg-[#064b35] p-7 text-white">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[40px] border-white/5" />
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
            TRECOM AI Estimate
          </p>
          <p className="mt-3 text-4xl font-bold">{formatINR(result.base)}</p>
          <p className="mt-1 text-sm text-white/70">
            Range {formatINR(result.low)} – {formatINR(result.high)}
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>AI Confidence</span>
                <span>{result.confidence}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
                <div className="h-full rounded-full bg-white" style={{ width: `${result.confidence}%` }} />
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-xs font-semibold text-white/80">AI view · {location.name}</p>
              <p className="mt-1 text-sm leading-6 text-white/90">{result.view}</p>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Avg. rate</span>
              <span className="font-semibold">{location.avgPrice}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Area considered</span>
              <span className="font-semibold">{area.toLocaleString("en-IN")} sq.ft</span>
            </div>
          </div>

          <p className="mt-6 text-[10px] leading-4 text-white/50">
            Indicative estimate generated by TRECOM AI from locality rates, configuration and market signals. Not a formal valuation.
          </p>
        </div>
      </div>
    </div>
  );
}
