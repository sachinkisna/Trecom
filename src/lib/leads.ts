export type LeadType =
  | "enquiry"
  | "callback"
  | "site_visit"
  | "sell_property"
  | "post_property"
  | "contact"
  | "property_alert";

export type Lead = {
  id: string;
  type: LeadType;
  name: string;
  phone: string;
  email?: string;
  propertyId?: number | string;
  propertyTitle?: string;
  source: string;
  location?: string;
  budget?: string;
  purpose?: string;
  message?: string;
  visitDate?: string;
  visitTime?: string;
  inquiryType?: string;
  status: "new" | "contacted" | "scheduled" | "closed";
  createdAt: string;
};

const STORAGE_KEY = "trecom_leads";

export function saveLead(
  lead: Omit<Lead, "id" | "status" | "createdAt">
): Lead {
  const full: Lead = {
    ...lead,
    id: `lead_${Date.now()}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? "[]"
      ) as Lead[];
      existing.unshift(full);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 100)));
    } catch {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([full]));
    }
  }

  return full;
}

export function getLeads(): Lead[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Lead[];
  } catch {
    return [];
  }
}
