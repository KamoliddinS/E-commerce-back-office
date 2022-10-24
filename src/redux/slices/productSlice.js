import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.REACT_APP_BASE_URL;
export const postBaseProduct = createAsyncThunk(
  "product/baseProduct",
  async (data) => {
    var config = {
      method: "post",
      url: `${BASE_URL}/api/products/user`,
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
      data: data.data,
    };
    const response = await axios(config);
    return response.data;
  }
);
export const getProductByShopId = createAsyncThunk(
  "product/shop",
  async (data) => {
    var config = {
      method: "get",
      url: `${BASE_URL}/api/products/shop/${data.shopId}`,
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    };
    const response = await axios(config);
    console.log(response.data);
    return response.data;
  }
);
export const deleteProductById = createAsyncThunk(
  "product/shop",
  async (data) => {
    var config = {
      method: "delete",
      url: `${BASE_URL}/api/products/${data.pId}`,
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    };
    const response = await axios(config);
    console.log(response);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    activeStep: 0,
    product: {
      _id: "",
      nameuz: "",
      nameru: "",
      infouz: "",
      inforu: "",
      descriptionuz: "",
      descriptionru: "",
      category: "",
      subcategory: "",
      images: [],
      techSpecs: [],
      brand: "",
      model: "",
      madeIn: "",
      warranty: "",
    },
    productsByShopId: [],
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
    // add techSpecs
    addTechSpecs(state, action) {
      state.product.techSpecs.push(action.payload);
    },
    // add subvalue
    addSubValue(state, action) {
      state.product.techSpecs[action.payload.index].value.push({
        subvalue: "",
      });
    },
    // remove techSpecs
    removeTechSpecs(state, action) {
      state.product.techSpecs = state.product.techSpecs.filter(
        (item, index) => index !== action.payload
      );
    },
    // remove subvalue
    removeSubValue(state, action) {
      state.product.techSpecs[action.payload.index].value =
        state.product.techSpecs[action.payload.index].value.filter(
          (item, index) => index !== action.payload.subIndex
        );
    },
    // add images
    addImages(state, action) {
      const images = [];
      action.payload.forEach((item, index) => {
        images.push(item.path);
      });
      state.product.images = images;
    },
    //remove image
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(postBaseProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postBaseProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = {
          ...state.product,
          ...action.payload,
        };
      })
      .addCase(postBaseProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProductByShopId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductByShopId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productsByShopId = action.payload;
      })
      .addCase(getProductByShopId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default productSlice.reducer;

// Actions
export const {
  onNextStep,
  onBackStep,
  addBaseProduct,
  removeTechSpecs,
  removeSubValue,
  addSubValue,
  addTechSpecs,
  addImages,
  removeImage,
} = productSlice.actions;
