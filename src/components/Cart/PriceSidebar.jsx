import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyCouponCode } from "../../store/cartSlice";

const PriceSidebar = ({ cartItems, isCouponApply = false }) => {
  const dispatch = useDispatch();
  const { discount, couponCode } = useSelector((state) => state.cart);

  const [coupon, setCoupon] = useState(couponCode);

  const handleApplyCoupon = () => {
    dispatch(applyCouponCode(coupon, cartItems));
  };

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

  const finalAmount = Math.max(totalPrice - discount, 0)?.toLocaleString();

  return (
    <div className="flex sticky top-16 sm:h-screen flex-col sm:w-4/12 sm:px-1">
      {/* <!-- nav tiles --> */}
      <div className="flex flex-col bg-white rounded-sm shadow ">
        <h1
          className="px-6 py-3 border-b font-medium text-gray-500"
        >
          PRICE DETAILS
        </h1>

        <div className="flex flex-col gap-4 p-6 pb-3">
          <p className="flex justify-between">
            Price ({cartItems?.length} item)
            <span>
              ₹
              {cartItems
                ?.reduce(
                  (sum, item) =>
                    sum + (item?.cuttedPrice || 0) * (item?.quantity || 1),
                  0
                )
                ?.toLocaleString()}
            </span>
          </p>
          <p className="flex justify-between">
            Discount
            <span className="text-primary-green">
              - ₹
              {cartItems
                ?.reduce(
                  (sum, item) =>
                    sum +
                    ((item?.cuttedPrice || 0) * (item?.quantity || 1) -
                      item?.price * (item?.quantity || 1)),
                  0
                )
                .toLocaleString()}
            </span>
          </p>
          <p className="flex justify-between">
            Delivery Charges <span className="text-primary-green">FREE</span>
          </p>

          {discount > 0 && (
            <p className="flex justify-between">
              Coupon Discount
              <span className="text-primary-green">
                - ₹{discount?.toLocaleString()}
              </span>
            </p>
          )}

          <div className="border border-dashed "></div>
          <p className="flex justify-between text-lg font-medium">
            Total Amount
            <span>₹{finalAmount}</span>
          </p>
          <div className="border border-dashed"></div>

          <p className="font-medium text-primary-green">
            You will save ₹{(discountedPrice + discount)?.toLocaleString()}
            &nbsp;on this order
          </p>
          {/* Coupon Code Section */}
          {isCouponApply && (
            <div className="flex flex-col gap-2 mt-4">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                placeholder="Enter Coupon Code"
                className="p-2 border rounded"
              />
              <button
                onClick={handleApplyCoupon}
                className="p-2 bg-primary-green text-white rounded"
              >
                Apply Coupon
              </button>
            </div>
          )}
        </div>
      </div>
      {/* <!-- nav tiles --> */}
    </div>
  );
};

export default PriceSidebar;
