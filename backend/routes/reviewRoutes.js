const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const reviewController = require("../controllers/reviewController");

router.post("/addReview", auth, reviewController.addReview);
router.get("/site/:featureId", reviewController.getReviewsByFeature);
router.get("/recent", reviewController.getRecentReviews);
router.put("/:reviewId", auth, reviewController.updateReview);
router.delete("/:reviewId", auth, reviewController.deleteReview);

module.exports = router;
