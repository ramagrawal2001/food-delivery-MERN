const express = require("express");
const router = express.Router();
const {
  getMenusByRestaurantId,
  addMenu,
  editMenu,
  deleteMenu,
  deleteAllMenusByRestaurantId,
} = require("../controllers/RestaurantMenuController");

router.get("/:restaurantId/menus", getMenusByRestaurantId);
router.post("/:restaurantId/menus", addMenu);
router.put("/:restaurantId/menus", editMenu);
router.delete("/:restaurantId/menus", deleteMenu);
router.delete("/:restaurantId/menus/all", deleteAllMenusByRestaurantId);

module.exports = router;
