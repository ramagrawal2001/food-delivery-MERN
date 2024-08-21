const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/AuthRoute");
const userRoute = require("./routes/UserRoute");
const restaurantRoute = require("./routes/RestaurantRoute");
const restaurantMenuRoute = require("./routes/RestaurantMenuRoute");
const cartRoute = require("./routes/CartRoute");
const reviewRoute = require("./routes/ReviewRoute");
const contactUsRoute = require("./routes/ContactUsRoute");

require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

var app = express();
app.use(
  cors({
    origin: ["http://localhost:3002","https://zingy-horse-991d95.netlify.app/","https://food-delivery-client-37r9.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/restaurants", restaurantRoute);
app.use("/cart", cartRoute);
app.use("/restaurant", restaurantMenuRoute);
app.use("/reviews", reviewRoute);
app.use("/contactUs", contactUsRoute);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
