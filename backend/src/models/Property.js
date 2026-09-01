const mongoose = require("mongoose");
const { PURPOSE_VALUES, PROPERTY_TYPES } = require("../utils/propertyQuery");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 5000,
      default: "",
    },
    purpose: {
      type: String,
      enum: PURPOSE_VALUES,
      required: [true, "Purpose is required"],
      index: true,
    },
    propertyType: {
      type: String,
      enum: PROPERTY_TYPES,
      required: [true, "Property type is required"],
      index: true,
    },
    bhk: {
      type: String,
      trim: true,
      default: "",
      index: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be positive"],
      index: true,
    },
    area: {
      type: Number,
      min: [0, "Area cannot be negative"],
      default: 0,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      index: true,
    },
    locality: {
      type: String,
      required: [true, "Locality is required"],
      trim: true,
      index: true,
    },
    pincode: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    furnishing: {
      type: String,
      trim: true,
      default: "",
    },
    possession: {
      type: String,
      trim: true,
      default: "",
    },
    bedrooms: {
      type: Number,
      min: 0,
      default: 0,
    },
    bathrooms: {
      type: Number,
      min: 0,
      default: 0,
    },
    parking: {
      type: String,
      trim: true,
      default: "",
    },
    facing: {
      type: String,
      trim: true,
      default: "",
    },
    floor: {
      type: String,
      trim: true,
      default: "",
    },
    totalFloors: {
      type: String,
      trim: true,
      default: "",
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    projectName: {
      type: String,
      trim: true,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
      index: true,
    },
    postedBy: {
      type: String,
      enum: ["Owner", "Agent", "Builder"],
      default: "Owner",
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

propertySchema.index({
  title: "text",
  description: "text",
  city: "text",
  locality: "text",
  address: "text",
  projectName: "text",
  propertyType: "text",
});

propertySchema.index({ createdAt: -1 });

module.exports = mongoose.model("Property", propertySchema);
