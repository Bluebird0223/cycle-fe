"use client"

import { useEffect, useState } from "react"

const TermsAndConditions = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const termItems = [
    {
      title: "About Us",
      content:
        "Kanchan Deep Jyot sells high-quality Pooja essentials. These terms explain how you can use our website and services.",
    },
    {
      title: "Who Can Use Our Website?",
      list: [
        "You must be 18 years or older to make a purchase.",
        "By using our website, you confirm that you can legally make purchases.",
      ],
    },
    {
      title: "Products",
      list: [
        "We try to show our products accurately, but slight differences (like color or design) might happen.",
        "All products depend on availability.",
      ],
    },
    {
      title: "Prices and Payment",
      list: [
        "Prices include taxes unless mentioned otherwise.",
        "You can pay using credit/debit cards, UPI, or net banking through secure gateways.",
      ],
    },
    {
      title: "Shipping and Delivery",
      list: [
        "We deliver all over India. Delivery time depends on your location.",
        "Shipping charges, if any, will be shown during checkout.",
      ],
    },
    {
      title: "Returns and Refunds",
      list: [
        "If you receive a damaged or wrong product, let us know within 7 days of delivery for a replacement or refund.",
        "Products should be unused and in their original packaging for returns.",
        "Refunds take 7–10 working days to process after approval.",
      ],
    },
    {
      title: "Using Our Website",
      content: "You agree not to:",
      list: ["Use the website for illegal purposes.", "Harm or hack our website.", "Misuse our products in any way."],
    },
    {
      title: "Our Content",
      content:
        "All text, images, and designs on our website belong to Kanchan Deep Jyot. Don't use them without permission.",
    },
    {
      title: "Our Responsibility",
      content: "We are not responsible for:",
      list: [
        "Delays or issues caused by delivery services.",
        "Any indirect problems from using our website or products.",
      ],
    },
    {
      title: "Changes to Terms",
      content:
        "We can update these terms at any time. The changes will take effect as soon as we post them on our website.",
    },
    {
      title: "Laws and Disputes",
      content: "These terms follow Indian laws. Any legal disputes will be handled in courts in [Your Location].",
    },
    {
      title: "Contact Us",
      content:
        "If you have questions, you can reach us at:\nEmail: contact@kanchandeepjyot.com\nPhone: +91 98765 43210",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <div
        className={`hero-section-wrapper bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 py-16 mt-5 relative overflow-hidden transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
        }`}
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(251, 191, 36, 0.2) 0%, transparent 50%), 
                      radial-gradient(circle at 75% 75%, rgba(249, 115, 22, 0.2) 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        <div className="hero-section-content-wrapper text-center relative z-10">
          <div
            className={`mb-6 flex justify-center transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <div className="p-3 bg-amber-200 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <svg className="h-10 w-10 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>

          <h1
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-amber-900 tracking-tight transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Terms and Conditions
          </h1>

          <p
            className={`text-lg text-amber-800 max-w-2xl mx-auto leading-relaxed px-4 transition-all duration-700 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Welcome to Kanchan Deep Jyot! By using our website, you agree to the terms below. If you don't agree, please
            don't use our website.
          </p>

          {/* Animated Scroll Indicator */}
          <div
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="animate-bounce bg-white p-2 w-10 h-10 ring-1 ring-amber-200 shadow-lg rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <div className="container mx-auto py-16 px-4">
        <div className="content_TAC bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-amber-100 max-w-4xl mx-auto">
          <ol className="list-decimal space-y-12 pl-5">
            {termItems.map((item, index) => (
              <li
                key={index}
                className={`group animate-fade-in-up transition-all duration-500 hover:transform hover:translate-x-1`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start">
                  <div className="mr-4 mt-1 hidden md:block">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 group-hover:bg-amber-200 transition-colors duration-300">
                      <span className="text-amber-700 font-semibold text-sm">{index + 1}</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-amber-900 mb-3 group-hover:text-amber-700 transition-colors duration-300">
                      {item.title}
                    </h2>

                    {item.content && (
                      <p className="text-gray-700 mb-3 whitespace-pre-line leading-relaxed">{item.content}</p>
                    )}

                    {item.list && (
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {item.list.map((listItem, i) => (
                          <li
                            key={i}
                            className="group-hover:translate-x-1 transition-transform duration-300 leading-relaxed"
                          >
                            {listItem}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Decorative floating elements */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div
        className="fixed top-40 right-10 w-32 h-32 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="fixed bottom-40 left-60 w-32 h-32 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "4s" }}
      ></div>

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
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .heading_color {
          color: #92400e;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #d97706;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #b45309;
        }

        /* Smooth transitions for all elements */
        * {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  )
}

export default TermsAndConditions
