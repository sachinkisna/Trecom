const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000/api";

export function getApiOrigin() {
  return API_BASE.replace(/\/api$/, "");
}

export function resolveMediaUrl(src?: string) {
  if (!src) return "";
  if (src.startsWith("http") || src.startsWith("data:") || src.startsWith("blob:")) {
    return src;
  }
  const path = src.startsWith("/") ? src : `/${src}`;
  return `${getApiOrigin()}${path}`;
}

function authHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem("trecom_auth");
    if (!raw) return {};
    const parsed = JSON.parse(raw) as { token?: string };
    if (parsed.token) return { Authorization: `Bearer ${parsed.token}` };
  } catch {
    /* ignore */
  }
  return {};
}

export type ApiProperty = {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  purpose: string;
  propertyType: string;
  bhk: string;
  price: number;
  area: number;
  city: string;
  locality: string;
  pincode?: string;
  address?: string;
  furnishing?: string;
  possession?: string;
  bedrooms?: number;
  bathrooms?: number;
  parking?: string;
  facing?: string;
  floor?: string;
  totalFloors?: string;
  amenities?: string[];
  images?: string[];
  projectName?: string;
  verified?: boolean;
  postedBy?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SearchDetected = {
  bhk: string | null;
  propertyType: string | null;
  location: string | null;
  city?: string | null;
  locality?: string | null;
  purpose?: string | null;
  keywords?: string[];
};

export type SearchSuggestion = {
  label: string;
  locality?: string;
  city?: string;
  bhk?: string;
  count?: number;
};

export type PropertySearchResponse = {
  success: boolean;
  search: {
    original: string;
    detected: SearchDetected;
    exact?: boolean;
  };
  properties: ApiProperty[];
  total: number;
  suggestions?: SearchSuggestion[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type AutocompleteSuggestion = {
  label: string;
  query: string;
};

export type CreatePropertyPayload = {
  title: string;
  description?: string;
  purpose: string;
  propertyType: string;
  bhk?: string;
  price: number;
  area?: number;
  city: string;
  locality: string;
  pincode?: string;
  address?: string;
  furnishing?: string;
  possession?: string;
  bedrooms?: number;
  bathrooms?: number;
  parking?: string;
  facing?: string;
  floor?: string;
  images?: string[];
  amenities?: string[];
  postedBy?: string;
  contactName?: string;
  contactPhone?: string;
  name?: string;
  phone?: string;
  email?: string;
};

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (!headers.has("Content-Type") && !(init?.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  const auth = authHeaders();
  Object.entries(auth).forEach(([key, value]) => headers.set(key, value));

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers,
      cache: "no-store",
    });
  } catch {
    throw new Error(
      "Cannot connect to the property service. Please make sure the backend API and database are running."
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `API request failed (${response.status})`);
  }

  return data as T;
}

export async function searchPropertiesApi(params: {
  q?: string;
  city?: string;
  purpose?: string;
  page?: number;
  limit?: number;
  sort?: string;
}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return apiFetch<PropertySearchResponse>(
    `/properties/search?${searchParams.toString()}`
  );
}

export async function listPropertiesApi(params?: {
  page?: number;
  limit?: number;
  sort?: string;
  city?: string;
  purpose?: string;
}) {
  const searchParams = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return apiFetch<{
    success: boolean;
    data: ApiProperty[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>(`/properties?${searchParams.toString()}`);
}

export async function getPropertyApi(id: string) {
  return apiFetch<{ success: boolean; data: ApiProperty }>(
    `/properties/${encodeURIComponent(id)}`
  );
}

export async function uploadPropertyImages(files: File[]) {
  if (!files.length) return [] as string[];
  const form = new FormData();
  files.forEach((file) => form.append("images", file));

  const result = await apiFetch<{ success: boolean; data: { urls: string[] } }>(
    "/properties/upload",
    { method: "POST", body: form }
  );
  return result.data.urls;
}

export async function createPropertyApi(payload: CreatePropertyPayload) {
  return apiFetch<{ success: boolean; data: ApiProperty }>("/properties", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getSearchSuggestionsApi(q: string) {
  if (!q || q.trim().length < 2) {
    return { success: true, data: [] as AutocompleteSuggestion[] };
  }

  return apiFetch<{ success: boolean; data: AutocompleteSuggestion[] }>(
    `/properties/suggestions?q=${encodeURIComponent(q.trim())}`
  );
}

export { API_BASE };
