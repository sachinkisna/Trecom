const express = require("express");
const {
  queryProperties,
  searchProperties,
  getSuggestions,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
} = require("../controllers/propertyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/suggestions", getSuggestions);
router.get("/search", searchProperties);
router.get("/my", protect, getMyProperties);
router.get("/", queryProperties);
router.post("/", protect, createProperty);
router.get("/:id", getProperty);
router.put("/:id", protect, updateProperty);
router.delete("/:id", protect, deleteProperty);

module.exports = router;
