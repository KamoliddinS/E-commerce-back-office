import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const postVariations = createAsyncThunk(
  "product/variations",
  async (data) => {
    var config = {
      method: "post",
      url: `${BASE_URL}/api/products/${data.id}/user/variation`,
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      data: data.data,
    };
    const response = await axios(config);
    return response.data;
  }
);
const variationSlice = createSlice({
  name: "variation",
  initialState: {
    all: [],
    completed: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
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
          state.all[index].discount = isNaN(parseInt(value))
            ? 0
            : parseInt(value);

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

        state.all[index].commission = Math.round(
          state.all[index].priceSale * 0.1
        );
        state.all[index].revenue =
          state.all[index].priceSale - state.all[index].commission;
      }
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(postVariations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postVariations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.completed.push(action.payload);
      })
      .addCase(postVariations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default variationSlice.reducer;

// Actions
export const { addVariations, changeVariation } = variationSlice.actions;
