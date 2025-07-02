"use client"

import { useEffect, useState, useRef } from "react"

const PrivacyPolicy = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleSections, setVisibleSections] = useState([])
  const sectionRefs = useRef([])

  useEffect(() => {
    setIsVisible(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleSections((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // Icon components as simple SVGs
  const Icons = {
    Shield: () => (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    Database: () => (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        />
      </svg>
    ),
    Settings: () => (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    Lock: () => (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    Share: () => (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
        />
      </svg>
    ),
    Cookie: () => (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    User: () => (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    ExternalLink: () => (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    ),
    Baby: () => (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    Refresh: () => (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
    Phone: () => (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    Mail: () => (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  }

  const privacyItems = [
    {
      title: "Information We Collect",
      icon: "Database",
      color: "from-blue-500 to-blue-600",
      content: "We collect the following types of information:",
      list: [
        "Personal Information: Name, email address, phone number, shipping address, and payment details when you place an order.",
        "Non-Personal Information: Data such as IP address, browser type, and browsing behavior to improve your experience on our website.",
      ],
    },
    {
      title: "How We Use Your Information",
      icon: "Settings",
      color: "from-green-500 to-green-600",
      content: "We use your information for the following purposes:",
      list: [
        "To process and deliver your orders.",
        "To improve our website and services.",
        "To communicate with you about your orders, offers, and updates.",
        "To comply with legal requirements.",
      ],
    },
    {
      title: "How We Protect Your Information",
      icon: "Lock",
      color: "from-purple-500 to-purple-600",
      content: "We use industry-standard security measures to protect your personal data, including:",
      list: [
        "Secure servers for processing sensitive information.",
        "Encryption technology to safeguard payment details.",
        "Limited access to personal data by authorized personnel only.",
      ],
    },
    {
      title: "Sharing Your Information",
      icon: "Share",
      color: "from-amber-500 to-amber-600",
      content: "We do not sell or rent your personal information. We may share your data with:",
      list: [
        "Service Providers: For payment processing, order delivery, and website analytics.",
        "Legal Authorities: If required by law or to protect our legal rights.",
      ],
    },
    {
      title: "Cookies",
      icon: "Cookie",
      color: "from-indigo-500 to-indigo-600",
      content: "Our website uses cookies to enhance your browsing experience. Cookies help us:",
      list: ["Remember your preferences.", "Provide personalized recommendations.", "Analyze website traffic."],
      additionalContent:
        "You can disable cookies in your browser settings, but some features of the website may not work properly.",
    },
    {
      title: "Your Rights",
      icon: "User",
      color: "from-red-500 to-red-600",
      content: "You have the right to:",
      list: [
        "Access your personal information.",
        "Request corrections to inaccurate data.",
        "Opt-out of marketing communications.",
        "Request the deletion of your personal data, subject to legal obligations.",
      ],
    },
    {
      title: "Third-Party Links",
      icon: "ExternalLink",
      color: "from-teal-500 to-teal-600",
      content:
        "Our website may contain links to third-party websites. We are not responsible for the privacy practices of those websites. Please review their privacy policies before sharing any information.",
    },
    {
      title: "Children's Privacy",
      icon: "Baby",
      color: "from-pink-500 to-pink-600",
      content:
        "Our website is not intended for children under the age of 18. We do not knowingly collect information from minors.",
    },
    {
      title: "Policy Updates",
      icon: "Refresh",
      color: "from-orange-500 to-orange-600",
      content:
        "We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the updated policy will be effective immediately.",
    },
    {
      title: "Contact Us",
      icon: "Phone",
      color: "from-emerald-500 to-emerald-600",
      content: "If you have any questions or concerns about our Privacy Policy, please contact us at:",
      contactInfo: {
        email: "support@kanchandeepjyot.com",
        phone: "+91 [Phone Number]",
      },
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-blue-100/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-8 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Animated Icon */}
          <div
            className={`mb-8 flex justify-center transition-all duration-700 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-lg opacity-75 animate-pulse"></div>
              <div className="relative p-6 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <Icons.Shield />
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            >
              Privacy Policy
            </h1>

            {/* Subtitle */}
            <p
              className={`text-lg md:text-xl text-blue-800/80 max-w-3xl mx-auto leading-relaxed mb-8 transition-all duration-700 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            >
              At <span className="font-semibold text-blue-700">Kanchan Deep Jyot</span>, we value your privacy and are
              committed to protecting your personal information. This policy explains how we collect, use, and safeguard
              the information you provide when you use our website.
            </p>

            {/* Decorative Badge */}
            <div
              className={`mb-12 transition-all duration-700 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            >
              <span className="inline-block px-6 py-3 text-sm bg-white/80 backdrop-blur-sm text-blue-800 border border-blue-200 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300">
                Last Updated: December 2024
              </span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            className={`flex justify-center transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="animate-bounce bg-white/90 backdrop-blur-sm p-3 w-12 h-12 ring-2 ring-blue-200 shadow-xl rounded-full flex items-center justify-center hover:ring-blue-300 transition-all duration-300 cursor-pointer">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Content */}
      <div className="relative z-10 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-8">
            {privacyItems.map((item, index) => {
              const IconComponent = Icons[item.icon]
              const isItemVisible = visibleSections.includes(index)

              return (
                <div
                  key={index}
                  ref={(el) => (sectionRefs.current[index] = el)}
                  data-index={index}
                  className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                    isItemVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                  } hover:-translate-y-1 bg-white/80 backdrop-blur-sm rounded-xl`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Header with Icon and Title */}
                  <div className={`bg-gradient-to-r ${item.color} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                        <IconComponent />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{item.title}</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-block bg-white/20 text-white border border-white/30 text-xs px-2 py-1 rounded-full">
                            Section {index + 1}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/5 rounded-full translate-y-10 translate-x-10"></div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {item.content && (
                      <div className="mb-6">
                        {item.title === "Contact Us" ? (
                          <div className="space-y-4">
                            <p className="text-gray-700 text-lg leading-relaxed">{item.content}</p>
                            {item.contactInfo && (
                              <div className="grid md:grid-cols-2 gap-4 mt-6">
                                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                                  <Icons.Mail />
                                  <div>
                                    <p className="text-sm text-blue-600 font-medium">Email</p>
                                    <a
                                      href={`mailto:${item.contactInfo.email}`}
                                      className="text-blue-800 font-semibold hover:text-blue-600 transition-colors duration-300"
                                    >
                                      {item.contactInfo.email}
                                    </a>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                                  <Icons.Phone />
                                  <div>
                                    <p className="text-sm text-green-600 font-medium">Phone</p>
                                    <p className="text-green-800 font-semibold">{item.contactInfo.phone}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">{item.content}</p>
                        )}
                      </div>
                    )}

                    {item.list && (
                      <div className="space-y-3 mb-6">
                        {item.list.map((listItem, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors duration-300 group/item"
                          >
                            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mt-0.5">
                              <span className="text-white text-xs font-bold">{i + 1}</span>
                            </div>
                            <p className="text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors duration-300">
                              {listItem}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {item.additionalContent && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="text-blue-800 text-sm leading-relaxed">
                          <strong>Note:</strong> {item.additionalContent}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent mb-8"></div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-200 shadow-lg">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Your Privacy Matters to Us</h3>
            <p className="text-blue-700 leading-relaxed">
              We are committed to maintaining the highest standards of privacy protection. If you have any concerns or
              questions about how we handle your data, please don't hesitate to contact us.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(59, 130, 246, 0.1);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #1d4ed8);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #1d4ed8, #1e40af);
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  )
}

export default PrivacyPolicy
