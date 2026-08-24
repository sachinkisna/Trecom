const express = require("express");
const {
  getAllProperties,
  verifyProperty,
  deleteProperty,
  getAllEnquiries,
  getAllUsers,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.use(protect, adminOnly);

router.get("/properties", getAllProperties);
router.patch("/properties/:id/verify", verifyProperty);
router.delete("/properties/:id", deleteProperty);
router.get("/enquiries", getAllEnquiries);
router.get("/users", getAllUsers);

module.exports = router;
