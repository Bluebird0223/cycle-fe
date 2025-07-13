"use client"

import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import WorkIcon from "@mui/icons-material/Work"
import StarsIcon from "@mui/icons-material/Stars"
import HelpIcon from "@mui/icons-material/Help"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"
import YouTubeIcon from "@mui/icons-material/YouTube"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import SecurityIcon from "@mui/icons-material/Security"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"
import VerifiedIcon from "@mui/icons-material/Verified"
import KanchanDeepLogoWhite from "../../../assets/images/Logodeep.png"

const footerLinks = [
  {
    title: "about",
    icon: <WorkIcon sx={{ fontSize: "14px" }} />,
    links: [
      { name: "Products", redirect: "/products" },
      { name: "Contact Us", redirect: "/contact-us" },
      { name: "About Us", redirect: "/about" },
    ],
  },
  {
    title: "help",
    icon: <HelpIcon sx={{ fontSize: "14px" }} />,
    links: [
      { name: "Payments", redirect: "/payment-policy" },
      { name: "Shipping", redirect: "/shipping-policy" },
      { name: "Cancellation & Returns", redirect: "/cancellation-policy" },
    ],
  },
  {
    title: "policy",
    icon: <SecurityIcon sx={{ fontSize: "14px" }} />,
    links: [
      { name: "Return Policy", redirect: "/return-policy" },
      { name: "Terms And Conditions", redirect: "/term-and-condition" },
      { name: "Privacy Policy", redirect: "/privacy-policy" },
    ],
  },
  {
    title: "social",
    icon: <StarsIcon sx={{ fontSize: "14px" }} />,
    links: [
      { name: "Facebook", redirect: "https://www.facebook.com/kanchandeepjyot" },
      { name: "Instagram", redirect: "https://www.instagram.com/kanchan_deep_jyot/" },
      { name: "YouTube", redirect: "https://www.youtube.com/channel/UChv7RRVm3S5yMFjXbbQfBMw" },
    ],
  },
]

const Footer = () => {
  const location = useLocation()
  const [adminRoute, setAdminRoute] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin"))
  }, [location])

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FacebookIcon sx={{ fontSize: "18px" }} />,
      url: "https://www.facebook.com/kanchandeepjyot",
      color: "hover:text-blue-500",
    },
    {
      name: "Instagram",
      icon: <InstagramIcon sx={{ fontSize: "18px" }} />,
      url: "https://www.instagram.com/kanchan_deep_jyot/",
      color: "hover:text-pink-500",
    },
    {
      name: "YouTube",
      icon: <YouTubeIcon sx={{ fontSize: "18px" }} />,
      url: "https://www.youtube.com/channel/UChv7RRVm3S5yMFjXbbQfBMw",
      color: "hover:text-red-500",
    },
  ]

  const features = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: "18px" }} />,
      title: "Free Shipping",
      description: "On orders above ₹500",
    },
    {
      icon: <SecurityIcon sx={{ fontSize: "18px" }} />,
      title: "Secure Payment",
      description: "100% secure transactions",
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: "18px" }} />,
      title: "24/7 Support",
      description: "Dedicated customer service",
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: "18px" }} />,
      title: "Quality Assured",
      description: "Premium quality products",
    },
  ]

  // 9 Payment methods data
  const paymentMethods = [
    { name: "Net Banking", image: "/images/netbanking.png" },
    { name: "Cash on Delivery", image: "/images/cashondelivery.png" },
    { name: "PhonePe", image: "/images/phonepe.png" },
    { name: "Google Pay", image: "/images/gpay.png" },
    { name: "VISA", image: "/images/visa.png" },
    { name: "Maestro", image: "/images/maestro.png" },
    { name: "UPI", image: "/images/upi.jpeg" },
    { name: "Mastercard", image: "/images/mastercard.png" },
    { name: "RuPay", image: "/images/rupay.png" },
  ]

  if (adminRoute) return null

  return (
    <>
      {/* Features Section - Neutral */}
      <section className="bg-gray-50 py-4 mt-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-2.5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="text-red-600 mb-1.5 flex justify-center">{feature.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-0.5 text-xs">{feature.title}</h3>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Footer - Enhanced */}
      <footer className="bg-[#EEDBBF] text-gray-800">
        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* Company Info & Logo - Left Side */}
            <div className="lg:col-span-2 space-y-3">
              <div>
                <img
                  src={KanchanDeepLogoWhite || "/placeholder.svg"}
                  alt="Kanchan Deep Jyot"
                  className="h-14 w-auto mb-2"
                />
                <p className="text-gray-700 leading-relaxed text-sm mb-3">
                  Your trusted partner for high-quality puja supplies and spiritual needs.
                </p>

                {/* Social Media - Enhanced */}
                <div className="flex gap-2">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-8 h-8 bg-[#E6D2B3]/60 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 transition-all duration-300 transform hover:scale-110 ${social.color} hover:bg-[#E6D2B3] border border-[#D4C4A8]/50`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Links - Enhanced */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {footerLinks.map((section, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-red-800">{section.icon}</span>
                      <h4 className="font-semibold text-red-800 uppercase tracking-wide text-sm">{section.title}</h4>
                    </div>
                    <ul className="space-y-1">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          {link.redirect.startsWith("http") ? (
                            <a
                              href={link.redirect}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-700 hover:text-gray-900 transition-colors duration-300 hover:underline text-sm"
                            >
                              {link.name}
                            </a>
                          ) : (
                            <Link
                              to={link.redirect}
                              className="text-gray-700 hover:text-gray-900 transition-colors duration-300 hover:underline text-sm"
                            >
                              {link.name}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information & Payment Methods - Enhanced */}
          <div className="mt-5 pt-4 border-t border-[#D4C4A8]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
              {/* Address - Enhanced */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-2">
                  <LocationOnIcon className="text-red-800" sx={{ fontSize: "18px" }} />
                  <h4 className="font-semibold text-red-800 text-sm">Registered Office</h4>
                </div>
                <div className="text-gray-700 leading-relaxed text-sm space-y-0.5 bg-[#E6D2B3]/30 p-3 rounded-lg border border-[#D4C4A8]/50">
                  <p className="font-medium text-gray-800 mb-1">KANCHAN DEEP JYOT PRIVATE LIMITED</p>
                  <p>Plot No.9/10 Gramin Beghar Society, Opp. Bharat Petrol Pump</p>
                  <p>Khadgaon Road, Lava Wadi, Nagpur - 440023 (Maharashtra)</p>
                </div>
              </div>

              {/* Contact Info - Enhanced */}
              <div className="space-y-1.5 ml-4">
                <h4 className="font-semibold text-red-800 mb-2 text-sm">Contact Info</h4>
                <div className="space-y-1 bg-[#E6D2B3]/30 p-3 rounded-lg border border-[#D4C4A8]/50">
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="text-red-800 flex-shrink-0" sx={{ fontSize: "16px" }} />
                    <div className="text-sm">
                      <a href="tel:07122955635" className="text-gray-800 hover:text-red-800 transition-colors block">
                        0712-2955635
                      </a>
                      <a href="tel:7420989590" className="text-gray-800 hover:text-red-800 transition-colors block">
                        7420989590
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <EmailIcon className="text-red-800 flex-shrink-0" sx={{ fontSize: "16px" }} />
                    <a
                      href="mailto:info@kanchandeepjyot.com"
                      className="text-gray-800 hover:text-red-800 transition-colors text-sm"
                    >
                      info@kanchandeepjyot.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Payment Methods - Perfect Color Match */}
              <div className="space-y-2">
                <h4 className="font-semibold text-red-800 mb-2 text-sm">We Accept</h4>
                <div className="bg-[#E6D2B3] rounded-lg p-3 shadow-md border border-[#D4C4A8] max-w-xs">
                  <div className="grid grid-cols-3 gap-2">
                    {paymentMethods.map((method, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center p-1.5 bg-[#F5E6D3]/80 backdrop-blur-sm rounded border border-[#E6D2B3] hover:shadow-sm hover:bg-[#F5E6D3] transition-all duration-200 hover:scale-105 min-h-[40px]"
                      >
                        <img
                          src={method.image || "/placeholder.svg"}
                          alt={method.name}
                          className="h-8 w-12 object-contain scale-105"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=32&width=48"
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer - Enhanced */}
        <div className="border-t border-[#D4C4A8] bg-[#E6D2B3]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
            <div className="text-center">
              <p className="text-gray-700 text-sm">
                &copy; {new Date().getFullYear()} Kanchan Deep Jyot, All rights reserved. |
                <span className="text-gray-600 ml-2">
                  Designed By{" "}
                  <a
                    href="https://www.allindianitservices.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-800 hover:text-red-900 transition-colors font-medium"
                  >
                   Oswald Techs
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button - Enhanced */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 z-50 w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-2 border-[#EEDBBF]/50"
          aria-label="Scroll to top"
        >
          <ArrowUpwardIcon sx={{ fontSize: "18px" }} />
        </button>
      )}
    </>
  )
}

export default Footer
