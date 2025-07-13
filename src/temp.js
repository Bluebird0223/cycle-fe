import React from 'react';
import Banner from './components/Home/Banner/Banner';

// Main App component
const Temp = () => {
    return (
        <div className="font-sans antialiased text-gray-800">

            <Banner />

            {/* Hero Section */}
            {/* <section className="container mx-auto px-4 my-8">
                <div className="relative bg-gray-200 rounded-lg overflow-hidden h-64 md:h-96 flex items-center justify-center">
                    {/* Placeholder for hero image 
                    <img
                        src="https://placehold.co/1200x400/FACC15/FFFFFF?text=Great+Deals+on+Cycles"
                        alt="Hero Banner"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1200x400/FACC15/FFFFFF?text=Image+Not+Found"; }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white p-4">
                        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">Discover Your Next Ride</h1>
                        <p className="text-lg md:text-xl text-center mb-6">Explore our wide range of bicycles and accessories.</p>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300">
                            Shop Now
                        </button>
                    </div>
                </div>
            </section> */}

            {/* Featured Categories */}
            <section className="container mx-auto px-4 my-8">
                <h2 className="text-2xl font-bold text-center mb-6">Shop by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { name: 'Mountain Bikes', img: 'https://placehold.co/300x200/FACC15/FFFFFF?text=Mountain+Bikes' },
                        { name: 'Road Bikes', img: 'https://placehold.co/300x200/FACC15/FFFFFF?text=Road+Bikes' },
                        { name: 'Electric Bikes', img: 'https://placehold.co/300x200/FACC15/FFFFFF?text=Electric+Bikes' },
                        { name: 'Kids Bikes', img: 'https://placehold.co/300x200/FACC15/FFFFFF?text=Kids+Bikes' },
                    ].map((category, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                            <img
                                src={category.img}
                                alt={category.name}
                                className="w-full h-32 object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/FACC15/FFFFFF?text=Image+Not+Found"; }}
                            />
                            <div className="p-4 text-center">
                                <h3 className="font-semibold text-lg">{category.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bestsellers Section */}
            <section className="container mx-auto px-4 my-8">
                <h2 className="text-2xl font-bold text-center mb-6">Our Bestsellers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { name: 'Urban Commuter', price: '$599.99', img: 'https://placehold.co/300x200/FACC15/FFFFFF?text=Urban+Commuter' },
                        { name: 'Trail Blazer', price: '$849.99', img: 'https://placehold.co/300x200/FACC15/FFFFFF?text=Trail+Blazer' },
                        { name: 'Speed Demon', price: '$1299.99', img: 'https://placehold.co/300x200/FACC15/FFFFFF?text=Speed+Demon' },
                        { name: 'Compact Folder', price: '$449.99', img: 'https://placehold.co/300x200/FACC15/FFFFFF?text=Compact+Folder' },
                    ].map((product, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                            <img
                                src={product.img}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/FACC15/FFFFFF?text=Image+Not+Found"; }}
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                                <p className="text-gray-700 font-bold">{product.price}</p>
                                <button className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-2 rounded-md text-sm transition duration-300">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features/Why Choose Us */}
            <section className="container mx-auto px-4 my-8">
                <h2 className="text-2xl font-bold text-center mb-6">Why Choose Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <svg className="w-12 h-12 mx-auto mb-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.944 12c0 2.893 1.144 5.723 3.178 7.757l.707.707A11.955 11.955 0 0112 21.056c2.893 0 5.723-1.144 7.757-3.178l.707-.707A12.001 12.001 0 0021.056 12c0-2.893-1.144-5.723-3.178-7.757z"></path></svg>
                        <h3 className="font-semibold text-xl mb-2">Quality Products</h3>
                        <p className="text-gray-600">We offer only the highest quality bicycles and accessories.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <svg className="w-12 h-12 mx-auto mb-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 className="font-semibold text-xl mb-2">Competitive Prices</h3>
                        <p className="text-gray-600">Get the best value for your money with our affordable prices.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <svg className="w-12 h-12 mx-auto mb-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                        <h3 className="font-semibold text-xl mb-2">Expert Support</h3>
                        <p className="text-gray-600">Our team is ready to assist you with any questions.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials/Reviews */}
            <section className="container mx-auto px-4 my-8">
                <h2 className="text-2xl font-bold text-center mb-6">What Our Customers Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="italic text-gray-700 mb-4">"Absolutely love my new bike! The quality is superb and the delivery was fast. Highly recommend Cycle In!"</p>
                        <p className="font-semibold text-right">- Jane Doe</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="italic text-gray-700 mb-4">"Great selection and excellent customer service. Found exactly what I was looking for. Will definitely buy again!"</p>
                        <p className="font-semibold text-right">- John Smith</p>
                    </div>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="bg-gray-100 py-10 my-8">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-4">Stay Updated!</h2>
                    <p className="text-gray-700 mb-6">Sign up for our newsletter to get the latest news and exclusive offers.</p>
                    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="p-3 border border-gray-300 rounded-md w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-md shadow-lg transition duration-300 w-full md:w-auto">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            {/*<footer className="bg-gray-900 text-gray-300 py-10">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About Us 
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Cycle In</h3>
                        <p className="text-sm">Your one-stop shop for all things cycling. We are passionate about bikes and committed to providing the best products and service.</p>
                    </div>

                    {/* Quick Links 
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                        <ul className="text-sm space-y-2">
                            <li><a href="#" className="hover:text-yellow-500">Shop All</a></li>
                            <li><a href="#" className="hover:text-yellow-500">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-yellow-500">Sale</a></li>
                            <li><a href="#" className="hover:text-yellow-500">FAQs</a></li>
                            <li><a href="#" className="hover:text-yellow-500">Shipping & Returns</a></li>
                        </ul>
                    </div>

                    {/* Customer Service 
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Customer Service</h3>
                        <ul className="text-sm space-y-2">
                            <li><a href="#" className="hover:text-yellow-500">Contact Us</a></li>
                            <li><a href="#" className="hover:text-yellow-500">Order Tracking</a></li>
                            <li><a href="#" className="hover:text-yellow-500">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-yellow-500">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Contact Info 
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">Contact Info</h3>
                        <p className="text-sm">123 Bike Lane, Cycle City, BC 12345</p>
                        <p className="text-sm">Email: info@cyclein.com</p>
                        <p className="text-sm">Phone: +1 (555) 123-4567</p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-white hover:text-yellow-500">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22H12c5.523 0 10-4.477 10-10z" clipRule="evenodd" /></svg>
                            </a>
                            <a href="#" className="text-white hover:text-yellow-500">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2.417a.75.75 0 01.07.867 12.342 12.342 0 00-3.109 4.778 12.342 12.342 0 00-3.11 4.778.75.75 0 01-.07.867 12.342 12.342 0 003.109 4.778 12.342 12.342 0 003.11 4.778.75.75 0 01-.07.867 12.342 12.342 0 00-4.778-3.109 12.342 12.342 0 00-4.778-3.11.75.75 0 01-.867-.07 12.342 12.342 0 00-4.778 3.109 12.342 12.342 0 00-4.778 3.11.75.75 0 01-.867-.07 12.342 12.342 0 00-3.109-4.778 12.342 12.342 0 00-3.11-4.778.75.75 0 01.07-.867 12.342 12.342 0 004.778-3.109 12.342 12.342 0 004.778-3.11.75.75 0 01.867-.07z" clipRule="evenodd" /></svg>
                            </a>
                            <a href="#" className="text-white hover:text-yellow-500">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M2.002 10.602a.75.75 0 01.867-.07 12.342 12.342 0 003.109 4.778 12.342 12.342 0 003.11 4.778.75.75 0 01-.07.867 12.342 12.342 0 00-4.778-3.109 12.342 12.342 0 00-4.778-3.11.75.75 0 01-.867-.07 12.342 12.342 0 00-3.109-4.778 12.342 12.342 0 00-3.11-4.778.75.75 0 01.07-.867 12.342 12.342 0 004.778 3.109 12.342 12.342 0 004.778 3.11.75.75 0 01.867-.07z" clipRule="evenodd" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center text-sm text-gray-500 mt-8">
                    &copy; {new Date().getFullYear()} Cycle In. All rights reserved.
                </div>
            </footer >*/}
        </div >
    );
}

export default Temp;
