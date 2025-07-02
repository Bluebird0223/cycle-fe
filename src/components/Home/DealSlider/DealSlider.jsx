"use client"

import Product from "./Product"
import Slider from "react-slick"
import { Nxt, Pre } from "../Banner/Banner"
import { Link } from "react-router-dom"
import publicCommunication from "../../../service/publicCommunication"
import { useEffect, useState } from "react"

export const settings = {
  autoplay: true,
  autoplaySpeed: 2000,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 1,
  swipe: true,
  nextArrow: <Nxt />,
  prevArrow: <Pre />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

// Mock data for demonstration (matching the image design)
const mockProducts = [
  {
    _id: "1",
    image: "/placeholder.svg?height=200&width=200",
    name: "Naivedya Gold Neem Sambrani Cups (18 pcs + Holder)",
    price: "375.00",
    rating: 5,
    reviewCount: 1,
  },
  {
    _id: "2",
    image: "/placeholder.svg?height=200&width=200",
    name: "Naivedya Gold - Chandan Sambrani Cups (18 pcs +",
    price: "375.00",
    rating: 4,
    reviewCount: 4,
  },
  {
    _id: "3",
    image: "/placeholder.svg?height=200&width=200",
    name: "Naivedya Gold - Rose Cup Sambrani (18 pcs + Holder)",
    price: "375.00",
    rating: 5,
    reviewCount: 2,
  },
  {
    _id: "4",
    image: "/placeholder.svg?height=200&width=200",
    name: "Naivedya Gold - Jasmine Sambrani Cups (18 pcs +",
    price: "375.00",
    rating: 5,
    reviewCount: 2,
  },
]

const DealSlider = ({ title }) => {
  const [products, setProducts] = useState([])

  const fetchProducts = async (title) => {
    try {
      const products = await publicCommunication.getProductsByGroupName(title)
      if (products && products.length > 0) {
        // Add rating and reviewCount to fetched products if not present
        const productsWithRating = products.map((product) => ({
          ...product,
          rating: product.rating || Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
          reviewCount: product.reviewCount || Math.floor(Math.random() * 10) + 1,
        }))
        setProducts(productsWithRating)
      } else {
        setProducts(mockProducts)
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
      setProducts(mockProducts)
    }
  }

  useEffect(() => {
    if (title) {
      fetchProducts(title)
    } else {
      setProducts(mockProducts)
    }
  }, [title])

  return (
    <section className="bg-white w-full shadow-sm border border-gray-200 rounded-lg overflow-hidden mb-6">
      {/* Header */}
      <div className="flex px-6 py-4 justify-between items-center border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800 capitalize">{title}</h1>
        <Link
          to="/products"
          className="text-xs font-medium text-white px-4 py-2 rounded transition-colors"
          style={{ backgroundColor: "#7d0d02" }}
        >
          VIEW ALL
        </Link>
      </div>

      {/* Product Slider */}
      <div className="p-4">
        <Slider {...settings}>
          {products?.map((item, i) => (
            <div key={item._id || i} className="px-2">
              <Product {...item} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default DealSlider
