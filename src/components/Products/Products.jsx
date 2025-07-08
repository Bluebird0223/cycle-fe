import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Pagination from "@mui/material/Pagination";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Slider from "@mui/material/Slider";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../Layouts/Loader";
import Product from "./Product";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StarIcon from "@mui/icons-material/Star";
import MetaData from "../Layouts/MetaData";
import { useLocation } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import { categories } from "../../utils/categorySubcategory";
import {
  allProductsFail,
  allProductsRequest,
  allProductsSuccess,
  clearErrors,
} from "../../store/productSlice";
import publicCommunication from "../../service/publicCommunication";

const Products = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [price, setPrice] = useState([0, 200000]);
  const [category, setCategory] = useState(
    location.search ? location.search.split("=")[1] : ""
  );

  const [ratings, setRatings] = useState(0);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  // filter toggles
  const [categoryToggle, setCategoryToggle] = useState(true);
  const [ratingsToggle, setRatingsToggle] = useState(true);
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(1);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state?.products);


  const keyword = params.keyword;

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update the current page state
  };

  const clearFilters = () => {
    setPrice([0, 200000]);
    setCategory("");
    setRatings(0);
  };

  // Get All Products --- Filter/Search/Sort
  const getProducts = async (
    keyword = "",
    price = [0, 10000],
    ratings = 0,
    currentPage = 1,
    category,
    subcategory = "",
    controller
  ) => {
    try {
      dispatch(allProductsRequest());
      const serverResponse = await publicCommunication?.getAllProducts(
        keyword,
        price,
        ratings,
        currentPage,
        category,
        // subcategory,
        controller
      );
      console.log(serverResponse)
      setCount(Math.ceil(serverResponse.data.filteredProductsCount / 12))
      if (serverResponse?.data?.success === true) {
        dispatch(allProductsSuccess(serverResponse?.data));
      }
    } catch (error) {
      if (error.name === "CanceledError") {
        //do nothing
      } else {
        dispatch(allProductsFail("Something went wrong!"));
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await publicCommunication.getAllCategory();
      // console.log(data)
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    getProducts(keyword, price, ratings, currentPage, category, controller);
    return () => {
      controller.abort();
    };
  }, [keyword, price, ratings, currentPage, category]);

  return (
    <>
      <MetaData title="Shop High-Quality Rounded & Twisted Cotton Wicks | Ankhand Jyot" />
      <section className="w-full overflow-hidden bg-primary-beige flex justify-center items-center">
        <main className="w-full pt-5">
          {/* <!-- row --> */}
          <div className="flex gap-3 mt-2 sm:mt-2 sm:mx-3 m-auto mb-7">
            {/* <!-- sidebar column  --> */}
            <div className="hidden sm:flex flex-col w-1/5 px-1">
              {/* <!-- nav tiles --> */}
              <div className="flex flex-col bg-white  rounded-sm shadow">
                {/* <!-- filters header --> */}
                <div className="flex items-center justify-between gap-5 px-4 py-2 border-b ">
                  <p className="text-lg font-medium">Filters</p>
                  <span
                    className="uppercase text-primary-blue text-xs cursor-pointer font-medium"
                    onClick={() => clearFilters()}
                  >
                    clear all
                  </span>
                </div>

                <div className="flex flex-col gap-2 py-3 text-sm overflow-hidden">
                  {/* price slider filter */}
                  <div className="flex flex-col gap-2 border-b px-4 ">
                    <span className="font-medium text-xs">PRICE</span>

                    <Slider
                      value={price}
                      onChange={priceHandler}
                      valueLabelDisplay="auto"
                      getAriaLabel={() => "Price range slider"}
                      min={0}
                      max={1000}
                    />

                    <div className="flex gap-3 items-center justify-between mb-2 min-w-full">
                      <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">
                        ₹{price[0].toLocaleString()}
                      </span>
                      <span className="font-medium text-gray-400">to</span>
                      <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">
                        ₹{price[1].toLocaleString()}
                      </span>
                    </div>
                  </div>
                  {/* price slider filter */}

                  {/* category filter */}
                  <div className="flex flex-col border-b px-4 ">
                    <div
                      className="flex justify-between cursor-pointer py-2 pb-4 items-center"
                      onClick={() => setCategoryToggle(!categoryToggle)}
                    >
                      <p className="font-medium text-xs uppercase">Category</p>
                      {categoryToggle ? (
                        <ExpandLessIcon sx={{ fontSize: "20px" }} />
                      ) : (
                        <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                      )}
                    </div>
                    {categoryToggle && (
                      <ul className="">
                        {categories?.map((data, index) => (
                          <>
                            {/* category list  */}
                            <li
                              key={index}
                              className={`${index === selectedCategory && "text-red-800"
                                }  cursor-pointer capitalize py-4 font-medium text-sm text-primary-black relative  border-b`}
                              onClick={() => {
                                selectedCategory === index
                                  ? setSelectedCategory(null)
                                  : setSelectedCategory(index);
                              }}
                            >
                              <span
                                className="flex items-center justify-between"
                                to={data?.link}
                                onClick={() => setCategory(data?._id)}
                              >
                                {data?.name}
                                {/* {data?.subcategory?.length > 0 ? (
                                  index === selectedCategory ? (
                                    <KeyboardArrowUpIcon
                                      fontSize="inherit"
                                      className="text-primary-black "
                                    />
                                  ) : (
                                    <KeyboardArrowDownIcon
                                      fontSize="inherit"
                                      className="text-primary-black"
                                    />
                                  )
                                ) : (
                                  <span></span>
                                )} */}
                              </span>
                            </li>
                            {/* sub categories list  */}
                            {/* {index === selectedCategory && (
                              <FormControl>
                                <RadioGroup
                                  aria-labelledby="category-radio-buttons-group"
                                  onChange={(e) => setCategory(e.target.value)}
                                  name="category-radio-buttons"
                                  value={category}
                                >
                                  {data?.subcategory?.map((el, i) => (
                                    <>
                                      <FormControlLabel
                                        className="capitalize"
                                        value={el?.name}
                                        control={<Radio size="small" />}
                                        label={
                                          <span
                                            className="text-sm font-medium"
                                            key={i}
                                          >
                                            {el?.name}
                                          </span>
                                        }
                                      />
                                    </>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            )} */}
                            {/* sub categories list  */}
                          </>
                        ))}
                      </ul>
                    )}
                  </div>
                  {/* category filter */}

                  {/* ratings filter */}
                  {/* <div className="flex flex-col border-b px-4">
                    <div
                      className="flex justify-between cursor-pointer py-2 pb-4 items-center"
                      onClick={() => setRatingsToggle(!ratingsToggle)}
                    >
                      <p className="font-medium text-xs uppercase">ratings</p>
                      {ratingsToggle ? (
                        <ExpandLessIcon sx={{ fontSize: "20px" }} />
                      ) : (
                        <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                      )}
                    </div>

                    {ratingsToggle && (
                      <div className="flex flex-col pb-1">
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="ratings-radio-buttons-group"
                            onChange={(e) => setRatings(e.target.value)}
                            value={ratings}
                            name="ratings-radio-buttons"
                          >
                            {[4, 3, 2, 1].map((el, i) => (
                              <FormControlLabel
                                value={el}
                                key={i}
                                control={<Radio size="small" />}
                                label={
                                  <span className="flex items-center text-sm">
                                    {el}
                                    <StarIcon
                                      sx={{ fontSize: "12px", mr: 0.5 }}
                                    />{" "}
                                    & above
                                  </span>
                                }
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </div>
                    )}
                  </div> */}
                  {/* ratings filter */}
                </div>
              </div>
              {/* <!-- nav tiles --> */}
            </div>
            {/* <!-- sidebar column  --> */}

            {/* <!-- product column --> */}
            {loading ? (
              <div className="flex-1">
                <Loader />
              </div>
            ) : (
              <div className="flex-1">
                {products?.length > 0 ? (
                  <div className="w-full relative">
                    <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-x-7 gap-y-5 px-5">
                      {products?.map((data, i) => {
                        return (
                          <Product
                            product={data}
                            _id={data?._id}
                            name={data?.name}
                            images={data?.brand?.logo?.url}
                            ratings={data?.ratings}
                            numOfReviews={data?.numOfReviews}
                            price={data?.price}
                            cuttedPrice={data?.cuttedPrice}
                          />
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 bg-primary-beige shadow-sm rounded-sm p-6 sm:p-16">
                    <img
                      draggable="false"
                      className="w-1/2 h-44 object-contain"
                      src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png"
                      alt="Search Not Found"
                    />
                    <h1 className="text-2xl font-medium text-gray-900">
                      Sorry, no results found!
                    </h1>
                    <p className="text-xl text-center text-primary-grey">
                      Please check the spelling or try searching for something
                      else
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* <!-- product column --> */}
          </div>
          {/* <!-- row --> */}
        </main>
      </section>
      <div className="flex items-center justify-center py-5">
        <Pagination
          count={count}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
          className="p-2 rounded-lg"
        />
      </div>
    </>
  );
};

export default Products;
