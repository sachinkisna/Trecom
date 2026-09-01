"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthProvider";
import { saveLead } from "@/lib/leads";
import {
  createPropertyApi,
  uploadPropertyImages,
} from "@/lib/api/properties";

const intents = ["Sell", "Rent"];
const categories = [
  "Apartment",
  "Independent House",
  "Villa",
  "Plot",
  "Resale",
  "Commercial",
  "Pre-Launch",
];
const configurations = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK", "Plot / Other"];
const furnishingOptions = ["Unfurnished", "Semi-Furnished", "Fully Furnished"];
const facingOptions = ["East", "West", "North", "South", "North-East", "South-West"];
const ownerTypes = ["Owner", "Builder", "Agent"];
const amenityOptions = [
  "Car Parking",
  "Lift",
  "Power Backup",
  "Security",
  "Gym",
  "Swimming Pool",
  "Garden",
  "Children's Play Area",
  "Clubhouse",
  "Pet Friendly",
  "Vastu Compliant",
  "Corner Plot",
];

const WHATSAPP_NUMBER = "919844442668";
const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi TRECOM, I want to list my property but need help posting it. Please assist me with the details."
)}`;

type Preview = { file: File; url: string };

export default function PostPropertyPage() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [createdId, setCreatedId] = useState("");
  const [intent, setIntent] = useState("Sell");
  const [category, setCategory] = useState("Apartment");
  const [config, setConfig] = useState("2 BHK");
  const [furnishing, setFurnishing] = useState("Semi-Furnished");
  const [facing, setFacing] = useState("East");
  const [ownerType, setOwnerType] = useState("Owner");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<Preview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    pincode: "",
    price: "",
    builtup: "",
    carpet: "",
    bathrooms: "",
    floor: "",
    parking: "",
    name: "",
    phone: "",
    email: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const next = files.map((file) => ({ file, url: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...next].slice(0, 12));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (url: string) => {
    URL.revokeObjectURL(url);
    setImages((prev) => prev.filter((img) => img.url !== url));
  };

  const toggleAmenity = (a: string) =>
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

  const priceLabel =
    intent === "Rent"
      ? "Monthly Rent (₹)"
      : category === "Plot" || category === "Commercial"
        ? "Expected Price (₹)"
        : "Expected Price (₹)";

  const parsePrice = (raw: string, forRent: boolean) => {
    const text = raw.trim().toLowerCase().replace(/,/g, "");
    const amount = parseFloat(text.replace(/[^0-9.]/g, "")) || 0;
    if (text.includes("cr")) return Math.round(amount * 10000000);
    if (text.includes("lakh") || text.includes("lac")) return Math.round(amount * 100000);
    if (!forRent && amount > 0 && amount < 10000) return Math.round(amount * 100000);
    return Math.round(amount);
  };

  const splitLocation = (value: string) => {
    const parts = value.split(",").map((part) => part.trim()).filter(Boolean);
    if (parts.length >= 2) {
      return { locality: parts.slice(0, -1).join(", "), city: parts[parts.length - 1] };
    }
    return { locality: value.trim() || "Bangalore", city: "Bangalore" };
  };

  const publishListing = async () => {
    setError("");
    setSubmitting(true);
    try {
      const { locality, city } = splitLocation(form.location);
      const forRent = intent === "Rent";
      const purpose =
        category === "Commercial"
          ? "COMMERCIAL"
          : category === "Plot"
            ? "PLOTS"
            : forRent
              ? "RENT"
              : "BUY";
      const imageUrls =
        images.length > 0 ? await uploadPropertyImages(images.map((img) => img.file)) : [];
      const bathrooms = parseInt(form.bathrooms.replace(/[^0-9]/g, ""), 10) || 0;
      const bedrooms = parseInt(config.replace(/[^0-9]/g, ""), 10) || 0;
      const area = parseInt(form.builtup.replace(/[^0-9]/g, ""), 10) || 0;

      const created = await createPropertyApi({
        title: form.title.trim(),
        description: form.description.trim(),
        purpose,
        propertyType: category,
        bhk: category === "Plot" ? "" : config,
        price: parsePrice(form.price, forRent),
        area,
        city,
        locality,
        pincode: form.pincode,
        furnishing,
        facing,
        floor: form.floor,
        parking: form.parking,
        bathrooms,
        bedrooms,
        images: imageUrls,
        amenities,
        postedBy: ownerType,
        contactName: form.name || user?.name,
        contactPhone: form.phone || user?.phone,
        name: form.name || user?.name,
        phone: form.phone || user?.phone,
        email: form.email || user?.email,
      });

      saveLead({
        type: "post_property",
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        source: "post_property_form",
        location: form.location,
        budget: form.price,
        message: `${intent} ${category} - ${form.title}. ${form.description}`,
      });

      setCreatedId(String(created.data.id || created.data._id || ""));
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not publish listing");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="bg-slate-50 px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF052B]">
                List Your Property
                <span className="rounded-md bg-[#FF052B] px-2 py-0.5 text-[10px] tracking-wide text-white">
                  FREE
                </span>
              </span>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
                Post your property in minutes
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">
                Reach genuine buyers and tenants across Bangalore. Add photos and complete details, then publish — or let our team post it for you on WhatsApp.
              </p>
            </div>

            <>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl border-2 border-[#064b35] bg-white p-7 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef7f2] text-[#064b35]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
                <h2 className="mt-4 text-lg font-bold text-slate-900">Post directly</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Owners who can list themselves. Add photos and details, publish and manage enquiries.
                </p>
                <a
                  href="#listing-form"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#064b35] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#043c2b]"
                >
                  Start Listing →
                </a>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef7f2] text-[#064b35]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366" stroke="#25D366" strokeWidth="1.8">
                    <path d="M3 21l1.7-4.5A8 8 0 1 1 12 20a8 8 0 0 1-6.3-3l-2.7 4Zm0 0 4-7" />
                  </svg>
                </div>
                <h2 className="mt-4 text-lg font-bold text-slate-900">Can't post? We'll do it</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Send us your details on WhatsApp and our team will verify and post your property for you.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
                >
                  Post via WhatsApp →
                </a>
              </div>
            </div>

            {/* DIRECT FORM */}
            <div id="listing-form" className="mt-12 scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-8">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">Listing details</h2>
              <p className="mt-1 text-sm text-slate-500">Fill this in to publish your property directly.</p>

              {submitted ? (
                <div className="mt-8 flex flex-col items-center py-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eef7f2] text-2xl text-[#064b35]">✓</div>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">Your listing is live</h3>
                  <p className="mt-2 max-w-sm text-sm text-slate-500">
                    Thank you, {form.name || "there"}. Your property is saved in our database and now visible to everyone, with {images.length} photo(s).
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    {createdId && (
                      <Link href={`/property/${createdId}/`} className="rounded-xl bg-[#064b35] px-6 py-3 text-sm font-bold text-white">
                        View listing
                      </Link>
                    )}
                    <Link href="/properties" className="rounded-xl border border-[#064b35] px-6 py-3 text-sm font-bold text-[#064b35]">
                      Browse Properties
                    </Link>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void publishListing();
                  }}
                  className="mt-6 space-y-8"
                >
                  {/* 1. TYPE */}
                  <section className="space-y-5">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">1 · Property type</h3>

                    <div>
                      <label className="text-xs font-semibold text-slate-600">I want to</label>
                      <div className="mt-2 grid grid-cols-2 gap-3">
                        {intents.map((p) => (
                          <button
                            type="button"
                            key={p}
                            onClick={() => setIntent(p)}
                            className={`rounded-xl border py-3 text-sm font-semibold transition ${
                              intent === p ? "border-[#064b35] bg-[#eef7f2] text-[#064b35]" : "border-slate-200 text-slate-600"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-600">Category</label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {categories.map((c) => (
                          <button
                            type="button"
                            key={c}
                            onClick={() => setCategory(c)}
                            className={`rounded-lg border px-4 py-2 text-xs font-semibold transition ${
                              category === c ? "border-[#064b35] bg-[#eef7f2] text-[#064b35]" : "border-slate-200 text-slate-600"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    {category !== "Plot" && (
                      <div>
                        <label className="text-xs font-semibold text-slate-600">Configuration</label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {configurations.map((c) => (
                            <button
                              type="button"
                              key={c}
                              onClick={() => setConfig(c)}
                              className={`rounded-lg border px-4 py-2 text-xs font-semibold transition ${
                                config === c ? "border-[#064b35] bg-[#eef7f2] text-[#064b35]" : "border-slate-200 text-slate-600"
                              }`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </section>

                  {/* 2. PHOTOS */}
                  <section className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">2 · Photos</h3>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={onFilesSelected}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition hover:border-[#064b35] hover:bg-[#eef7f2]"
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#064b35" strokeWidth="1.7">
                        <path d="M21 15l-5-5L5 21" />
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M8 7h.01M12 7h.01M16 7h.01" />
                      </svg>
                      <span className="text-sm font-semibold text-slate-700">Click to upload property photos</span>
                      <span className="text-xs text-slate-400">PNG, JPG up to 12 images</span>
                    </button>

                    {images.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                        {images.map((img) => (
                          <div key={img.url} className="group relative h-24 overflow-hidden rounded-xl border border-slate-200">
                            <img src={img.url} alt="preview" className="h-full w-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeImage(img.url)}
                              aria-label="Remove photo"
                              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white opacity-0 transition group-hover:opacity-100"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>

                  {/* 3. BASIC DETAILS */}
                  <section className="space-y-5">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">3 · Basic details</h3>

                    <div>
                      <label className="text-xs font-semibold text-slate-600">Listing Title</label>
                      <input
                        required
                        value={form.title}
                        onChange={(e) => update("title", e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                        placeholder="e.g. Premium 2 BHK near Electronic City"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-600">Description</label>
                      <textarea
                        value={form.description}
                        onChange={(e) => update("description", e.target.value)}
                        rows={4}
                        className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                        placeholder="Share highlights, neighbourhood, nearby landmarks and why someone will love this property."
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold text-slate-600">Location</label>
                        <input
                          required
                          value={form.location}
                          onChange={(e) => update("location", e.target.value)}
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                          placeholder="Locality, City"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-600">Pincode</label>
                        <input
                          value={form.pincode}
                          onChange={(e) => update("pincode", e.target.value)}
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                          placeholder="e.g. 560100"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold text-slate-600">{priceLabel}</label>
                        <input
                          required
                          value={form.price}
                          onChange={(e) => update("price", e.target.value)}
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                          placeholder="e.g. 48 Lakh"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-600">Built-up Area (sq.ft)</label>
                        <input
                          value={form.builtup}
                          onChange={(e) => update("builtup", e.target.value)}
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                          placeholder="e.g. 1150"
                        />
                      </div>
                    </div>

                    {category !== "Plot" && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-xs font-semibold text-slate-600">Carpet Area (sq.ft)</label>
                          <input
                            value={form.carpet}
                            onChange={(e) => update("carpet", e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                            placeholder="e.g. 980"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-600">Bathrooms</label>
                          <input
                            value={form.bathrooms}
                            onChange={(e) => update("bathrooms", e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                            placeholder="e.g. 2"
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-semibold text-slate-600">Furnishing</label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {furnishingOptions.map((f) => (
                            <button
                              type="button"
                              key={f}
                              onClick={() => setFurnishing(f)}
                              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                                furnishing === f ? "border-[#064b35] bg-[#eef7f2] text-[#064b35]" : "border-slate-200 text-slate-600"
                              }`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-600">Facing</label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {facingOptions.map((f) => (
                            <button
                              type="button"
                              key={f}
                              onClick={() => setFacing(f)}
                              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                                facing === f ? "border-[#064b35] bg-[#eef7f2] text-[#064b35]" : "border-slate-200 text-slate-600"
                              }`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-600">Floor</label>
                        <input
                          value={form.floor}
                          onChange={(e) => update("floor", e.target.value)}
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                          placeholder="e.g. 7th of 12"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-600">Parking</label>
                        <input
                          value={form.parking}
                          onChange={(e) => update("parking", e.target.value)}
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                          placeholder="e.g. 1 Car"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-600">Listed by</label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {ownerTypes.map((o) => (
                            <button
                              type="button"
                              key={o}
                              onClick={() => setOwnerType(o)}
                              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                                ownerType === o ? "border-[#064b35] bg-[#eef7f2] text-[#064b35]" : "border-slate-200 text-slate-600"
                              }`}
                            >
                              {o}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 4. AMENITIES */}
                  <section className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">4 · Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {amenityOptions.map((a) => (
                        <button
                          type="button"
                          key={a}
                          onClick={() => toggleAmenity(a)}
                          className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                            amenities.includes(a)
                              ? "border-[#064b35] bg-[#064b35] text-white"
                              : "border-slate-200 text-slate-600 hover:border-[#064b35]"
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </section>

                  {/* 5. CONTACT */}
                  <section className="space-y-5">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">5 · Contact</h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="sm:col-span-1">
                        <label className="text-xs font-semibold text-slate-600">Your Name</label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                          placeholder="Full name"
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
                      <div>
                        <label className="text-xs font-semibold text-slate-600">Email</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#064b35]"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                  </section>

                  {error && (
                    <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-xl bg-[#064b35] py-3.5 text-sm font-bold text-white transition hover:bg-[#043c2b] disabled:opacity-60"
                  >
                    {submitting ? "Publishing…" : "Submit Property"}
                  </button>
                </form>
              )}
            </div>
            </>

            {/* Post property through WhatsApp Section */}
            <div className="mt-10 overflow-hidden rounded-3xl border border-emerald-200 bg-emerald-50/80 p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-md">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.762.459 3.48 1.332 5.001L2 22l5.14-1.336a9.93 9.93 0 0 0 4.869 1.28h.004c5.507 0 9.99-4.478 9.99-9.985 0-2.667-1.037-5.176-2.922-7.062A9.92 9.92 0 0 0 12.012 2zm0 18.252h-.003a8.25 8.25 0 0 1-4.204-1.152l-.302-.18-3.123.812.833-3.037-.197-.315a8.26 8.26 0 0 1-1.266-4.394c0-4.55 3.702-8.251 8.254-8.251 2.206 0 4.28.86 5.839 2.42a8.21 8.21 0 0 1 2.413 5.838c-.002 4.55-3.704 8.259-8.244 8.259z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Post the property by Us Through WhatsApp
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Need assistance listing your property? Simply chat with our team on WhatsApp and we will post it for you.
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/919844442668"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#20ba5a] hover:shadow-lg"
              >
                <span>Post via WhatsApp</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
