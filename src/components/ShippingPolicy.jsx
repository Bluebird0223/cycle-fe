"use client"

import { useState, useEffect } from "react"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import MoneyOffIcon from "@mui/icons-material/MoneyOff"
import TrackChangesIcon from "@mui/icons-material/TrackChanges"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

const ShippingPolicy = () => {
  // State to track which elements are visible for animations
  const [isVisible, setIsVisible] = useState({})

  // Policy items with icons and improved content
  const policyItems = [
    {
      id: 1,
      title: "Delivery Charges",
      icon: <LocalShippingIcon className="text-purple-700" sx={{ fontSize: "32px" }} />,
      content:
        "Shipping charges vary based on the delivery location and the weight of the package. The exact shipping cost will be displayed at checkout before you make the payment. We also offer free shipping on select products and orders above a specified value.",
      highlight: "Free shipping available on orders above ₹500",
    },
    {
      id: 2,
      title: "Estimated Delivery Time",
      icon: <AccessTimeIcon className="text-purple-700" sx={{ fontSize: "32px" }} />,
      content:
        "Orders are typically processed within 1-2 business days. The estimated delivery time depends on your location and the chosen shipping method. Standard delivery usually takes 3-5 business days, while express shipping may take 1-2 business days. You will receive a tracking number once your order is shipped.",
      highlight: "Processing time: 1-2 business days",
    },
    {
      id: 3,
      title: "Why Does the Delivery Date Not Match the Estimated Timeline?",
      icon: <HelpOutlineIcon className="text-purple-700" sx={{ fontSize: "32px" }} />,
      content:
        "The estimated delivery time is based on various factors such as product availability, courier partner efficiency, and unforeseen delays due to weather conditions, strikes, or other external factors. We strive to ensure timely deliveries, but some circumstances may cause slight variations.",
      highlight: "External factors may cause delivery delays",
    },
    {
      id: 4,
      title: "Are There Any Hidden Costs?",
      icon: <AttachMoneyIcon className="text-purple-700" sx={{ fontSize: "32px" }} />,
      content:
        "No, we maintain complete transparency in pricing. The price mentioned on the product page is inclusive of all applicable taxes. Any additional charges, if applicable, such as shipping fees, will be clearly stated at checkout.",
      highlight: "100% transparent pricing - no hidden costs",
    },
    {
      id: 5,
      title: "Cash on Delivery (CoD) Availability",
      icon: <MoneyOffIcon className="text-purple-700" sx={{ fontSize: "32px" }} />,
      content:
        "The CoD option is available for select locations. If your pin code is not eligible for CoD, it may be due to courier service limitations or security reasons. You can check CoD eligibility on the product page before placing the order.",
      highlight: "CoD available for selected pin codes",
    },
    {
      id: 6,
      title: "Tracking Your Order",
      icon: <TrackChangesIcon className="text-purple-700" sx={{ fontSize: "32px" }} />,
      content:
        "Once your order is shipped, you will receive a tracking number via email or SMS. You can use this number to track your order's status in real time through our website or the courier partner's tracking portal.",
      highlight: "Real-time order tracking available",
    },
    {
      id: 7,
      title: "Issues with Delivery",
      icon: <ErrorOutlineIcon className="text-purple-700" sx={{ fontSize: "32px" }} />,
      content:
        "If your order is delayed beyond the expected delivery date, please contact our customer support team. We will coordinate with the courier partner to resolve the issue as soon as possible.",
      highlight: "24/7 customer support for delivery issues",
    },
  ]

  // Intersection Observer to trigger animations when elements come into view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all policy items
    policyItems.forEach((item) => {
      const element = document.getElementById(`policy-item-${item.id}`)
      if (element) observer.observe(element)
    })

    // Observe contact section
    const contactSection = document.getElementById("contact-section")
    if (contactSection) observer.observe(contactSection)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="shipping-policy-page bg-gradient-to-br from-purple-50 via-white to-pink-50 mt-5">
      {/* Hero Section - Medium-Dark Colors */}
      <section className="hero-section-wrapper bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 py-16 md:py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-yellow-300 animate-pulse"></div>
          <div className="absolute top-20 right-10 w-20 h-20 rounded-full bg-cyan-300 animate-bounce"></div>
          <div className="absolute bottom-10 left-1/4 w-32 h-32 rounded-full bg-green-300 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-orange-300 animate-ping"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="hero-section-content-wrapper text-center text-white">
            <div className="mb-6 animate-float-rotate">
              <div className="relative">
                <LocalShippingIcon
                  sx={{ fontSize: "80px" }}
                  className="mx-auto mb-4 text-yellow-300 drop-shadow-lg animate-pulse-slow"
                />
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-40 animate-ping-slow"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in drop-shadow-lg text-white animate-text-glow">
              Shipping Policy
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed animate-fade-in-delay drop-shadow-lg">
              Welcome to Kanchan Deep Jyot! We aim to provide a seamless and reliable shipping experience for our
              customers. Please read our shipping policy carefully to understand how we process and deliver your orders.
            </p>
            <div className="mt-8 animate-fade-in-delay-2">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                <CheckCircleIcon className="text-green-300" />
                <span className="text-white font-medium">Trusted by 10,000+ customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section - Updated Color Grid */}
      <section className="py-8 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-center p-4 rounded-lg shadow-md animate-scale-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">1-2</div>
              <div className="text-sm text-purple-100">Processing Days</div>
            </div>
            <div
              className="bg-gradient-to-br from-pink-500 to-pink-600 text-center p-4 rounded-lg shadow-md animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">3-5</div>
              <div className="text-sm text-pink-100">Delivery Days</div>
            </div>
            <div
              className="bg-gradient-to-br from-amber-500 to-amber-600 text-center p-4 rounded-lg shadow-md animate-scale-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">₹500+</div>
              <div className="text-sm text-amber-100">Free Shipping</div>
            </div>
            <div
              className="bg-gradient-to-br from-red-500 to-red-600 text-center p-4 rounded-lg shadow-md animate-scale-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-red-100">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Content Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Shipping Guidelines</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about our shipping process and policies
              </p>
            </div>

            <div className="space-y-8 md:space-y-12">
              {policyItems.map((item, index) => (
                <div
                  key={item.id}
                  id={`policy-item-${item.id}`}
                  className={`bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform border border-purple-100 ${
                    isVisible[`policy-item-${item.id}`] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  } ${index % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right"}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                    <div className="flex-shrink-0 bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-full self-center md:self-start shadow-md hover:shadow-lg transition-shadow duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-gradient-to-r from-purple-700 to-pink-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                          {item.id}
                        </span>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{item.title}</h2>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">{item.content}</p>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border-l-4 border-purple-500">
                        <div className="flex items-center gap-2">
                          <CheckCircleIcon className="text-purple-600" sx={{ fontSize: "18px" }} />
                          <span className="text-purple-800 font-medium text-sm">{item.highlight}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact-section"
        className={`py-12 md:py-16 bg-gradient-to-r from-purple-100 to-pink-100 transition-all duration-700 ${
          isVisible["contact-section"] ? "opacity-100 animate-bounce-in" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-purple-200">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
                  <SupportAgentIcon className="text-white" sx={{ fontSize: "32px" }} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Need Help with Shipping?</h2>
                <p className="text-gray-600">Our customer support team is here to assist you</p>
              </div>

              <p className="text-gray-700 mb-8 leading-relaxed text-center">
                If you need further assistance with shipping or delivery concerns, feel free to reach out to our
                customer support team. We're committed to resolving any issues quickly and efficiently.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 flex items-start gap-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <EmailIcon className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Email Support</h3>
                    <a
                      href="mailto:info@kanchandeepjyot.com"
                      className="text-purple-700 hover:text-purple-900 hover:underline transition-colors font-medium"
                    >
                      info@kanchandeepjyot.com
                    </a>
                    <p className="text-sm text-gray-600 mt-1">Response within 24 hours</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 flex items-start gap-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <PhoneIcon className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Phone Support</h3>
                    <div className="space-y-1">
                      <a
                        href="tel:07122955635"
                        className="block text-purple-700 hover:text-purple-900 hover:underline transition-colors font-medium"
                      >
                        0712-2955635
                      </a>
                      <a
                        href="tel:7420989590"
                        className="block text-purple-700 hover:text-purple-900 hover:underline transition-colors font-medium"
                      >
                        7420989590
                      </a>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Mon-Sat: 9 AM - 6 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
                <p className="text-lg font-medium">
                  We appreciate your trust in <span className="font-bold text-yellow-200">Kanchan Deep Jyot</span> and
                  are committed to providing the best shipping experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDelay {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDelay2 {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fadeInDelay 0.8s ease-out 0.3s both;
        }

        .animate-fade-in-delay-2 {
          animation: fadeInDelay2 0.8s ease-out 0.6s both;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out both;
        }

        @keyframes floatRotate {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(2deg);
          }
          50% {
            transform: translateY(-15px) rotate(0deg);
          }
          75% {
            transform: translateY(-10px) rotate(-2deg);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes textGlow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3);
          }
          50% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.5);
          }
        }

        @keyframes pulseSlow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes pingSlow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-float-rotate {
          animation: floatRotate 6s ease-in-out infinite;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out both;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out both;
        }

        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out both;
        }

        .animate-text-glow {
          animation: textGlow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: pingSlow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  )
}

export default ShippingPolicy
