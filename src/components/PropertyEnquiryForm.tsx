"use client";

import { useState } from "react";
import { saveLead } from "@/lib/leads";
import { trackEvent } from "@/lib/analytics";

type PropertyEnquiryFormProps = {
  propertyId?: number | string;
  propertyTitle?: string;
  type?: "enquiry" | "callback" | "site_visit";
  compact?: boolean;
};

export default function PropertyEnquiryForm({
  propertyId,
  propertyTitle,
  type = "enquiry",
  compact = false,
}: PropertyEnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    visitDate: "",
    visitTime: "",
    message: "",
  });

  const titles = {
    enquiry: "Interested in this property?",
    callback: "Request a Callback",
    site_visit: "Schedule a Site Visit",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveLead({
      type,
      name: form.name,
      phone: form.phone,
      email: form.email || undefined,
      propertyId,
      propertyTitle,
      source: "website",
      message: form.message || undefined,
      visitDate: form.visitDate || undefined,
      visitTime: form.visitTime || undefined,
      inquiryType: type,
    });
    trackEvent(type === "site_visit" ? "site_visit" : "enquiry", {
      propertyId: propertyId ?? "",
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl text-emerald-700">
          ✓
        </div>
        <p className="mt-3 text-base font-semibold text-slate-800">Thank you!</p>
        <p className="mt-1 text-sm text-slate-600">
          Our property specialist will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {!compact && (
        <h3 className="text-base font-bold text-slate-900">{titles[type]}</h3>
      )}
      <input
        required
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
      />
      <input
        required
        type="tel"
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
      />
      <input
        type="email"
        placeholder="Email (optional)"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
      />
      {type === "site_visit" && (
        <>
          <input
            type="date"
            required
            value={form.visitDate}
            onChange={(e) => setForm({ ...form, visitDate: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
          />
          <select
            required
            value={form.visitTime}
            onChange={(e) => setForm({ ...form, visitTime: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
          >
            <option value="">Preferred Time</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
            <option value="6:00 PM">6:00 PM</option>
          </select>
        </>
      )}
      <textarea
        placeholder="Message (optional)"
        rows={compact ? 2 : 3}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
      />
      <button
        type="submit"
        className="w-full rounded-xl bg-[#064b35] py-3.5 text-sm font-bold text-white transition hover:bg-[#043c2b]"
      >
        {type === "site_visit"
          ? "Schedule Visit"
          : type === "callback"
            ? "Request Callback"
            : "Enquire Now"}
      </button>
    </form>
  );
}
