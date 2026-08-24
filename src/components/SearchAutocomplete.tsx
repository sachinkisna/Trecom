"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { searchAutocomplete, type AutocompleteSuggestion } from "@/lib/search";

export default function SearchAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = "Search locality, project, landmark or property ID",
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  onSelect?: (suggestion: AutocompleteSuggestion) => void;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSuggestions(searchAutocomplete(value));
  }, [value]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const typeIcon: Record<AutocompleteSuggestion["type"], string> = {
    location: "📍",
    project: "🏗",
    property: "🏠",
    landmark: "🗺",
  };

  return (
    <div ref={wrapperRef} className={`relative min-w-0 flex-1 ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        autoComplete="off"
      />

      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          {suggestions.map((s, i) =>
            s.href ? (
              <Link
                key={`${s.label}-${i}`}
                href={s.href}
                onClick={() => {
                  onChange(s.label);
                  onSelect?.(s);
                  setOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
              >
                <span className="text-base">{typeIcon[s.type]}</span>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{s.label}</div>
                  {s.sublabel && (
                    <div className="text-xs text-slate-500">{s.sublabel}</div>
                  )}
                </div>
              </Link>
            ) : (
              <button
                key={`${s.label}-${i}`}
                type="button"
                onClick={() => {
                  onChange(s.label);
                  onSelect?.(s);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
              >
                <span className="text-base">{typeIcon[s.type]}</span>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{s.label}</div>
                  {s.sublabel && (
                    <div className="text-xs text-slate-500">{s.sublabel}</div>
                  )}
                </div>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
