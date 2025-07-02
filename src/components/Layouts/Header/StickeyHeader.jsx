import React from 'react'
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"
import InstagramIcon from "@mui/icons-material/Instagram"
import FacebookIcon from "@mui/icons-material/Facebook"
import YouTubeIcon from "@mui/icons-material/YouTube"
import TwitterIcon from "@mui/icons-material/Twitter"

const StickeyHeader = () => {
    return (
        <div
            id="top"
            className="hidden sm:block relative text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-2 md:py-3 lg:py-4 px-3 md:px-4 lg:px-6 border-b border-purple-300 shadow-md"
        >
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Social Links - Left Side */}
                <div className="flex gap-3 md:gap-4 lg:gap-6 items-center mb-2 md:mb-0">
                    <a
                        href="https://www.instagram.com/kanchan_deep_jyot/"
                        className="text-white hover:text-pink-300 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
                        aria-label="Instagram"
                    >
                        <InstagramIcon fontSize="small" />
                    </a>
                    <a
                        href="https://www.facebook.com/kanchandeepjyot"
                        className="text-white hover:text-blue-300 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
                        aria-label="Facebook"
                    >
                        <FacebookIcon fontSize="small" />
                    </a>
                    <a
                        href="https://twitter.com/IHandlooms"
                        className="text-white hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
                        aria-label="Twitter"
                    >
                        <TwitterIcon fontSize="small" />
                    </a>
                    <a
                        href="https://www.youtube.com/channel/UChv7RRVm3S5yMFjXbbQfBMw"
                        className="text-white hover:text-red-300 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
                        aria-label="YouTube"
                    >
                        <YouTubeIcon fontSize="small" />
                    </a>
                    <a
                        href="tel:7420989590"
                        className="text-white hover:text-green-300 transition-all duration-300 transform hover:scale-125 hover:rotate-12"
                        aria-label="Phone"
                    >
                        <PhoneIcon fontSize="small" />
                    </a>
                </div>

                {/* Center Message */}
                <h1 className="text-sm md:text-base lg:text-lg font-semibold text-white drop-shadow-lg order-first md:order-none mb-2 md:mb-0">
                    High-Quality Puja Supplies for Your Spiritual Needs 🪔✨
                </h1>

                {/* Right Side - Contact Info */}
                <div className="flex items-center gap-3 md:gap-4 text-white text-xs md:text-sm">
                    <span className="flex items-center gap-1">
                        <PhoneIcon fontSize="small" />
                        <span className="hidden md:inline">7420989590</span>
                    </span>
                    <span className="flex items-center gap-1">
                        <EmailIcon fontSize="small" />
                        <span className="hidden md:inline">info@kanchandeep.com</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default StickeyHeader