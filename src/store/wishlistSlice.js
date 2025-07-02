import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import publicCommunication from "../service/publicCommunication";

const initialState = {
  wishlistItems: [],
  loading: true,
};

// Async thunk to fetch wishlist items
export const fetchWishlistItems = createAsyncThunk(
  "wishlist/fetchWishlistItems",
  async (_, { rejectWithValue }) => {
    try {
      const serverResponse = await publicCommunication?.getUserProductsData();
      if (!serverResponse?.data?.success) {
        return rejectWithValue(serverResponse?.data?.message || "Failed to fetch wishlist");
      }
      return serverResponse?.data?.wishlist || []; // Return empty array if wishlist is undefined
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const itemExist = state.wishlistItems.find((i) => i._id === item._id);
      if (itemExist) {
        state.wishlistItems = state.wishlistItems.map((i) =>
          i._id === itemExist._id ? item : i
        );
      } else {
        state.wishlistItems.push(item);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.wishlistItems = state.wishlistItems.filter(
        (i) => i?._id !== productId
      );
    },
    initializeWishlist: (state, action) => {
      state.wishlistItems = action.payload;
    },
    emptyWishlist: (state, action) => {
      state.wishlistItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistItems.fulfilled, (state, action) => {
        state.wishlistItems = action.payload; // Populate state with fetched items
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchWishlistItems.rejected, (state, action) => {
        state.error = action.payload; // Set error if fetching fails
        state.loading = false;
      });
  },
});

export const {
  addToWishlist,
  emptyWishlist,
  removeFromWishlist,
  initializeWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

// Async Thunks for API calls
export const addToWishlistApi = (product, userId) => async (dispatch) => {
  try {
    // Send the API request
    const serverResponse = await publicCommunication?.addToWishlist(
      product?._id,
      userId
    );
    if (serverResponse?.data?.success) {
      //  update the state
      dispatch(addToWishlist(product));
    }
  } catch (error) {
    // Revert the optimistic update on failure
    dispatch(removeFromWishlistApi(product?._id, userId));
  }
};

export const removeFromWishlistApi =
  (productId, userId) => async (dispatch) => {
    try {
      //  update the state
      dispatch(removeFromWishlist(productId));

      // Send the API request
      const serverResponse = await publicCommunication?.removeFromWishlist(
        productId,
        userId
      );
    } catch (error) {
      // Revert the optimistic update on failure
    }
  };
