"use client"

import Product from "./Product"
import Slider from "react-slick"
import { Nxt, Pre } from "../Banner/Banner"
import { Link } from "react-router-dom"
import publicCommunication from "../../../service/publicCommunication"
import { useEffect, useState } from "react"
// import image1 from "../../../../src/assets/images/Products/camphor.jpg"
// Reference images from public folder
const image1 = '/products/Artboard 1.jpg'
const image2 = '/products/Artboard 2.jpg'
const image3 = '/products/Artboard 3.jpg'
const image4 = '/products/Artboard 4.jpg'
const image5 = '/products/Artboard 5.jpg'


export const settings = {
  // autoplay: true,
  // autoplaySpeed: 2000,
  dots: false,
  infinite: true,
  // speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  initialSlide: 1,
  swipe: true,
  nextArrow: <Nxt />,
  prevArrow: <Pre />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

// Mock data with all imported images
const mockProducts = [
  // {
  //   _id: "1",
  //   image: image1,
  //   name: "Naivedya Gold Neem Sambrani Cups (18 pcs + Holder)",
  //   price: "375.00",
  //   rating: 5,
  //   reviewCount: 1,
  // },
  // {
  //   _id: "2",
  //   image: image2,
  //   name: "Naivedya Gold - Chandan Sambrani Cups (18 pcs + Holder)",
  //   price: "375.00",
  //   rating: 4,
  //   reviewCount: 4,
  // },
  // {
  //   _id: "3",
  //   image: image3,
  //   name: "Naivedya Gold - Rose Cup Sambrani (18 pcs + Holder)",
  //   price: "375.00",
  //   rating: 5,
  //   reviewCount: 2,
  // },
  {
    _id: "4",
    image: image4,
    name: "Naivedya Gold - Jasmine Sambrani Cups (18 pcs + Holder)",
    price: "375.00",
    rating: 5,
    reviewCount: 2,
  },
  {
    _id: "4",
    image: image5,
    name: "Naivedya Gold - Jasmine Sambrani Cups (18 pcs + Holder)",
    price: "375.00",
    rating: 5,
    reviewCount: 2,
  },
  {
    _id: "5",
    image: image4,
    name: "Naivedya Gold - Lavender Sambrani Cups (18 pcs + Holder)",
    price: "375.00",
    rating: 4,
    reviewCount: 3,
  },
  {
    _id: "5",
    image: image5,
    name: "Naivedya Gold - Lavender Sambrani Cups (18 pcs + Holder)",
    price: "375.00",
    rating: 4,
    reviewCount: 3,
  },
  {
    _id: "5",
    image: image4,
    name: "Naivedya Gold - Lavender Sambrani Cups (18 pcs + Holder)",
    price: "375.00",
    rating: 4,
    reviewCount: 3,
  },
  {
    _id: "5",
    image: image5,
    name: "Naivedya Gold - Lavender Sambrani Cups (18 pcs + Holder)",
    price: "375.00",
    rating: 4,
    reviewCount: 3,
  },
  {
    _id: "5",
    image: image4,
    name: "Naivedya Gold - Lavender Sambrani Cups (18 pcs + Holder)",
    price: "375.00",
    rating: 4,
    reviewCount: 3,
  },
]

const DealSlider = ({ title }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = async (title) => {
    try {
      setLoading(true)
      setError(null)
      
      const products = await publicCommunication.getProductsByGroupName(title)
      
      if (products && products.length > 0) {
        // Add rating and reviewCount to fetched products if not present
        const productsWithRating = products.map((product) => ({
          ...product,
          rating: product.rating || Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
          reviewCount: product.reviewCount || Math.floor(Math.random() * 10) + 1,
          // Use product image if available, otherwise use first image from images array
          image: product.image || (product.images && product.images[0]?.url) || image1,
        }))
        setProducts(productsWithRating)
      } else {
        setProducts(mockProducts)
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
      setError("Failed to load products")
      setProducts(mockProducts)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (title) {
      fetchProducts(title)
    } else {
      setProducts(mockProducts)
      setLoading(false)
    }
  }, [title])

  // Loading state
  if (loading) {
    return (
      <section className="bg-white shadow-sm border h-46 w-fill border-gray-200 rounded-lg overflow-hidden mb-6">
        <div className="flex px-2 py-4 justify-between items-center border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800 capitalize">{title}</h1>
          {/* <p className="text-sm sm:text-base text-gray-400">{tagline}</p> */}
        </div>
        <div className="p-4">
          <div className="flex space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-1 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-2"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <section className="bg-white w-full shadow-sm border border-gray-200 rounded-lg overflow-hidden mb-6">
        <div className="flex px-6 py-4 justify-between items-center border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800 capitalize">{title}</h1>
        </div>
        <div className="p-4 text-center">
          <p className="text-gray-500">{error}</p>
          <button 
            onClick={() => fetchProducts(title)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden mb-6">
      {/* Header */}
      <div className="flex px-6 py-4 justify-between items-center border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800 capitalize">{title}</h1>
        <Link
          to="/products"
          className="text-xs font-medium text-white px-4 py-2 rounded transition-colors hover:opacity-90"
          style={{ backgroundColor: "#7d0d02" }}
        > 
          VIEW ALL
        </Link>
      </div>

      {/* Product Slider */}
      <div className="p-4">
        {products.length > 0 ? (
          <Slider {...settings}>
            {products.map((item, i) => (
              <div key={item._id || i}>
                <Product {...item} />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No products available</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default DealSlider