const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const restaurantMenuSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: String,
      required: true,
    },
    menus: {
      type: [menuSchema],
      required: true,
    },
  },
  { timestamps: true }
);

restaurantMenuSchema.pre("save", function (next) {
  this.menus.forEach((menu) => {
    menu.price = menu.id % 1000;
  });
  next();
});

const RestaurantMenu = mongoose.model("RestaurantMenu", restaurantMenuSchema);

module.exports = RestaurantMenu;
