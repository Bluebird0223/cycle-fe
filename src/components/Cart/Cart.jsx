import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layouts/MetaData";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import PriceSidebar from "./PriceSidebar";
import SaveForLaterItem from "./SaveForLaterItem";
import Loader from "../Layouts/Loader";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, loading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { saveForLaterItems } = useSelector((state) => state.saveForLater);

  const placeOrderHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return !loading ? (
    <Loader />
  ) : (
    <>
      <MetaData title="Shopping Cart | KanchDeep" />
      <main className="w-full pt-7 bg-primary-beige">
        {/* <!-- row --> */}
        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto bg-primary-beige">
          {/* <!-- cart column --> */}
          <div className="flex-1">
            {/* <!-- cart items container --> */}
            <div className="flex flex-col shadow bg-white">
              <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b">
                My Cart ({cartItems?.length || 0})
              </span>

              {cartItems?.length > 0 ? (
                cartItems?.map((data, index) => (
                  <CartItem
                  product={data}
                  id={data?._id}
                  seller={data?.brand.name ?? "KanchanDeepJyot"}
                  image={data?.brand?.logo?.url}
                  stock={data?.stock}
                  quantity={data?.quantity ?? 1}
                  inCart={true}
                  name={data?.name}
                  price={data?.price}
                  cuttedPrice={data?.cuttedPrice}
                  />
                ))
              ) : (
                <EmptyCart />
              )}

              {/* <!-- place order btn --> */}
              {cartItems?.length > 0 && (
                <div className="flex justify-end">
                  <button
                    onClick={placeOrderHandler}
                    disabled={cartItems?.length < 1 ? true : false}
                    className={`${
                      cartItems?.length < 1
                        ? "bg-primary-grey cursor-not-allowed"
                        : "bg-yellow-400"
                    } w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-black shadow hover:shadow-lg rounded-sm`}
                  >
                    PLACE ORDER
                  </button>
                </div>
              )}

              {/* <!-- place order btn --> */}
            </div>
            {/* <!-- saved for later items container --> */}
            <div className="flex flex-col mt-5 shadow bg-white mb-5">
              <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b">
                Saved For Later ({saveForLaterItems?.length || 0})
              </span>
              {saveForLaterItems &&
                saveForLaterItems.map((item) => (
                  <SaveForLaterItem
                    product={item}
                    _id={item?._id}
                    name={item?.name}
                    price={item?.price}
                    cuttedPrice={item?.cuttedPrice}
                    brand={item?.brand}
                    quantity={item?.quantity || 1}
                  />
                ))}
            </div>
            {/* <!-- cart items container --> */}
          </div>
          {/* <!-- cart column --> */}
          {cartItems?.length > 0 && <PriceSidebar cartItems={cartItems} />}
        </div>
        {/* <!-- row --> */}
      </main>
    </>
  );
};

export default Cart;
