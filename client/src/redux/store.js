import {
  configureStore,
  combineReducers,
  createReducer,
} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import restaurantsReducer from "./slices/restaurantSlice";
import restaurantMenuReducer from "./slices/restaurantMenuSlice";
import cartReducer from "./slices/cartSlice";
import reviewReducer from "./slices/reviewSlice";
import contactUsReducer from "./slices/contactUsSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  restaurants: restaurantsReducer,
  restaurantMenu: restaurantMenuReducer,
  cart: cartReducer,
  review: reviewReducer,
  contactUs: contactUsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
