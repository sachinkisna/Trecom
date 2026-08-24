"use client";

import { BHK_OPTIONS } from "@/data/categories";

type BHKFilterProps = {
  selected: string | null;
  onSelect: (bhk: string | null) => void;
};

export default function BHKFilter({ selected, onSelect }: BHKFilterProps) {
  return (
    <div className="border-b border-slate-100 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-1">
        {BHK_OPTIONS.map((bhk) => (
          <button
            key={bhk}
            type="button"
            onClick={() => onSelect(selected === bhk ? null : bhk)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
              selected === bhk
                ? "border-[#FF052B] bg-[#FF052B]/5 text-[#FF052B]"
                : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {bhk}
          </button>
        ))}
      </div>
    </div>
  );
}
