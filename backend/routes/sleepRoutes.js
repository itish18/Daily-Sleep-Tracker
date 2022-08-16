const express = require("express");
const router = express.Router();
const {
  createSleepEntry,
  getSleepEntries,
  deleteSleepEntry,
} = require("../controllers/sleepController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createSleepEntry);
router.get("/", protect, getSleepEntries);
router.delete("/:id", protect, deleteSleepEntry);

module.exports = router;
