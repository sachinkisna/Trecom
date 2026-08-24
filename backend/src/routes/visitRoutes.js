const express = require("express");
const { createVisit } = require("../controllers/visitController");
const { optionalAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", optionalAuth, createVisit);

module.exports = router;
