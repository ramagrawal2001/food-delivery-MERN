import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQueries = createAsyncThunk(
  "contactUs/fetchQueries",
  async () => {
    try {
      const response = await axios.get("http://localhost:3003/contactUs");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addQuery = createAsyncThunk(
  "contactUs/addQuery",
  async (newQuery) => {
    try {
      const response = await axios.post(
        "http://localhost:3003/contactUs",
        newQuery
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const contactUsSlice = createSlice({
  name: "contactUs",
  initialState: {
    queries: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQueries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQueries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.queries = action.payload.queries;
      })
      .addCase(fetchQueries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addQuery.fulfilled, (state, action) => {
        state.queries.push(action.payload.query);
      });
  },
});

export default contactUsSlice.reducer;
