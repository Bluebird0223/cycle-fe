import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PriceSidebar from "./PriceSidebar";
import Stepper from "./Stepper";
import { clearErrors } from "../../actions/orderAction";
import { useSnackbar } from "notistack";
import MetaData from "../Layouts/MetaData";
import publicCommunication from "../../service/publicCommunication";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  newOrderFail,
  newOrderRequest,
  newOrderSuccess,
} from "../../store/orderSlice";
import { removeAllCartItemsApi } from "../../store/cartSlice";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
const Payment = () => {
  const {  isLoading, Razorpay } = useRazorpay();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [payDisable, setPayDisable] = useState(false);

  const { shippingInfo, cartItems } = useSelector((state) => state?.cart);
  const { user } = useSelector((state) => state?.user);
  const { error } = useSelector((state) => state?.newOrder);
  const { discount = 0 } = useSelector((state) => state.cart);
console.log("user",user)
  const totalPrice = cartItems?.reduce(
    (sum, item) => sum + item?.price * (item?.quantity || 1),
    0
  );

  const discountedPrice = cartItems?.reduce(
    (sum, item) =>
      sum +
      ((item?.cuttedPrice || 0) * (item?.quantity || 1) -
        item?.price * (item?.quantity || 1)),
    0
  );

  const finalAmount = Math.max(totalPrice - discount, 0);

  const paymentData = {
    amount: Math.round(totalPrice),
    email: user?.email,
    phoneNo: shippingInfo?.phoneNo,
  };

  const orderDetails = {
    shippingInfo,
    orderItems: cartItems?.map((data, i) => ({
      name: data?.name,
      price: data?.price,
      quantity: data?.quantity || 1,
      image: data?.brand?.logo?.url,
      product: data?._id,
    })),
    totalPrice: finalAmount,
  };

  const randomNo1 = Math.round(Math.random() * 10);
  const randomNo2 = Math.round(Math.random() * 20);
  const randomNo3 = Math.round(Math.random() * 30);

  const submitHandler = async (e) => {
    e.preventDefault();
    setPayDisable(true);
    if (finalAmount < 499) {
      Swal.fire({
        icon: "warning",
        title: "Minimum Order Amount",
        text: "Your order total must be at least ₹499 to proceed with payment.",
        confirmButtonColor: "#F37254",
      });
      setPayDisable(false);
      return;
    }
  

    try {
      const details = {
        amount : orderDetails?.totalPrice *100, 
        currency:"INR"
      }
      const data  = await publicCommunication.createOrder(details)
      console.log("data of razorpay", data)
      // return
      console.log("orderDetails", orderDetails)
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: orderDetails?.totalPrice, // Amount in paise
        currency: "INR",
        name: user?.name,
        description: "Transaction",
        order_id: data?.data?.razorpayOrder?.id, // Generate order_id on server
        handler: async (response) => {
          console.log(response);
          dispatch(newOrderRequest());
          //  Payment Gateway Integration
          // if payment done then continue else return;
          orderDetails.paymentInfo = {
            id: response?.razorpay_payment_id,
            status: "Success",
          };
          const serverResponse = await publicCommunication.newOrder(orderDetails);
          if (serverResponse?.data?.success) {
            dispatch(newOrderSuccess(serverResponse?.data?.order));
            dispatch(removeAllCartItemsApi()); // clear cart after order success
            navigate("/orders/success");
          } else {
            setPayDisable(false);
            dispatch(newOrderFail(error || "Processing Payment Failed!"));
            enqueueSnackbar(
              serverResponse?.data?.message || "Something went wrong!",
              { variant: "error" }
            );
          }
        },
        prefill: {
          name:  user?.name,
          email: user?.email,
          contact: "",
        },
        theme: {
          color: "#F37254",
        },
      };
      const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  
     
    } catch (error) {
      setPayDisable(false);
      dispatch(newOrderFail(error || "Processing Payment Failed!"));
      enqueueSnackbar(error || "Processing Payment Failed!", {
        variant: "error",
      });
      navigate("/orders/failed");
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <MetaData title="Flipkart: Secure Payment | Paytm" />

      <main className="w-full pt-3">
        {/* <!-- row --> */}
        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
          {/* <!-- cart column --> */}
          <div className="flex-1">
            <Stepper activeStep={3}>
              <div className="w-full bg-white">
                <form
                  onSubmit={(e) => submitHandler(e)}
                  autoComplete="off"
                  className="flex flex-col justify-start gap-2 w-full mx-8 my-4 overflow-hidden"
                >
                  <input
                    type="submit"
                    value={`Pay ₹${finalAmount?.toLocaleString()}`}
                    disabled={payDisable ? true : false}
                    className={`${
                      payDisable
                        ? "bg-primary-grey cursor-not-allowed"
                        : "bg-primary-blue cursor-pointer"
                    } w-1/2 sm:w-1/4 my-2 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none`}
                  />
                </form>
              </div>
            </Stepper>
          </div>

          <PriceSidebar cartItems={cartItems} />
        </div>
      </main>
    </>
  );
};

export default Payment;
