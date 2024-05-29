import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProtectedAdminRoute from "./utils/ProtectedAdminRoute";
import Restaurants from "./pages/Restaurants";
import Restaurant from "./pages/Restaurant";
import MenuItem from "./pages/MenuItem";
import Cart from "./pages/Cart";
import EditProfile from "./pages/EditProfile";
import AdminDashboard from "./pages/AdminDashboard";
import AddEditRestaurant from "./pages/AddEditRestaurant";
import ProtectedRestorantOwnerRoute from "./utils/ProtectedRestorantOwnerRoute";
import RestaurantAdminDashboard from "./pages/RestaurantAdminDashboard";
import AddEditMenu from "./pages/AddEditMenu";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Restaurants />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="/menuitem/:id" element={<MenuItem />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/add-restaurant"
          element={
            <ProtectedAdminRoute>
              <AddEditRestaurant />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/edit-restaurant/:id"
          element={
            <ProtectedAdminRoute>
              <AddEditRestaurant />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/restaurant-admin"
          element={
            <ProtectedRestorantOwnerRoute>
              <RestaurantAdminDashboard />
            </ProtectedRestorantOwnerRoute>
          }
        />
        <Route
          path="/restaurant-admin/add-menu"
          element={
            <ProtectedRestorantOwnerRoute>
              <AddEditMenu />
            </ProtectedRestorantOwnerRoute>
          }
        />
        <Route
          path="/restaurant-admin/edit-menu/:id"
          element={
            <ProtectedRestorantOwnerRoute>
              <AddEditMenu />
            </ProtectedRestorantOwnerRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
