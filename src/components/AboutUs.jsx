"use client"
import banner from "../assets/images/Banners/Banner 2.jpg" // Updated to Banner 2
import StarIcon from "@mui/icons-material/Star"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import SecurityIcon from "@mui/icons-material/Security"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"
import VerifiedIcon from "@mui/icons-material/Verified"

const AboutUs = () => {
  const features = [
    {
      icon: <VerifiedIcon className="text-red-600" sx={{ fontSize: "32px" }} />,
      title: "Premium Quality",
      description: "Made with finest cotton fibers for consistent, clean burning",
    },
    {
      icon: <SecurityIcon className="text-red-600" sx={{ fontSize: "32px" }} />,
      title: "Traditional Methods",
      description: "Honoring age-old traditions with modern manufacturing techniques",
    },
    {
      icon: <LocalShippingIcon className="text-red-600" sx={{ fontSize: "32px" }} />,
      title: "Reliable Delivery",
      description: "Fast and secure shipping to temples, homes, and ceremonies",
    },
    {
      icon: <SupportAgentIcon className="text-red-600" sx={{ fontSize: "32px" }} />,
      title: "Expert Support",
      description: "Dedicated customer service for all your spiritual needs",
    },
  ]

  const stats = [
    { number: "25+", label: "Years of Experience" },
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Temples Served" },
    { number: "100%", label: "Quality Assured" },
  ]

  return (
    <>
      <div className="about_section_page bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative py-12 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 to-orange-900/5"></div>

          {/* Floating background elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-red-200/30 rounded-full animate-float-slow"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-orange-200/30 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-200/30 rounded-full animate-float-reverse"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 animate-title-entrance">
                About <span className="text-red-600 animate-text-glow">Kanchan Deep Jyot</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delayed">
                Illuminating traditions with premium quality diya batti, rui batti, and moli dhaga for over 25 years
              </p>
              <div className="flex justify-center mt-6 animate-bounce-in-delayed">
                <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="text-yellow-400 animate-star-twinkle"
                      sx={{ fontSize: "24px" }}
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                  <span className="ml-2 text-gray-600 font-medium">Trusted by thousands</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Section - Content */}
              <div className="space-y-8 animate-slide-in-left">
                <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-card-entrance border border-white/50">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <span className="w-2 h-8 bg-gradient-to-b from-red-600 to-red-800 rounded-full animate-pulse-glow"></span>
                    Our Heritage
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-justify mb-4 animate-text-reveal">
                    At Kanchan Deepjyot, we specialize in making premium diya batti, rui batti, and moli dhaga for diya
                    aarti and diya pooja. With years of expertise, we deliver superior cotton wicks designed for a
                    clean, consistent burn, perfect for aarti diya, and akhand jot.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-justify animate-text-reveal-delayed">
                    Using the finest cotton and advanced techniques, our wicks honor tradition and ensure quality.
                    Whether it is for your home, temples, or sacred ceremonies, trust Kanchan Deepjyot for dependable
                    products and great customer service.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-card-entrance-delayed border border-white/50">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <CheckCircleIcon className="text-green-600 animate-icon-bounce" />
                    Quality Commitment
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-justify animate-text-reveal">
                    Quality is the center of everything that we do, for we want only the very best for our customers.
                    With superior quality cotton, advanced manufacturing techniques have given us exceptional quality
                    wicks that can hold and deliver efficiently to meet demand, while their whole production has strict
                    checks.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-card-entrance-more-delayed border border-white/50">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <VerifiedIcon className="text-blue-600 animate-icon-spin" />
                    Manufacturing Excellence
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-justify animate-text-reveal">
                    Every step of our production process is monitored to ensure consistency, reliability, and
                    durability. Each cotton wick is produced with the finest-quality cotton fibers with utmost care for
                    a perfect burn each time. Whether for religious purposes, household, or any other requirement, we
                    cater to all needs.
                  </p>
                </div>
              </div>

              {/* Right Section - Image */}
              <div className="animate-slide-in-right">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500 animate-glow-pulse"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-white/50">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={banner || "/placeholder.svg?height=500&width=600"}
                        alt="Kanchan Deep Jyot Heritage"
                        className="w-full h-[400px] md:h-[500px] object-cover transition-all duration-700 hover:scale-110 animate-image-reveal"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg animate-badge-slide-in">
                      <p className="text-sm font-semibold text-gray-800">Lighting traditions since 1998</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-red-600 via-red-700 to-red-800 relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-stats-counter group"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300 animate-number-count">
                    {stat.number}
                  </div>
                  <div className="text-red-100 text-sm md:text-base font-medium group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate-section-title">Why Choose Us</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up-delayed">
                Discover what makes Kanchan Deep Jyot the trusted choice for spiritual lighting needs
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mt-4 rounded-full animate-line-expand"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 text-center animate-feature-card border border-white/50"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="mb-4 flex justify-center group-hover:scale-125 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Width Banner */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative group animate-banner-reveal">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500 animate-glow-pulse"></div>
              <div className="relative bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-white/50">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={banner || "/placeholder.svg?height=400&width=1200"}
                    alt="Kanchan Deep Jyot Manufacturing"
                    className="w-full h-[250px] md:h-[350px] lg:h-[400px] object-cover transition-all duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-xl"></div>
                <div className="absolute bottom-8 left-8 text-white animate-text-slide-up">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">State-of-the-Art Manufacturing</h3>
                  <p className="text-lg opacity-90">Where tradition meets modern technology</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-amber-50/50 to-orange-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-cta-bounce">
              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-white">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Premium Quality?</h3>
                <p className="text-red-100 mb-8 max-w-2xl mx-auto text-lg">
                  Contact us today to learn more about our premium cotton wicks and how we can serve your spiritual
                  lighting needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+917420989590"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg"
                  >
                    <i className="fas fa-phone mr-3"></i>
                    Call: +91 7420989590
                  </a>
                  <a
                    href="mailto:support@kanchandeepjyot.com"
                    className="inline-flex items-center justify-center px-8 py-4 bg-red-800 text-white rounded-xl font-semibold hover:bg-red-900 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg"
                  >
                    <i className="fas fa-envelope mr-3"></i>
                    Email Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Enhanced Custom CSS for animations */}
      <style jsx>{`
        @keyframes titleEntrance {
          0% { opacity: 0; transform: translateY(-50px) scale(0.9); }
          50% { opacity: 0.7; transform: translateY(-10px) scale(1.05); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 20px rgba(220, 38, 38, 0.3); }
          50% { text-shadow: 0 0 30px rgba(220, 38, 38, 0.6); }
        }

        @keyframes fadeInUpDelayed {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounceInDelayed {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.1); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes starTwinkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes floatDelayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }

        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(90deg); }
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes cardEntrance {
          0% { opacity: 0; transform: translateY(50px) rotateX(45deg); }
          100% { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }

        @keyframes textReveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(220, 38, 38, 0.5); }
          50% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.8); }
        }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes iconSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }

        @keyframes imageReveal {
          from { opacity: 0; transform: scale(1.1); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes badgeSlideIn {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes statsCounter {
          from { opacity: 0; transform: translateY(30px) scale(0.5); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes numberCount {
          from { transform: scale(0.5); }
          to { transform: scale(1); }
        }

        @keyframes sectionTitle {
          0% { opacity: 0; transform: translateY(-30px); }
          50% { opacity: 0.7; transform: translateY(-5px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes lineExpand {
          from { width: 0; }
          to { width: 6rem; }
        }

        @keyframes featureCard {
          0% { opacity: 0; transform: translateY(50px) rotateY(45deg); }
          100% { opacity: 1; transform: translateY(0) rotateY(0deg); }
        }

        @keyframes bannerReveal {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes textSlideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes ctaBounce {
          0% { opacity: 0; transform: translateY(50px) scale(0.9); }
          50% { opacity: 0.8; transform: translateY(-10px) scale(1.05); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Animation Classes */
        .animate-title-entrance {
          animation: titleEntrance 1.2s ease-out;
        }

        .animate-text-glow {
          animation: textGlow 3s ease-in-out infinite;
        }

        .animate-fade-in-up-delayed {
          animation: fadeInUpDelayed 0.8s ease-out 0.3s both;
        }

        .animate-bounce-in-delayed {
          animation: bounceInDelayed 1s ease-out 0.5s both;
        }

        .animate-star-twinkle {
          animation: starTwinkle 2s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: floatDelayed 8s ease-in-out infinite 2s;
        }

        .animate-float-reverse {
          animation: floatReverse 7s ease-in-out infinite 1s;
        }

        .animate-slide-in-left {
          animation: slideInLeft 1s ease-out 0.4s both;
        }

        .animate-slide-in-right {
          animation: slideInRight 1s ease-out 0.4s both;
        }

        .animate-card-entrance {
          animation: cardEntrance 0.8s ease-out 0.2s both;
        }

        .animate-card-entrance-delayed {
          animation: cardEntrance 0.8s ease-out 0.4s both;
        }

        .animate-card-entrance-more-delayed {
          animation: cardEntrance 0.8s ease-out 0.6s both;
        }

        .animate-text-reveal {
          animation: textReveal 0.8s ease-out 0.3s both;
        }

        .animate-text-reveal-delayed {
          animation: textReveal 0.8s ease-out 0.5s both;
        }

        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .animate-icon-bounce {
          animation: iconBounce 2s ease-in-out infinite;
        }

        .animate-icon-spin {
          animation: iconSpin 3s linear infinite;
        }

        .animate-glow-pulse {
          animation: glowPulse 3s ease-in-out infinite;
        }

        .animate-image-reveal {
          animation: imageReveal 1s ease-out 0.5s both;
        }

        .animate-badge-slide-in {
          animation: badgeSlideIn 0.8s ease-out 1s both;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        .animate-stats-counter {
          animation: statsCounter 0.8s ease-out both;
        }

        .animate-number-count {
          animation: numberCount 0.5s ease-out 0.3s both;
        }

        .animate-section-title {
          animation: sectionTitle 1s ease-out;
        }

        .animate-line-expand {
          animation: lineExpand 1s ease-out 0.5s both;
        }

        .animate-feature-card {
          animation: featureCard 0.8s ease-out both;
        }

        .animate-banner-reveal {
          animation: bannerReveal 1s ease-out 0.3s both;
        }

        .animate-text-slide-up {
          animation: textSlideUp 0.8s ease-out 0.8s both;
        }

        .animate-cta-bounce {
          animation: ctaBounce 1s ease-out 0.5s both;
        }
      `}</style>
    </>
  )
}

export default AboutUs
