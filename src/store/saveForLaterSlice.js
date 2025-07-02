import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCartApi, removeCartItemApi } from "./cartSlice";
import publicCommunication from "../service/publicCommunication";

const initialState = {
  saveForLaterItems: [],
};

// Async thunk to fetch wishlist items
export const fetchSaveForLater = createAsyncThunk(
  "cart/saveForLater",
  async (_, { rejectWithValue }) => {
    try {
      const serverResponse = await publicCommunication?.getUserProductsData();
      return serverResponse?.data?.savedForLater; // Assuming the API response contains an array of items
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const saveForLaterSlice = createSlice({
  name: "saveForLater",
  initialState,
  reducers: {
    addSaveForLater: (state, action) => {
      const item = action.payload;
      const isItemExist = state.saveForLaterItems.find(
        (i) => i._id === item._id
      );

      if (isItemExist) {
        state.saveForLaterItems = state.saveForLaterItems.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.saveForLaterItems.push(item);
      }
    },
    removeFromSaveForLater: (state, action) => {
      const productId = action.payload;
      state.saveForLaterItems = state.saveForLaterItems.filter(
        (i) => i._id !== productId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSaveForLater.fulfilled, (state, action) => {
        state.saveForLaterItems = action.payload; // Populate state with fetched items
        state.error = null;
      })
      .addCase(fetchSaveForLater.rejected, (state, action) => {
        state.error = action.payload; // Set error if fetching fails
      });
  },
});

export const { addSaveForLater, removeFromSaveForLater } =
  saveForLaterSlice.actions;

export default saveForLaterSlice.reducer;

// Async Thunks for API calls
export const addSaveForLaterApi = (product, quantity) => async (dispatch) => {
  try {
    //  update the state
    dispatch(removeCartItemApi(product?._id));
    dispatch(addSaveForLater(product));

    // Send the API request
    const serverResponse = await publicCommunication?.saveForLater(
      product?._id,
      quantity
    );
  } catch (error) {
    // Revert the optimistic update on failure
  }
};
export const removeFromSaveForLaterApi = (id) => async (dispatch) => {
  try {
    //  update the state
    dispatch(removeFromSaveForLater(id));

    // Send the API request
    const serverResponse = await publicCommunication?.removeFromSaveForLater(
      id
    );
  } catch (error) {
    // Revert the optimistic update on failure
  }
};
