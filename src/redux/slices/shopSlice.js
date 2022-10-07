import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getShops = createAsyncThunk("api/users", async (user) => {
  const response = await axios.post(`${BASE_URL}/api/users/login`, user);
  return response.data;
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
    }
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
        state.data = action.payload;
        state.modal.open = false;
      })
      .addCase(getShops.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = {};
      });
  },
});

export const { openModal, closeModal, logOut } = shopSlice.actions;

export default shopSlice.reducer;
