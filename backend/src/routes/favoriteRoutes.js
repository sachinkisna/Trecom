const express = require("express");
const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require("../controllers/favoriteController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getFavorites);
router.post("/:propertyId", addFavorite);
router.delete("/:propertyId", removeFavorite);

module.exports = router;
