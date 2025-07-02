import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import test1 from "../assets/images/Testmonilas/download.jpg";
import test2 from "../assets/images/Testmonilas/dummy-female.png";
import test3 from "../assets/images/Testmonilas/images.jpg";
import test4 from "../assets/images/Testmonilas/image1.jpg";
import { Nxt, Pre } from "./Home/Banner/Banner";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    text: "The service was fantastic! My experience was truly exceptional.The service was fantastic! My experience was truly exceptional.",
    image: test1,
    rating: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    text: "Professional and efficient, highly recommended!The service was fantastic! My experience was truly exceptional.",
    image: test2,
    rating: 4,
  },
  {
    id: 3,
    name: "David Brown",
    text: "Great experience! Staff is so helpful and kind.The service was fantastic! My experience was truly exceptional.",
    image: test3,
    rating: 5,
  },
  {
    id: 4,
    name: "Jane Smith",
    text: "Professional and efficient, highly recommended!The service was fantastic! My experience was truly exceptional.",
    image: test4,
    rating: 4,
  },
];

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs mx-auto hover:shadow-2xl transition-shadow duration-300">
    <div className="flex items-center space-x-4 mb-4">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div>
        <h4 className="text-lg font-semibold text-gray-800">
          {testimonial.name}
        </h4>
        <div className="text-yellow-400">
          {"★".repeat(testimonial.rating)}{" "}
          <span className="text-gray-400">
            {"☆".repeat(5 - testimonial.rating)}
          </span>
        </div>
      </div>
    </div>
    <p className="text-gray-600 text-sm">{testimonial.text}</p>
  </div>
);

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Shows 2 cards at a time
    slidesToScroll: 1,
    prevArrow: <Pre top="top-10" />,
    nextArrow: <Nxt top="top-10" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // On larger screens (1024px and up), show 2 cards at a time
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // On smaller screens (768px and below), show 1 card at a time
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-8">
        What Our Clients Say
      </h2>
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="mr-2">
            {" "}
            {/* Reduced margin between cards */}
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
