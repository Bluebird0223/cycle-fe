import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";
import publicCommunication from "../service/publicCommunication";

const userToken = getCookie(process.env.REACT_APP_TOKENNAME) || null;
const userDetails = getCookie(process.env.REACT_APP_USERDETAILS) 
  ? JSON.parse(getCookie(process.env.REACT_APP_USERDETAILS))
  : null;

// Async thunk to fetch wishlist items
export const fetchUserDetails = createAsyncThunk(
  "user/me",
  async (_, { rejectWithValue }) => {
    try {
      const serverResponse = await publicCommunication?.getUserDetails();
      return serverResponse?.data?.user; // Assuming the API response contains an array of items
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: userDetails ?? null,
    isAuthenticated: !!userToken, // true if token exists
    loading: false,
    error: null,
  },
  reducers: {
    // Register Reducers
    registerRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    // Login Reducers
    loginRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // login Reducers
    profileUpdateSuccess: (state, action) => {
      state.user = action.payload;
    },
    resetPasswordSuccess: (state, action) => {
      state.user = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.user = action.payload; // Populate state with fetched items
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.error = action.payload; // Set error if fetching fails
        state.loading = false;
      });
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFail,
  loginRequest,
  loginSuccess,
  logoutSuccess,
  logoutFail,
  loginFail,
  profileUpdateSuccess,
  resetPasswordSuccess,
  clearErrors,
} = userSlice.actions;
export default userSlice.reducer;
