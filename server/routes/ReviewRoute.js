const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/ReviewController");

router.get("/restaurants/:restaurantId/reviews", reviewController.getReviewsByRestaurantId);

router.get("/restaurants/:restaurantId/menus/:menuId/reviews", reviewController.getReviewsByMenuId);

router.post("/restaurants/:restaurantId/reviews", reviewController.addReviewToRestaurant);

router.post("/restaurants/:restaurantId/menus/:menuId/reviews", reviewController.addReviewToMenu);

router.put("/reviews/:reviewId/reply", reviewController.replyToReview);

router.delete("/reviews/:reviewId", reviewController.deleteReview);

module.exports = router;
