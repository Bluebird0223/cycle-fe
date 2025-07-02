"use client"

import { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import HomeIcon from "@mui/icons-material/Home"
import CategoryIcon from "@mui/icons-material/Category"
import LoginIcon from "@mui/icons-material/Login"
import PersonIcon from "@mui/icons-material/Person"

import Searchbar from "./Searchbar"
import PrimaryDropDownMenu from "./PrimaryDropDownMenu"
import KanchanDeepLogoWhite from "../../../assets/images/KanchanDeepLogoWhite.png"
import StickeyHeader from "./StickeyHeader"

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user)
  const { cartItems } = useSelector((state) => state.cart)

  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false)
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false)
  const [toggleNavigationDropDown, setToggleNavigationDropDown] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  // Refs for menu hover detection
  const menuRef = useRef(null)
  const timeoutRef = useRef(null)
  const headerRef = useRef(null)

  const navigationItems = [
    {
      title: "Home",
      icon: <HomeIcon sx={{ fontSize: "16px" }} />,
      path: "/",
    },
    {
      title: "Products",
      icon: <CategoryIcon sx={{ fontSize: "16px" }} />,
      path: "/products",
    },
    {
      title: "Profile",
      icon: <PersonIcon sx={{ fontSize: "16px" }} />,
      path: "/profile",
      showOnlyWhenLoggedIn: true,
    },
    {
      title: "Login",
      icon: <LoginIcon sx={{ fontSize: "16px" }} />,
      path: "/login",
      showOnlyWhenLoggedOut: true,
    },
  ]

  // Improved menu hover handling with delay
  const handleMenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setToggleNavigationDropDown(true)
  }

  const handleMenuMouseLeave = () => {
    // Add a delay before hiding the menu
    timeoutRef.current = setTimeout(() => {
      setToggleNavigationDropDown(false)
    }, 300) // 300ms delay
  }

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggleNavigationDropDown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Add scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 10) {
          headerRef.current.classList.add("shadow-xl")
        } else {
          headerRef.current.classList.remove("shadow-xl")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      {/* Enhanced Top Banner - Responsive for all devices */}
      <StickeyHeader/>

      {/* Main Header with Beautiful Gradient */}
      <header
        ref={headerRef}
        className="sticky top-0 w-full z-50 py-2 md:py-3 lg:py-4 shadow-lg transition-shadow duration-300"
        style={{
          background: "#550000",
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 flex justify-between items-center relative">
          {/* Left Section: Logo + Mobile Menu Button */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setToggleMobileMenu(!toggleMobileMenu)}
              className="md:hidden text-white text-xl focus:outline-none hover:text-red-300 transition-all duration-300 transform hover:scale-110 p-2 rounded-full hover:bg-gray-200/20"
              aria-label="Toggle menu"
            >
              {toggleMobileMenu ? <CloseIcon /> : <MenuIcon />}
            </button>

            {/* Logo - Responsive sizing with floating animation */}
            <Link
              className="h-12 sm:h-14 md:h-16 lg:h-20 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg logo-container"
              to="/"
            >
              <img
                draggable="false"
                className="h-full w-auto object-contain filter drop-shadow-md logo-image"
                src={KanchanDeepLogoWhite || "/placeholder.svg"}
                alt="Kanchan Deep Logo"
              />
            </Link>
          </div>

          {/* Center: Search Bar - Hidden on mobile when search is active */}
          <div className={`flex-1 max-w-xl mx-2 sm:mx-4 ${showMobileSearch ? "hidden sm:block" : ""}`}>
            <Searchbar />
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="sm:hidden text-white text-xl p-2 hover:text-red-300 transition-all duration-300"
            aria-label="Toggle search"
          >
            {showMobileSearch ? <CloseIcon /> : <span className="material-icons">search</span>}
          </button>

          {/* Mobile Search Expanded - Full Width */}
          {showMobileSearch && (
            <div className="absolute top-full left-0 w-full p-3 bg-white shadow-lg sm:hidden z-20">
              <Searchbar />
            </div>
          )}

          {/* Right Section: Desktop Menu */}
          <div className="hidden md:flex items-center justify-end gap-2 lg:gap-3 relative flex-shrink-0">
            {/* Navigation Dropdown with Better Hover */}
            <div
              ref={menuRef}
              className="relative"
              onMouseEnter={handleMenuMouseEnter}
              onMouseLeave={handleMenuMouseLeave}
            >
              <button className="nav-button flex items-center text-white font-medium gap-1 lg:gap-2 cursor-pointer hover:text-red-300 transition-all duration-300 px-2 lg:px-3 py-2 rounded-lg hover:bg-gray-200/20 backdrop-blur-sm whitespace-nowrap text-sm lg:text-base relative overflow-hidden group">
                <span className="nav-icon-wrapper">
                  <CategoryIcon sx={{ fontSize: "18px" }} className="nav-icon" />
                </span>
                <span className="hidden sm:inline">Menu</span>
                <span className="nav-icon-wrapper">
                  {toggleNavigationDropDown ? (
                    <ExpandLessIcon sx={{ fontSize: "16px" }} className="nav-icon" />
                  ) : (
                    <ExpandMoreIcon sx={{ fontSize: "16px" }} className="nav-icon" />
                  )}
                </span>
                <span className="nav-highlight absolute bottom-0 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </button>

              {/* Navigation Dropdown Menu - Shows on Hover with Better Behavior */}
              {toggleNavigationDropDown && (
                <div className="absolute top-full right-0 md:left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 backdrop-blur-sm bg-white/95 animate-fadeIn">
                  {navigationItems.map((item, index) => {
                    // Show/hide items based on authentication state
                    if (item.showOnlyWhenLoggedOut && isAuthenticated) return null
                    if (item.showOnlyWhenLoggedIn && !isAuthenticated) return null

                    return (
                      <Link
                        key={index}
                        to={item.path}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-red-700 transition-all duration-300 transform hover:translate-x-1"
                      >
                        <span className="text-red-600">{item.icon}</span>
                        {item.title}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* User Section - Fixed styling */}
            {isAuthenticated === false ? (
              <Link
                to="/login"
                className="nav-button flex items-center text-white font-medium gap-1 lg:gap-2 cursor-pointer hover:text-red-300 transition-all duration-300 px-2 lg:px-3 py-2 rounded-lg hover:bg-gray-200/20 backdrop-blur-sm whitespace-nowrap text-sm lg:text-base relative overflow-hidden group"
              >
                <span className="nav-icon-wrapper">
                  <LoginIcon sx={{ fontSize: "18px" }} className="nav-icon" />
                </span>
                <span className="hidden sm:inline">Login</span>
                <span className="nav-highlight absolute bottom-0 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ) : (
              <div className="relative">
                <button
                  className="nav-button userDropDown flex items-center text-white font-medium gap-1 lg:gap-2 cursor-pointer hover:text-red-300 transition-all duration-300 px-2 lg:px-3 py-2 rounded-lg hover:bg-gray-200/20 backdrop-blur-sm whitespace-nowrap text-sm lg:text-base relative overflow-hidden group"
                  onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}
                >
                  <div className="w-7 h-7 lg:w-8 lg:h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs lg:text-sm font-bold text-white">
                      {user.name && user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:inline">{user.name && user.name.split(" ", 1)}</span>
                  <span className="nav-icon-wrapper">
                    {togglePrimaryDropDown ? (
                      <ExpandLessIcon sx={{ fontSize: "16px" }} className="nav-icon" />
                    ) : (
                      <ExpandMoreIcon sx={{ fontSize: "16px" }} className="nav-icon" />
                    )}
                  </span>
                  <span className="nav-highlight absolute bottom-0 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </button>

                {togglePrimaryDropDown && (
                  <PrimaryDropDownMenu
                    setToggleMobileMenu={setToggleMobileMenu}
                    setTogglePrimaryDropDown={setTogglePrimaryDropDown}
                    user={user}
                  />
                )}
              </div>
            )}

            {/* Cart - Fixed styling */}
            <Link
              to="/cart"
              className="nav-button flex items-center text-white font-medium gap-1 lg:gap-2 relative hover:text-red-300 transition-all duration-300 px-2 lg:px-3 py-2 rounded-lg hover:bg-gray-200/20 backdrop-blur-sm whitespace-nowrap text-sm lg:text-base overflow-hidden group"
            >
              <span className="relative nav-icon-wrapper">
                <ShoppingCartIcon sx={{ fontSize: "20px" }} className="nav-icon" />
                {cartItems.length > 0 && (
                  <div className="w-4 h-4 lg:w-5 lg:h-5 bg-gradient-to-r from-red-500 to-red-600 text-xs rounded-full absolute -top-2 -right-2 flex justify-center items-center border-2 border-white animate-pulse shadow-lg cart-badge">
                    {cartItems.length}
                  </div>
                )}
              </span>
              <span className="hidden sm:inline">Cart</span>
              <span className="nav-highlight absolute bottom-0 left-0 h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>

        {/* Enhanced Mobile Menu - Slide from left */}
        {toggleMobileMenu && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
              onClick={() => setToggleMobileMenu(false)}
            ></div>

            {/* Menu Panel */}
            <div className="absolute top-0 left-0 w-72 max-w-[80vw] h-full bg-white shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto animate-slide-in">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-red-800 to-red-700">
                <h2 className="text-white font-semibold text-lg">Menu</h2>
                <button
                  onClick={() => setToggleMobileMenu(false)}
                  className="text-white hover:text-yellow-300 transition-all duration-300 p-2 rounded-full hover:bg-white/10"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* User Section */}
              {isAuthenticated && (
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-lg">
                        {user.name && user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email || "User"}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Items */}
              <ul className="py-2">
                {navigationItems.map((item, index) => {
                  // Show/hide items based on authentication state
                  if (item.showOnlyWhenLoggedOut && isAuthenticated) return null
                  if (item.showOnlyWhenLoggedIn && !isAuthenticated) return null

                  return (
                    <li key={index}>
                      <Link
                        onClick={() => setToggleMobileMenu(false)}
                        to={item.path}
                        className="flex items-center gap-3 px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-red-700 transition-all duration-300 border-b border-gray-100 mobile-nav-item"
                      >
                        <span className="text-red-600 mobile-nav-icon">{item.icon}</span>
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </li>
                  )
                })}

                {/* Login for mobile */}
                {!isAuthenticated && (
                  <li>
                    <Link
                      onClick={() => setToggleMobileMenu(false)}
                      to="/login"
                      className="flex items-center gap-3 px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-red-700 transition-all duration-300 border-b border-gray-100 mobile-nav-item"
                    >
                      <span className="text-red-600 mobile-nav-icon">
                        <LoginIcon />
                      </span>
                      <span className="font-medium">Login</span>
                    </Link>
                  </li>
                )}

                {/* Cart for mobile */}
                <li>
                  <Link
                    onClick={() => setToggleMobileMenu(false)}
                    to="/cart"
                    className="flex items-center gap-3 px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-red-700 transition-all duration-300 border-b border-gray-100 mobile-nav-item"
                  >
                    <span className="text-red-600 relative mobile-nav-icon">
                      <ShoppingCartIcon />
                      {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                          {cartItems.length}
                        </span>
                      )}
                    </span>
                    <span className="font-medium">Cart</span>
                    {cartItems.length > 0 && (
                      <span className="ml-auto bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>
                </li>
              </ul>

              {/* Contact Info for Mobile */}
              <div className="p-4 border-t mt-auto">
                <h3 className="font-medium text-gray-700 mb-2">Contact Us</h3>
                <div className="flex flex-col gap-2 text-sm">
                  <a href="tel:7420989590" className="flex items-center gap-2 text-gray-600 hover:text-red-600">
                    <PhoneIcon fontSize="small" />
                    <span>7420989590</span>
                  </a>
                  <a
                    href="mailto:info@kanchandeep.com"
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600"
                  >
                    <EmailIcon fontSize="small" />
                    <span>info@kanchandeep.com</span>
                  </a>
                </div>

                {/* Social Media for Mobile */}
                <div className="flex gap-4 mt-4">
                  <a
                    href="https://www.instagram.com/kanchan_deep_jyot/"
                    className="text-gray-600 hover:text-pink-500 transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href="https://www.facebook.com/kanchandeepjyot"
                    className="text-gray-600 hover:text-blue-600 transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href="https://twitter.com/IHandlooms"
                    className="text-gray-600 hover:text-blue-400 transition-all duration-300"
                    aria-label="Twitter"
                  >
                    <TwitterIcon />
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UChv7RRVm3S5yMFjXbbQfBMw"
                    className="text-gray-600 hover:text-red-600 transition-all duration-300"
                    aria-label="YouTube"
                  >
                    <YouTubeIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes glow {
          0%, 100% {
            filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.6));
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        
        .nav-button:hover .nav-icon-wrapper {
          animation: bounce 0.5s ease infinite;
        }
        
        .nav-icon {
          transition: transform 0.3s ease;
        }
        
        .nav-button:hover .nav-icon {
          transform: scale(1.2);
        }
        
        .cart-badge {
          animation: pulse 1.5s infinite;
        }
        
        .mobile-nav-item:hover .mobile-nav-icon {
          animation: bounce 0.5s ease infinite;
        }

        .logo-container {
          position: relative;
        }

        .logo-image {
          transition: all 0.3s ease;
        }

        .logo-container:hover .logo-image {
          transform: scale(1.05);
        }
        
        @media (max-width: 640px) {
          .material-icons {
            font-family: 'Material Icons';
            font-weight: normal;
            font-style: normal;
            font-size: 24px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-feature-settings: 'liga';
            -webkit-font-smoothing: antialiased;
            content: "search";
          }
        }
      `}</style>
    </>
  )
}

export default Header
