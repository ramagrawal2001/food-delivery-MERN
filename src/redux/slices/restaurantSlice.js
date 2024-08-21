import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URL}/restaurants`;

export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async () => {
    try {
      const response = await axios.get(baseUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addRestaurant = createAsyncThunk(
  "restaurants/addRestaurant",
  async (newRestaurant) => {
    try {
      const response = await axios.post(baseUrl, newRestaurant);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateRestaurant = createAsyncThunk(
  "restaurants/updateRestaurant",
  async ({ id, updatedRestaurant }) => {
    try {
      const response = await axios.put(`${baseUrl}/${id}`, updatedRestaurant);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteRestaurant = createAsyncThunk(
  "restaurants/deleteRestaurant",
  async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getRestaurantById = (state, restaurantId) => {
  return state.restaurants.restaurants.find(
    (restaurant) => restaurant.id === restaurantId
  );
};

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: {
    restaurants: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetRestaurants: (state) => {
      state.restaurants = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.restaurants = action.payload.restaurants;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addRestaurant.fulfilled, (state, action) => {
        state.restaurants.push(action.payload.restaurant);
      })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        const index = state.restaurants.findIndex(
          (restaurant) => restaurant._id === action.payload._id
        );
        if (index !== -1) {
          state.restaurants[index] = action.payload;
        }
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.restaurants = state.restaurants.filter(
          (restaurant) => restaurant._id !== action.payload.restaurantId
        );
      });
  },
});

export const getRestaurantsByOwnerEmail = (state, ownerEmail) => {
  const restaurants = state.restaurants.restaurants;
  return restaurants.filter(
    (restaurant) => restaurant.restorantOwnerEmail === ownerEmail
  );
};

export const { resetRestaurants } = restaurantsSlice.actions;

export default restaurantsSlice.reducer;
