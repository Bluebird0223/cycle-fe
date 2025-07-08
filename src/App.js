import WebFont from "webfontloader";
import Footer from "./components/Layouts/Footer/Footer";
import Header from "./components/Layouts/Header/Header";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import { Routes, Route, useLocation } from "react-router-dom";
import { loadUser } from "./actions/userAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Account from "./components/User/Account";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Home from "./components/Home/Home";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import OrderConfirm from "./components/Cart/OrderConfirm";
import Payment from "./components/Cart/Payment";
import OrderStatus from "./components/Cart/OrderStatus";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import MainData from "./components/Admin/MainData";
import OrderTable from "./components/Admin/OrderTable";
import UpdateOrder from "./components/Admin/UpdateOrder";
import ProductTable from "./components/Admin/ProductTable";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import UserTable from "./components/Admin/UserTable";
import UpdateUser from "./components/Admin/UpdateUser";
import ReviewsTable from "./components/Admin/ReviewsTable";
import Wishlist from "./components/Wishlist/Wishlist";
import NotFound from "./components/NotFound";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import FAQ from "./components/FAQ";
import ReturnPolicy from "./components/ReturnPolicy";
import TermsAndConditions from "./components/TermAndCondition";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Category from "./components/Admin/Category";
import AddCategory from "./components/Admin/NewCategory";
import AddSubcategory from "./components/Admin/NewSubcategory";
import Subcategory from "./components/Admin/SubCategory";
import UpdateCategory from "./components/Admin/UpdateCategory";
import UpdateSubcategory from "./components/Admin/UpdateSubCategory";
// import ProductsGroups from "./components/Admin/ProductsGroups";
// import NewProductGroup from "./components/Admin/NewProductGroup";
import PaymentPolicy from "./components/PaymentPolicy";
import ShippingPolicy from "./components/ShippingPolicy";
import CancellationPolicy from "./components/CancellationPolicy";
// import UpdateProductGroup from "./components/Admin/UpdateProductGroup";
import { fetchCartItems } from "./store/cartSlice";
import { fetchSaveForLater } from "./store/saveForLaterSlice";
import { fetchWishlistItems } from "./store/wishlistSlice";
import { fetchUserDetails } from "./store/userSlice";
import AdminProtectedRoute from "./Routes/AdminProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.user);
  // Check if the route is an admin route
  const isAdminRoute = pathname.startsWith("/admin");

  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get('/api/v1/stripeapikey');
  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto:300,400,500,600,700"],
      },
    });
  });


  // fetch user details on initial laod
  useEffect(() => {
    dispatch(fetchUserDetails());
    // getStripeApiKey();
  }, []);

  useEffect(() => {
    // if user is login then we call Cart,save for later and wishlist api
    if (user) {
      // Fetch cart items on component mount
      dispatch(fetchCartItems());
      // Fetch save for later items on component mount
      dispatch(fetchSaveForLater());
      // Fetch wishlist items on component mount
      dispatch(fetchWishlistItems());
    }
  }, [user]);

  useEffect(() => {
    dispatch(loadUser());
    // getStripeApiKey();
  }, [dispatch]);

  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // disable right click
  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  // window.addEventListener("keydown", (e) => {
  //   if (e.keyCode == 123) e.preventDefault();
  //   if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
  //   if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
  // });

  return (
    <>
      {/* Render Header only for public routes */}
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/term-and-condition" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/payment-policy" element={<PaymentPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/cancellation-policy" element={<CancellationPolicy />} />

        <Route    
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="order_details/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <OrderConfirm />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/process/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/orders/success"
          element={<OrderSuccess success={true} />}
        />
        <Route
          path="/orders/failed"
          element={<OrderSuccess success={false} />}
        >
      </Route>
      {/* shared route  */}

      <Route
        path="/order/:id"
        element={
          <ProtectedRoute>
            <OrderStatus />
          </ProtectedRoute>
        }
      ></Route>

      <Route path="/password/reset/:token" element={<ResetPassword />} />

      {/* Admin Routes  */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={0}>
              <MainData />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>

      <Route
        path="/admin/orders"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={1}>
              <OrderTable />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>

      <Route
        path="/admin/order/:id"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={1}>
              <UpdateOrder />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>

      <Route
        path="/admin/products"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={2}>
              <ProductTable />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>

      <Route
        path="/admin/new_product"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={2}>
              <NewProduct />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/product/:id"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={2}>
              <UpdateProduct />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/category"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={3}>
              <Category />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/category/:id"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={3}>
              <UpdateCategory />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/new_category"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={3}>
              <AddCategory />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/subcategory"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={4}>
              <Subcategory />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/new_subcategory"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={4}>
              <AddSubcategory />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/subcategory/:id"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={4}>
              <UpdateSubcategory />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>

      <Route
        path="/admin/users"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={5}>
              <UserTable />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>

      <Route
        path="/admin/user/:id"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={5}>
              <UpdateUser />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>

      <Route
        path="/admin/reviews"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={6}>
              <ReviewsTable />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      {/* <Route
        path="/admin/coupons"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={10}>
              <Coupon />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/new_coupon"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={10}>
              <AddCoupon />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/coupons/:id"
        element={
          <AdminProtectedRoute>
            <Dashboard activeTab={10}>
              <UpdateCoupon />
            </Dashboard>
          </AdminProtectedRoute>
        }
      ></Route> */}


      <Route path="/password/forgot" element={<ForgotPassword />} />

      <Route path="/password/reset/:token" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />}></Route>

    </Routes >
      <Footer />
    </>
  );
}

export default App;
