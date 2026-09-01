const express = require("express");
const {
  queryProperties,
  searchProperties,
  getSuggestions,
  getProperty,
  createProperty,
  uploadImages,
  updateProperty,
  deleteProperty,
  getMyProperties,
} = require("../controllers/propertyController");
const { protect, optionalAuth } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/upload");

const router = express.Router();

router.get("/suggestions", getSuggestions);
router.get("/search", searchProperties);
router.get("/my", protect, getMyProperties);
router.get("/", queryProperties);
router.post("/upload", optionalAuth, upload.array("images", 12), uploadImages);
router.post("/", optionalAuth, createProperty);
router.get("/:id", getProperty);
router.put("/:id", protect, updateProperty);
router.delete("/:id", protect, deleteProperty);

module.exports = router;
