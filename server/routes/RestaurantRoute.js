const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/RestaurantController");

router.get("/", restaurantController.getRestaurants);
router.get("/:restaurantId", restaurantController.getRestaurantById);
router.post("", restaurantController.addRestaurant);
router.put("/:restaurantId", restaurantController.updateRestaurant);
router.delete("/:restaurantId", restaurantController.deleteRestaurant);

module.exports = router;
