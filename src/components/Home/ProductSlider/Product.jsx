import { getDiscount } from "../../../utils/functions";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../actions/wishlistAction";
import { useSnackbar } from "notistack";
import blank_img from "../../../assets/images/Products/camphor.jpg";
import {
  addToWishlistApi,
  removeFromWishlistApi,
} from "../../../store/wishlistSlice";
import { useEffect, useState } from "react";

const Product = (props) => {
  const { _id, name, images, ratings, numOfReviews, price, cuttedPrice } =
    props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const [itemInWishlist, setItemInWishList] = useState(false);

  const { wishlistItems } = useSelector((state) => state.wishlist);

  const addToWishlistHandler = () => {
    if (user) {
      if (itemInWishlist) {
        setItemInWishList(false);
        dispatch(removeFromWishlistApi(_id, user?._id));
        enqueueSnackbar("Remove From Wishlist", { variant: "success" });
      } else {
        let product = props;
        setItemInWishList(true);
        dispatch(addToWishlistApi(product, user?._id));
        enqueueSnackbar("Added To Wishlist", { variant: "success" });
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    setItemInWishList(wishlistItems?.some((i) => i._id === _id));
  }, [wishlistItems]);

  return (
    <div className="flex flex-col items-center group w-72 sm:w-64 md:w-60 lg:w-56 shadow-md shadow-gray gap-2 px-2 sm:px-4 py-6 sm:py-4 relative">
    {/* <!-- image & product title --> */}
    <Link
      to={`/product/${_id}`}
      className="flex flex-col items-center text-center group"
    >
      <div className="w-full h-44 sm:h-40 md:h-36 lg:h-32 overflow-hidden flex items-center justify-center">
  <img
    draggable="false"
    className="w-full h-full object-contain shadow-md shadow-black group-hover:scale-105 transition-transform duration-300"
    src={images ?? blank_img}
    alt={name}
  />
</div>
      <div className="dotdotdot">
        <h2
          title={name}
          className="font-medium text-sm mt-2"
        >
          {name.length > 50 ? `${name.substring(0, 50)}...` : name}
        </h2>
      </div>
  
      {/* <!-- product description --> */}
      <div className="flex flex-col gap-2 items-center">
        {/* <!-- price container --> */}
        <div className="flex items-center gap-1.5 text-md font-medium text-xs sm:text-sm md:text-base">
          <span className="">₹{price.toLocaleString()}</span>
          <span className="text-gray-500 line-through text-xs">
            ₹{cuttedPrice.toLocaleString()}
          </span>
          <span className="text-xs text-primary-green">
            {getDiscount(price, cuttedPrice)}%&nbsp;off
          </span>
        </div>
        {/* <!-- price container --> */}
      </div>
  
      {/* <!-- Buy Now Button --> */}
      <button className="bg-red-800 border border-red-800 hover:bg-white hover:text-red-800 text-white py-2 px-6 sm:px-4 mt-2 sm:mt-1 text-xs sm:text-sm md:text-base">
        Buy Now
      </button>
    </Link>
  
    {/* <!-- Wishlist Badge --> */}
    <span
      onClick={addToWishlistHandler}
      className={`${
        itemInWishlist ? "text-red-500" : "hover:text-red-500 text-gray-300"
      } absolute top-6 right-6 cursor-pointer border-red-950 drop-shadow-md`}
    >
      <FavoriteIcon sx={{ fontSize: "18px" }} />
    </span>
  </div>
  
  );
};

export default Product;
