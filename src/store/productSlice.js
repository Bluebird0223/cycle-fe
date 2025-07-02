import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: {},
  reviews: [],
  loading: false,
  error: null,
  success: false,
  isUpdated: false,
  isDeleted: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Product List Actions
    allProductsRequest: (state) => {
      state.loading = true;
      state.products = [];
    },
    allProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    allProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Product Details Actions
    productDetailsRequest: (state) => {
      state.loading = true;
    },
    productDetailsSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    productDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeProductDetails: (state) => {
      state.product = {};
    },

    // Reviews Actions
    allReviewsRequest: (state) => {
      state.loading = true;
    },
    allReviewsSuccess: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    },
    allReviewsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteReviewRequest: (state) => {
      state.loading = true;
    },
    deleteReviewSuccess: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    deleteReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteReviewReset: (state) => {
      state.isDeleted = false;
    },

    // New Review/Rating Actions
    newReviewRequest: (state) => {
      state.loading = true;
    },
    newReviewSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    newReviewFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newReviewReset: (state) => {
      state.success = false;
    },

    // Clear Errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  allProductsRequest,
  allProductsSuccess,
  allProductsFail,
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFail,
  removeProductDetails,
  allReviewsRequest,
  allReviewsSuccess,
  allReviewsFail,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFail,
  deleteReviewReset,
  newReviewRequest,
  newReviewSuccess,
  newReviewFail,
  newReviewReset,
  clearErrors,
} = productSlice.actions;

export default productSlice.reducer;
