import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newOrder: {
    order: null,
    loading: false,
    error: null,
  },
  myOrders: {
    orders: [],
    loading: false,
    error: null,
  },
  orderDetails: {
    order: null,
    loading: false,
    error: null,
  },
  paymentStatus: {
    txn: null,
    loading: false,
    error: null,
  },
  allOrders: {
    orders: [],
    loading: false,
    error: null,
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // New Order Reducer
    newOrderRequest(state) {
      state.newOrder.loading = true;
    },
    newOrderSuccess(state, action) {
      state.newOrder.loading = false;
      state.newOrder.order = action.payload;
    },
    newOrderFail(state, action) {
      state.newOrder.loading = false;
      state.newOrder.error = action.payload;
    },

    // My Orders Reducer
    myOrdersRequest(state) {
      state.myOrders.loading = true;
    },
    myOrdersSuccess(state, action) {
      state.myOrders.loading = false;
      state.myOrders.orders = action.payload;
    },
    myOrdersFail(state, action) {
      state.myOrders.loading = false;
      state.myOrders.error = action.payload;
    },

    // Order Details Reducer
    orderDetailsRequest(state) {
      state.orderDetails.loading = true;
    },
    orderDetailsSuccess(state, action) {
      state.orderDetails.loading = false;
      state.orderDetails.order = action.payload;
    },
    orderDetailsFail(state, action) {
      state.orderDetails.loading = false;
      state.orderDetails.error = action.payload;
    },

    // Payment Status Reducer
    paymentStatusRequest(state) {
      state.paymentStatus.loading = true;
    },
    paymentStatusSuccess(state, action) {
      state.paymentStatus.loading = false;
      state.paymentStatus.txn = action.payload;
    },
    paymentStatusFail(state, action) {
      state.paymentStatus.loading = false;
      state.paymentStatus.error = action.payload;
    },

    // All Orders Reducer
    allOrdersRequest(state) {
      state.allOrders.loading = true;
    },
    allOrdersSuccess(state, action) {
      state.allOrders.loading = false;
      state.allOrders.orders = action.payload;
    },
    allOrdersFail(state, action) {
      state.allOrders.loading = false;
      state.allOrders.error = action.payload;
    },
    // Clear Errors
    clearErrors(state) {
      state.newOrder.error = null;
      state.myOrders.error = null;
      state.paymentStatus.error = null;
      state.orderDetails.error = null;
      state.allOrders.error = null;
    },
  },
});

export const {
  newOrderRequest,
  newOrderSuccess,
  newOrderFail,
  myOrdersRequest,
  myOrdersSuccess,
  myOrdersFail,
  paymentStatusRequest,
  paymentStatusSuccess,
  paymentStatusFail,
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
  allOrdersRequest,
  allOrdersSuccess,
  allOrdersFail,
  clearErrors,
} = orderSlice.actions;

export default orderSlice.reducer;
