import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const apiUrl = process.env.REACT_APP_API_URL;

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/cart/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({
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
    restaurantName
  }) => {
    try {
      const response = await axios.post(`${apiUrl}/cart/add`, {
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
        restaurantName
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, restaurantId, id }) => {
    try {
      const response = await axios.post(`${apiUrl}/cart/remove`, {
        userId,
        restaurantId,
        id,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const checkoutCart = createAsyncThunk(
  "cart/checkoutCart",
  async (userId) => {
    try {
      const response = await axios.post(`${apiUrl}/cart/checkout/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    menus: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetCart: (state) => {
      state.menus = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.menus = action.payload.cartItems
          ? action.payload.cartItems.menus
          : [];
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const {
          restaurantId,
          id,
          quantity,
          name,
          price,
          category,
          description,
          image,
          ingredients,
          restaurantName
        } = action.payload.menu;

        const existingMenuIndex = state.menus
          ? state.menus.findIndex(
              (menu) => menu.restaurantId === restaurantId && menu.id === id
            )
          : -1;

        if (existingMenuIndex !== -1) {
          state.menus[existingMenuIndex].quantity += quantity;
        } else {
          state.menus.push({
            restaurantId,
            id,
            quantity,
            name,
            price,
            category,
            description,
            image,
            ingredients,
            restaurantName
          });
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.menus = action.payload.cartItems || [];
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.menus = [];
      });
  },
});

export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;
