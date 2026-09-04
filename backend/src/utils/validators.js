const {
  PURPOSE_VALUES,
  PROPERTY_TYPES,
  normalizePurpose,
  parsePositiveNumber,
} = require("../utils/propertyQuery");

function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function isValidPhone(phone) {
  return /^[0-9+\-\s()]{8,20}$/.test(phone);
}

function validateRegisterBody(body) {
  const errors = [];

  if (!body.name || !String(body.name).trim()) {
    errors.push("Name is required");
  }

  if (!body.email || !isValidEmail(body.email)) {
    errors.push("Valid email is required");
  }

  if (!body.password || String(body.password).length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  if (body.phone && !isValidPhone(body.phone)) {
    errors.push("Valid phone number is required");
  }

  return errors;
}

function validateLoginBody(body) {
  const errors = [];
  const identifier = String(body.email || body.phone || "").trim();

  if (!identifier) {
    errors.push("Email or phone is required");
  } else if (identifier.includes("@") && !isValidEmail(identifier)) {
    errors.push("Valid email is required");
  }

  if (!body.password) {
    errors.push("Password is required");
  }

  return errors;
}

function validatePropertyBody(body, isUpdate = false) {
  const errors = [];

  if (!isUpdate || body.title !== undefined) {
    if (!body.title || !String(body.title).trim()) {
      errors.push("Title is required");
    }
  }

  if (!isUpdate || body.purpose !== undefined) {
    const purpose = normalizePurpose(body.purpose);
    if (!purpose || !PURPOSE_VALUES.includes(purpose)) {
      errors.push("Valid purpose is required");
    }
  }

  if (!isUpdate || body.propertyType !== undefined) {
    const match = normalizePropertyType(body.propertyType);
    if (!match) {
      errors.push("Valid property type is required");
    }
  }

  if (!isUpdate || body.price !== undefined) {
    const price = parsePositiveNumber(body.price);
    if (price === undefined || price <= 0) {
      errors.push("Price must be a positive number");
    }
  }

  const city = String(body.city || "Bangalore").trim();
  const locality = String(body.locality || body.location || "").trim();

  if (!isUpdate || body.city !== undefined || body.location !== undefined) {
    if (!city) {
      errors.push("City is required");
    }
  }

  if (!isUpdate || body.locality !== undefined || body.location !== undefined) {
    if (!locality) {
      errors.push("Locality is required");
    }
  }

  if (body.area !== undefined && body.area !== "") {
    const area = parsePositiveNumber(body.area);
    if (area === undefined || area <= 0) {
      errors.push("Area must be a positive number");
    }
  }

  if (body.email && !isValidEmail(body.email)) {
    errors.push("Valid email is required");
  }

  if (body.phone && !isValidPhone(body.phone)) {
    errors.push("Valid phone number is required");
  }

  return errors;
}

function validateEnquiryBody(body) {
  const errors = [];

  if (!body.propertyId) errors.push("propertyId is required");
  if (!body.name || !String(body.name).trim()) errors.push("Name is required");
  if (!body.phone || !isValidPhone(body.phone)) {
    errors.push("Valid phone is required");
  }
  if (body.email && !isValidEmail(body.email)) {
    errors.push("Valid email is required");
  }
  if (
    body.type &&
    !["contact", "callback", "visit"].includes(String(body.type))
  ) {
    errors.push("Invalid enquiry type");
  }

  return errors;
}

function validateVisitBody(body) {
  const errors = [];

  if (!body.propertyId) errors.push("propertyId is required");
  if (!body.name || !String(body.name).trim()) errors.push("Name is required");
  if (!body.phone || !isValidPhone(body.phone)) {
    errors.push("Valid phone is required");
  }
  if (!body.date) errors.push("Visit date is required");
  if (!body.time) errors.push("Visit time is required");

  return errors;
}

function sendValidationErrors(res, errors) {
  return res.status(400).json({
    success: false,
    message: errors.join(", "),
  });
}

function normalizePropertyType(value) {
  const type = String(value || "").trim();
  const aliases = {
    "independent house": "House",
    resale: "Apartment",
    commercial: "Office",
    "pre-launch": "Apartment",
    prelaunch: "Apartment",
    "office space": "Office",
    retail: "Shop",
    "plot / other": "Plot",
  };
  const aliased = aliases[type.toLowerCase()] || type;
  return PROPERTY_TYPES.find(
    (item) => item.toLowerCase() === aliased.toLowerCase()
  );
}

module.exports = {
  validateRegisterBody,
  validateLoginBody,
  validatePropertyBody,
  validateEnquiryBody,
  validateVisitBody,
  sendValidationErrors,
  normalizePropertyType,
  normalizePurpose,
};
