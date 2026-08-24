const Enquiry = require("../models/Enquiry");
const Property = require("../models/Property");
const { validateEnquiryBody, sendValidationErrors } = require("../utils/validators");

async function createEnquiry(req, res, next) {
  try {
    const errors = validateEnquiryBody(req.body);
    if (errors.length) return sendValidationErrors(res, errors);

    const property = await Property.findById(req.body.propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const enquiry = await Enquiry.create({
      propertyId: req.body.propertyId,
      userId: req.user?._id || null,
      name: req.body.name.trim(),
      phone: req.body.phone.trim(),
      email: req.body.email?.trim().toLowerCase() || "",
      message: req.body.message?.trim() || "",
      type: req.body.type || "contact",
    });

    res.status(201).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    next(error);
  }
}

async function getMyPropertyEnquiries(req, res, next) {
  try {
    const properties = await Property.find({ ownerId: req.user._id }).select("_id");
    const propertyIds = properties.map((item) => item._id);

    const enquiries = await Enquiry.find({ propertyId: { $in: propertyIds } })
      .sort({ createdAt: -1 })
      .populate("propertyId", "title city locality price purpose")
      .populate("userId", "name email phone");

    res.json({
      success: true,
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createEnquiry, getMyPropertyEnquiries };
