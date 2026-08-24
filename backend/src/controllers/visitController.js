const Visit = require("../models/Visit");
const Property = require("../models/Property");
const {
  validateVisitBody,
  sendValidationErrors,
} = require("../utils/validators");

async function createVisit(req, res, next) {
  try {
    const errors = validateVisitBody(req.body);
    if (errors.length) return sendValidationErrors(res, errors);

    const property = await Property.findById(req.body.propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const visit = await Visit.create({
      propertyId: req.body.propertyId,
      userId: req.user?._id || null,
      name: req.body.name.trim(),
      phone: req.body.phone.trim(),
      date: req.body.date.trim(),
      time: req.body.time.trim(),
      message: req.body.message?.trim() || "",
      status: "pending",
    });

    res.status(201).json({
      success: true,
      data: visit,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createVisit };
