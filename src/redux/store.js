import { configureStore } from "@reduxjs/toolkit";
import addProductSliceReducer from "./slices/addProductSlice";
import userSliceReducer from "./slices/userSlice";
import eimzoSliceReducer from "./slices/eimzoSlice"

export const store = configureStore({
  reducer: {
    addProduct: addProductSliceReducer,
    user: userSliceReducer,
    eimzo: eimzoSliceReducer,
  },
});
