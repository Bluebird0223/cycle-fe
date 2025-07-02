"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import publicCommunication from "../../service/publicCommunication"

const Categories = () => {
  const [catNav, setCatNav] = useState([])
  const [loading, setLoading] = useState(true)

  const getAllCategory = async () => {
    try {
      setLoading(true)
      const { data } = await publicCommunication.getAllCategory()
      if (data.success) {
        setCatNav(data.category)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllCategory()
  }, [])

  return (
    <>
      {/* Featured Categories Banner */}
      <section className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-12 md:py-16 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
              Shop by Categories
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Discover our exquisite collection of spiritual and pooja items crafted with devotion for all your
              religious needs
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-4 rounded-full"></div>
          </div> */}

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 shadow-lg animate-pulse">
                  <div className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-gray-200 rounded-full mx-auto mb-6"></div>
                  <div className="w-28 h-5 bg-gray-200 rounded mx-auto mb-3"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
              {catNav?.map((item, i) => (
                <Link
                  to={`/products?category=${item._id}`}
                  className="group bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 border border-red-100 hover:border-red-200 relative overflow-hidden"
                  key={i}
                >
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100 opacity-30 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                  {/* Floating particles effect */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full opacity-20 group-hover:opacity-100 transition-all duration-700 group-hover:animate-bounce"></div>
                  <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-orange-400 rounded-full opacity-15 group-hover:opacity-100 transition-all duration-700 delay-200 group-hover:animate-bounce"></div>

                  {/* Image Container */}
                  <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-200 via-orange-200 to-yellow-200 border-2 border-red-300 group-hover:border-red-400 transition-all duration-500 overflow-hidden shadow-inner">
                    {/* Inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-orange-200 opacity-20 group-hover:opacity-50 transition-opacity duration-500 rounded-full"></div>

                    {/* Rotating border effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 opacity-30 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"></div>
                    <div className="absolute inset-1 rounded-full bg-white"></div>

                    <div className="relative z-20 w-full h-full p-4 md:p-6 flex items-center justify-center">
                      <img
                        draggable="false"
                        className="w-full h-full object-contain transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 filter group-hover:drop-shadow-lg"
                        src={item.image?.[0]?.url || "/placeholder.svg?height=150&width=150"}
                        alt={item.name}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Category Info */}
                  <div className="text-center relative z-10">
                    <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300 text-base md:text-lg mb-2 leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-sm md:text-base text-gray-500 group-hover:text-red-400 transition-colors duration-300 font-medium">
                      Explore Collection
                    </p>

                    {/* Animated underline */}
                    <div className="w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full transition-all duration-500 mx-auto mt-2 rounded-full"></div>
                  </div>

                  {/* Hover Arrow with glow */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* View All Categories Button */}
          {!loading && catNav?.length > 0 && (
            <div className="text-center mt-12 md:mt-16">
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 via-orange-600 to-red-700 hover:from-red-700 hover:via-orange-700 hover:to-red-800 text-white font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border-2 border-red-500 hover:border-red-400"
              >
                <span className="mr-3">View All Categories</span>
                <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(239, 68, 68, 0.6);
          }
        }

        .animate-pulse {
          animation: shimmer 2s ease-in-out infinite;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200px 100%;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .group:hover {
          animation: float 2s ease-in-out infinite;
        }

        .group:hover .shadow-lg {
          animation: glow 2s ease-in-out infinite;
        }

        /* Ensure perfect alignment */
        .grid {
          align-items: start;
        }

        /* Enhanced responsive design */
        @media (max-width: 640px) {
          .text-xs {
            font-size: 0.75rem;
          }
          .grid {
            gap: 1rem;
          }
        }

        /* Gradient text support */
        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
        }
      `}</style>
    </>
  )
}

export default Categories
