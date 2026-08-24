const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },
    developer: {
      type: String,
      trim: true,
      default: "",
    },
    city: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    locality: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    startingPrice: {
      type: Number,
      min: 0,
      default: 0,
    },
    configurations: {
      type: [String],
      default: [],
    },
    possession: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    amenities: {
      type: [String],
      default: [],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model("Project", projectSchema);
