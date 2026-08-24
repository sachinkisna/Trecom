"use client";

import { useState } from "react";

const testimonials = [
  {
    name: "Rahul Kumar",
    role: "Home Buyer",
    location: "Bangalore",
    text: "TRECOM made it much easier to compare properties and understand different locations. The verification information was especially useful.",
    initials: "RK",
  },
  {
    name: "Priya Sharma",
    role: "Property Owner",
    location: "Whitefield",
    text: "Listing my property was simple and I received genuine enquiries. The overall experience was smooth and professional.",
    initials: "PS",
  },
  {
    name: "Arjun Reddy",
    role: "Investor",
    location: "Electronic City",
    text: "The locality information helped me understand the area before making my investment decision.",
    initials: "AR",
  },
];

const stats = [
  {
    value: "25K+",
    label: "Properties Listed",
  },
  {
    value: "18K+",
    label: "Happy Customers",
  },
  {
    value: "120+",
    label: "Locations Covered",
  },
  {
    value: "95%",
    label: "Verified Listings",
  },
];

export default function StatsTestimonials() {
  const [current, setCurrent] = useState(0);

  const previous = () => {
    setCurrent(
      (current - 1 + testimonials.length) % testimonials.length
    );
  };

  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  const testimonial = testimonials[current];

  return (
    <section className="bg-white px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* STATS */}
        <div className="grid overflow-hidden rounded-2xl bg-[#064b35] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-6 py-8 text-center lg:py-10 ${
                index !== stats.length - 1
                  ? "border-b border-white/10 sm:border-r lg:border-b-0"
                  : ""
              }`}
            >
              <div className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {stat.value}
              </div>

              <div className="mt-2 text-xs font-medium text-white/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* TESTIMONIAL HEADER */}
        <div className="mt-20 text-center">

          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[#064b35]" />

            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#064b35]">
              Customer Stories
            </span>

            <span className="h-px w-8 bg-[#064b35]" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            What our customers say
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
            Real experiences from people who used TRECOM to make their
            property journey easier.
          </p>

        </div>

        {/* TESTIMONIAL */}
        <div className="mx-auto mt-10 max-w-3xl">

          <div className="relative rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center md:p-12">

            {/* QUOTE */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eef7f2] text-2xl font-serif text-[#064b35]">
              “
            </div>

            {/* STARS */}
            <div className="mt-5 flex justify-center gap-1 text-sm text-[#d49a36]">
              ★ ★ ★ ★ ★
            </div>

            {/* TEXT */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              {testimonial.text}
            </p>

            {/* PERSON */}
            <div className="mt-8 flex items-center justify-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#064b35] text-xs font-bold text-white">
                {testimonial.initials}
              </div>

              <div className="text-left">
                <div className="text-sm font-bold text-slate-900">
                  {testimonial.name}
                </div>

                <div className="mt-0.5 text-xs text-slate-500">
                  {testimonial.role} · {testimonial.location}
                </div>
              </div>

            </div>

            {/* ARROWS */}
            <button
              onClick={previous}
              aria-label="Previous testimonial"
              className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-[#064b35] hover:text-[#064b35] md:left-6"
            >
              ←
            </button>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-[#064b35] hover:text-[#064b35] md:right-6"
            >
              →
            </button>

          </div>

          {/* DOTS */}
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Testimonial ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  current === index
                    ? "w-6 bg-[#064b35]"
                    : "w-2 bg-slate-300"
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}