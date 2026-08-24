const Property = require("../models/Property");
const Enquiry = require("../models/Enquiry");
const User = require("../models/User");
const {
  parsePagination,
  buildPaginationMeta,
} = require("../utils/propertyQuery");

async function getAllProperties(req, res, next) {
  try {
    const { page, limit, skip } = parsePagination(req.query);

    const [properties, total] = await Promise.all([
      Property.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("ownerId", "name email phone role"),
      Property.countDocuments(),
    ]);

    res.json({
      success: true,
      data: properties,
      pagination: buildPaginationMeta(total, page, limit),
    });
  } catch (error) {
    next(error);
  }
}

async function verifyProperty(req, res, next) {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    property.verified = Boolean(req.body.verified);
    await property.save();

    res.json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteProperty(req, res, next) {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.json({
      success: true,
      data: { message: "Property deleted by admin" },
    });
  } catch (error) {
    next(error);
  }
}

async function getAllEnquiries(req, res, next) {
  try {
    const { page, limit, skip } = parsePagination(req.query);

    const [enquiries, total] = await Promise.all([
      Enquiry.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("propertyId", "title city locality")
        .populate("userId", "name email phone"),
      Enquiry.countDocuments(),
    ]);

    res.json({
      success: true,
      data: enquiries,
      pagination: buildPaginationMeta(total, page, limit),
    });
  } catch (error) {
    next(error);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const { page, limit, skip } = parsePagination(req.query);

    const [users, total] = await Promise.all([
      User.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(),
    ]);

    res.json({
      success: true,
      data: users.map((user) => user.toPublicJSON()),
      pagination: buildPaginationMeta(total, page, limit),
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllProperties,
  verifyProperty,
  deleteProperty,
  getAllEnquiries,
  getAllUsers,
};
