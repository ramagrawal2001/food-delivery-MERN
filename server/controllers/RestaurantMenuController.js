const RestaurantMenu = require("../models/RestaurantMenuModel");
const Restaurant = require("../models/RestaurantModel");
const fetch = require("node-fetch");

const isValidAbsoluteUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

exports.getMenusByRestaurantId = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    let restaurantMenu = await RestaurantMenu.findOne({ restaurantId });

    if (!restaurantMenu || restaurantMenu.menus.length === 0) {
      const restaurant = await Restaurant.findOne({ id: restaurantId });
      if (!restaurant) {
        return res
          .status(404)
          .json({ success: false, message: "Restaurant not found" });
      }

      const menuUrl = restaurant.url_menucat;
      let newMenus = [];

      if (isValidAbsoluteUrl(menuUrl)) {
        const response = await fetch(menuUrl);
        const fetchedMenus = await response.json();

        if (fetchedMenus && fetchedMenus.length > 0) {
          newMenus = fetchedMenus.map((menu) => ({
            ...menu,
            price: menu.price !== undefined ? menu.price : menu.id % 1000, 
          }));
        }
      }

      restaurantMenu = new RestaurantMenu({
        restaurantId,
        menus: newMenus,
      });

      await restaurantMenu.save();
    }

    res.json({ success: true, menus: restaurantMenu.menus });
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.addMenu = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const { menu } = req.body;
    const menuId = new Date().toISOString();

    const newMenu = {
      ...menu,
      id: menuId,
      restaurantId,
    };

    let restaurantMenu = await RestaurantMenu.findOne({ restaurantId });

    if (!restaurantMenu) {
      restaurantMenu = new RestaurantMenu({ restaurantId, menus: [newMenu] });
    } else {
      restaurantMenu.menus.push(newMenu);
    }

    await restaurantMenu.save();
    res.json({
      success: true,
      message: "Menu added successfully",
      menus: restaurantMenu.menus,
    });
  } catch (error) {
    console.error("Error adding menu:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.editMenu = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const { menuId, updatedMenu } = req.body;
    const restaurantMenu = await RestaurantMenu.findOne({ restaurantId });

    if (!restaurantMenu) {
      return res.status(404).json({
        success: false,
        message: "Menus not found for this restaurant",
      });
    }

    const menuIndex = restaurantMenu.menus.findIndex(
      (menu) => menu.id === menuId
    );
    if (menuIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Menu not found" });
    }

    restaurantMenu.menus[menuIndex] = updatedMenu;
    await restaurantMenu.save();
    res.json({
      success: true,
      message: "Menu updated successfully",
      menus: restaurantMenu.menus,
    });
  } catch (error) {
    console.error("Error updating menu:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteMenu = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const { menuId } = req.body;
    const restaurantMenu = await RestaurantMenu.findOne({ restaurantId });

    if (!restaurantMenu) {
      return res.status(404).json({
        success: false,
        message: "Menus not found for this restaurant",
      });
    }

    restaurantMenu.menus = restaurantMenu.menus.filter(
      (menu) => menu.id !== menuId
    );
    await restaurantMenu.save();
    res.json({
      success: true,
      message: "Menu deleted successfully",
      menus: restaurantMenu.menus,
    });
  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
exports.deleteAllMenusByRestaurantId = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const deletedMenu = await RestaurantMenu.findOneAndDelete({ restaurantId });

    if (!deletedMenu) {
      return res.status(404).json({
        success: false,
        message: "Menus not found for this restaurant",
      });
    }

    res.json({
      success: true,
      message: "All menus deleted successfully",
      restaurantId,
    });
  } catch (error) {
    console.error("Error deleting all menus:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
