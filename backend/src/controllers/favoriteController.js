const Favorite = require("../models/Favorite");
const Property = require("../models/Property");

function formatProperty(property) {
  const doc = property.toObject ? property.toObject() : property;
  return {
    ...doc,
    id: doc._id,
    ownerId: doc.ownerId?._id || doc.ownerId,
  };
}

async function addFavorite(req, res, next) {
  try {
    const property = await Property.findById(req.params.propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const existing = await Favorite.findOne({
      userId: req.user._id,
      propertyId: req.params.propertyId,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Property already in favorites",
      });
    }

    const favorite = await Favorite.create({
      userId: req.user._id,
      propertyId: req.params.propertyId,
    });

    res.status(201).json({
      success: true,
      data: favorite,
    });
  } catch (error) {
    next(error);
  }
}

async function removeFavorite(req, res, next) {
  try {
    const favorite = await Favorite.findOneAndDelete({
      userId: req.user._id,
      propertyId: req.params.propertyId,
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Favorite not found",
      });
    }

    res.json({
      success: true,
      data: { message: "Favorite removed" },
    });
  } catch (error) {
    next(error);
  }
}

async function getFavorites(req, res, next) {
  try {
    const favorites = await Favorite.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "propertyId",
        populate: { path: "ownerId", select: "name email phone role" },
      });

    const properties = favorites
      .map((item) => item.propertyId)
      .filter(Boolean)
      .map(formatProperty);

    res.json({
      success: true,
      data: properties,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { addFavorite, removeFavorite, getFavorites };
