const STOP_WORDS = new Set([
  "in",
  "near",
  "at",
  "for",
  "me",
  "a",
  "an",
  "the",
  "and",
  "or",
  "to",
  "of",
  "on",
  "with",
  "from",
  "by",
  "is",
  "are",
  "my",
  "your",
  "property",
  "properties",
  "available",
  "looking",
  "find",
  "show",
  "search",
  "want",
  "need",
  "sale",
  "rent",
  "buy",
  "lease",
]);

const CITY_ALIASES = {
  bangalore: "Bengaluru",
  bengaluru: "Bengaluru",
  blr: "Bengaluru",
  mumbai: "Mumbai",
  bombay: "Mumbai",
  hyderabad: "Hyderabad",
  hyd: "Hyderabad",
  pune: "Pune",
  chennai: "Chennai",
  madras: "Chennai",
  delhi: "Delhi NCR",
  "delhi ncr": "Delhi NCR",
  noida: "Noida",
  gurgaon: "Gurugram",
  gurugram: "Gurugram",
  ahmedabad: "Ahmedabad",
  kolkata: "Kolkata",
  calcutta: "Kolkata",
};

const KNOWN_CITIES = new Set([
  "Bengaluru",
  "Mumbai",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Delhi NCR",
  "Noida",
  "Gurugram",
  "Ahmedabad",
  "Kolkata",
]);

const KNOWN_LOCALITIES = [
  "HSR Layout",
  "Electronic City",
  "Sarjapur Road",
  "BTM Layout",
  "Koramangala",
  "Whitefield",
  "Indiranagar",
  "Marathahalli",
  "Hebbal",
  "Yelahanka",
  "Jayanagar",
  "Banashankari",
  "Bellandur",
  "Domlur",
  "Frazer Town",
  "MG Road",
  "Richmond Town",
  "Ulsoor",
  "JP Nagar",
  "Bannerghatta Road",
  "Bandra Kurla Complex",
  "Andheri",
  "Powai",
  "Hitech City",
  "Gachibowli",
  "Kondapur",
  "Hinjewadi",
  "Kharadi",
  "Anna Nagar",
  "Adyar",
];

const PROPERTY_TYPE_KEYWORDS = [
  { type: "Apartment", keywords: ["apartment", "apartments", "flat", "flats"] },
  { type: "Villa", keywords: ["villa", "villas"] },
  { type: "House", keywords: ["house", "houses", "home", "homes", "independent house"] },
  { type: "Plot", keywords: ["plot", "plots", "land"] },
  { type: "Studio", keywords: ["studio", "1rk", "1 rk"] },
  { type: "Office", keywords: ["office", "offices"] },
  { type: "Shop", keywords: ["shop", "shops", "retail"] },
  { type: "Warehouse", keywords: ["warehouse", "warehouses"] },
];

const BHK_PATTERNS = [
  { regex: /\b5\s*\+\s*bhk\b/i, value: "5+ BHK" },
  { regex: /\b5\s*bhk\b/i, value: "5+ BHK" },
  { regex: /\b4\s*bhk\b/i, value: "4 BHK" },
  { regex: /\b3\s*bhk\b/i, value: "3 BHK" },
  { regex: /\b2\s*bhk\b/i, value: "2 BHK" },
  { regex: /\b1\s*bhk\b/i, value: "1 BHK" },
  { regex: /\b1\s*rk\b/i, value: "1 RK" },
  { regex: /\b5\+bhk\b/i, value: "5+ BHK" },
  { regex: /\b5bhk\b/i, value: "5+ BHK" },
  { regex: /\b4bhk\b/i, value: "4 BHK" },
  { regex: /\b3bhk\b/i, value: "3 BHK" },
  { regex: /\b2bhk\b/i, value: "2 BHK" },
  { regex: /\b1bhk\b/i, value: "1 BHK" },
  { regex: /\b1rk\b/i, value: "1 RK" },
];

const COMMERCIAL_KEYWORDS = ["commercial", "office", "shop", "warehouse"];

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeWhitespace(value) {
  return String(value).replace(/\s+/g, " ").trim();
}

function normalizeBHK(query) {
  const text = normalizeWhitespace(query);
  for (const pattern of BHK_PATTERNS) {
    if (pattern.regex.test(text)) {
      return pattern.value;
    }
  }
  return null;
}

function removeBHKFromQuery(query) {
  let text = query;
  for (const pattern of BHK_PATTERNS) {
    text = text.replace(pattern.regex, " ");
  }
  return normalizeWhitespace(text);
}

function detectPropertyType(query) {
  const lower = query.toLowerCase();

  if (/\bcommercial\b/.test(lower)) {
    return "Commercial";
  }

  for (const entry of PROPERTY_TYPE_KEYWORDS) {
    for (const keyword of entry.keywords) {
      const regex = new RegExp(`\\b${escapeRegex(keyword)}\\b`, "i");
      if (regex.test(lower)) {
        return entry.type;
      }
    }
  }

  return null;
}

function removePropertyTypeFromQuery(query, propertyType) {
  if (!propertyType) return query;

  let text = query;
  if (propertyType === "Commercial") {
    text = text.replace(/\bcommercial\b/gi, " ");
  }

  const entry = PROPERTY_TYPE_KEYWORDS.find((item) => item.type === propertyType);
  if (entry) {
    for (const keyword of entry.keywords) {
      const regex = new RegExp(`\\b${escapeRegex(keyword)}\\b`, "gi");
      text = text.replace(regex, " ");
    }
  }

  return normalizeWhitespace(text);
}

function detectLocation(query) {
  const lower = query.toLowerCase();
  let city = null;
  let locality = null;
  let remaining = query;

  const sortedLocalities = [...KNOWN_LOCALITIES].sort(
    (a, b) => b.length - a.length
  );

  for (const loc of sortedLocalities) {
    const regex = new RegExp(`\\b${escapeRegex(loc)}\\b`, "i");
    if (regex.test(lower)) {
      locality = loc;
      remaining = remaining.replace(regex, " ");
      break;
    }
  }

  const sortedCityAliases = Object.keys(CITY_ALIASES).sort(
    (a, b) => b.length - a.length
  );

  for (const alias of sortedCityAliases) {
    const regex = new RegExp(`\\b${escapeRegex(alias)}\\b`, "i");
    if (regex.test(remaining.toLowerCase())) {
      city = CITY_ALIASES[alias];
      remaining = remaining.replace(regex, " ");
      break;
    }
  }

  if (!locality) {
    const tokens = remaining
      .split(/[\s,]+/)
      .map((token) => token.trim())
      .filter(Boolean);

    for (const token of tokens) {
      if (token.length < 3 || STOP_WORDS.has(token.toLowerCase())) continue;

      const partialLocality = sortedLocalities.find((loc) =>
        loc.toLowerCase().includes(token.toLowerCase())
      );
      if (partialLocality) {
        locality = partialLocality;
        remaining = remaining.replace(new RegExp(escapeRegex(token), "i"), " ");
        break;
      }
    }
  }

  if (!city && locality && KNOWN_CITIES.has("Bengaluru")) {
    const bengaluruLocalities = sortedLocalities.filter((loc) =>
      [
        "Koramangala",
        "Whitefield",
        "HSR Layout",
        "Indiranagar",
        "Electronic City",
        "Marathahalli",
        "Hebbal",
        "BTM Layout",
        "Sarjapur Road",
        "Jayanagar",
        "Bellandur",
      ].includes(loc)
    );
    if (bengaluruLocalities.includes(locality)) {
      city = "Bengaluru";
    }
  }

  return {
    city,
    locality,
    location: locality || city,
    remainingQuery: normalizeWhitespace(remaining),
  };
}

function extractKeywords(query) {
  return query
    .toLowerCase()
    .split(/[\s,]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function detectPurpose(query, propertyType) {
  const lower = query.toLowerCase();
  if (/\b(rent|rental|lease)\b/.test(lower)) return "RENT";
  if (/\b(pg|paying guest)\b/.test(lower)) return "PG";
  if (
    propertyType &&
    ["Office", "Shop", "Warehouse"].includes(propertyType)
  ) {
    return "COMMERCIAL";
  }
  if (/\bcommercial\b/.test(lower)) return "COMMERCIAL";
  if (propertyType === "Plot") return "PLOTS";
  if (/\b(plot|plots|land)\b/.test(lower)) return "PLOTS";
  return null;
}

function parseSearchQuery(rawQuery) {
  const original = normalizeWhitespace(rawQuery || "");
  if (!original) {
    return {
      original: "",
      bhk: null,
      propertyType: null,
      city: null,
      locality: null,
      location: null,
      purpose: null,
      keywords: [],
    };
  }

  const bhk = normalizeBHK(original);
  let working = removeBHKFromQuery(original);

  const propertyType = detectPropertyType(working);
  working = removePropertyTypeFromQuery(working, propertyType);

  const purpose = detectPurpose(original, propertyType);
  working = working.replace(/\b(rent|rental|lease|pg|paying guest|commercial)\b/gi, " ");
  working = normalizeWhitespace(working);

  const locationInfo = detectLocation(working);
  working = locationInfo.remainingQuery;

  const keywords = extractKeywords(working);

  return {
    original,
    bhk,
    propertyType: propertyType === "Commercial" ? null : propertyType,
    commercial: propertyType === "Commercial" || COMMERCIAL_KEYWORDS.some((word) =>
      original.toLowerCase().includes(word)
    ),
    city: locationInfo.city,
    locality: locationInfo.locality,
    location: locationInfo.locality || locationInfo.city,
    purpose,
    keywords,
  };
}

module.exports = {
  STOP_WORDS,
  CITY_ALIASES,
  KNOWN_CITIES,
  KNOWN_LOCALITIES,
  escapeRegex,
  normalizeBHK,
  detectPropertyType,
  detectLocation,
  parseSearchQuery,
};
