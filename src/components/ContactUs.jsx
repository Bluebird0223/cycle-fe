"use client"

import { useState } from "react"
import Testimonials from "../components/Testimonials"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateForm = () => {
    const tempErrors = {}
    if (!formData.name.trim()) tempErrors.name = "Name is required"
    else if (formData.name.trim().length < 2) tempErrors.name = "Name must be at least 2 characters"

    if (!formData.email.trim()) tempErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) tempErrors.message = "Message is required"
    else if (formData.message.trim().length < 10) tempErrors.message = "Message must be at least 10 characters"

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Form Data:", formData)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setErrors({})
      setIsSubmitting(false)

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    }
  }

  const contactInfo = [
    {
      icon: "fas fa-map-marker-alt",
      title: "Our Address",
      content: [
        "KANCHAN DEEP JYOT PRIVATE LTD",
        "Plot No.9/10 Gramin Beghar Society",
        "Opp. Bharat Petrol Pump",
        "Khadgaon Road Lava Wadi",
        "Nagpur - 440023 (Maharashtra)",
      ],
      color: "text-blue-600",
    },
    {
      icon: "fas fa-envelope",
      title: "Email Us",
      content: ["support@kanchandeepjyot.com"],
      color: "text-green-600",
      link: "mailto:support@kanchandeepjyot.com",
    },
    {
      icon: "fas fa-phone-alt",
      title: "Call Us",
      content: ["+91 7420989590"],
      color: "text-red-600",
      link: "tel:+917420989590",
    },
  ]

  return (
    <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-12 md:py-16 lg:py-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 animate-fade-in-down">
            Get In <span className="text-red-600 animate-text-glow">Touch</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up-delay">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-800 mx-auto mt-6 rounded-full animate-expand-width"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 lg:p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 animate-slide-in-left border border-white/20">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 animate-bounce-in-delayed">
                  Send us a Message
                </h3>
                <p className="text-gray-600 animate-fade-in-delayed">
                  Fill out the form below and we'll get back to you
                </p>
              </div>

              {/* Success Message */}
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-success-bounce">
                  <i className="fas fa-check-circle text-green-600 text-lg animate-spin-once"></i>
                  <p className="text-green-700 font-medium">Message sent successfully! We'll get back to you soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="relative group animate-float" style={{ animationDelay: "0.1s" }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 transition-all duration-300 group-hover:text-red-600">
                    Full Name *
                  </label>
                  <div className="relative">
                    <i
                      className={`fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                        focusedField === "name" ? "text-red-600 animate-pulse" : "text-gray-400"
                      }`}
                    ></i>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField("")}
                      placeholder="Enter your full name"
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-500 transform hover:scale-[1.02] focus:scale-[1.02] ${
                        errors.name
                          ? "border-red-500 focus:border-red-600 bg-red-50 animate-shake"
                          : focusedField === "name"
                            ? "border-red-600 focus:border-red-600 bg-red-50 shadow-lg shadow-red-100"
                            : "border-gray-200 focus:border-red-600 hover:border-gray-300 hover:shadow-md"
                      }`}
                    />
                    {focusedField === "name" && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/10 to-red-800/10 pointer-events-none animate-pulse-glow"></div>
                    )}
                  </div>
                  {errors.name && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 animate-error-slide-in">
                      <i className="fas fa-exclamation-circle animate-bounce"></i>
                      <p className="text-sm">{errors.name}</p>
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className="relative group animate-float" style={{ animationDelay: "0.2s" }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 transition-all duration-300 group-hover:text-red-600">
                    Email Address *
                  </label>
                  <div className="relative">
                    <i
                      className={`fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                        focusedField === "email" ? "text-red-600 animate-pulse" : "text-gray-400"
                      }`}
                    ></i>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField("")}
                      placeholder="Enter your email address"
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-500 transform hover:scale-[1.02] focus:scale-[1.02] ${
                        errors.email
                          ? "border-red-500 focus:border-red-600 bg-red-50 animate-shake"
                          : focusedField === "email"
                            ? "border-red-600 focus:border-red-600 bg-red-50 shadow-lg shadow-red-100"
                            : "border-gray-200 focus:border-red-600 hover:border-gray-300 hover:shadow-md"
                      }`}
                    />
                    {focusedField === "email" && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/10 to-red-800/10 pointer-events-none animate-pulse-glow"></div>
                    )}
                  </div>
                  {errors.email && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 animate-error-slide-in">
                      <i className="fas fa-exclamation-circle animate-bounce"></i>
                      <p className="text-sm">{errors.email}</p>
                    </div>
                  )}
                </div>

                {/* Message Field */}
                <div className="relative group animate-float" style={{ animationDelay: "0.3s" }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 transition-all duration-300 group-hover:text-red-600">
                    Message *
                  </label>
                  <div className="relative">
                    <i
                      className={`fas fa-comment-dots absolute left-3 top-4 transition-all duration-300 ${
                        focusedField === "message" ? "text-red-600 animate-pulse" : "text-gray-400"
                      }`}
                    ></i>
                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField("")}
                      placeholder="Tell us how we can help you..."
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none transition-all duration-500 transform hover:scale-[1.02] focus:scale-[1.02] resize-none ${
                        errors.message
                          ? "border-red-500 focus:border-red-600 bg-red-50 animate-shake"
                          : focusedField === "message"
                            ? "border-red-600 focus:border-red-600 bg-red-50 shadow-lg shadow-red-100"
                            : "border-gray-200 focus:border-red-600 hover:border-gray-300 hover:shadow-md"
                      }`}
                    />
                    {focusedField === "message" && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/10 to-red-800/10 pointer-events-none animate-pulse-glow"></div>
                    )}
                  </div>
                  {errors.message && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 animate-error-slide-in">
                      <i className="fas fa-exclamation-circle animate-bounce"></i>
                      <p className="text-sm">{errors.message}</p>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="animate-float" style={{ animationDelay: "0.4s" }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-500 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 overflow-hidden ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:shadow-2xl hover:shadow-red-500/25 animate-button-glow"
                    }`}
                  >
                    {/* Animated background overlay */}
                    {!isSubmitting && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    )}

                    {/* Ripple effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-white/20 transform scale-0 group-active:scale-100 transition-transform duration-300 rounded-full"></div>
                    </div>

                    <div className="relative z-10 flex items-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="animate-pulse">Sending...</span>
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"></i>
                          <span className="transition-all duration-300 group-hover:tracking-wide">Send Message</span>
                        </>
                      )}
                    </div>

                    {/* Shine effect */}
                    {!isSubmitting && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="order-1 lg:order-2">
            <div className="bg-gradient-to-br from-red-50/80 to-red-100/80 backdrop-blur-sm p-6 md:p-8 lg:p-10 rounded-2xl shadow-lg animate-slide-in-right border border-white/20">
              <h3 className="text-2xl md:text-3xl font-bold text-red-800 mb-8 text-center animate-bounce-in">
                Contact Information
              </h3>

              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up border border-white/30"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`${info.color} group-hover:scale-125 transition-all duration-500 group-hover:rotate-12`}
                      >
                        <i className={`${info.icon} text-xl`}></i>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-gray-800 mb-2 text-lg group-hover:text-red-600 transition-colors duration-300">
                          {info.title}
                        </h5>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-gray-600 hover:text-red-600 transition-all duration-300 font-medium hover:underline hover:scale-105 inline-block"
                          >
                            {info.content[0]}
                          </a>
                        ) : (
                          <div className="text-gray-600 leading-relaxed">
                            {info.content.map((line, i) => (
                              <p key={i} className={i === 0 ? "font-semibold text-gray-800" : ""}>
                                {line}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div
                className="mt-8 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md animate-fade-in-up border border-white/30"
                style={{ animationDelay: "0.6s" }}
              >
                <h5 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Business Hours
                </h5>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between hover:bg-gray-50 p-2 rounded transition-colors duration-300">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between hover:bg-gray-50 p-2 rounded transition-colors duration-300">
                    <span>Saturday:</span>
                    <span className="font-medium">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between hover:bg-gray-50 p-2 rounded transition-colors duration-300">
                    <span>Sunday:</span>
                    <span className="font-medium text-red-600">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mb-16 animate-fade-in-up">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 animate-bounce-in">Find Us Here</h3>
            <p className="text-gray-600 animate-fade-in-delayed">Visit our office for a personal consultation</p>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-500 animate-pulse-slow"></div>
            <div className="relative bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-xl border border-white/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.1257840470045!2d79.05137677521324!3d21.13431228592832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c099b0c6d67d%3A0xd317cae2eb1b9f2a!2sKanchan%20Deep%20Jyot%20Private%20Limited!5e0!3m2!1sen!2sin!4v1709468345964!5m2!1sen!2sin"
                loading="lazy"
                title="Google Maps - KANCHAN DEEP JYOT PRIVATE LIMITED"
                className="w-full h-64 md:h-80 lg:h-96 rounded-xl border-0 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
              />
            </div>
          </div>
        </div>

        <Testimonials />
      </div>

      {/* Enhanced Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUpDelay {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes expandWidth {
          from { width: 0; }
          to { width: 6rem; }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes bounceInDelayed {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.1); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes fadeInDelayed {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        @keyframes errorSlideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes successBounce {
          0% { opacity: 0; transform: scale(0.5) translateY(-20px); }
          50% { opacity: 1; transform: scale(1.1) translateY(-10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        @keyframes spinOnce {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes buttonGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.3); }
          50% { box-shadow: 0 0 30px rgba(220, 38, 38, 0.5); }
        }
        
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 10px rgba(220, 38, 38, 0.3); }
          50% { text-shadow: 0 0 20px rgba(220, 38, 38, 0.6); }
        }
        
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
          20%, 40%, 60%, 80% { transform: translateX(3px); }
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out;
        }
        
        .animate-fade-in-up-delay {
          animation: fadeInUpDelay 1s ease-out 0.3s both;
        }
        
        .animate-expand-width {
          animation: expandWidth 1.2s ease-out 0.6s both;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 1s ease-out 0.4s both;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 1s ease-out 0.4s both;
        }
        
        .animate-bounce-in-delayed {
          animation: bounceInDelayed 0.8s ease-out 0.2s both;
        }
        
        .animate-fade-in-delayed {
          animation: fadeInDelayed 0.8s ease-out 0.4s both;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        
        .animate-error-slide-in {
          animation: errorSlideIn 0.4s ease-out;
        }
        
        .animate-success-bounce {
          animation: successBounce 0.8s ease-out;
        }
        
        .animate-spin-once {
          animation: spinOnce 0.6s ease-out;
        }
        
        .animate-button-glow {
          animation: buttonGlow 2s ease-in-out infinite;
        }
        
        .animate-text-glow {
          animation: textGlow 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUpDelay 0.8s ease-out both;
        }
        
        .animate-bounce-in {
          animation: bounceInDelayed 0.8s ease-out both;
        }
        
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </section>
  )
}

export default ContactForm
