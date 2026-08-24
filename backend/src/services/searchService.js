const Property = require("../models/Property");
const {
  parseSearchQuery,
  escapeRegex,
  KNOWN_CITIES,
} = require("../utils/searchParser");
const { parsePagination, buildPaginationMeta, parsePositiveNumber, normalizePurpose } = require("../utils/propertyQuery");

function mergeParsedWithQuery(parsed, query) {
  return {
    original: parsed.original,
    bhk: query.bhk || parsed.bhk,
    propertyType: query.propertyType || parsed.propertyType,
    city: query.city || parsed.city,
    locality: query.locality || parsed.locality,
    location: query.locality || query.city || parsed.location,
    purpose: normalizePurpose(query.purpose) || parsed.purpose,
    keywords: parsed.keywords,
    commercial:
      parsed.commercial ||
      normalizePurpose(query.purpose) === "COMMERCIAL" ||
      ["Office", "Shop", "Warehouse"].includes(query.propertyType),
  };
}

function buildLocationFilter(location, city, locality) {
  const clauses = [];

  if (locality) {
    const pattern = escapeRegex(locality);
    clauses.push(
      { locality: new RegExp(pattern, "i") },
      { address: new RegExp(pattern, "i") },
      { title: new RegExp(pattern, "i") }
    );
  }

  if (city) {
    const cityPattern = escapeRegex(city);
    clauses.push(
      { city: new RegExp(cityPattern, "i") },
      { locality: new RegExp(cityPattern, "i") }
    );

    if (city === "Bengaluru") {
      clauses.push({ city: /bangalore/i });
    }
    if (city === "Gurugram") {
      clauses.push({ city: /gurgaon/i });
    }
  }

  if (!locality && !city && location) {
    const pattern = escapeRegex(location);
    clauses.push(
      { locality: new RegExp(pattern, "i") },
      { city: new RegExp(pattern, "i") },
      { address: new RegExp(pattern, "i") },
      { title: new RegExp(pattern, "i") }
    );
  }

  return clauses.length ? { $or: clauses } : null;
}

function buildPropertyQuery(parsed, { strict = true } = {}) {
  const conditions = [];

  if (parsed.bhk) {
    conditions.push({ bhk: new RegExp(`^${escapeRegex(parsed.bhk)}$`, "i") });
  }

  if (parsed.propertyType) {
    conditions.push({
      propertyType: new RegExp(`^${escapeRegex(parsed.propertyType)}$`, "i"),
    });
  }

  if (parsed.commercial) {
    conditions.push({ purpose: "COMMERCIAL" });
  } else if (parsed.purpose) {
    conditions.push({ purpose: parsed.purpose });
  }

  const locationFilter = buildLocationFilter(
    parsed.location,
    parsed.city,
    parsed.locality
  );
  if (locationFilter) {
    conditions.push(locationFilter);
  }

  if (parsed.keywords.length) {
    const keywordClauses = parsed.keywords.flatMap((keyword) => {
      const pattern = escapeRegex(keyword);
      return [
        { title: new RegExp(pattern, "i") },
        { description: new RegExp(pattern, "i") },
        { projectName: new RegExp(pattern, "i") },
        { propertyType: new RegExp(pattern, "i") },
        { locality: new RegExp(pattern, "i") },
        { city: new RegExp(pattern, "i") },
      ];
    });

    if (strict) {
      conditions.push({ $or: keywordClauses });
    } else if (!parsed.bhk && !parsed.locality && !parsed.city) {
      conditions.push({ $or: keywordClauses });
    }
  }

  if (!conditions.length) {
    return {};
  }

  return { $and: conditions };
}

function buildRelaxedQueries(parsed) {
  const queries = [];

  if (parsed.bhk && (parsed.locality || parsed.city || parsed.location)) {
    const withoutExactLocality = {
      ...parsed,
      locality: null,
      city: parsed.city,
      location: parsed.city || parsed.location,
    };
    queries.push(buildPropertyQuery(withoutExactLocality, { strict: false }));

    const bhkOnly = {
      ...parsed,
      locality: null,
      city: null,
      location: null,
      keywords: [],
    };
    queries.push(buildPropertyQuery(bhkOnly, { strict: false }));
  }

  if (parsed.locality || parsed.city || parsed.location) {
    const locationOnly = {
      ...parsed,
      bhk: null,
      propertyType: null,
      keywords: parsed.keywords,
    };
    queries.push(buildPropertyQuery(locationOnly, { strict: false }));
  }

  if (parsed.keywords.length) {
    queries.push(
      buildPropertyQuery(
        {
          ...parsed,
          bhk: null,
          propertyType: null,
          city: null,
          locality: null,
          location: null,
        },
        { strict: false }
      )
    );
  }

  return queries.filter((item) => Object.keys(item).length > 0);
}

function rankSearchResults(properties, parsed) {
  const lowerKeywords = parsed.keywords.map((word) => word.toLowerCase());
  const locationNeedle = (parsed.locality || parsed.city || parsed.location || "")
    .toLowerCase();

  return [...properties]
    .map((property) => {
      let score = 0;
      const title = property.title?.toLowerCase() || "";
      const description = property.description?.toLowerCase() || "";
      const locality = property.locality?.toLowerCase() || "";
      const city = property.city?.toLowerCase() || "";

      if (parsed.bhk && property.bhk?.toLowerCase() === parsed.bhk.toLowerCase()) {
        score += 100;
      } else if (parsed.bhk && property.bhk) {
        score -= 40;
      }

      if (parsed.locality && locality.includes(parsed.locality.toLowerCase())) {
        score += 90;
      } else if (locationNeedle && locality.includes(locationNeedle)) {
        score += 70;
      }

      if (parsed.city && city.includes(parsed.city.toLowerCase())) {
        score += 60;
      } else if (locationNeedle && city.includes(locationNeedle)) {
        score += 50;
      }

      if (
        parsed.propertyType &&
        property.propertyType?.toLowerCase() === parsed.propertyType.toLowerCase()
      ) {
        score += 50;
      }

      for (const keyword of lowerKeywords) {
        if (title.includes(keyword)) score += 25;
        if (description.includes(keyword)) score += 12;
      }

      if (property.verified) score += 5;
      score += Math.min(property.createdAt ? 1 : 0, 1);

      return { property, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.property);
}

async function fetchWithFilter(filter, limit = 100) {
  return Property.find(filter)
    .limit(limit)
    .populate("ownerId", "name email phone role")
    .lean();
}

async function buildSuggestions(parsed, exactCount) {
  if (exactCount > 0) return [];

  const suggestions = [];
  const baseFilter = {};

  if (parsed.city) {
    baseFilter.city = new RegExp(escapeRegex(parsed.city), "i");
  } else if (parsed.locality) {
    baseFilter.locality = new RegExp(escapeRegex(parsed.locality), "i");
  }

  if (parsed.bhk) {
    const bhkMatches = await Property.aggregate([
      { $match: { ...baseFilter, bhk: parsed.bhk } },
      {
        $group: {
          _id: "$locality",
          count: { $sum: 1 },
          city: { $first: "$city" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 4 },
    ]);

    for (const match of bhkMatches) {
      suggestions.push({
        label: `${parsed.bhk} properties in ${match._id}`,
        locality: match._id,
        city: match.city,
        bhk: parsed.bhk,
        count: match.count,
      });
    }
  }

  if (!suggestions.length && parsed.locality) {
    const nearby = await Property.aggregate([
      {
        $match: {
          bhk: parsed.bhk || { $exists: true },
          locality: { $ne: parsed.locality },
          ...(parsed.city ? { city: new RegExp(escapeRegex(parsed.city), "i") } : {}),
        },
      },
      {
        $group: {
          _id: "$locality",
          count: { $sum: 1 },
          bhk: { $first: "$bhk" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 4 },
    ]);

    for (const match of nearby) {
      suggestions.push({
        label: parsed.bhk
          ? `${parsed.bhk} properties in ${match._id}`
          : `Properties in ${match._id}`,
        locality: match._id,
        bhk: parsed.bhk || match.bhk,
        count: match.count,
      });
    }
  }

  return suggestions;
}

function applyExplicitQueryFilters(filter, queryParams) {
  const extra = {};

  const minPrice = parsePositiveNumber(queryParams.minPrice);
  const maxPrice = parsePositiveNumber(queryParams.maxPrice);
  if (minPrice !== undefined || maxPrice !== undefined) {
    extra.price = {};
    if (minPrice !== undefined) extra.price.$gte = minPrice;
    if (maxPrice !== undefined) extra.price.$lte = maxPrice;
  }

  const minArea = parsePositiveNumber(queryParams.minArea);
  const maxArea = parsePositiveNumber(queryParams.maxArea);
  if (minArea !== undefined || maxArea !== undefined) {
    extra.area = {};
    if (minArea !== undefined) extra.area.$gte = minArea;
    if (maxArea !== undefined) extra.area.$lte = maxArea;
  }

  if (queryParams.furnishing) {
    extra.furnishing = new RegExp(String(queryParams.furnishing).trim(), "i");
  }

  if (queryParams.possession) {
    extra.possession = new RegExp(String(queryParams.possession).trim(), "i");
  }

  if (queryParams.verified !== undefined && queryParams.verified !== "") {
    extra.verified = String(queryParams.verified).toLowerCase() === "true";
  }

  if (!Object.keys(extra).length) {
    return filter;
  }

  if (!Object.keys(filter).length) {
    return extra;
  }

  return { $and: [filter, extra] };
}

async function searchProperties(queryParams = {}) {
  const parsed = mergeParsedWithQuery(
    parseSearchQuery(queryParams.q || ""),
    queryParams
  );

  const { page, limit, skip } = parsePagination(queryParams);
  const strictFilter = applyExplicitQueryFilters(
    buildPropertyQuery(parsed, { strict: true }),
    queryParams
  );

  let properties = await fetchWithFilter(strictFilter, 200);
  let exact = true;

  if (!properties.length && parsed.original) {
    exact = false;
    const relaxedQueries = buildRelaxedQueries(parsed);

    for (const relaxedFilter of relaxedQueries) {
      properties = await fetchWithFilter(
        applyExplicitQueryFilters(relaxedFilter, queryParams),
        200
      );
      if (properties.length) break;
    }

    if (!properties.length && parsed.original.length >= 2) {
      const fallbackFilter = {
        $or: [
          { title: new RegExp(escapeRegex(parsed.original), "i") },
          { description: new RegExp(escapeRegex(parsed.original), "i") },
          { locality: new RegExp(escapeRegex(parsed.original), "i") },
          { city: new RegExp(escapeRegex(parsed.original), "i") },
        ],
      };
      properties = await fetchWithFilter(fallbackFilter, 200);
    }
  }

  const ranked = rankSearchResults(properties, parsed);
  const total = ranked.length;
  const paginated = ranked.slice(skip, skip + limit);
  const suggestions = await buildSuggestions(parsed, exact ? total : 0);

  return {
    search: {
      original: parsed.original,
      detected: {
        bhk: parsed.bhk,
        propertyType: parsed.propertyType,
        location: parsed.locality || parsed.city || parsed.location,
        city: parsed.city,
        locality: parsed.locality,
        purpose: parsed.purpose,
        keywords: parsed.keywords,
      },
      exact,
    },
    properties: paginated,
    total,
    suggestions,
    pagination: buildPaginationMeta(total, page, limit),
  };
}

async function getSearchSuggestions(rawQuery, limit = 6) {
  const parsed = parseSearchQuery(rawQuery || "");
  if (!parsed.original || parsed.original.length < 2) {
    return [];
  }

  const suggestions = [];
  const location = parsed.locality || parsed.city || parsed.location;

  if (parsed.bhk && location) {
    suggestions.push(`${parsed.bhk} in ${location}`);
    if (parsed.city && parsed.locality) {
      suggestions.push(`${parsed.bhk} in ${parsed.locality}, ${parsed.city}`);
    }
    if (parsed.propertyType) {
      suggestions.push(
        `${parsed.bhk} ${parsed.propertyType}s in ${location}`
      );
    } else {
      suggestions.push(`${parsed.bhk} Apartments in ${location}`);
    }
  } else if (parsed.bhk) {
    suggestions.push(`${parsed.bhk} in Bengaluru`);
    suggestions.push(`${parsed.bhk} in Mumbai`);
    suggestions.push(`${parsed.bhk} Apartments`);
  } else if (location) {
    suggestions.push(`Apartments in ${location}`);
    suggestions.push(`Villas in ${location}`);
    suggestions.push(`Properties in ${location}`);
  }

  if (location) {
    const regex = new RegExp(escapeRegex(location), "i");
    const localities = await Property.distinct("locality", {
      $or: [{ locality: regex }, { city: regex }],
    });

    for (const loc of localities.slice(0, 3)) {
      if (parsed.bhk) {
        suggestions.push(`${parsed.bhk} in ${loc}`);
      } else {
        suggestions.push(`Properties in ${loc}`);
      }
    }
  }

  const unique = [...new Set(suggestions)];
  return unique.slice(0, limit).map((label) => ({ label, query: label }));
}

module.exports = {
  mergeParsedWithQuery,
  buildPropertyQuery,
  rankSearchResults,
  searchProperties,
  getSearchSuggestions,
};
