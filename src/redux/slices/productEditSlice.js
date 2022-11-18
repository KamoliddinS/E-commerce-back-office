import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import axios from "axios";

// /api/products/

const token = localStorage.getItem("token") || "";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getProductById = createAsyncThunk("api/products", async (data) => {
  var config = {
    method: "get",
    url: `${BASE_URL}/api/products/${data.id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(config);
  return response.data;
});

export const updateBaseProduct = createAsyncThunk(
  "api/updateBaseProduct",
  async (data) => {
    var config = {
      method: "put",
      url: `${BASE_URL}/api/products/${data.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data.data,
    };
    const response = await axios(config);
    return response.data;
  }
);
export const updateVariation = createAsyncThunk(
  "api/updateVariation",
  async (data) => {
    var config = {
      method: "put",
      url: `${BASE_URL}/api/products/${data.id}/variations/${data.varId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data.data,
    };
    const response = await axios(config);
    return response.data;
  }
);

const productEditSlice = createSlice({
  name: "productEdit",
  initialState: {
    editMode: false,
    activeStep: 0,
    product: {},
    imagesSuccess: false,
  },
  reducers: {
    onBackStep(state) {
      state.activeStep > 0 && (state.activeStep -= 1);
    },

    onNextStep(state) {
      state.activeStep < 3 && (state.activeStep += 1);
    },
    addBaseProduct(state, action) {
      state.product = action.payload;
    },
    //delete variation
    deleteVariation(state, action) {
      state.product.variations = state.product.variations.filter(
        (item) => item._id !== action.payload
      );
    },
    addImage(state, action) {
      action.payload.forEach((item, index) => {
        state.product.images.push(item.path);
      });
      state.imagesSuccess = true;
    },
    addVariationmages(state, action) {
      action.payload.data.forEach((item, index) => {
        state.product.variations[action.payload.index].images.push(item.path);
      });
    },
    removeImage(state, action) {
      if (action.payload.id) {
        state.product.variations[action.payload.id].images =
          state.product.variations[action.payload.id].images.filter(
            (item) => item !== action.payload.file
          );
      } else {
        state.product.images = state.product.images.filter(
          (item) => item !== action.payload.file
        );
      }
    },

    changeSuccess(state, action) {
      state.imagesSuccess = true;
    },

    deleteVariationImage(state, action) {
      state.product.variations.forEach((item) => {
        if (item._id === action.payload.varId) {
          item.images = item.images.filter(
            (item) => item !== action.payload.image
          );
        }
      });
    },
    changeVariation(state, action) {
      const { index, prop, value } = action.payload;

      // state.product.variations[index][prop] = value;
      switch (prop) {
        case "price":
          state.product.variations[index].price = isNaN(parseInt(value))
            ? 0
            : parseInt(value);
          break;
        case "discount":
          state.product.variations[index].discount = isNaN(parseInt(value))
            ? 0
            : parseInt(value);

          break;
        default:
          state.product.variations[index][prop] = value;
          return;
      }

      if (
        state.product.variations[index].price !== "" &&
        state.product.variations[index].discount !== ""
      ) {
        if (
          state.product.variations[index].discount >
          state.product.variations[index].price
        ) {
          state.product.variations[index].discount =
            state.product.variations[index].price;
        }
        state.product.variations[index].priceSale =
          state.product.variations[index].price -
          state.product.variations[index].discount;

        state.product.variations[index].commission = Math.round(
          state.product.variations[index].priceSale * 0.1
        );
        state.product.variations[index].revenue =
          state.product.variations[index].priceSale -
          state.product.variations[index].commission;
      }
    },
    resetSlice(state) {
      state.activeStep = 0;
      state.imagesSuccess = false;
      state.editMode = false;
    },

    //remove image
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
        state.editMode = true;
        state.isVariationSuccess = false;
        state.isBaseSuccess = false;
        state.activeStep = 0;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = {
          ...state.product,
          ...action.payload,
        };
        state.activeStep = 0;
        state.imagesSuccess = false;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateBaseProduct.pending, (state) => {
        state.isBaseLoading = true;
      })
      .addCase(updateBaseProduct.fulfilled, (state, action) => {
        state.isBaseLoading = false;
        state.isBaseSuccess = true;
      })
      .addCase(updateBaseProduct.rejected, (state, action) => {
        state.isBaseLoading = false;
        state.isBaseError = true;
        state.updateMessage = action.payload;
      })
      .addCase(updateVariation.pending, (state) => {
        state.isVariationLoading = true;
      })
      .addCase(updateVariation.fulfilled, (state, action) => {
        state.isVariationLoading = false;
        state.isVariationSuccess = true;
        state.editMode = false;
      })
      .addCase(updateVariation.rejected, (state, action) => {
        state.isVariationLoading = false;
        state.isVariationError = true;
        state.updateMessage = action.payload;
      });
  },
});

export default productEditSlice.reducer;

// Actions
export const {
  onBackStep,
  onNextStep,
  addBaseProduct,
  deleteVariation,
  changeVariation,
  addImage,
  removeImage,
  deleteVariationImage,
  changeSuccess,
  addVariationmages,
  resetSlice,
} = productEditSlice.actions;
