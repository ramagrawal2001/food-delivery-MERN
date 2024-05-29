import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMenusByRestaurantId = createAsyncThunk(
  "restaurantMenu/fetchMenusByRestaurantId",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3003/restaurant/${restaurantId}/menus`
      );
      return { restaurantId, menus: response.data.menus };
    } catch (error) {
      return rejectWithValue(error.response.data.menus);
    }
  }
);

export const deleteAllMenus = createAsyncThunk(
  "restaurantMenu/deleteAllMenus",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3003/restaurant/${restaurantId}/menus/all`
      );
      return restaurantId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addMenu = createAsyncThunk(
  "restaurantMenu/addMenu",
  async ({ restaurantId, menu }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:3003/restaurant/${restaurantId}/menus`,
        { menu }
      );
      return { restaurantId, menu: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editMenu = createAsyncThunk(
  "restaurantMenu/editMenu",
  async ({ restaurantId, id, updatedMenu }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3003/restaurant/${restaurantId}/menus`,
        {
          menuId: id,
          updatedMenu,
        }
      );
      return { restaurantId, menu: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteMenu = createAsyncThunk(
  "restaurantMenu/deleteMenu",
  async ({ restaurantId, id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3003/restaurant/${restaurantId}/menus`,
        {
          data: { menuId: id },
        }
      );
      return { restaurantId, id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  menus: {},
  status: {},
  error: null,
};

const restaurantMenuSlice = createSlice({
  name: "restaurantMenu",
  initialState,
  reducers: {
    deleteAllMenusByRestaurantId: (state, action) => {
      const restaurantId = action.payload;
      if (state.menus[restaurantId]) {
        delete state.menus[restaurantId];
      }
      if (state.status[restaurantId]) {
        delete state.status[restaurantId];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenusByRestaurantId.pending, (state, action) => {
        state.status[action.meta.arg] = "loading";
      })
      .addCase(fetchMenusByRestaurantId.fulfilled, (state, action) => {
        state.status[action.payload.restaurantId] = "succeeded";
        state.menus[action.payload.restaurantId] = action.payload.menus;
      })
      .addCase(fetchMenusByRestaurantId.rejected, (state, action) => {
        state.status[action.meta.arg] = "failed";
        state.error = action.payload.message;
      })
      .addCase(addMenu.fulfilled, (state, action) => {
        const { restaurantId, menu } = action.payload;
        state.menus[restaurantId] = menu.menus;
      })
      .addCase(editMenu.fulfilled, (state, action) => {
        const { restaurantId, menu } = action.payload;
        const menus = menu.menus;
        state.menus[restaurantId] = menus;
      })
      .addCase(deleteMenu.fulfilled, (state, action) => {
        const { restaurantId, id } = action.payload;
        const restaurantMenus = state.menus[restaurantId];
        if (restaurantMenus) {
          state.menus[restaurantId] = restaurantMenus.filter(
            (m) => m.id !== id
          );
        }
      })
      .addCase(deleteAllMenus.fulfilled, (state, action) => {
        const restaurantId = action.payload.restaurantId;
        delete state.menus[restaurantId];
        delete state.status[restaurantId];
      });
  },
});

export const { deleteAllMenusByRestaurantId } = restaurantMenuSlice.actions;

export default restaurantMenuSlice.reducer;
