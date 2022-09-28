import { createSlice } from "@reduxjs/toolkit";

const addProductSlice = createSlice({
  name: "addProduct",
  initialState: {
    activeStep: 0,
    baseProduct: {},
    variableProduct: {},
  },
  reducers: {
    onBackStep(state) {
      state.activeStep > 0 && (state.activeStep -= 1);
    },

    onNextStep(state) {
      state.activeStep < 3 && (state.activeStep += 1);
    },
    addBaseProduct(state, action) {
      state.baseProduct = action.payload;
    },
  },
});

export default addProductSlice.reducer;

// Actions
export const { onNextStep, onBackStep, addBaseProduct } =
  addProductSlice.actions;
