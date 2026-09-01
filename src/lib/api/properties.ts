const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000/api";

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

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

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

export async function getSearchSuggestionsApi(q: string) {
  if (!q || q.trim().length < 2) {
    return { success: true, data: [] as AutocompleteSuggestion[] };
  }

  return apiFetch<{ success: boolean; data: AutocompleteSuggestion[] }>(
    `/properties/suggestions?q=${encodeURIComponent(q.trim())}`
  );
}
