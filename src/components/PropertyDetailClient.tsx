"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { EnrichedProperty } from "@/lib/property-meta";
import PropertyEnquiryForm from "@/components/PropertyEnquiryForm";
import FavoriteButton from "@/components/FavoriteButton";
import ShareButton from "@/components/ShareButton";
import { buildWhatsAppUrl, buildCallUrl } from "@/lib/whatsapp";
import { CONTACT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export default function PropertyDetailClient({
  property,
  related,
}: {
  property: EnrichedProperty;
  related: EnrichedProperty[];
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [enquiryType, setEnquiryType] = useState<"enquiry" | "callback" | "site_visit">("enquiry");

  useEffect(() => {
    trackEvent("property_view", { propertyId: property.id });
  }, [property.id]);

  const images = property.images.length > 0 ? property.images : [property.image];

  return (
    <>
      {/* Gallery */}
      <div className="relative">
        <div
          className="relative h-[340px] cursor-pointer overflow-hidden rounded-3xl bg-slate-200 lg:h-[440px]"
          onClick={() => setShowGallery(true)}
        >
          <img
            src={images[activeImage]}
            alt={property.title}
            className="h-full w-full object-cover"
          />
          {property.verified && (
            <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[#064b35] shadow-sm">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#064b35] text-[9px] text-white">
                ✓
              </span>
              Verified Property
            </div>
          )}
          <div className="absolute bottom-5 right-5 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white">
            {activeImage + 1} / {images.length} photos
          </div>
        </div>

        {images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 ${
                  activeImage === i ? "border-[#064b35]" : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen gallery */}
      {showGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
          <button
            type="button"
            onClick={() => setShowGallery(false)}
            className="absolute right-6 top-6 text-3xl text-white"
            aria-label="Close gallery"
          >
            ×
          </button>
          <button
            type="button"
            onClick={() => setActiveImage((i) => (i - 1 + images.length) % images.length)}
            className="absolute left-4 text-4xl text-white"
          >
            ‹
          </button>
          <img
            src={images[activeImage]}
            alt={property.title}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          <button
            type="button"
            onClick={() => setActiveImage((i) => (i + 1) % images.length)}
            className="absolute right-4 text-4xl text-white"
          >
            ›
          </button>
        </div>
      )}

      <div className="mt-7 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {property.title}
          </h1>
          <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {property.location}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {property.propertyType}
            </span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
              {property.status}
            </span>
            {property.reraVerified && (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">
                RERA Verified
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <FavoriteButton propertyId={property.id} className="relative static" />
          <ShareButton title={property.title} />
        </div>
      </div>

      <p className="mt-2 text-2xl font-bold text-[#064b35]">{property.price}</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {[
          { label: "Bedrooms", value: property.bedrooms },
          { label: "Bathrooms", value: property.bathrooms },
          { label: "Area", value: property.area },
          { label: "Facing", value: property.facing },
          { label: "Parking", value: property.parking },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4 text-center">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">{item.label}</p>
            <p className="mt-1 text-sm font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-bold text-slate-900">Overview</h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
        {property.description}
      </p>

      <h2 className="mt-10 text-xl font-bold text-slate-900">Amenities</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {property.amenities.map((amenity) => (
          <span
            key={amenity}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700"
          >
            {amenity}
          </span>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-bold text-slate-900">Property Details</h2>
      <div className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
        {[
          { label: "Property ID", value: `#${property.id}` },
          { label: "Property Type", value: property.propertyType },
          { label: "Floor", value: property.floor },
          { label: "Furnishing", value: property.furnishing },
          { label: "City", value: property.city },
          { label: "Status", value: property.status },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between px-5 py-4">
            <span className="text-sm text-slate-500">{row.label}</span>
            <span className="text-sm font-semibold text-slate-900">{row.value}</span>
          </div>
        ))}
      </div>

      {/* Sidebar actions - desktop */}
      <aside className="mt-10 lg:sticky lg:top-28 lg:mt-0 lg:hidden">
        <ActionPanel
          property={property}
          enquiryType={enquiryType}
          setEnquiryType={setEnquiryType}
        />
      </aside>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Similar Properties
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/properties/${item.id}/`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{item.location}</p>
                  <p className="mt-3 text-lg font-bold text-slate-900">{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-slate-200 bg-white shadow-lg lg:hidden">
        <a
          href={buildCallUrl()}
          onClick={() => trackEvent("call_click", { propertyId: property.id })}
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-[#064b35]"
        >
          Call
        </a>
        <a
          href={buildWhatsAppUrl(property)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { propertyId: property.id })}
          className="flex flex-1 items-center justify-center gap-2 border-x border-slate-200 py-3.5 text-sm font-semibold text-[#25D366]"
        >
          WhatsApp
        </a>
        <button
          type="button"
          onClick={() => {
            setEnquiryType("site_visit");
            document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-slate-700"
        >
          Schedule Visit
        </button>
      </div>
    </>
  );
}

export function PropertyDetailSidebar({
  property,
}: {
  property: EnrichedProperty;
}) {
  const [enquiryType, setEnquiryType] = useState<"enquiry" | "callback" | "site_visit">("enquiry");

  return (
    <ActionPanel
      property={property}
      enquiryType={enquiryType}
      setEnquiryType={setEnquiryType}
    />
  );
}

function ActionPanel({
  property,
  enquiryType,
  setEnquiryType,
}: {
  property: EnrichedProperty;
  enquiryType: "enquiry" | "callback" | "site_visit";
  setEnquiryType: (t: "enquiry" | "callback" | "site_visit") => void;
}) {
  return (
    <div id="enquiry-form" className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
      <div className="bg-[#064b35] p-6 text-white">
        <p className="text-[10px] uppercase tracking-wide text-white/60">
          {property.category === "rent" ? "Monthly Rent" : "Price"}
        </p>
        <p className="mt-1 text-3xl font-bold">{property.price}</p>
      </div>

      <div className="space-y-3 p-6">
        <div className="flex flex-wrap gap-2">
          {(["enquiry", "callback", "site_visit"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setEnquiryType(t)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                enquiryType === t
                  ? "bg-[#064b35] text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {t === "enquiry" ? "Enquire" : t === "callback" ? "Callback" : "Site Visit"}
            </button>
          ))}
        </div>

        <PropertyEnquiryForm
          propertyId={property.id}
          propertyTitle={property.title}
          type={enquiryType}
        />

        <a
          href={buildCallUrl()}
          onClick={() => trackEvent("call_click", { propertyId: property.id })}
          className="block w-full rounded-xl border border-slate-200 py-3.5 text-center text-sm font-semibold text-slate-700 transition hover:border-[#064b35]"
        >
          Call {CONTACT.phoneDisplay}
        </a>

        <a
          href={buildWhatsAppUrl(property)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { propertyId: property.id })}
          className="block w-full rounded-xl border border-[#25D366] py-3.5 text-center text-sm font-semibold text-[#25D366] transition hover:bg-emerald-50"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
