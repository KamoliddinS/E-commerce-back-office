import { createSlice } from "@reduxjs/toolkit";

const variationSlice = createSlice({
  name: "product",
  initialState: {
    all: [],
    completed: [],
  },
  reducers: {
    addVariations(state, action) {
      state.all = action.payload;
    },
    changeVariation(state, action) {
      const { index, prop, value } = action.payload;

      // state.all[index][prop] = value;
      switch (prop) {
        case "price":
          state.all[index].price = isNaN(parseInt(value)) ? 0 : parseInt(value);
          break;
        case "discount":
          state.all[index].discount = isNaN(parseInt(value)) ? 0 : parseInt(value);

          break;
        default:
          state.all[index][prop] = value;
          return;
      }

      if (state.all[index].price !== "" && state.all[index].discount !== "") {
        if (state.all[index].discount > state.all[index].price) {
          state.all[index].discount = state.all[index].price;
        }
        state.all[index].priceSale =
          state.all[index].price - state.all[index].discount;
        
        state.all[index].commission = Math.round(state.all[index].priceSale * 0.1);
        state.all[index].revenue = state.all[index].priceSale - state.all[index].commission;
      }
    },
  },
});

export default variationSlice.reducer;

// Actions
export const { addVariations, changeVariation } = variationSlice.actions;
