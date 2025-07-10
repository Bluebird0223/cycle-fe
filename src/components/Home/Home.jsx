import { useEffect } from "react";
import Categories from "../Layouts/Categories";
import Banner from "./Banner/Banner";
import DealSlider from "./DealSlider/DealSlider";
import ProductSlider from "./ProductSlider/ProductSlider";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getSliderProducts } from "../../actions/productAction";
import { useSnackbar } from "notistack";
import MetaData from "../Layouts/MetaData";
import { Link } from "react-router-dom";
import aboutImg from "../../assets/images/Products/Lady1.jpeg";
import sale1 from "../../assets/images/Products/sale1.jpeg";
import sale2 from "../../assets/images/Products/sale2.jpeg";
import sale3 from "../../assets/images/Products/sale3.jpeg";
import Testimonials from "../Testimonials";
import RecentBlog from "../RecentBlog";
import AboutUs from  "../AboutUs";

const Home = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      {/* <MetaData title="Online Shopping for All Puja Needs | Kanchan Deep Jyot" /> */}
      <Categories />
      <main className="flex flex-col gap-3 sm:mt-2">
        <Banner />
        <DealSlider title={"Discounts for You"} />
        {!loading && (
          <ProductSlider
            title={"Suggested for You"}
            tagline={"Based on Your Activity"}
          />
        )}
        
        <section className="py-3">
          {/* <div className="container mx-2"> */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Column - Full-Width Banner */}
              <div className="flex h-full flex-col items-start">
                {/* Image */}
                <div className="relative w-full h-full">
                  <img
                    src={sale1}
                    alt="Items on Sale"
                    layout="fill"
                    className="h-full w-full object-cover"
                    objectFit="cover"
                    priority={true}
                  />
                  <div className="absolute top-0 pl-14 left-0 w-full h-full p-3 bg-black bg-opacity-40 flex flex-col justify-center items-start">
                    <h3 className="text-white  text-2xl font-bold">
                      Items on SALE
                    </h3>
                    <p className="text-white discount_font">Discounts up to 30%</p>
                    <a
                      href="#"
                      className="mt-2 px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 custom-button"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column - Two Smaller Banners */}
              <div className="grid grid-cols-1 gap-4">
                {/* Top Banner */}
                <div className="relative w-full h-48">
                  <img
                    src={sale2}
                    alt="Combo Offer"
                    className="h-full w-full object-cover"
                    layout="fill"
                    objectFit="cover"
                    priority={true}
                  />
                  <div className="absolute pl-14 top-0 left-0 w-full h-full p-3 bg-black bg-opacity-20 flex flex-col justify-center items-start">
                    <h3 className="text-white text-2xl font-bold">
                      Combo Offers
                    </h3>
                    <p className="text-white discount_font">Discounts up to 50%</p>
                    <a
                      href="#"
                      className="mt-2 px-4 py-2 bg-yellow-400 text-black hover:scale-105 rounded-md hover:bg-yellow-500 custom-button"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>

                {/* Bottom Banner */}
                <div className="relative w-full h-48">
                  <img
                    src={sale3}
                    className="h-full w-full object-cover"
                    alt="Discount Coupons"
                    layout="fill"
                    objectFit="cover"
                    priority={true}
                  />
                  <div className="absolute pl-14 top-0 left-0 w-full h-full p-3 bg-black bg-opacity-20 flex flex-col justify-center items-start">
                    <h3 className="text-white text-2xl font-bold">
                      Discount Coupons
                    </h3>
                    <p className="text-white discount_font">Discounts up to 40%</p>
                    <a
                      href="#"
                      className="mt-2 px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 custom-button"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          {/* </div> */}
        </section>
        {/* <DealSlider title={"Top Offers On"} /> */}
        {!loading && (
          <ProductSlider
            title={"Don't Miss These!"}
            tagline={"Inspired by your order"}
          />
        )}
          
        <Testimonials />
        {/* about Section  */}
        <section className="py-3">
  <div className="container mx-auto bg-gray-200">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg shadow-md">
      {/* Left - Image */}
      <div className="relative w-full h-64">
        <img
          src={aboutImg}
          alt="Sale Banner"
          className="h-full w-full object-cover rounded-lg"
        />
      </div>

      {/* Right - Text Content */}
      <div className="flex flex-col justify-center p-6">
        <h1 className="text-2xl font-bold text-gray-800">India’s Largest Pooja Accessories Brand – Everything for Your Holy  Rituals!
        </h1>
        <p className="text-gray-600 mt-2">At Kanchan Deepjyot, we specialize in making premium diya batti,rui 
          batti, and, moli dhaga, for diya aarti and diya pooja. With years of expertise, we deliver superior
           cotton wicks designed for a clean, consistent burn, perfect for aarti diya, and akhand jot. 
           Using the finest cotton and advanced techniques, our wicks honor tradition and ensure quality. 
           Whether it is for your home, temples, or sacred ceremonies, trust Kanchan Deepjyot for dependable 
           products and great customer service.
           Light up your spaces with grace and timeless tradition.</p>
           <a href="/about" style={{color:"blue"}}>Read More</a>
</div>
    </div>
  </div>
</section>


        <RecentBlog />
      </main>
    </>
  );
};

export default Home;