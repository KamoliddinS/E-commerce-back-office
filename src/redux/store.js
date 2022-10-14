import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./slices/userSlice";
import eimzoSliceReducer from "./slices/eimzoSlice";
import productSliceReducer from "./slices/productSlice";
import productEditSliceReducer from "./slices/productEditSlice";
import shopSliceReducer from "./slices/shopSlice";
import variationSliceReducer from "./slices/variationSlice";

export const store = configureStore({
  reducer: {
    product: productSliceReducer,
    productEdit: productEditSliceReducer,
    user: userSliceReducer,
    eimzo: eimzoSliceReducer,
    shop: shopSliceReducer,
    variation: variationSliceReducer,
  },
});
