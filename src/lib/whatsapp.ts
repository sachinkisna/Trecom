import { CONTACT } from "./constants";

export function buildWhatsAppUrl(
  property: { id: number | string; title: string; location: string },
  pageUrl?: string
): string {
  const url =
    pageUrl ??
    (typeof window !== "undefined"
      ? window.location.href
      : `https://trecom.in/properties/${property.id}/`);

  const message = `Hi, I'm interested in the ${property.title} (ID: ${property.id}) in ${property.location}. Please share more details.\n\n${url}`;

  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildCallUrl(): string {
  return `tel:${CONTACT.phone}`;
}
