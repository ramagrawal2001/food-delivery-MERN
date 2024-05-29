const express = require("express");
const {
  getCartItemsByUserId,
  addToCart,
  removeFromCart,
  checkoutCart,
} = require("../controllers/CartController");
const router = express.Router();

router.get("/:userId", getCartItemsByUserId);

router.post("/add", addToCart);

router.post("/remove", removeFromCart);

router.post("/checkout/:userId", checkoutCart);
module.exports = router;
