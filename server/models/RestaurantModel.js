const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    url_menucat: {
      type: String,
    },
    type: {
      type: [String],
      required: true,
    },
    deliveryTime: {
      type: Number,
    },
    restorantOwnerEmail: {
      type: String,
    },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
