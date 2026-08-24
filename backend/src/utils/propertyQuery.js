const PURPOSE_VALUES = ["BUY", "RENT", "PG", "COMMERCIAL", "PLOTS"];
const PROPERTY_TYPES = [
  "Apartment",
  "Villa",
  "House",
  "Plot",
  "Studio",
  "Office",
  "Shop",
  "Warehouse",
];

function normalizePurpose(value) {
  if (!value) return undefined;
  const upper = String(value).trim().toUpperCase();
  const map = {
    BUY: "BUY",
    RENT: "RENT",
    PG: "PG",
    COMMERCIAL: "COMMERCIAL",
    PLOTS: "PLOTS",
    SELL: "BUY",
  };
  return map[upper];
}

function parsePositiveNumber(value) {
  if (value === undefined || value === null || value === "") return undefined;
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0) return undefined;
  return num;
}

function parsePagination(query) {
  let page = parseInt(query.page, 10);
  let limit = parseInt(query.limit, 10);

  if (!Number.isFinite(page) || page < 1) page = 1;
  if (!Number.isFinite(limit) || limit < 1) limit = 20;
  if (limit > 50) limit = 50;

  return { page, limit, skip: (page - 1) * limit };
}

function buildSort(sortParam) {
  switch (sortParam) {
    case "newest":
      return { createdAt: -1 };
    case "price_low":
      return { price: 1, createdAt: -1 };
    case "price_high":
      return { price: -1, createdAt: -1 };
    case "area_low":
      return { area: 1, createdAt: -1 };
    case "area_high":
      return { area: -1, createdAt: -1 };
    case "recommended":
    default:
      return { verified: -1, createdAt: -1 };
  }
}

function buildPropertyFilter(query) {
  const filter = {};

  if (query.q && String(query.q).trim()) {
    const term = String(query.q).trim();
    filter.$text = { $search: term };
  }

  if (query.city) {
    filter.city = new RegExp(`^${String(query.city).trim()}$`, "i");
  }

  if (query.locality) {
    filter.locality = new RegExp(String(query.locality).trim(), "i");
  }

  if (query.propertyType) {
    filter.propertyType = new RegExp(
      `^${String(query.propertyType).trim()}$`,
      "i"
    );
  }

  const purpose = normalizePurpose(query.purpose);
  if (purpose) {
    filter.purpose = purpose;
  }

  if (query.bhk) {
    filter.bhk = new RegExp(`^${String(query.bhk).trim()}$`, "i");
  }

  const minPrice = parsePositiveNumber(query.minPrice);
  const maxPrice = parsePositiveNumber(query.maxPrice);
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = minPrice;
    if (maxPrice !== undefined) filter.price.$lte = maxPrice;
  }

  const minArea = parsePositiveNumber(query.minArea);
  const maxArea = parsePositiveNumber(query.maxArea);
  if (minArea !== undefined || maxArea !== undefined) {
    filter.area = {};
    if (minArea !== undefined) filter.area.$gte = minArea;
    if (maxArea !== undefined) filter.area.$lte = maxArea;
  }

  if (query.furnishing) {
    filter.furnishing = new RegExp(String(query.furnishing).trim(), "i");
  }

  if (query.possession) {
    filter.possession = new RegExp(String(query.possession).trim(), "i");
  }

  if (query.verified !== undefined && query.verified !== "") {
    filter.verified = String(query.verified).toLowerCase() === "true";
  }

  return filter;
}

function buildPaginationMeta(total, page, limit) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit) || 0,
  };
}

module.exports = {
  PURPOSE_VALUES,
  PROPERTY_TYPES,
  normalizePurpose,
  parsePositiveNumber,
  parsePagination,
  buildSort,
  buildPropertyFilter,
  buildPaginationMeta,
};
