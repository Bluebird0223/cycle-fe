import React from "react";
import blogImg1 from "../assets/images/Products/selling_prod4.png";
import blogImg2 from "../assets/images/Products/selling_prod5.png";
import blogImg3 from "../assets/images/Products/selling_prod3.png";


const blogs = [
  {
    id: 1,
    date: "22 AUG 2021",
    category: "TIPS & TRICKS",
    title: "Top 10 casual look ideas to dress up your kids",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam.",
    image: blogImg1,
  },
  {
    id: 2,
    date: "25 AUG 2021",
    category: "TRENDING",
    title: "Latest trends of wearing street wears supremely",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam.",
    image:blogImg2,
  },
  {
    id: 3,
    date: "28 AUG 2021",
    category: "INSPIRATION",
    title: "10 Different Types of comfortable clothes ideas for women",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam.",
    image:blogImg3 ,
  },
];

const BlogSection = () => {
  return (
    <div className="bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Our Recent Blog</h2>
          <button className="bg-red-900 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow-md">
            View All
          </button>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Blog Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              {/* Blog Content */}
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">
                  <span>{blog.date}</span> | <span>{blog.category}</span>
                </p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm">{blog.description}</p>
                <button className="mt-4 bg-red-900 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow-md">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
