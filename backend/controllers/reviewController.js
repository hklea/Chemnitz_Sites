const Review = require("../model/review");

// Add a review
const addReview = async (req, res) => {
  const { featureId, reviewText, rating } = req.body;
  const userId = req.userId;

  if (!featureId || !reviewText) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const newReview = await Review.create({ userId, featureId, reviewText, rating });
    res.status(201).json({ message: "Review added", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get reviews for a specific site (feature)
const getReviewsByFeature = async (req, res) => {
  try {
    const reviews = await Review.find({ featureId: req.params.featureId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
};

// Get recent reviews for homepage
const getRecentReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("userId", "username");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recent reviews", error: error.message });
  }
};

// Update a review (only by review owner)
const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { reviewText, rating } = req.body;
  const userId = req.userId;

  try {
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found." });

    if (review.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not allowed to edit this review." });
    }

    review.reviewText = reviewText || review.reviewText;
    if (rating !== undefined) review.rating = rating;

    await review.save();
    res.status(200).json({ message: "Review updated successfully.", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a review (only by review owner)
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.userId;

  try {
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found." });

    if (review.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not allowed to delete this review." });
    }

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addReview,
  getReviewsByFeature,
  getRecentReviews,
  updateReview,
  deleteReview,
};
