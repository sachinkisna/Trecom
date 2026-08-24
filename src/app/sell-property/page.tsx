"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { saveLead } from "@/lib/leads";
import { trackEvent } from "@/lib/analytics";

export default function SellPropertyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    ownerName: "",
    phone: "",
    email: "",
    propertyType: "Apartment",
    location: "",
    expectedPrice: "",
    area: "",
    bedrooms: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveLead({
      type: "sell_property",
      name: form.ownerName,
      phone: form.phone,
      email: form.email || undefined,
      source: "sell_property_page",
      location: form.location,
      budget: form.expectedPrice,
      message: `Type: ${form.propertyType}, Area: ${form.area}, BHK: ${form.bedrooms}. ${form.description}`,
    });
    trackEvent("post_property", { source: "sell" });
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main>
        <section className="bg-[#064b35] px-6 py-16 text-white lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold md:text-4xl">Sell Your Property</h1>
            <p className="mt-4 text-sm leading-7 text-white/80">
              List with TRECOM and reach genuine buyers. Our property specialists will
              guide you through valuation, marketing and closing.
            </p>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-2xl">
            {submitted ? (
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
                  ✓
                </div>
                <h2 className="mt-4 text-xl font-bold text-slate-900">Thank you!</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Our property specialist will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-8">
                <h2 className="text-lg font-bold text-slate-900">Property Details</h2>

                {[
                  { key: "ownerName", label: "Owner Name", required: true },
                  { key: "phone", label: "Phone", required: true, type: "tel" },
                  { key: "email", label: "Email", type: "email" },
                  { key: "location", label: "Location", required: true },
                  { key: "expectedPrice", label: "Expected Price", required: true },
                  { key: "area", label: "Area (sq.ft)", required: true },
                  { key: "bedrooms", label: "Bedrooms" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-xs font-semibold text-slate-600">
                      {field.label}
                    </label>
                    <input
                      required={field.required}
                      type={field.type ?? "text"}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) =>
                        setForm({ ...form, [field.key]: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                    />
                  </div>
                ))}

                <div>
                  <label className="text-xs font-semibold text-slate-600">
                    Property Type
                  </label>
                  <select
                    value={form.propertyType}
                    onChange={(e) =>
                      setForm({ ...form, propertyType: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm"
                  >
                    {["Apartment", "Villa", "Independent House", "Plot", "Commercial"].map(
                      (t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                    placeholder="Tell us about your property…"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600">
                    Upload Images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="mt-1.5 w-full rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#064b35] py-3.5 text-sm font-bold text-white transition hover:bg-[#043c2b]"
                >
                  Submit Property
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
