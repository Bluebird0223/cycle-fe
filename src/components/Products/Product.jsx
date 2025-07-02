import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import { getDiscount } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlistApi,
  removeFromWishlistApi,
} from "../../store/wishlistSlice";
import { useSnackbar } from "notistack";
import blank_img from "../../assets/images/Products/sindoor_.jpg";
// import { useCurrencyConverter } from "../../utils/useCurrencyConverter";

const Product = ({
  product,
  _id,
  name,
  images,
  ratings,
  numOfReviews,
  price,
  cuttedPrice,
}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  //   const { convertPrice , symbol} = useCurrencyConverter();

  const itemInWishlist = wishlistItems?.some((i) => i._id === _id);

  const addToWishlistHandler = () => {
    if (user) {
      if (itemInWishlist) {
        dispatch(removeFromWishlistApi(_id, user?._id));
        enqueueSnackbar("Remove From Wishlist", { variant: "success" });
      } else {
        dispatch(addToWishlistApi(product, user?._id));
        enqueueSnackbar("Added To Wishlist", { variant: "success" });
      }
    } else {
      navigate("/login");
    }
  };
  

  return (
    <div
      className="flex flex-col group items-start gap-2 p-2 relative border-gray-300  shadow-lg  rounded-sm"
      key={_id}
    >
      {/* <!-- image & product title --> */}
      <Link
        to={`/product/${_id}`}
        className="flex flex-col items-start text-left group w-full"
      >
        <div className="h-52 w-full border overflow-hidden">
          <img
            draggable="false"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 overflow-hidden"
            src={images ?? blank_img}
            alt=""
          />
        </div>
        <div className="dotdotdot">
          <h2 title={name} className="text-sm mt-4 group-hover:text-red-800 text-left capitalize">
            {name}
            {/* {name?.length > 28 ? `${name?.substring(0, 28)}...` : name} */}
          </h2>
        </div>
      </Link>
      {/* <!-- image & product title --> */}

      {/* <!-- product description --> */}
      <div className="flex flex-col gap-2 items-start w-full">
        {/* <!-- rating badge --> */}
        {/* <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
          <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">
            {ratings.toFixed(1)} <StarIcon sx={{ fontSize: "14px" }} />
          </span>
          <span>({numOfReviews})</span>
        </span> */}
        {/* <!-- rating badge --> */}

        {/* <!-- price container --> */}
        <div className="flex items-center gap-1.5 text-md font-medium">
          <span className="text-black">₹ {`${price}`}</span>
          <span className="text-gray-500 line-through text-xs">
            {`${cuttedPrice}`}
          </span>
          <span className="text-xs text-primary-green">
            {getDiscount(price, cuttedPrice)}%&nbsp;off
          </span>
        </div>
        <div className="flex items-center gap-3 w-full">
          <Link to={`/product/${_id}`} className="w-full">
            <button className="cursor-pointer shadow-sm w-full bg-red-900 text-white text-md capitalize py-2 px-2">
              Shop now
            </button>
          </Link>
        </div>
        {/* <!-- price container --> */}
      </div>
      {/* <!-- product description --> */}

      {/* <!-- wishlist badge --> */}
      <span
        onClick={addToWishlistHandler}
        className={`${
          itemInWishlist ? "text-red-500" : "hover:text-red-500 text-gray-300"
        } absolute top-6 right-6 cursor-pointer border-red-950 drop-shadow-md`}
      >
        <FavoriteIcon sx={{ fontSize: "18px" }} />
      </span>
      {/* <!-- wishlist badge --> */}
    </div>
  );
};

// {/* Product Description */ }
// <div className="flex flex-col gap-2 items-start">
//   {/* Rating Badge */}
//   <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
//     <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">
//       {ratings.toFixed(1)} <StarIcon sx={{ fontSize: "14px" }} />
//     </span>
//     <span>({numOfReviews})</span>
//   </span>

//   {/* Price */}
//   <div className="flex items-center gap-1.5 text-md font-medium">
//     <span>₹{price.toLocaleString()}</span>
//     <span className="text-gray-500 line-through text-xs">
//       ₹{cuttedPrice.toLocaleString()}
//     </span>
//     <span className="text-xs text-primary-green">
//       {getDiscount(price, cuttedPrice)}% off
//     </span>
//   </div>

//   {/* Shop Now Button */}
//   <div className="flex items-center gap-3">
//     <Link to={`/products/${_id}`}>
//       <button className="cursor-pointer bg-primary-pink text-white text-sm py-1 px-2 rounded-sm">
//         Shop now
//       </button>
//     </Link>
//   </div>
// </div>

// {/* Wishlist Badge */ }
// <span
//   onClick={addToWishlistHandler}
//   className={`${itemInWishlist ? "text-red-500" : "hover:text-red-500 text-gray-300"
//     } absolute top-6 right-6 cursor-pointer`}
// >
//   <FavoriteIcon sx={{ fontSize: "18px" }} />
// </span>
//     </div >
//   )
// }

export default Product;
