import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getShops = createAsyncThunk("shop/getShops", async (token) => {
  // const response = await axios.get(`${BASE_URL}/api/client/profile`, token)
  // return response.data
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BASE_URL}/api/shops/getall`, config);

  return response.data;
});

export const createShop = createAsyncThunk("shop/createShop", async (data) => {
  var config = {
    method: "post",
    url: `${BASE_URL}/api/shops/create`,
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
    data: data.data,
  };

  axios(config)
    .then(function (response) {
     return;
    })
    .catch(function (error) {
      return;
    });
});

const shopSlice = createSlice({
  name: "userSlice",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    shops: [],
    currentShop: {},
  },
  reducers: {
    setCurrentShop: (state, action) => {
      state.currentShop = action.payload;
    },
    addShop: (state, action) => {
      state.shops.push = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getShops.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShops.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shops = action.payload;
      })
      .addCase(getShops.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createShop.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.shops.push(action.payload);
      })
      .addCase(createShop.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { setCurrentShop } = shopSlice.actions;

export default shopSlice.reducer;
