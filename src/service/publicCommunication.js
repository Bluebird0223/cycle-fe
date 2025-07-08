import axios from "axios";
import { getCookie } from "cookies-next";

const nodeEnvironment = process.env.REACT_APP_NODE_ENV;
const serverUrl = process.env.REACT_APP_NODE_URL;
//const serverUrl =  "http://192.168.1.46:6001";
const tokenName = process.env.REACT_APP_TOKENNAME;

export function getServerUrl() {
  if (nodeEnvironment === "development") {
    return serverUrl;
  }

  if (nodeEnvironment === "machine_IP") {
    return serverUrl;
  }

  if (nodeEnvironment === "server") {
    return serverUrl;
  }

  return serverUrl;
}

export const publicCommunication = {
  registerUser: async function (formData) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 30000 // 30 second timeout
      };

      // Convert FormData to JSON
      const jsonData = {
        name: formData.get('name'),
        email: formData.get('email'),
        gender: formData.get('gender'),
        password: formData.get('password')
      };

      const response = await axios.post(
        `${getServerUrl()}/api/v1/register`,
        jsonData,
        config
      );

      return response;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        data: {
          success: false,
          message: error.response?.data?.message || error.message || 'Registration failed. Please try again.'
        }
      };
    }
  },
  updateUserProfile: async function (formData) {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie(tokenName)}`,
        },
      };
      return await axios.put(
        `${getServerUrl()}/api/v1/me/update`,
        formData,
        config
      );
    } catch (error) {
      console.error(error?.message);
    }
  },
  loginUser: async function (email, password) {
    try {
      console.log(email, password, getServerUrl())
      const config = { headers: { "Content-Type": "application/json" } };
      return await axios.post(
        `${getServerUrl()}/api/v1/login`,
        { email, password },
        config
      );
    } catch (error) {
      return { data: { success: false, message: error.message } };
    }
  },

  getUserDetails: async function () {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getCookie(tokenName)}`,
        },
      };
      return await axios.get(`${getServerUrl()}/api/v1/me`, config);
    } catch (error) {
      if (error.name === "CanceledError") {
        return { data: { success: false, message: "Request was canceled" } };
      } else {
        console.error(error?.message);
        return { data: { success: false, message: error.message } };
      }
    }
  },
  getAllCategory: async function () {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.get(`${getServerUrl()}/api/v1/product/category`, config);
      return response;
    } catch (error) {
      if (error.name === "CanceledError") {
        return { data: { success: false, message: "Request was canceled" } };
      } else {
        console.error("Error fetching categories:", error?.message);
        return {
          data: {
            success: false,
            message: error.response?.data?.message || error.message || "Failed to fetch categories",
            category: []
          }
        };
      }
    }
  },
  getFirst12Products: async function () {
    try {
      const { data } = await axios.get(
        getServerUrl() + "/api/v1/products/first12"
      );
      if (data.success) {
        return data?.products;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  getAllProducts: async function (
    keyword = "",
    price = "",
    ratings = "",
    currentPage = "",
    category = "",
    // subcategory,
    controller = ""
  ) {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        signal: controller?.signal,
      };
      let url = `/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&page=${currentPage}`;
      if (category) {
        url = `/api/v1/products?keyword=${keyword}&category=${category}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&page=${currentPage}`;
      }

      // if (subcategory) {
      //   url = `/api/v1/products?keyword=${keyword}&subCategory=${subcategory}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&page=${currentPage}`;
      // }
      //   let url = "/api/v1/products";
      console.log(getServerUrl())
      return await axios.get(`${getServerUrl()}${url}`, config);
    } catch (error) {
      if (error.name === "CanceledError") {
        //do nothing
      } else {
        return { data: { success: false, message: error.message } };
      }
    }
  },
  getSingleProduct: async function (id) {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      return await axios.get(`${getServerUrl()}/api/v1/product/${id}`, config);
    } catch (error) {
      return { data: { success: false, message: error.message } };
    }
  },
  addToWishlist: async function (productId, userId) {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      return await axios.put(
        `${getServerUrl()}/api/v1/user/wishlist`,
        { productId, userId },
        config
      );
    } catch (error) {
      if (error.name === "CanceledError") {
        //do nothing
      } else {
        return { data: { success: false, message: error.message } };
      }
    }
  },
  removeFromWishlist: async function (productId, userId) {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        data: { productId, userId },
      };
      return await axios.delete(
        `${getServerUrl()}/api/v1/user/wishlist/remove`,
        config
      );
    } catch (error) {
      if (error.name === "CanceledError") {
        //do nothing
      } else {
        return { data: { success: false, message: error.message } };
      }
    }
  },
  getUserProductsData: async function () {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie(tokenName)}`,
        },
      };
      return await axios.get(
        `${getServerUrl()}/api/v1/user/all-products`,
        config
      );
    } catch (error) {
      if (error.name === "CanceledError") {
        return { data: { success: false, message: "Request was canceled" } };
      } else {
        return { data: { success: false, message: error.message } };
      }
    }
  },
  addToCart: async function (productId, quantity) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie(tokenName)}`,
        },
      };
      return await axios.put(
        `${getServerUrl()}/api/v1/user/cart`,
        { productId, quantity },
        config
      );
    } catch (error) {
      if (error.name === "CanceledError") {
        //do nothing
      } else {
        return { data: { success: false, message: error.message } };
      }
    }
  },
  updateCart: async function (productId, quantity) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie(tokenName)}`,
        },
      };
      return await axios.put(
        `${getServerUrl()}/api/v1/user/cart/update`,
        { productId, quantity },
        config
      );
    } catch (error) {
      if (error.name === "CanceledError") {
        //do nothing
      } else {
        return { data: { success: false, message: error.message } };
      }
    }
  },
  removeCartItem: async function (productId) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie(tokenName)}`,
        },
      };
      return await axios.post(
        `${getServerUrl()}/api/v1/user/cart/remove`,
        { productId },
        config
      );
    } catch (error) {
      if (error.name === "CanceledError") {
        //do nothing
      } else {
        return { data: { success: false, message: error.message } };
      }
    }
  },
  removeAllCartItems: async function () {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getCookie(tokenName)}`,
        },
      };
      return await axios.put(
        `${getServerUrl()}/api/v1/user/cart/remove-all`,
        {},
        config
      );
    } catch (error) {
      console.error(error?.message);
    }
  },
  saveForLater: async function (productId, quantity) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie(tokenName)}`,
        },
      };
      return await axios.put(
        `${getServerUrl()}/api/v1/user/save-for-later`,
        { productId, quantity },
        config
      );
    } catch (error) {
      if (error.name === "CanceledError") {
        //do nothing
      } else {
        console.error(error?.message);
      }
    }
  },
  removeFromSaveForLater: async function (productId) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie(tokenName)}`,
        },
      };
      return await axios.post(
        `${getServerUrl()}/api/v1/user/save-for-later/remove`,
        { productId },
        config
      );
    } catch (error) {
      if (error.name === "CanceledError") {
        //do nothing
      } else {
        console.error(error?.message);
      }
    }
  },
  rateProduct: async function (rating, comment, productId) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie(tokenName)}`,
        },
      };
      return await axios.put(
        `${getServerUrl()}/api/v1/review`,
        { rating, comment, productId },
        config
      );
    } catch (error) {
      console.error(error?.message);
    }
  },
  fetchMyOrders: async function () {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getCookie(tokenName)}`,
        },
      };
      return await axios.get(`${getServerUrl()}/api/v1/orders/me`, config);
    } catch (error) {
      return { data: { success: false, message: error?.message || "Failed to fetch orders" } };
    }
  },
  fetchOrderDetails: async function (id) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getCookie(tokenName)}`,
        },
      };

      return await axios.get(`${getServerUrl()}/api/v1/order/${id}`, config);
    } catch (error) {
      console.error(error?.message);
    }
  },
  newOrder: async function (orderDetails) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie(tokenName)}`,
        },
      };
      return await axios.post(
        `${getServerUrl()}/api/v1/order/new`,
        orderDetails,
        config
      );
    } catch (error) {
      console.error(error?.message);
    }
  },
  newContact: async function (dataToSend) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      return await axios.post(
        `${getServerUrl()}/api/v1/user/contact-us`,
        dataToSend,
        config
      );
    } catch (error) {
      console.error(error?.message);
    }
  },
  resetPassword: async function (formData) {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie(tokenName)}`,
        },
      };
      return await axios.put(
        `${getServerUrl()}/api/v1/password/update`,
        formData,
        config
      );
    } catch (error) {
      console.error(error?.message);
    }
  },
  sendOtpToMail: async function (email) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      return await axios.post(
        `${getServerUrl()}/api/v1/password/send-otp`,
        { email },
        config
      );
    } catch (error) {
      console.error(error?.message);
    }
  },
  verifyOTP: async function (dataToSend) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      return await axios.post(
        `${getServerUrl()}/api/v1/password/verify-otp`,
        dataToSend,
        config
      );
    } catch (error) {
      console.error(error?.message);
    }
  },
  forgotPassword: async function (dataToSend) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      return await axios.post(
        `${getServerUrl()}/api/v1/password/forgot`,
        dataToSend,
        config
      );
    } catch (error) {
      console.error(error?.message);
    }
  },
  newSubscriber: async function (customerEmail) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      return await axios.post(
        `${getServerUrl()}/api/v1/user/subscription`,
        { customerEmail },
        config
      );
    } catch (error) {
      console.error(error?.message);
    }
  },
  submitFeedback: async function (rating, message) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie(tokenName)}`,
        },
      };
      return await axios.post(
        `${getServerUrl()}/api/v1/user/testimonials`,
        { rating, message },
        config
      );
    } catch (error) {
      console.error(error?.message);
    }
  },
  fetchTestimonials: async function (controller) {
    try {
      return await axios.get(`${getServerUrl()}/api/v1/user/all-testimonials`, {
        signal: controller?.signal,
      });
    } catch (error) {
      if (error.name === "CanceledError") {
        //do nothing
      } else {
        console.error(error?.message);
      }
    }
  },
  getGroupProductsById: async function (id) {
    try {
      return await axios.get(`${getServerUrl()}/api/v1/group/${id}`);
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getProductsByGroupName: async function (groupName) {
    try {
      console.log(groupName)
      const { data } = await axios.post(
        `${getServerUrl()}/api/v1/group/get-by-name`,
        {
          groupName: groupName,
        }
      );
      if (data?.success) {
        return data?.group?.products;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  createOrder: async function (currencyDetail) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie(tokenName)}`,
        },
      };
      return await axios.post(
        `${getServerUrl()}/api/v1/order/create-order`,
        currencyDetail,
        config
      );
    } catch (error) {
      console.error(error?.message);
    }
  },
};

export default publicCommunication;
