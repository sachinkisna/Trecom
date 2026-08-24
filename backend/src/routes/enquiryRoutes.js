const express = require("express");
const {
  createEnquiry,
  getMyPropertyEnquiries,
} = require("../controllers/enquiryController");
const { protect, optionalAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", optionalAuth, createEnquiry);
router.get("/my-properties", protect, getMyPropertyEnquiries);

module.exports = router;
