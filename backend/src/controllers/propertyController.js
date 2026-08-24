const Property = require("../models/Property");
const {
  parsePagination,
  buildSort,
  buildPropertyFilter,
  buildPaginationMeta,
} = require("../utils/propertyQuery");
const {
  validatePropertyBody,
  sendValidationErrors,
  normalizePropertyType,
  normalizePurpose,
} = require("../utils/validators");
const {
  searchProperties: runPropertySearch,
  getSearchSuggestions,
} = require("../services/searchService");

function formatOwner(owner) {
  if (!owner) return null;
  return {
    id: owner._id,
    name: owner.name,
    email: owner.email,
    phone: owner.phone,
    role: owner.role,
  };
}

function formatProperty(property) {
  const doc = property.toObject ? property.toObject() : property;
  return {
    ...doc,
    id: doc._id,
    owner: formatOwner(doc.ownerId),
    ownerId: doc.ownerId?._id || doc.ownerId,
  };
}

async function queryProperties(req, res, next) {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const filter = buildPropertyFilter(req.query);
    const sort = buildSort(req.query.sort);

    const [properties, total] = await Promise.all([
      Property.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate("ownerId", "name email phone role"),
      Property.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: properties.map(formatProperty),
      pagination: buildPaginationMeta(total, page, limit),
    });
  } catch (error) {
    next(error);
  }
}

async function searchProperties(req, res, next) {
  try {
    const result = await runPropertySearch(req.query);

    res.json({
      success: true,
      search: result.search,
      properties: result.properties.map(formatProperty),
      total: result.total,
      suggestions: result.suggestions,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
}

async function getSuggestions(req, res, next) {
  try {
    const q = String(req.query.q || "").trim();
    if (q.length < 2) {
      return res.json({ success: true, data: [] });
    }

    const suggestions = await getSearchSuggestions(q);
    res.json({ success: true, data: suggestions });
  } catch (error) {
    next(error);
  }
}

async function getProperty(req, res, next) {
  try {
    const property = await Property.findById(req.params.id).populate(
      "ownerId",
      "name email phone role"
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.json({
      success: true,
      data: formatProperty(property),
    });
  } catch (error) {
    next(error);
  }
}

async function createProperty(req, res, next) {
  try {
    const errors = validatePropertyBody(req.body);
    if (errors.length) return sendValidationErrors(res, errors);

    const postedBy =
      req.user.role === "agent"
        ? "Agent"
        : req.user.role === "builder"
          ? "Builder"
          : "Owner";

    const property = await Property.create({
      title: req.body.title.trim(),
      description: req.body.description?.trim() || "",
      purpose: normalizePurpose(req.body.purpose),
      propertyType: normalizePropertyType(req.body.propertyType),
      bhk: req.body.bhk?.trim() || "",
      price: Number(req.body.price),
      area: req.body.area ? Number(req.body.area) : 0,
      city: req.body.city.trim(),
      locality: req.body.locality.trim(),
      pincode: req.body.pincode?.trim() || "",
      address: req.body.address?.trim() || "",
      furnishing: req.body.furnishing?.trim() || "",
      possession: req.body.possession?.trim() || "",
      bedrooms: req.body.bedrooms ? Number(req.body.bedrooms) : 0,
      bathrooms: req.body.bathrooms ? Number(req.body.bathrooms) : 0,
      parking: req.body.parking?.trim() || "",
      floor: req.body.floor?.trim() || "",
      totalFloors: req.body.totalFloors?.trim() || "",
      amenities: Array.isArray(req.body.amenities) ? req.body.amenities : [],
      images: Array.isArray(req.body.images) ? req.body.images : [],
      projectName: req.body.projectName?.trim() || "",
      verified: false,
      postedBy,
      ownerId: req.user._id,
    });

    const populated = await property.populate("ownerId", "name email phone role");

    res.status(201).json({
      success: true,
      data: formatProperty(populated),
    });
  } catch (error) {
    next(error);
  }
}

async function updateProperty(req, res, next) {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const isOwner = property.ownerId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Forbidden. You can only update your own properties.",
      });
    }

    const errors = validatePropertyBody(req.body, true);
    if (errors.length) return sendValidationErrors(res, errors);

    const updates = { ...req.body };

    if (updates.purpose) updates.purpose = normalizePurpose(updates.purpose);
    if (updates.propertyType) {
      updates.propertyType = normalizePropertyType(updates.propertyType);
    }
    if (updates.price !== undefined) updates.price = Number(updates.price);
    if (updates.area !== undefined) updates.area = Number(updates.area);
    if (updates.bedrooms !== undefined) {
      updates.bedrooms = Number(updates.bedrooms);
    }
    if (updates.bathrooms !== undefined) {
      updates.bathrooms = Number(updates.bathrooms);
    }

    if (!isAdmin) {
      delete updates.verified;
      delete updates.ownerId;
    }

    Object.assign(property, updates);
    await property.save();

    const populated = await property.populate("ownerId", "name email phone role");

    res.json({
      success: true,
      data: formatProperty(populated),
    });
  } catch (error) {
    next(error);
  }
}

async function deleteProperty(req, res, next) {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const isOwner = property.ownerId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Forbidden. You can only delete your own properties.",
      });
    }

    await property.deleteOne();

    res.json({
      success: true,
      data: { message: "Property deleted successfully" },
    });
  } catch (error) {
    next(error);
  }
}

async function getMyProperties(req, res, next) {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const filter = { ownerId: req.user._id };

    const [properties, total] = await Promise.all([
      Property.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Property.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: properties.map(formatProperty),
      pagination: buildPaginationMeta(total, page, limit),
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  queryProperties,
  searchProperties,
  getSuggestions,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
};
