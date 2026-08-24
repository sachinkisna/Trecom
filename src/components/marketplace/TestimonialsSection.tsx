import Rating from "@/components/ui/Rating";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Home Buyer, Bengaluru",
    text: "Found our dream 3 BHK in Whitefield within a week. The verified listings gave us confidence throughout the process.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    role: "Property Owner, Mumbai",
    text: "Listed my apartment and received genuine enquiries. The platform feels professional and trustworthy.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    role: "Tenant, Hyderabad",
    text: "The filters made it easy to find a furnished rental near my office. Highly recommend for renters.",
    rating: 4,
  },
  {
    name: "Vikram Singh",
    role: "Investor, Pune",
    text: "Transparent pricing and detailed property information helped me compare options before investing.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-2xl font-bold text-[#1e293b] sm:text-3xl">
          What Our Community Says
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1e293b] text-sm font-bold text-white">
                {t.name.charAt(0)}
              </div>
              <Rating value={t.rating} />
              <p className="mt-3 text-sm leading-6 text-slate-600">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-4 text-sm font-bold text-[#1e293b]">{t.name}</p>
              <p className="text-xs text-slate-500">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
