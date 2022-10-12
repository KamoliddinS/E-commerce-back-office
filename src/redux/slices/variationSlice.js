import { createSlice } from "@reduxjs/toolkit";

const variationSlice = createSlice({
  name: "product",
  initialState: {
    all: []
  },
  reducers: {
    addVariations(state, action){
        state.all = action.payload
        }
  },
});

export default variationSlice.reducer;

// Actions
export const {
    addVariations
} = variationSlice.actions;
