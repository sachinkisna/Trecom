import {
  ShieldCheck,
  Users,
  Search,
  Eye,
  Calendar,
  Lock,
} from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    desc: "Properties are reviewed to provide a safer discovery experience.",
  },
  {
    icon: Users,
    title: "Trusted Community",
    desc: "Connect with owners, agents and builders.",
  },
  {
    icon: Search,
    title: "Easy Search",
    desc: "Find properties quickly using powerful filters.",
  },
  {
    icon: Eye,
    title: "Transparent Information",
    desc: "View important property details clearly.",
  },
  {
    icon: Calendar,
    title: "Schedule Visits",
    desc: "Request property visits easily.",
  },
  {
    icon: Lock,
    title: "Secure Experience",
    desc: "Build a trustworthy property discovery experience.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#f8fafc] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-2xl font-bold text-[#1e293b] sm:text-3xl">
          Why Choose Our Real Estate Community?
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-md"
            >
              <item.icon
                size={24}
                className="text-emerald-600"
                strokeWidth={1.75}
              />
              <h3 className="mt-4 font-bold text-[#1e293b]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
