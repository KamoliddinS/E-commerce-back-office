import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("token") || "";
const openLogin = !token.length > 1;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const loginUser = createAsyncThunk("api/users", async (user) => {
  const response = await axios.post(`${BASE_URL}/api/users/login`, user);
  return response.data;
});

export const registerUser = createAsyncThunk("api/users", async (user) => {
  const response = await axios.post(`${BASE_URL}/api/users`, user);
  return response.data;
});

export const getProfile = createAsyncThunk("user/getProfile", async (token) => {
  // const response = await axios.get(`${BASE_URL}/api/client/profile`, token)
  // return response.data
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BASE_URL}/api/users/profile`, config);

  return response.data;
});

export const updateProfile = createAsyncThunk("api/users", (user, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = axios.put(`${BASE_URL}/api/store/profile`, user, config);
  console.log(response);
  return response;
});

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    photoUrl: "",
    data: {},
    preveliges: [],
  },
  reducers: {
    addToken: (state) => {
      localStorage.setItem("token", state.data?.token);
    },
    removeToken: () => {
      localStorage.removeItem("token");
    },
    logOut: (state) => {
      userSlice.caseReducers.removeToken(state);
      state.data = {};
    },
    addPhotoUrl: (state, action) => {
      state.photoUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
        userSlice.caseReducers.addToken(state);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = {};
      })
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.error.message === "Request failed with status code 401") {
          localStorage.removeItem("token");
        }
        state.data = {};
      });
  },
});

export const { openModal, closeModal, logOut, addPhotoUrl } = userSlice.actions;

export default userSlice.reducer;
