import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = localStorage.getItem('token') || '';
const openLogin = !token.length > 1;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const loginUser = createAsyncThunk('api/users', async (user) => {
  const response = await axios.post(`${BASE_URL}/api/client/login`, user);
  return response.data;
});

export const registerUser = createAsyncThunk('api/users', async (user) => {
  const response = await axios.post(`${BASE_URL}/api/client`, user);
  return response.data;
});

export const getProfile = createAsyncThunk('user/getProfile', async (token) => {
  // const response = await axios.get(`${BASE_URL}/api/client/profile`, token)
  // return response.data
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BASE_URL}/api/client/profile`, config);

  return response.data;
});



const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    preveliges: [],
    modal: {
      open: openLogin,
    },
  },
  reducers: {
    openModal: (state) => {
      state.modal.open = true;
    },
    closeModal: (state) => {
      state.modal.open = false;
    },
    addToken: (state) => {
      localStorage.setItem('token', state.data?.token);
    },
    removeToken: () => {
      localStorage.removeItem('token');
    },
    logOut: (state) => {
      userSlice.caseReducers.removeToken(state);
      state.data = {};
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
        state.modal.open = false;
        userSlice.caseReducers.addToken(state);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = {};
      })
  },
});

export const { openModal, closeModal, logOut } = userSlice.actions;

export default userSlice.reducer;
