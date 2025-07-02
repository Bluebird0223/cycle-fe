"use client"

import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Searchbar = ({ isMobile = false, onClose }) => {
  const [keyword, setKeyword] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/products/${encodeURIComponent(keyword.trim())}`)
    } else {
      navigate("/products")
    }
    if (isMobile && onClose) {
      onClose()
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setKeyword(value)
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const clearSearch = () => {
    setKeyword("")
    inputRef.current?.focus()
  }

  // Auto-focus on mobile when component mounts
  useEffect(() => {
    if (isMobile && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isMobile])

  return (
    <div className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className={`w-full flex justify-between items-center shadow-lg bg-white rounded-full overflow-hidden transition-all duration-300 transform ${
          isMobile ? "px-3 py-3 shadow-xl" : "px-2 sm:px-3 md:px-4 py-2 sm:py-2.5"
        } ${
          isFocused
            ? "ring-2 sm:ring-4 ring-yellow-300/50 shadow-2xl scale-100 sm:scale-105 bg-gradient-to-r from-white to-yellow-50"
            : "hover:shadow-xl hover:scale-100 sm:hover:scale-102"
        }`}
      >
        {/* Search Icon - Left side on mobile */}
        {isMobile && <SearchIcon className="text-red-600 mr-3 flex-shrink-0" sx={{ fontSize: "24px" }} />}

        <input
          ref={inputRef}
          value={keyword}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`flex-1 outline-none border-none placeholder-gray-500 focus:placeholder-gray-400 transition-all duration-300 bg-transparent ${
            isMobile ? "text-base py-1" : "text-xs sm:text-sm md:text-base"
          }`}
          type="text"
          placeholder={isMobile ? "Search products..." : "Search for products, brands and more..."}
          autoComplete="off"
        />

        {/* Clear button - show when there's text */}
        {keyword && (
          <button
            type="button"
            onClick={clearSearch}
            className={`p-1 sm:p-1.5 rounded-full transition-all duration-300 transform hover:scale-110 text-gray-400 hover:text-gray-600 mr-1 sm:mr-2 ${
              isMobile ? "p-2" : ""
            }`}
          >
            <CloseIcon sx={{ fontSize: isMobile ? "20px" : "16px" }} />
          </button>
        )}

        {/* Search Button */}
        <button
          type="submit"
          className={`rounded-full transition-all duration-300 transform hover:scale-110 flex-shrink-0 ${
            isMobile ? "p-2.5 ml-2" : "p-1.5 sm:p-2"
          } ${
            isFocused
              ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
              : "bg-gradient-to-r from-gray-100 to-gray-200 text-red-600 hover:from-red-50 hover:to-red-100 hover:text-red-700"
          }`}
        >
          <SearchIcon sx={{ fontSize: isMobile ? "24px" : "18px" }} />
        </button>

        {/* Close button for mobile */}
        {isMobile && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2 ml-2 rounded-full transition-all duration-300 transform hover:scale-110 text-gray-400 hover:text-gray-600"
          >
            <CloseIcon sx={{ fontSize: "24px" }} />
          </button>
        )}
      </form>
    </div>
  )
}

export default Searchbar
