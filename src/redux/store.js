import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./slices/userSlice";
import eimzoSliceReducer from "./slices/eimzoSlice"
import productSliceReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    product: productSliceReducer,
    user: userSliceReducer,
    eimzo: eimzoSliceReducer,
  },
});
