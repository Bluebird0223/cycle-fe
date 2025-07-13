"use client"

import { Link, useNavigate } from "react-router-dom"

const Product = ({
  _id = "",
  image = "",
  brand,
  name = "Product Name",
  shortName = "",
  cuttedPrice = "",
  offer = "",
  price = "375.00",
  rating = 5,
  reviewCount = 1,
}) => {
  const navigate = useNavigate()

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-sm ${index < rating ? "text-orange-400" : "text-gray-300"}`}>
        ★
      </span>
    ))
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    // Add to cart logic here
    console.log("Add to cart:", _id)

    // Navigate to product page
    navigate(`/product/${_id}`)
  }

  return (
    <>
      <div className="bg-white w-48 p-2 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 relative">
        <div className="absolute top-2 right-2 bg-indigo-800 text-white text-xs font-semibold px-2 py-1 rounded z-50">NEW</div>

        <Link to={`/product/${_id}`} className="block">
          <div className="bg-red-200 mb-4">
            <img
              src={brand?.logo?.url || image || "/placeholder.svg?height=200&width=200"}
              alt={name}
              className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-200 rounded ease-in-out"
              draggable={false}
            />
          </div>

          {/* Product Name */}
          <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 min-h-[2.5rem]">
            {name.length > 50 ? `${name.slice(0, 50)}...` : name}
          </h3>

          {/* Price */}
          <div className="text-lg font-semibold text-gray-900 mb-2">Rs. {price}</div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            <div className="flex">{renderStars()}</div>
            <span className="text-xs text-gray-500">({reviewCount})</span>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-red-600 font-semibold text-base py-3 px-6 rounded-lg transition-colors"
            onClick={handleAddToCart}
          >
            ADD
          </button>
          <button
            className="border border-gray-300 hover:bg-gray-50 p-3 rounded-lg transition-colors"
            onClick={(e) => {
              e.preventDefault()
              // Add to wishlist logic
              console.log("Add to wishlist:", _id)
            }}
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default Product
