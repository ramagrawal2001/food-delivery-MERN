const Restaurant = require("../models/RestaurantModel");
const axios = require("axios");

module.exports.getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    if (restaurants.length === 0) {
      const externalLink =
        "https://gist.githubusercontent.com/ramagrawal2001/6ac4e637807e65950071f0b62a4f2eed/raw/022c99f1fb951a3c1e974911b3333ffd223f40f0/Restaurants.json";
      const { data: externalRestaurants } = await axios.get(externalLink);

      const restaurantsWithDeliveryTime = externalRestaurants.map(
        (restaurant) => ({
          ...restaurant,
          deliveryTime: generateRandomDeliveryTime(),
        })
      );

      const savedRestaurants = await Restaurant.insertMany(
        restaurantsWithDeliveryTime
      );

      return res.json({ success: true, restaurants: savedRestaurants });
    }

    return res.json({ success: true, restaurants });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

function generateRandomDeliveryTime() {
  return Math.floor(Math.random() * (60 - 20 + 1)) + 20;
}

module.exports.getRestaurantById = async (req, res, next) => {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    res.json({ success: true, restaurant });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.addRestaurant = async (req, res, next) => {
  try {
    const newRestaurantData = {
      ...req.body,
      deliveryTime: generateRandomDeliveryTime(),
    };
    const newRestaurant = new Restaurant(newRestaurantData);
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json({ success: true, restaurant: savedRestaurant });
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.updateRestaurant = async (req, res, next) => {
  try {
    const restaurantId = req.params.restaurantId;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedRestaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    res.json({ success: true, restaurant: updatedRestaurant });
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.deleteRestaurant = async (req, res, next) => {
  try {
    const restaurantId = req.params.restaurantId;
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!deletedRestaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    res.json({
      success: true,
      message: "Restaurant deleted successfully",
      restaurantId,
    });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
