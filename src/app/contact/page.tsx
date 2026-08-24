"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Enquiry",
    message: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

    const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main>
        <section className="bg-slate-50 px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* INFO */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#064b35]">
              Get in Touch
            </span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
              We're here to help
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
              Whether you're buying, selling or just exploring, our team is happy to assist you on your property journey.
            </p>

            <div className="mt-10 space-y-4">
              {[
                { icon: "✉", label: "Email", value: "support@trecom.ai" },
                { icon: "☎", label: "Customer Support", value: "+91 98444 22668" },
                { icon: "⌖", label: "Location", value: "Bangalore, Karnataka" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef7f2] text-[#064b35]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">{item.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-800">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eef7f2] text-2xl text-[#064b35]">
                  ✓
                </div>
                <h2 className="mt-5 text-xl font-bold text-slate-900">Message received</h2>
                <p className="mt-2 max-w-sm text-sm text-slate-500">
                  Thank you, {form.name || "there"}. Our team will get back to you shortly.
                </p>
                <Link href="/" className="mt-6 rounded-xl bg-[#064b35] px-6 py-3 text-sm font-bold text-white">
                  Back to Home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Phone</label>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                      placeholder="+91 "
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600">Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                  >
                    <option>General Enquiry</option>
                    <option>Buy a Property</option>
                    <option>Sell / Rent Out</option>
                    <option>Home Loan</option>
                    <option>Legal Assistance</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={4}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                    placeholder="How can we help?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#FF052B] py-3.5 text-sm font-bold text-white transition hover:bg-[#e00426]"
                >
                  Send Message
                </button>
                <p className="text-center text-xs text-slate-400">
                  By submitting, you agree to our{" "}
                  <Link href="/terms/" className="font-semibold text-[#FF052B]">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy/" className="font-semibold text-[#FF052B]">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
