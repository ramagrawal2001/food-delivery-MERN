const CartItem = require("../models/CartModel");

module.exports.getCartItemsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const cartItems = await CartItem.findOne({ userId });

    res.json({ success: true, cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.addToCart = async (req, res, next) => {
  try {
    const {
      userId,
      restaurantId,
      id,
      quantity,
      name,
      price,
      category,
      description,
      image,
      ingredients,
      restaurantName,
    } = req.body;

    const existingCartItem = await CartItem.findOne({ userId });

    let finalMenu;

    if (existingCartItem) {
      const existingMenu = existingCartItem.menus.find(
        (menu) => menu.restaurantId === restaurantId && menu.id === id
      );

      if (existingMenu) {
        existingMenu.quantity += quantity;
        finalMenu = existingMenu;
      } else {
        existingCartItem.menus.push({
          restaurantId,
          id,
          quantity,
          name,
          price,
          category,
          description,
          image,
          ingredients,
          restaurantName,
        });
        finalMenu = {
          restaurantId,
          id,
          quantity,
          name,
          price,
          category,
          description,
          image,
          ingredients,
          restaurantName,
        };
      }
      await existingCartItem.save();
    } else {
      await CartItem.create({
        userId,
        menus: [
          {
            restaurantId,
            id,
            quantity,
            name,
            price,
            category,
            description,
            image,
            ingredients,
            restaurantName,
          },
        ],
      });
      finalMenu = {
        restaurantId,
        id,
        quantity,
        name,
        price,
        category,
        description,
        image,
        ingredients,
        restaurantName,
      };
    }

    res.status(201).json({
      success: true,
      message: "Menu item added to cart successfully",
      menu: finalMenu,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.removeFromCart = async (req, res, next) => {
  try {
    const { userId, restaurantId, id } = req.body;

    const existingCartItem = await CartItem.findOne({ userId });

    if (!existingCartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the user",
      });
    }

    existingCartItem.menus = existingCartItem.menus.filter(
      (menu) => !(menu.restaurantId === restaurantId && menu.id === id)
    );

    await existingCartItem.save();

    const updatedCartItems = existingCartItem.menus;

    res.json({
      success: true,
      message: "Menu item removed from cart successfully",
      restaurantId,
      id,
      cartItems: updatedCartItems,
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
module.exports.checkoutCart = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const cart = await CartItem.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the user",
      });
    }

    cart.menus = [];

    await cart.save();

    res.json({
      success: true,
      message: "Cart checked out successfully. All items removed.",
      cartItems: cart.menus,
    });
  } catch (error) {
    console.error("Error checking out cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};