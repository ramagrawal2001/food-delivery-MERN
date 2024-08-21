import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URL}/reviews`;
export const fetchReviewsByRestaurantId = createAsyncThunk(
  "reviews/fetchReviewsByRestaurantId",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/restaurants/${restaurantId}/reviews`
      );
      return { restaurantId, reviews: response.data.reviews };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchReviewsByMenuId = createAsyncThunk(
  "reviews/fetchReviewsByMenuId",
  async ({ restaurantId, menuId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/restaurants/${restaurantId}/menus/${menuId}/reviews`
      );
      return { restaurantId, menuId, reviews: response.data.reviews };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addReviewToRestaurant = createAsyncThunk(
  "reviews/addReviewToRestaurant",
  async ({ restaurantId, review }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/restaurants/${restaurantId}/reviews`,
        review
      );
      return { restaurantId, review: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addReviewToMenu = createAsyncThunk(
  "reviews/addReviewToMenu",
  async ({ restaurantId, menuId, review }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/restaurants/${restaurantId}/menus/${menuId}/reviews`,
        review
      );
      return { restaurantId, menuId, review: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const replyToReview = createAsyncThunk(
  "reviews/replyToReview",
  async ({ reviewId, adminReply }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseUrl}/reviews/${reviewId}/reply`, {
        adminReply,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseUrl}/reviews/${reviewId}`);
      return reviewId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  restaurantReviews: {},
  menuReviews: {},
  status: {},
  menuStatus: {},
  error: null,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByRestaurantId.pending, (state, action) => {
        state.status[action.meta.arg] = "loading";
      })
      .addCase(fetchReviewsByRestaurantId.fulfilled, (state, action) => {
        state.status[action.payload.restaurantId] = "succeeded";
        state.restaurantReviews[action.payload.restaurantId] =
          action.payload.reviews;
      })
      .addCase(fetchReviewsByRestaurantId.rejected, (state, action) => {
        state.status[action.meta.arg] = "failed";
        state.error = action.payload.message;
      })
      .addCase(fetchReviewsByMenuId.pending, (state, action) => {
        const { restaurantId, menuId } = action.meta.arg;
        if (!state.menuStatus[restaurantId])
          state.menuStatus[restaurantId] = {};
        state.menuStatus[restaurantId][menuId] = "loading";
      })
      .addCase(fetchReviewsByMenuId.fulfilled, (state, action) => {
        const { restaurantId, menuId, reviews } = action.payload;
        if (!state.menuReviews[restaurantId])
          state.menuReviews[restaurantId] = {};
        state.menuReviews[restaurantId][menuId] = reviews;
        state.menuStatus[restaurantId][menuId] = "succeeded";
      })
      .addCase(fetchReviewsByMenuId.rejected, (state, action) => {
        const { restaurantId, menuId } = action.meta.arg;
        state.menuStatus[restaurantId][menuId] = "failed";
        state.error = action.payload.message;
      })
      .addCase(addReviewToRestaurant.fulfilled, (state, action) => {
        const { restaurantId, review } = action.payload;
        if (!state.restaurantReviews[restaurantId])
          state.restaurantReviews[restaurantId] = [];
        state.restaurantReviews[restaurantId].push(review.review);
      })
      .addCase(addReviewToMenu.fulfilled, (state, action) => {
        const { restaurantId, menuId, review } = action.payload;
        if (!state.menuReviews[restaurantId])
          state.menuReviews[restaurantId] = {};
        if (!state.menuReviews[restaurantId][menuId])
          state.menuReviews[restaurantId][menuId] = [];
        state.menuReviews[restaurantId][menuId].push(review.review);
      })
      .addCase(replyToReview.fulfilled, (state, action) => {
        const updatedReview = action.payload.review;
        const { restaurantId, menuId } = updatedReview;

        if (menuId) {
          const reviews = state.menuReviews[restaurantId][menuId];
          const index = reviews.findIndex(
            (review) => review._id === updatedReview._id
          );
          if (index !== -1) {
            reviews[index] = updatedReview;
          }
        } else {
          const reviews = state.restaurantReviews[restaurantId];
          const index = reviews.findIndex(
            (review) => review._id === updatedReview._id
          );
          if (index !== -1) {
            reviews[index] = updatedReview;
          }
        }
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        const reviewId = action.payload;
        for (const restaurantId in state.restaurantReviews) {
          state.restaurantReviews[restaurantId] = state.restaurantReviews[
            restaurantId
          ].filter((review) => review._id !== reviewId);
        }
        for (const restaurantId in state.menuReviews) {
          for (const menuId in state.menuReviews[restaurantId]) {
            state.menuReviews[restaurantId][menuId] = state.menuReviews[
              restaurantId
            ][menuId].filter((review) => review._id !== reviewId);
          }
        }
      });
  },
});

export const getRestaurantReviewsByRestaurantId = (state, restaurantId) => {
  return state.reviews.restaurantReviews[restaurantId] || [];
};

export const getMenuReviewsByMenuId = (state, restaurantId, menuId) => {
  return state.reviews.menuReviews[restaurantId]?.[menuId] || [];
};

export default reviewSlice.reducer;
