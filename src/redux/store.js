import { configureStore } from "@reduxjs/toolkit";
import productSliceReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    product: productSliceReducer,
  },
});
