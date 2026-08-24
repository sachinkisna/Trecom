const STORAGE_KEY = "trecom_favorites";

export type FavoriteId = number | string;

function normalizeId(id: FavoriteId): string {
  return String(id);
}

export function getFavorites(): FavoriteId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FavoriteId[]) : [];
  } catch {
    return [];
  }
}

export function isFavorite(id: FavoriteId): boolean {
  const needle = normalizeId(id);
  return getFavorites().some((item) => normalizeId(item) === needle);
}

export function toggleFavorite(id: FavoriteId): boolean {
  const needle = normalizeId(id);
  const current = getFavorites();
  const exists = current.some((item) => normalizeId(item) === needle);
  const next = exists
    ? current.filter((item) => normalizeId(item) !== needle)
    : [...current, id];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("trecom:favorites"));
  return !exists;
}
