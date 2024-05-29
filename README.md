# Food Delivery App

This is a food delivery app built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It allows users to browse restaurants, place orders, and provide feedback.

## Features

- User Registration and Authentication
- Restaurant Listings and Menus
- Order Placement and Checkout
- Feedback and Reviews
- Admin Dashboard

## Technologies Used

- MongoDB
- Express.js
- React.js
- Node.js
- Mongoose
- Material-UI
- Redux

## Setup

1. Clone the repository:

git clone [https://github.com/ramagrawal2001/delivery-app.git](https://github.com/ramagrawal2001/food-delivery-MERN)
cd delivery-app

2. Install dependencies:
**For the backend**
cd server
npm install

**For the frontend**
cd ../client
npm install

3. Set up environment variables:

Create a `.env` file in the `backend` directory and add the following variables:

MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>

4. Start the development server:
**For the backend**
cd server
npm start

**For the frontend**
cd ../client
npm start


5. Open your browser and navigate to `http://localhost:3002` to view the application.
