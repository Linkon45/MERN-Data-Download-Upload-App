const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getGoals)
  .post(protect, upload.single("image"), setGoal);
router.route("/:id").delete(protect, deleteGoal).put(protect, updateGoal);

module.exports = router;
