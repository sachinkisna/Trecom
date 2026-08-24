type AnalyticsEvent =
  | "page_view"
  | "search"
  | "property_view"
  | "favorite"
  | "whatsapp_click"
  | "call_click"
  | "enquiry"
  | "site_visit"
  | "post_property"
  | "map_view"
  | "cta_click";

export function trackEvent(
  event: AnalyticsEvent,
  data?: Record<string, string | number>
): void {
  if (typeof window === "undefined") return;

  const payload = {
    event,
    data,
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
  };

  try {
    const key = "trecom_analytics";
    const existing = JSON.parse(localStorage.getItem(key) ?? "[]") as unknown[];
    existing.unshift(payload);
    localStorage.setItem(key, JSON.stringify(existing.slice(0, 200)));
  } catch {
    /* ignore */
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", event, data);
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
