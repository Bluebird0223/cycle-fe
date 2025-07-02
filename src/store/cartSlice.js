import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import publicCommunication from "../service/publicCommunication";
const shipInfo = localStorage.getItem("shippingInfo");

const initialState = {
  cartItems: [],
  loading: true,
  shippingInfo: JSON.parse(shipInfo) || {},
  couponCode: null, // Stores the applied coupon code
  discount: 0, // Stores the calculated discount value
};

// Async thunk to fetch wishlist items
export const fetchCartItems = createAsyncThunk(
  "cart/cartItems",
  async (_, { rejectWithValue }) => {
    try {
      const serverResponse = await publicCommunication?.getUserProductsData();
      if (!serverResponse?.data?.success) {
        return rejectWithValue(serverResponse?.data?.message || "Failed to fetch cart");
      }
      return serverResponse?.data?.cart || []; // Return empty array if cart is undefined
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((el) => el._id === item._id);

      if (isItemExist) {
        state.cartItems = state.cartItems.map((el) =>
          el._id === isItemExist._id ? item : el
        );
      } else {
        state.cartItems.push(item);
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter((el) => el._id !== productId);
    },
    initializeCart:(state, action)=>{
      state.cartItems = action.payload
    },
    updateCartQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find((el) => el._id === productId);

      if (item) {
        item.quantity = quantity;
      }
    },
    emptyCart: (state) => {
      state.cartItems = [];
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
    },
    applyCoupon: (state, action) => {
      const { couponCode, discount } = action.payload;

      state.couponCode = couponCode; // Save the applied coupon code
      state.discount = discount; // Save the calculated discount
    },
    clearCoupon: (state) => {
      state.couponCode = null;
      state.discount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload; // Populate state with fetched items
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.error = action.payload; // Set error if fetching fails
        state.loading = false;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  emptyCart,
  saveShippingInfo,
  applyCoupon,
  clearCoupon,
  initializeCart
} = cartSlice.actions;

export default cartSlice.reducer;

// Async Thunks for API calls
export const addToCartApi = (product, quantity) => async (dispatch) => {
  try {
    //  update the state
    dispatch(addToCart(product));

    // Send the API request
    const serverResponse = await publicCommunication?.addToCart(
      product?._id,
      quantity
    );
  } catch (error) {
    // Revert the optimistic update on failure
    dispatch(removeFromCart(product?._id));
  }
};

export const updateCartQuantityApi = (id, newQty) => async (dispatch) => {
  try {
    //  update the state
    dispatch(updateCartQuantity({ productId: id, quantity: newQty }));

    // Send the API request
    const serverResponse = await publicCommunication?.updateCart(id, newQty);
  } catch (error) {
    // Revert the optimistic update on failure
    dispatch(updateCartQuantity({ productId: id, quantity: newQty }));
  }
};

export const removeCartItemApi = (id) => async (dispatch) => {
  try {
    //  remove from cart and update the state
    dispatch(removeFromCart(id));
    // Send the API request
    const serverResponse = await publicCommunication?.removeCartItem(id);
  } catch (error) {
    //do nothing
  }
};
export const removeAllCartItemsApi = () => async (dispatch) => {
  try {
    //  remove all cart items and update state
    dispatch(emptyCart());
    // Send the API request
    const serverResponse = await publicCommunication?.removeAllCartItems();
  } catch (error) {
    //do nothing
  }
};

// Action to calculate and apply the discount
export const applyCouponCode = (couponCode, cartItems) => (dispatch) => {
  const validCoupons = {
    HANDLOOM: { value: 5, type: "%" }, // 5% discount
    FLAT200: { value: 200, type: "₹" }, // Flat ₹200 discount
  };

  const coupon = validCoupons[couponCode];
  if (coupon) {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    let discount = 0;
    if (coupon.type === "%") {
      discount = (totalPrice * coupon.value) / 100;
    } else if (coupon.type === "₹") {
      discount = coupon.value;
    }

    dispatch(applyCoupon({ couponCode, discount }));
  } else {
    alert("Invalid coupon code");
    dispatch(clearCoupon());
  }
};
