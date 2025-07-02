// Custom icons as SVG components
const ShieldIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const MailIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

const PackageIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
)

const RefreshIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const XCircleIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const FileTextIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const TruckIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const ReturnPolicy = () => {
  const policyItems = [
    {
      icon: <CheckCircleIcon />,
      title: "Eligibility for Returns",
      content: "You can request a return or replacement under the following conditions:",
      points: [
        "The item was delivered in a damaged or defective condition.",
        "You received an incorrect item that does not match your order.",
        "The item must be unused, in its original packaging, and with all tags intact.",
      ],
      color: "text-green-700",
      bgColor: "bg-green-50",
      accentColor: "bg-green-500",
      borderColor: "border-green-200",
    },
    {
      icon: <ClockIcon />,
      title: "Time Frame for Returns",
      content: "",
      points: [
        "You must raise a return request within 7 days of receiving the product.",
        "Returns made beyond this time frame will not be accepted.",
      ],
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      accentColor: "bg-blue-500",
      borderColor: "border-blue-200",
    },
    {
      icon: <FileTextIcon />,
      title: "Steps to Initiate a Return",
      content: "To request a return, follow these steps:",
      points: [
        "Email us at returns@kanchandeepjyot.com with your order details and a description of the issue.",
        "Attach clear photos of the product and packaging for verification.",
        "Once approved, we will share the return shipping instructions.",
      ],
      color: "text-purple-700",
      bgColor: "bg-purple-50",
      accentColor: "bg-purple-500",
      borderColor: "border-purple-200",
    },
    {
      icon: <TruckIcon />,
      title: "Return Shipping",
      content: "",
      points: [
        "If the return is due to our error (damaged/incorrect product), we will cover the return shipping cost.",
        "For other reasons, the customer will bear the return shipping charges.",
      ],
      color: "text-orange-700",
      bgColor: "bg-orange-50",
      accentColor: "bg-orange-500",
      borderColor: "border-orange-200",
    },
    {
      icon: <RefreshIcon />,
      title: "Refund Policy",
      content: "Refunds are processed in the following cases:",
      points: [
        "The returned product passes our inspection and is eligible for a refund.",
        "The product is unavailable for replacement.",
      ],
      color: "text-indigo-700",
      bgColor: "bg-indigo-50",
      accentColor: "bg-indigo-500",
      borderColor: "border-indigo-200",
    },
    {
      icon: <PackageIcon />,
      title: "Refund Process",
      content: "",
      points: [
        "Refunds will be processed within 7–10 business days after the returned item is received and inspected.",
        "The refund will be credited to your original payment method or a store credit, as per your preference.",
      ],
      color: "text-teal-700",
      bgColor: "bg-teal-50",
      accentColor: "bg-teal-500",
      borderColor: "border-teal-200",
    },
    {
      icon: <XCircleIcon />,
      title: "Non-Returnable Items",
      content: "Certain items cannot be returned, including:",
      points: [
        "Products damaged due to misuse or mishandling.",
        "Items marked as non-returnable during purchase.",
        "Customized or personalized items.",
      ],
      color: "text-red-700",
      bgColor: "bg-red-50",
      accentColor: "bg-red-500",
      borderColor: "border-red-200",
    },
    {
      icon: <ArrowRightIcon />,
      title: "Exchange Policy",
      content:
        "If you wish to exchange an item for a different size, style, or product, please initiate a return and place a new order. Exchanges are subject to product availability.",
      points: [],
      color: "text-emerald-700",
      bgColor: "bg-emerald-50",
      accentColor: "bg-emerald-500",
      borderColor: "border-emerald-200",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Hero Section with Light Color Combination */}
      <div className="relative overflow-hidden">
        {/* Soft Gradient Background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 25%, #f5f0ff 50%, #fff0f7 75%, #fffaf0 100%)",
          }}
        ></div>

        {/* Subtle Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%239C92AC" fillOpacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
          }}
        ></div>

        {/* Colorful Border Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300"></div>

        <div className="container mx-auto px-6 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Colorful Icon Container */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mb-8 shadow-lg">
              <div className="text-white">
                <ShieldIcon />
              </div>
            </div>

            {/* Clean Typography with Soft Colors */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 tracking-tight">Returns Policy</h1>

            {/* Colorful Divider */}
            <div className="h-1 w-24 mx-auto mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"></div>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-4">
              At <span className="font-bold text-purple-600">Kanchan Deep Jyot</span>, customer satisfaction is our top
              priority.
            </p>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive return policy ensures you can shop with confidence, knowing we're here to help if
              anything goes wrong.
            </p>

            {/* Decorative Elements */}
            <div className="absolute top-12 left-12 w-16 h-16 rounded-full bg-blue-100 opacity-50"></div>
            <div className="absolute bottom-12 right-12 w-24 h-24 rounded-full bg-purple-100 opacity-50"></div>
            <div className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full bg-pink-100 opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Clean Content Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Policy Grid Layout */}
          <div className="grid gap-8 md:gap-12">
            {policyItems.map((item, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-none border-l-8 ${item.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}
              >
                {/* Header Section */}
                <div className={`${item.bgColor} px-8 py-6 border-b border-gray-100`}>
                  <div className="flex items-center space-x-6">
                    <div className={`flex-shrink-0 p-4 ${item.accentColor} rounded-full shadow-lg`}>
                      <div className="text-white">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <h3 className={`text-2xl md:text-3xl font-bold ${item.color}`}>{item.title}</h3>
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-900 text-white text-sm font-bold rounded-full">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="px-8 py-8">
                  {item.content && (
                    <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">{item.content}</p>
                  )}

                  {item.points.length > 0 && (
                    <div className="space-y-4">
                      {item.points.map((point, pointIndex) => (
                        <div
                          key={pointIndex}
                          className="flex items-start space-x-4 group/item hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200"
                        >
                          <div className={`flex-shrink-0 w-2 h-2 ${item.accentColor} rounded-full mt-3`}></div>
                          <p className="text-gray-700 text-base leading-relaxed font-medium">{point}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Modern Contact Section */}
          <div className="mt-20">
            <div className="bg-gray-900 rounded-none shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 px-8 py-6 border-b-4 border-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full mb-4 shadow-lg">
                    <div className="text-white">
                      <MailIcon />
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Need Assistance?</h3>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Our customer service team is ready to help you with any return or refund questions.
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="px-8 py-12">
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center hover:bg-white/20 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                      <div className="text-white">
                        <MailIcon />
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Email Support</h4>
                    <p className="text-gray-300 text-lg font-medium">info@kanchandeepjyot.com</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center hover:bg-white/20 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                      <div className="text-white">
                        <PhoneIcon />
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Phone Support</h4>
                    <p className="text-gray-300 text-lg font-medium">+91 74209895908</p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="text-center mt-12">
                  <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white font-bold text-lg rounded-none hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span className="mr-3">Contact Support</span>
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReturnPolicy
