"use client"

import { useState, useEffect } from "react"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import PaymentIcon from "@mui/icons-material/Payment"
import SecurityIcon from "@mui/icons-material/Security"
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import ShieldIcon from "@mui/icons-material/Shield"
import SupportAgentIcon from "@mui/icons-material/SupportAgent"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import InfoIcon from "@mui/icons-material/Info"
import WarningIcon from "@mui/icons-material/Warning"

const PaymentPolicy = () => {
  // State to track which elements are visible for animations
  const [isVisible, setIsVisible] = useState({})

  const paymentMethods = [
    {
      icon: <CreditCardIcon className="text-purple-600" sx={{ fontSize: "32px" }} />,
      title: "Credit/Debit Cards",
      description:
        "We accept all major credit and debit cards, including Visa, MasterCard, American Express, and RuPay.",
      features: ["Instant processing", "Secure transactions", "EMI options available"],
    },
    {
      icon: <AccountBalanceIcon className="text-purple-600" sx={{ fontSize: "32px" }} />,
      title: "Net Banking",
      description: "Secure online payments through leading banks in India.",
      features: ["All major banks", "Real-time processing", "Bank-level security"],
    },
    {
      icon: <PhoneAndroidIcon className="text-purple-600" sx={{ fontSize: "32px" }} />,
      title: "UPI & Wallets",
      description: "Pay via UPI apps (Google Pay, PhonePe, Paytm, etc.) and digital wallets.",
      features: ["Quick payments", "No additional charges", "Instant confirmation"],
    },
    {
      icon: <LocalShippingIcon className="text-purple-600" sx={{ fontSize: "32px" }} />,
      title: "Cash on Delivery",
      description: "Available for select locations. Additional charges may apply.",
      features: ["Pay at doorstep", "No advance payment", "Selected pin codes only"],
    },
  ]

  const securityFeatures = [
    {
      icon: <VerifiedUserIcon className="text-purple-600" />,
      title: "OTP Verification",
      description: "Every card transaction is verified through OTP authentication",
    },
    {
      icon: <ShieldIcon className="text-purple-600" />,
      title: "Fraud Detection Systems",
      description: "Our advanced AI-based fraud detection system monitors suspicious activities",
    },
    {
      icon: <SecurityIcon className="text-purple-600" />,
      title: "Secure Payment Gateways",
      description: "Transactions are processed through trusted and verified payment gateways",
    },
  ]

  const paymentSteps = [
    "Select your preferred items and proceed to checkout",
    "Choose 'Credit/Debit Card' as the payment method",
    "Enter your card details (Card Number, Expiry Date, CVV)",
    "Complete the OTP verification",
    "Once verified, your order will be confirmed",
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

    // Observe sections
    const sections = [
      "payment-methods",
      "transparency",
      "security",
      "how-to-pay",
      "cod-policy",
      "refunds",
      "contact-support",
    ]

    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="payment-policy-page bg-gradient-to-br from-purple-50 via-white to-pink-50 mt-5">
      {/* Hero Section */}
      <section className="hero-section-wrapper bg-gradient-to-r from-purple-800 via-pink-700 to-red-600 py-16 md:py-20 relative overflow-hidden">
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
                <PaymentIcon
                  sx={{ fontSize: "80px" }}
                  className="mx-auto mb-4 text-yellow-300 drop-shadow-2xl animate-pulse-slow"
                />
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-40 animate-ping-slow"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in drop-shadow-2xl text-white animate-text-glow">
              Payment Policy
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed animate-fade-in-delay drop-shadow-lg">
              At Kanchan Deep Jyot, we strive to provide a seamless shopping experience for our customers. We offer
              secure, convenient, and transparent payment options to ensure your peace of mind.
            </p>
            <div className="mt-8 animate-fade-in-delay-2">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                <CheckCircleIcon className="text-green-300" />
                <span className="text-white font-medium">100% Secure Payment Options</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section id="payment-methods" className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
              Payment Methods
              <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform -translate-y-2"></div>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from multiple secure payment options for a convenient checkout experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform border border-purple-100 ${
                  isVisible["payment-methods"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                } ${index % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right"} hover:-translate-y-2`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full">
                    {method.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{method.title}</h3>
                <p className="text-gray-600 text-center mb-4 leading-relaxed">{method.description}</p>
                <ul className="space-y-2">
                  {method.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircleIcon className="text-purple-600" sx={{ fontSize: "16px" }} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section
        id="transparency"
        className={`py-12 md:py-16 bg-gradient-to-r from-purple-100 to-pink-100 transition-all duration-700 ${
          isVisible["transparency"] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-purple-200 transform hover:scale-[1.01] transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-full">
                    <InfoIcon className="text-white" sx={{ fontSize: "32px" }} />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Are There Any Hidden Charges?</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    <strong>No, we believe in transparency.</strong> The price you see during checkout is the final
                    amount payable. However, in some cases, delivery charges or taxes (as per government regulations)
                    may apply and will be clearly mentioned before payment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
              Security & Safety
              <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform -translate-y-2"></div>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your payment security is our top priority. We use industry-leading security measures.
            </p>
          </div>

          <div
            className={`grid md:grid-cols-2 gap-8 mb-12 transition-all duration-700 ${
              isVisible["security"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full">
                  <SecurityIcon className="text-white" sx={{ fontSize: "32px" }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Is It Safe to Use My Card?</h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Yes, we prioritize security.</strong> Our website uses SSL encryption to safeguard your payment
                details. Additionally, we comply with PCI DSS (Payment Card Industry Data Security Standard) to ensure a
                secure transaction experience.
              </p>
              <div className="flex items-center gap-2 text-purple-600 font-medium">
                <VerifiedUserIcon sx={{ fontSize: "20px" }} />
                SSL Encrypted & PCI DSS Compliant
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full">
                  <ShieldIcon className="text-white" sx={{ fontSize: "32px" }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Fraud Prevention</h3>
              </div>
              <div className="space-y-4">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-2 rounded-full">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Pay Section */}
      <section
        id="how-to-pay"
        className={`py-12 md:py-16 bg-gradient-to-r from-purple-100 to-pink-100 transition-all duration-700 ${
          isVisible["how-to-pay"] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
                How to Pay Using Credit/Debit Card
                <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform -translate-y-2"></div>
              </h2>
              <p className="text-lg text-gray-600">Follow these simple steps for a secure payment</p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-purple-200">
              <div className="space-y-6">
                {paymentSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 transform transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COD Policy Section */}
      <section
        id="cod-policy"
        className={`py-12 md:py-16 transition-all duration-700 ${
          isVisible["cod-policy"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 md:p-10 rounded-2xl shadow-lg border border-purple-200">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-6">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-full">
                    <LocalShippingIcon className="text-white" sx={{ fontSize: "32px" }} />
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Cash on Delivery (COD) Policy</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="bg-green-100 p-1 rounded-full">
                    <CheckCircleIcon className="text-green-600" sx={{ fontSize: "20px" }} />
                  </div>
                  <span className="text-gray-700">COD is available for selected pin codes</span>
                </li>
                <li className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="bg-blue-100 p-1 rounded-full">
                    <InfoIcon className="text-blue-600" sx={{ fontSize: "20px" }} />
                  </div>
                  <span className="text-gray-700">A nominal service charge may apply</span>
                </li>
                <li className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="bg-orange-100 p-1 rounded-full">
                    <WarningIcon className="text-orange-600" sx={{ fontSize: "20px" }} />
                  </div>
                  <span className="text-gray-700">
                    We accept only cash payments for COD orders (no card or digital wallet payments accepted during
                    delivery)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Refunds Section */}
      <section
        id="refunds"
        className={`py-12 md:py-16 bg-gradient-to-r from-purple-100 to-pink-100 transition-all duration-700 ${
          isVisible["refunds"] ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-purple-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
                Refunds & Payment Failures
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="bg-red-100 p-1 rounded-full">
                      <WarningIcon className="text-red-600" />
                    </div>
                    Failed Transactions
                  </h3>
                  <p className="text-gray-700">
                    If your transaction fails but the amount is debited, it will be automatically refunded within
                    <strong> 5-7 business days</strong>.
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="bg-green-100 p-1 rounded-full">
                      <CheckCircleIcon className="text-green-600" />
                    </div>
                    Refunds
                  </h3>
                  <p className="text-gray-700">
                    Eligible refunds will be processed through the <strong>original payment method</strong> used for the
                    transaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section
        id="contact-support"
        className={`py-12 md:py-16 bg-gradient-to-r from-purple-800 via-pink-700 to-red-600 transition-all duration-700 ${
          isVisible["contact-support"] ? "opacity-100 animate-bounce-in" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-6 animate-float">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full">
                <SupportAgentIcon sx={{ fontSize: "32px" }} className="text-white" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-text-glow">Need Help with Payments?</h2>
            <p className="text-lg text-purple-100 mb-6 max-w-2xl mx-auto">
              For any queries regarding payments, feel free to contact our support team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:support@kanchandeepjyot.com"
                className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                support@kanchandeepjyot.com
              </a>
              <span className="text-purple-200">or</span>
              <a
                href="tel:7420989590"
                className="bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30 shadow-lg"
              >
                Call: 7420989590
              </a>
            </div>
            <p className="text-purple-100 mt-8 text-lg font-medium">
              Thank you for shopping with <span className="font-bold text-yellow-200">Kanchan Deep Jyot</span>!
            </p>
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

export default PaymentPolicy
