const Review = require("../models/ReviewModel");
const Restaurant = require("../models/RestaurantModel");
const RestaurantMenu = require("../models/RestaurantMenuModel");

exports.getReviewsByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const reviews = await Review.find({ restaurantId, menuId: null });
    res.json({ success: true, reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getReviewsByMenuId = async (req, res) => {
  try {
    const { restaurantId, menuId } = req.params;
    const reviews = await Review.find({ restaurantId, menuId });
    res.json({ success: true, reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.addReviewToRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { user, rating, comment } = req.body;
    const newReview = new Review({
      user,
      rating,
      comment,
      restaurantId,
      menuId: null,
    });
    const savedReview = await newReview.save();
    res.status(201).json({ success: true, review: savedReview });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.addReviewToMenu = async (req, res) => {
  try {
    const { restaurantId, menuId } = req.params;
    const { user, rating, comment } = req.body;
    const newReview = new Review({
      user,
      rating,
      comment,
      restaurantId,
      menuId,
    });
    const savedReview = await newReview.save();
    res.status(201).json({ success: true, review: savedReview });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.replyToReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { adminReply } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { adminReply },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    res.json({ success: true, review: updatedReview });
  } catch (error) {
    console.error("Error replying to review:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    res.json({
      success: true,
      message: "Review deleted successfully",
      reviewId,
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
