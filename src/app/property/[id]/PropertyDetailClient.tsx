"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Bed,
  Ruler,
  Car,
  ShieldCheck,
  Heart,
  Share2,
  Phone,
  Calendar,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyEnquiryForm from "@/components/PropertyEnquiryForm";
import { getMarketplaceProperty } from "@/data/properties";
import { getPropertyApi } from "@/lib/api/properties";
import { mapApiPropertyToCard } from "@/lib/property-mapper";
import { toggleFavorite, isFavorite } from "@/lib/favorites";
import type { MarketplaceProperty } from "@/data/properties";
import { buildWhatsAppUrl, buildCallUrl } from "@/lib/whatsapp";
import { CONTACT } from "@/lib/constants";

export default function PropertyDetailClient({ id }: { id: string }) {
  const staticProperty = getMarketplaceProperty(id);
  const [property, setProperty] = useState<MarketplaceProperty | null>(staticProperty ?? null);
  const [loading, setLoading] = useState(!staticProperty);
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [enquiryType, setEnquiryType] = useState<"enquiry" | "callback" | "site_visit">("enquiry");

  useEffect(() => {
    if (staticProperty) {
      setProperty(staticProperty);
      setLoading(false);
      return;
    }

    let cancelled = false;
    getPropertyApi(id)
      .then((result) => {
        if (!cancelled) setProperty(mapApiPropertyToCard(result.data));
      })
      .catch(() => {
        if (!cancelled) setProperty(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, staticProperty]);

  useEffect(() => {
    if (property) setSaved(isFavorite(property.id));
  }, [property]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex min-h-[50vh] items-center justify-center bg-[#f8fafc]">
          <p className="text-sm text-slate-500">Loading property…</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!property) notFound();

  const images = property.images.length ? property.images : [property.image];

  return (
    <>
      <Header />
      <main className="bg-[#f8fafc] pb-24 lg:pb-12">
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-slate-500 sm:px-6">
            <Link href="/" className="hover:text-[#FF052B]">Home</Link>
            <span>/</span>
            <Link href="/#all-properties" className="hover:text-[#FF052B]">Properties</Link>
            <span>/</span>
            <span className="text-[#1e293b]">{property.title}</span>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="overflow-hidden rounded-2xl bg-white">
              <div className="relative aspect-[16/10]">
                <img src={images[activeImage]} alt={property.title} className="h-full w-full object-cover" />
                {property.verified && (
                  <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-emerald-700">
                    <ShieldCheck size={14} />
                    Verified Property
                  </span>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto p-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 ${
                        activeImage === i ? "border-[#FF052B]" : "border-transparent"
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6">
              <h1 className="text-2xl font-bold text-[#1e293b] sm:text-3xl">{property.title}</h1>
              <p className="mt-2 flex items-center gap-2 text-slate-500">
                <MapPin size={16} />
                {property.locality}, {property.city}
              </p>
              <p className="mt-4 text-3xl font-bold text-[#1e293b]">{property.price}</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Bed, label: "BHK", value: property.bhk },
                { icon: Ruler, label: "Area", value: `${property.areaSqft} sq.ft` },
                { icon: Car, label: "Parking", value: property.parking ?? "Available" },
                { icon: ShieldCheck, label: "Posted by", value: property.postedBy },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4">
                  <item.icon size={18} className="text-slate-400" />
                  <p className="mt-2 text-[10px] uppercase text-slate-400">{item.label}</p>
                  <p className="text-sm font-semibold text-[#1e293b]">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-[#1e293b]">Overview</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{property.description}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ["Property Type", property.propertyType],
                  ["Furnishing", property.furnishing],
                  ["Floor", property.floor ?? "—"],
                  ["Possession", property.possession],
                  ["Pincode", property.pincode],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-slate-100 py-2 text-sm">
                    <span className="text-slate-500">{k}</span>
                    <span className="font-medium text-[#1e293b]">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-[#1e293b]">Amenities</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <span key={a} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-sm text-slate-400">
              Map — {property.locality}, {property.city}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSaved(toggleFavorite(property.id))}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium ${
                    saved ? "border-[#FF052B] text-[#FF052B]" : "border-slate-200"
                  }`}
                >
                  <Heart size={16} fill={saved ? "#FF052B" : "none"} />
                  Save
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    const url = window.location.href;
                    if (navigator.share) await navigator.share({ title: property.title, url });
                    else await navigator.clipboard.writeText(url);
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-medium"
                >
                  <Share2 size={16} />
                  Share
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {(["enquiry", "callback", "site_visit"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setEnquiryType(t)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                      enquiryType === t ? "bg-[#FF052B] text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {t === "enquiry" ? "Contact" : t === "callback" ? "Callback" : "Visit"}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <PropertyEnquiryForm
                  propertyId={property.id}
                  propertyTitle={property.title}
                  type={enquiryType}
                />
              </div>

              <a href={buildCallUrl()} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-[#334155]">
                <Phone size={16} />
                Call {CONTACT.phoneDisplay}
              </a>

              <a
                href={buildWhatsAppUrl({ id: property.id, title: property.title, location: `${property.locality}, ${property.city}` })}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-[#25D366] py-3 text-sm font-semibold text-[#25D366]"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-slate-200 bg-white lg:hidden">
        <a href={buildCallUrl()} className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-[#334155]">
          <Phone size={16} /> Call
        </a>
        <a
          href={buildWhatsAppUrl({ id: property.id, title: property.title, location: property.locality })}
          className="flex flex-1 items-center justify-center gap-2 border-x border-slate-200 py-3.5 text-sm font-semibold text-[#25D366]"
        >
          WhatsApp
        </a>
        <button
          type="button"
          onClick={() => setEnquiryType("site_visit")}
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-[#FF052B]"
        >
          <Calendar size={16} /> Visit
        </button>
      </div>

      <Footer />
    </>
  );
}
