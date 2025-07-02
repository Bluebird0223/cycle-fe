import { useDispatch, useSelector } from "react-redux";
import MetaData from "../Layouts/MetaData";
import Sidebar from "../User/Sidebar";
import Product from "./Product";
import Loader from "../Layouts/Loader";
import { useEffect } from "react";
import { fetchWishlistItems } from "../../store/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistItems, loading } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <MetaData title="Wishlist | KanchanDeepJyot" />
      <main className="w-full pt-3 sm:mt-0">
        <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto pb-7">
          <Sidebar activeTab={"wishlist"} />
          <div className="flex-1 shadow bg-white">
            {/* <!-- wishlist container --> */}
            {!loading ? (
              <Loader />
            ) : (
              <div className="flex flex-col">
                <span className="font-medium text-lg px-4 sm:px-8 py-4 border-b">
                  My Wishlist ({wishlistItems?.length})
                </span>

                {wishlistItems?.length === 0 && (
                  <div className="flex items-center flex-col gap-2 m-6">
                    {/* <img
          draggable="false"
          className="object-contain"
          src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/mywishlist-empty_39f7a5.png"
          alt="Empty Wishlist"
        /> */}
                    <span className="text-lg font-medium mt-6">
                      Empty Wishlist
                    </span>
                    <p>You have no items in your wishlist. Start adding!</p>
                  </div>
                )}

                {wishlistItems
                  ?.map((data, index) => {
                    return (
                      <Product
                        product={data?._id}
                        name={data?.name}
                        image={data?.brand?.logo?.url}
                        ratings={data?.ratings}
                        reviews={data?.numOfReviews}
                        price={data?.price}
                        cuttedPrice={data?.cuttedPrice}
                      />
                    );
                  })
                  .reverse()}
              </div>
            )}

            {/* <!-- wishlist container --> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Wishlist;
