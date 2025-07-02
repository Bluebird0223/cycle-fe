import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { NextBtn, Nxt, Pre, PreviousBtn } from "../Home/Banner/Banner";
import ProductSlider from "../Home/ProductSlider/ProductSlider";
import Loader from "../Layouts/Loader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CachedIcon from "@mui/icons-material/Cached";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
// import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { addItemsToCart } from "../../actions/cartAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { getDeliveryDate, getDiscount } from "../../utils/functions";

import MetaData from "../Layouts/MetaData";
import {
  newReviewFail,
  newReviewRequest,
  newReviewSuccess,
  productDetailsFail,
  productDetailsRequest,
  productDetailsSuccess,
} from "../../store/productSlice";
import publicCommunication from "../../service/publicCommunication";
import {
  addToWishlistApi,
  removeFromWishlistApi,
} from "../../store/wishlistSlice";
import { addToCartApi } from "../../store/cartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const navigate = useNavigate();

  // reviews
  const [open, setOpen] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { product, loading, error } = useSelector((state) => state.products);
  // const { success, error: reviewError } = useSelector(
  //   (state) => state.newReview
  // );
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.user);

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <Pre top="top-36" />,
    nextArrow: <Nxt top="top-36" />,
  };

  const productId = params.id;
  const itemInWishlist = wishlistItems?.some((i) => i?._id === productId);

  const addToWishlistHandler = () => {
    if (user) {
      if (itemInWishlist) {
        // Remove From Wishlist
        dispatch(removeFromWishlistApi(productId, user?._id));
        enqueueSnackbar("Remove From Wishlist", { variant: "success" });
      } else {
        dispatch(addToWishlistApi(product, user?._id));
        enqueueSnackbar("Added To Wishlist", { variant: "success" });
      }
    } else {
      navigate("/login");
    }
  };

  const reviewSubmitHandler = async () => {
    if (rating === 0 || !comment.trim()) {
      enqueueSnackbar("Empty Review", { variant: "error" });
      return;
    }
    // New/Update Review
    try {
      dispatch(newReviewRequest());
      const serverResponse = await publicCommunication.rateProduct(
        rating,
        comment,
        productId
      );
      if (serverResponse?.data?.success) {
        dispatch(newReviewSuccess(serverResponse?.data?.success));
        enqueueSnackbar("Thanks For Review😊", { variant: "success" });
      }
    } catch (error) {
      dispatch(newReviewFail(error?.message || "Something went wrong!"));
    }
    setOpen(false);
  };

  const addToCartHandler = () => {
    if (user) {
      dispatch(addToCartApi(product));
      enqueueSnackbar("Product Added To Cart", { variant: "success" });
    } else {
      navigate("/login");
      enqueueSnackbar("Please Login to Continue", { variant: "info" });
    }
  };

  const handleDialogClose = () => {
    setOpen(!open);
  };

  const itemInCart = cartItems?.some((i) => i?._id === productId);
  console.log(itemInCart);

  const goToCart = () => {
    navigate("/cart");
  };

  const buyNow = () => {
    if (itemInCart) {
      navigate("/shipping");
    } else {
      addToCartHandler();
      navigate("/shipping");
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     enqueueSnackbar(error, { variant: "error" });
  //     dispatch(clearErrors());
  //   }
  //   if (reviewError) {
  //     enqueueSnackbar(reviewError, { variant: "error" });
  //     dispatch(clearErrors());
  //   }
  //   if (success) {
  //     enqueueSnackbar("Review Submitted Successfully", { variant: "success" });
  //     dispatch({ type: NEW_REVIEW_RESET });
  //   }
  //   dispatch(getProductDetails(productId));
  //   // eslint-disable-next-line
  // }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

  // Get Product Details
  const getProductDetails = async (id) => {
    try {
      dispatch(productDetailsRequest());

      const serverResponse = await publicCommunication?.getSingleProduct(id);
      if (serverResponse?.data?.success) {
        dispatch(productDetailsSuccess(serverResponse?.data.product));
      }
    } catch (error) {
      dispatch(productDetailsFail(error.message));
    }
  };

  useEffect(() => {
    getProductDetails(productId);
  }, [productId]);

  useEffect(() => {
    // dispatch(getSimilarProducts(product?.category));
  }, [dispatch, product, product?.category]);

  const myRef = useRef(null);

  const [group, setGroup] = useState([]);

  const initializeGroup = async (id) => {
    const { data } = await publicCommunication.getGroupProductsById(id);
    if (data?.success) {
      setGroup(data?.products);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.location.hash = "top";
    myRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (product.group) {
      initializeGroup(product.group);
    }
  }, [product]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData
            title={`${
              product?.name ?? "product details"
            } | KanchanDeepJyot.com`}
          />
          {/* <MinCategory /> */}
          <main className="mt-12 sm:mt-0">
            {/* <!-- product image & description container --> */}
            <div className="w-full flex flex-col sm:flex-row bg-primary-beige sm:p-2 relative gap-3">
              {/* <!-- image wrapper --> */}
              <div className="w-full sm:w-2/5 sm:sticky top-16 sm:h-screen">
                {/* <!-- imgbox --> */}
                <div className="flex flex-col gap-3 m-3">
                  <div className="w-full h-full pb-6 border border-gray-300 relative">
                    <Slider {...settings}>
                      <img
                        draggable="false"
                        className="w-full h-96 object-contain"
                        src={product?.brand?.logo?.url}
                        alt={product?.name ?? "product"}
                      />
                      {product?.images?.map((img, i) => (
                        <img
                          draggable="false"
                          className="w-full h-96 object-contain"
                          src={img?.url}
                          alt={i}
                          key={i}
                        />
                      ))}
                    </Slider>
                    <div className="absolute top-4 right-4 shadow-lg  bg-white w-9 h-9 border border-gray-300 flex items-center justify-center rounded-full">
                      <span
                        onClick={addToWishlistHandler}
                        className={`${
                          itemInWishlist
                            ? "text-red-500"
                            : "hover:text-red-500 text-gray-300"
                        } cursor-pointer`}
                      >
                        <FavoriteIcon sx={{ fontSize: "18px" }} />
                      </span>
                    </div>
                  </div>

                  <div className="w-full flex gap-3">
                    {/* <!-- add to cart btn --> */}
                    <button
                      disabled={product?.stock < 1 ? true : false}
                      onClick={itemInCart ? goToCart : addToCartHandler}
                      className="p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-red-800 rounded-sm shadow hover:shadow-lg"
                    >
                      <ShoppingCartIcon />
                      {itemInCart ? "GO TO CART" : "ADD TO CART"}
                    </button>
                    <button
                      onClick={buyNow}
                      disabled={product?.stock < 1 ? true : false}
                      className={
                        product?.stock < 1
                          ? "p-4 w-full flex items-center justify-center gap-2 text-white bg-yellow-400 cursor-not-allowed rounded-sm shadow hover:shadow-lg"
                          : "p-4 w-1/2 flex items-center justify-center gap-2 text-black bg-yellow-500 rounded-sm shadow hover:shadow-lg"
                      }
                    >
                      <FlashOnIcon />
                      {product?.stock < 1 ? "OUT OF STOCK" : "BUY NOW"}
                    </button>
                    {/* <!-- add to cart btn --> */}
                  </div>
                </div>
                {/* <!-- imgbox --> */}
              </div>
              {/* <!-- image wrapper --> */}

              {/* <!-- product desc wrapper --> */}
              <div className="flex-1 py-2 px-3">
                {/* <!-- whole product description --> */}
                <div className="flex flex-col gap-2 mb-4">
                  <h2 className="text-2xl capitalize">
                    {product?.name ?? "product name"}
                  </h2>
                  {/* <!-- rating badge --> */}
                  <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                    <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">
                      {Number(product?.ratings ?? 0).toFixed(1)}{" "}
                      <StarIcon sx={{ fontSize: "12px" }} />
                    </span>
                    <span>{product?.numOfReviews ?? 0} Reviews</span>
                  </span>
                  {/* <!-- rating badge --> */}

                  {/* <!-- price desc --> */}
                  <span className="text-primary-blue text-sm font-medium">
                    Special Price
                  </span>
                  <div className="flex items-baseline gap-2 text-2xl font-medium">
                    <span className="text-gray-800 ">
                      ₹{Number(product?.price ?? 1)?.toLocaleString()}
                    </span>
                    <span className="text-base text-gray-500 line-through">
                      ₹{Number(product?.cuttedPrice ?? 2)?.toLocaleString()}
                    </span>
                    <span className="text-base text-primary-green">
                      {getDiscount(
                        product?.price ?? 1,
                        product?.cuttedPrice ?? 2
                      )}
                      %&nbsp;off
                    </span>
                  </div>
                  {product?.stock <= 10 && product?.stock > 0 && (
                    <span className="text-red-500 text-sm font-medium">
                      Hurry, Only {product?.stock} left!
                    </span>
                  )}
                  {/* <!-- price desc --> */}

                  {/* <!-- banks offers --> */}
                  <p className="text-md font-medium ">Available offers</p>
                  {Array(3)
                    .fill("")
                    .map((el, i) => (
                      <p className="text-sm flex items-center gap-1 " key={i}>
                        <span className="text-primary-blue ">
                          <LocalOfferIcon sx={{ fontSize: "20px" }} />
                        </span>
                        <span className="font-medium ml-2 ">Coupon Offer</span>{" "}
                        15% Instant discount on code MYSAREE
                        <Link className="text-primary-blue  font-medium" to="/">
                          T&C
                        </Link>
                      </p>
                    ))}
                  {/* <!-- banks offers --> */}

                  {/* <!-- warranty & brand --> */}
                  {/* <div className="flex gap-8 mt-2 items-center text-sm">
                    <img
                      draggable="false"
                      className="w-20 h-8 p-0.5 border object-contain"
                      src={logo}
                      alt={"KanchanDeepJyot"}
                    />
                    <span>
                      1 Year Warranty
                      <Link className="font-medium text-primary-blue" to="/">
                        Know More
                      </Link>
                    </span>
                  </div> */}
                  {/* <!-- warranty & brand --> */}

                  {group?._id && (
                    <h5 className="text-red-900 font-medium">
                      <i className="fas fa-star"></i>
                      <span className="pl-3">Similar Discounted Products</span>
                    </h5>
                  )}
                  <div className="flex gap-2">
                    {group?.map((g) => (
                      <div
                        key={g._id}
                        onClick={() => navigate(`/product/${g._id}`)}
                        className={`py-4 px-2 border cursor-pointer rounded inline ${
                          g._id != productId
                            ? "border-gray-400 text-gray-400"
                            : "border-red-700 text-red-900"
                        }`}
                      >
                        {g?.shortName}
                      </div>
                    ))}
                  </div>
                  {/* <!-- delivery details --> */}
                  <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                    <p className="text-gray-500">Delivery</p>
                    <span className="">Delivery by {getDeliveryDate()}</span>
                  </div>
                  {/* <!-- delivery details --> */}

                  {/* <!-- highlights & services details --> */}
                  <div className="flex flex-col sm:flex-row justify-between">
                    {/* <!-- highlights details --> */}
                    <div className="flex gap-16 mt-4 items-stretch text-sm">
                      <p className="text-gray-500 font-medium">Highlights</p>

                      <ul className="list-disc flex flex-col gap-2 w-64 capitalize ">
                        {product?.highlights?.map((highlight, i) => (
                          <li key={i}>
                            <p>{highlight ?? "--"}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* <!-- highlights details --> */}

                    {/* <!-- services details --> */}
                    <div className="flex gap-16 mt-4 mr-6 items-stretch text-sm">
                      <p className="text-gray-500 font-medium">Services</p>
                      <ul className="flex flex-col gap-2">
                        <li>
                          <p className="flex items-center gap-3 ">
                            <span className="text-primary-blue ">
                              <CachedIcon sx={{ fontSize: "18px" }} />
                            </span>{" "}
                            7 Days Replacement Policy
                          </p>
                        </li>
                        <li>
                          <p className="flex items-center gap-3 ">
                            <span className="text-primary-blue">
                              <CurrencyRupeeIcon sx={{ fontSize: "18px" }} />
                            </span>{" "}
                            Cash on Delivery available
                          </p>
                        </li>
                      </ul>
                    </div>
                    {/* <!-- services details --> */}
                  </div>
                  {/* <!-- highlights & services details --> */}

                  {/* <!-- seller details --> */}
                  <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                    <p className="text-gray-500">Seller</p>
                    <Link
                      className="font-medium text-primary-blue ml-3 "
                      to="/"
                    >
                      KanchanDeepJyot
                    </Link>
                  </div>
                  {/* <!-- seller details --> */}

                  {/* <!--  banner --> */}
                  {/* <div className="sm:w-1/2 mt-4 border border-gray-300">
                    <img
                      draggable="false"
                      className="w-full h-full object-contain"
                      src={logo}
                      alt=""
                    />
                  </div> */}
                  {/* <!--  banner --> */}

                  {/* <!-- description details --> */}

                  {/* <!-- border box --> */}
                  <div className="w-full mt-6 rounded-sm border border-gray-300 flex flex-col">
                    <h1 className="px-6 py-4 border-b border-gray-300  text-2xl font-medium ">
                      Product Description
                    </h1>
                    <div className="p-6">
                      <p className="text-sm ">{product?.description ?? "--"}</p>
                    </div>
                  </div>
                  {/* <!-- border box --> */}

                  {/* <!-- specifications border box --> */}
                  <div className="w-full mt-4 pb-4 rounded-sm border border-gray-300  flex flex-col">
                    <h1 className="px-6 py-4 border-b border-gray-300  text-2xl font-medium">
                      Specifications
                    </h1>
                    <h1 className="px-6 py-3 text-lg ">General</h1>

                    {/* <!-- specs list --> */}
                    {product?.specifications?.map((spec, i) => (
                      <div
                        className="px-6 py-2 flex items-center text-sm capitalize"
                        key={i}
                      >
                        <p className="text-gray-500 w-3/12">
                          {spec?.title ?? "--"}
                        </p>
                        <p className="flex-1 ">{spec?.description ?? "--"}</p>
                      </div>
                    ))}
                    {/* <!-- specs list --> */}
                  </div>
                  {/* <!-- specifications border box --> */}

                  {/* <!-- reviews border box --> */}
                  <div className="w-full mt-4 rounded-sm border border-gray-300 flex flex-col">
                    <div className="flex justify-between items-center border-b border-gray-300 px-6 py-4">
                      <h1 className="text-2xl font-medium ">
                        Ratings & Reviews
                      </h1>
                      <button
                        onClick={handleDialogClose}
                        className="shadow bg-primary-pink text-white px-4 py-2 rounded-sm hover:shadow-lg"
                      >
                        Rate Product
                      </button>
                    </div>

                    <Dialog
                      aria-labelledby="review-dialog"
                      open={open}
                      onClose={handleDialogClose}
                    >
                      <DialogTitle className="border-b border-gray-300 ">
                        Submit Review
                      </DialogTitle>
                      <DialogContent className="flex flex-col p-1 gap-4 ">
                        <Rating
                          onChange={(e) => setRating(e.target.value)}
                          value={rating}
                          size="large"
                          precision={0.5}
                        />
                        <TextField
                          label="Review"
                          multiline
                          rows={3}
                          sx={{ width: 400 }}
                          size="small"
                          variant="outlined"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <button
                          onClick={handleDialogClose}
                          className="py-2 px-6 rounded shadow bg-white border border-red-500 hover:bg-red-100 text-red-600 uppercase"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={reviewSubmitHandler}
                          className="py-2 px-6 rounded bg-green-600 hover:bg-green-700 text-white shadow uppercase"
                        >
                          Submit
                        </button>
                      </DialogActions>
                    </Dialog>

                    <div className="flex items-center border-b border-gray-300">
                      <h1 className="px-6 py-3 text-3xl font-semibold text-primary-green">
                        {Number(product?.ratings ?? 0).toFixed(1)}
                        <StarIcon />
                      </h1>
                      <p className="text-lg text-gray-500">
                        ({product?.numOfReviews ?? 0}) Reviews
                      </p>
                    </div>

                    {viewAll
                      ? product?.reviews
                          ?.map((rev, i) => (
                            <div
                              className="flex flex-col gap-2 py-4 px-6 border-b border-gray-300"
                              key={i}
                            >
                              <Rating
                                name="read-only"
                                value={rev?.rating}
                                readOnly
                                size="small"
                                precision={0.5}
                              />
                              <p className="">{rev?.comment}</p>
                              <span className="text-sm text-gray-500">
                                by {rev?.name}
                              </span>
                            </div>
                          ))
                          .reverse()
                      : product?.reviews
                          ?.slice(-3)
                          .map((rev, i) => (
                            <div
                              className="flex flex-col gap-2 py-4 px-6 border-b border-gray-300"
                              key={i}
                            >
                              <Rating
                                name="read-only"
                                value={rev?.rating}
                                readOnly
                                size="small"
                                precision={0.5}
                              />
                              <p className=" ">{rev.comment}</p>
                              <span className="text-sm text-gray-500">
                                by {rev.name}
                              </span>
                            </div>
                          ))
                          .reverse()}
                    {product?.reviews?.length > 3 && (
                      <button
                        onClick={() => {
                          setViewAll(!viewAll);
                        }}
                        className="w-1/3 m-2 rounded-sm shadow hover:shadow-lg py-2 bg-primary-blue text-white"
                      >
                        {viewAll ? "View Less" : "View All"}
                      </button>
                    )}
                  </div>
                  {/* <!-- reviews border box --> */}
                </div>
              </div>
              {/* <!-- product desc wrapper --> */}
            </div>
            {/* <!-- product image & description container --> */}

            {/* Sliders */}
            <div className="flex flex-col gap-3">
              <ProductSlider
                title={"Similar Products"}
                tagline={"Based on the category"}
              />
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default ProductDetails;
