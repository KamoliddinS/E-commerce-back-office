import { configureStore } from "@reduxjs/toolkit";
import addProductSliceReducer from "./slices/addProductSlice";

export const store = configureStore({
  reducer: {
    addProduct: addProductSliceReducer,
  },
});
