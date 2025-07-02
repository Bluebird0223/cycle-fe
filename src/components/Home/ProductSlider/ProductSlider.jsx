import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getRandomProducts } from "../../../utils/functions";
import { settings } from "../DealSlider/DealSlider";
import Product from "./Product";
import { useEffect, useState } from "react";
import publicCommunication from "../../../service/publicCommunication";

const ProductSlider = ({ title, tagline }) => {
  // const { loading, products } = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);

  const initializeProducts = async () => {
    const p = await publicCommunication.getFirst12Products();
    setProducts(p)
  };

  useEffect(() => {
    initializeProducts();
  }, []);

  return (
<section className="bg-primary-beige w-full overflow-hidden">
  {/* <!-- Header --> */}
  <div className="flex flex-col sm:flex-row px-4 sm:px-6 py-4 justify-between items-center ">
    <div className="title flex flex-col gap-0.5 text-center sm:text-left">
      <h1 className="text-lg sm:text-xl font-medium">{title}</h1>
      <p className="text-sm sm:text-base text-gray-400">{tagline}</p>
    </div>
    <Link
      to="/products"
      className="bg-red-900 text-xs sm:text-sm font-medium text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm shadow-lg uppercase mt-2 sm:mt-0"
    >
      View All
    </Link>
  </div>

  {/* <!-- Slider Section --> */}
  <Slider {...settings} className="flex items-center justify-between p-1">
    {products?.map((p) => (
      <Product
        key={p._id}
        _id={p._id}
        name={p.name}
        images={p?.brand?.logo?.url}
        ratings={5}
        numOfReviews={200}
        price={p.price}
        cuttedPrice={p.cuttedPrice}
      />
    ))}
  </Slider>
</section>

  );
};

export default ProductSlider;
  