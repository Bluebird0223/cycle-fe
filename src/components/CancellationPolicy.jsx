"use client"

import { useState, useEffect } from "react"
import CancelIcon from "@mui/icons-material/Cancel"
import EditIcon from "@mui/icons-material/Edit"
import RestoreIcon from "@mui/icons-material/Restore"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import BlockIcon from "@mui/icons-material/Block"
import EventAvailableIcon from "@mui/icons-material/EventAvailable"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

const CancellationPolicy = () => {
  // State to track which elements are visible for animations
  const [isVisible, setIsVisible] = useState({})

  // Policy items with icons and improved content
  const policyItems = [
    {
      id: 1,
      title: "Can I modify/change the specification for the ordered product without canceling it?",
      icon: <EditIcon className="text-red-700" sx={{ fontSize: "32px" }} />,
      content:
        "Modifications to your order may be possible depending on the product type and order status. Please contact our customer support team as soon as possible to check the feasibility of modifications.",
      highlight: "Contact support for order modifications",
    },
    {
      id: 2,
      title: "Can I reinstate a canceled order?",
      icon: <RestoreIcon className="text-red-700" sx={{ fontSize: "32px" }} />,
      content:
        "Once an order is canceled, it cannot be reinstated. You will need to place a new order through our website.",
      highlight: "New order required after cancellation",
    },
    {
      id: 3,
      title: "Why am I being charged for cancellation? / What is a cancellation fee?",
      icon: <AttachMoneyIcon className="text-red-700" sx={{ fontSize: "32px" }} />,
      content:
        "A cancellation fee may be applicable based on the order stage and product type. If the order has been processed or shipped, a cancellation fee may be deducted from the refund to cover processing costs.",
      highlight: "Fees depend on order processing stage",
    },
    {
      id: 4,
      title: "How long does it take to cancel an order?",
      icon: <AccessTimeIcon className="text-red-700" sx={{ fontSize: "32px" }} />,
      content:
        "The cancellation process is usually completed within 24-48 hours of receiving the request. Refunds, if applicable, may take additional time as per our Refund Policy.",
      highlight: "Cancellation processed within 24-48 hours",
    },
    {
      id: 5,
      title: "I see the 'Cancel' button but I can't click on it. Why?",
      icon: <BlockIcon className="text-red-700" sx={{ fontSize: "32px" }} />,
      content:
        "If the cancellation option is disabled, your order may have already been processed or shipped. In such cases, cancellation is not possible. Please contact our support team for further assistance.",
      highlight: "Contact support if cancellation is disabled",
    },
    {
      id: 6,
      title: "Where can I find the free cancellation period once an order is placed?",
      icon: <EventAvailableIcon className="text-red-700" sx={{ fontSize: "32px" }} />,
      content:
        "The free cancellation period, if applicable, will be mentioned in the product details or order confirmation email. Orders canceled within this period may not incur any cancellation fees.",
      highlight: "Check product details for free cancellation period",
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
    <div className="cancellation-policy-page bg-gradient-to-br from-red-50 via-white to-red-50 mt-5">
      {/* Hero Section - Lighter Colors */}
      <section
        className="hero-section-wrapper py-16 md:py-20 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #E06867 0%, #C25A68 25%, #E06867 50%, #D04F5A 75%, #E06867 100%)",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-15">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-yellow-300 animate-pulse"></div>
          <div className="absolute top-20 right-10 w-20 h-20 rounded-full bg-cyan-300 animate-bounce"></div>
          <div className="absolute bottom-10 left-1/4 w-32 h-32 rounded-full bg-green-300 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-orange-300 animate-ping"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="hero-section-content-wrapper text-center text-white">
            <div className="mb-6 animate-float-rotate">
              <div className="relative">
                <CancelIcon
                  sx={{ fontSize: "80px" }}
                  className="mx-auto mb-4 text-yellow-300 drop-shadow-2xl animate-pulse-slow"
                />
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-40 animate-ping-slow"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in drop-shadow-2xl text-white animate-text-glow">
              Cancellation Policy
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed animate-fade-in-delay drop-shadow-lg">
              At Kanchan Deep Jyot, we strive to provide a seamless shopping experience for our customers. However, we
              understand that circumstances may require you to cancel an order. Please read our cancellation policy
              carefully to understand the terms and conditions.
            </p>
            <div className="mt-8 animate-fade-in-delay-2">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                <CheckCircleIcon className="text-green-300" />
                <span className="text-white font-medium">Customer satisfaction is our priority</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-2xl md:text-3xl font-bold text-red-700 mb-1">24-48</div>
              <div className="text-sm text-gray-600">Hours to Process</div>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-2xl md:text-3xl font-bold text-red-700 mb-1">100%</div>
              <div className="text-sm text-gray-600">Transparency</div>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <div className="text-2xl md:text-3xl font-bold text-red-700 mb-1">Easy</div>
              <div className="text-sm text-gray-600">Request Process</div>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: "0.4s" }}>
              <div className="text-2xl md:text-3xl font-bold text-red-700 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Content Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Order Cancellation Guidelines</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about our cancellation process and policies
              </p>
            </div>

            <div className="space-y-8 md:space-y-12">
              {policyItems.map((item, index) => (
                <div
                  key={item.id}
                  id={`policy-item-${item.id}`}
                  className={`bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform border border-red-100 ${
                    isVisible[`policy-item-${item.id}`] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  } ${index % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right"}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                    <div className="flex-shrink-0 bg-gradient-to-br from-red-100 to-red-200 p-4 rounded-full self-center md:self-start shadow-md hover:shadow-lg transition-shadow duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-gradient-to-r from-red-700 to-red-800 text-white text-sm font-bold px-3 py-1 rounded-full">
                          {item.id}
                        </span>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{item.title}</h2>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">{item.content}</p>
                      <div className="bg-gradient-to-r from-red-50 to-red-100 p-3 rounded-lg border-l-4 border-red-500">
                        <div className="flex items-center gap-2">
                          <CheckCircleIcon className="text-red-600" sx={{ fontSize: "18px" }} />
                          <span className="text-red-800 font-medium text-sm">{item.highlight}</span>
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
        className={`py-12 md:py-16 bg-gradient-to-r from-red-100 to-red-200 transition-all duration-700 ${
          isVisible["contact-section"] ? "opacity-100 animate-bounce-in" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-red-200">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full mb-4">
                  <SupportAgentIcon className="text-white" sx={{ fontSize: "32px" }} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Contact Us</h2>
                <p className="text-gray-600">Our customer support team is here to assist you</p>
              </div>

              <p className="text-gray-700 mb-8 leading-relaxed text-center">
                If you need further assistance with order cancellations, feel free to reach out to our customer support
                team. We're committed to resolving any issues quickly and efficiently.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200 flex items-start gap-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group">
                  <div className="bg-gradient-to-r from-red-600 to-red-700 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
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

                <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200 flex items-start gap-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group">
                  <div className="bg-gradient-to-r from-red-600 to-red-700 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
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

              <div className="mt-8 text-center p-6 bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-white">
                <p className="text-lg font-medium">
                  We appreciate your trust in <span className="font-bold text-yellow-200">Kanchan Deep Jyot</span> and
                  are committed to providing the best service experience.
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

export default CancellationPolicy
