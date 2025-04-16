"use client";

import Image from "next/image";
import { useState } from "react";
import Dropdown from './components/Dropdown';
import Link from 'next/link';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState({
    newCars: false,
    usedCars: false,
    services: false,
    finance: false,
  });

  const toggleMenu = (menu) => {
    setIsMenuOpen({
      ...Object.fromEntries(
        Object.entries(isMenuOpen).map(([key]) => [key, false])
      ),
      [menu]: !isMenuOpen[menu],
    });
  };

  // Simple login handler (replace with your own login logic)
  const handleLogin = () => {
    console.log("Login clicked");
    window.location.href = "/login";
    // e.g., redirect to a login page: window.location.href = "/login";
  };

  const carCategories = [
    { name: "Sedans", image: "/api/placeholder/120/80" },
    { name: "SUVs", image: "/api/placeholder/120/80" },
    { name: "Trucks", image: "/api/placeholder/120/80" },
    { name: "Sports Cars", image: "/api/placeholder/120/80" },
    { name: "Electric", image: "/api/placeholder/120/80" },
    { name: "Hybrids", image: "/api/placeholder/120/80" },
  ];

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Navigation Bar */}
      <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg" style= {{backgroundColor: "#ff9d00"}}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Dealership Name */}
            <Link href="/" className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="font-bold text-xl">CD</span>
          </div>
          <span className="font-semibold text-2xl tracking-tight">Dealership</span>
        </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-16 ">
              <div className="relative">
                <button 
                  className="flex items-center hover:text-blue-300"
                  onClick={() => toggleMenu("newCars")}
                >
                  New Cars
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMenuOpen.newCars && (
                  <div className="absolute left-0 mt-2 w-96 bg-white rounded-md shadow-xl z-50">
                    <div className="p-4">
                      <h3 className="text-gray-800 font-medium mb-2">Browse by Category</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {carCategories.map((category) => (
                          <a 
                            key={category.name}
                            href="#" 
                            className="flex flex-col items-center p-2 rounded hover:bg-gray-100 transition-colors text-gray-800"
                          >
                            <div className="w-24 h-16 bg-gray-200 rounded mb-2 overflow-hidden">
                              <Image
                                src={category.image}
                                alt={category.name}
                                width={120}
                                height={80}
                                className="object-cover"
                              />
                            </div>
                            <span className="text-sm">{category.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <a href="#" className="hover:text-blue-300">About Us</a>
              <a href="/interest-form" className="hover:text-blue-300">Contact Us</a>
              {/* Login Button */}
              <button onClick={handleLogin} className="hover:text-blue-300">
                Login
              </button>
            </div>

            {/* Search Bar */}
            <div className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search inventory..."
                  className="bg-white text-black rounded-full py-1 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-92 h-10"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="relative h-[87vh] bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/carl-gelin-3F0e5HpD7Ro-unsplash.jpg"
            alt="Luxury car"
            fill
            style={{ objectFit: "cover" }}
            priority
            className="opacity-70"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Drive Your Dreams Home Today</h1>
            <p className="text-lg mb-8">Discover our premium selection of vehicles with competitive financing options.</p>
            <a 
              href="/browse-cars" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full inline-block transition-colors"
            >
              Browse New Cars
            </a>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Find Your Perfect Match</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
              <div className="h-48 relative">
                <Image
                  src="/images/samuele-errico-piccarini-MyjVReZ5GLQ-unsplash.jpg"
                  alt="New Inventory"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">New Inventory</h3>
                <p className="text-gray-600 mb-4">Explore our latest models with cutting-edge features and technology.</p>
                <a href="/browse-cars" className="text-blue-600 font-medium hover:underline">View All New Cars →</a>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
              <div className="h-48 relative">
                <Image
                  src="/images/gohar-khachatryan-oeA4k4u6AbI-unsplash.jpg"
                  alt="Used Cars"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Pre-Owned Vehicles</h3>
                <p className="text-gray-600 mb-4">Quality used cars inspected and certified for your peace of mind.</p>
                <a href="#" className="text-blue-600 font-medium hover:underline">Browse Used Cars →</a>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
              <div className="h-48 relative">
                <Image
                  src="/images/kenan-reed-S5CUECZa8gw-unsplash.jpg"
                  alt="Special Offers"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Special Offers</h3>
                <p className="text-gray-600 mb-4">Discover current deals, incentives and financing options.</p>
                <a href="#" className="text-blue-600 font-medium hover:underline">See Current Specials →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white" style={{backgroundColor: "#004a82"}}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for a Test Drive?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Experience the thrill of driving your dream car today. Our team is ready to assist you.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#" className="bg-white text-black hover:bg-gray-100 font-semibold py-3 px-8 rounded-full inline-block transition-colors">Schedule Test Drive</a>
            <a href="/interest-form" className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-full inline-block transition-colors">Contact Us</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-40 mb-12 ml-18 mr-18">
            {/* Column 1 - About */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About CarDealership</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300">Our Story</a></li>
                <li><a href="#" className="hover:text-blue-300">Meet The Team</a></li>
                <li><a href="#" className="hover:text-blue-300">Careers</a></li>
                <li><a href="#" className="hover:text-blue-300">News & Events</a></li>
                <li><a href="#" className="hover:text-blue-300">Customer Reviews</a></li>
              </ul>
            </div>

            {/* Column 2 - Vehicles */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Vehicles</h3>
              <ul className="space-y-2">
                <li><a href="/browse-cars" className="hover:text-blue-300">New Inventory</a></li>
                <li><a href="#" className="hover:text-blue-300">Featured Vehicles</a></li>
                <li><a href="#" className="hover:text-blue-300">Compare Models</a></li>
                <li><a href="#" className="hover:text-blue-300">Current Offers</a></li>
              </ul>
            </div>

            {/* Column 3 - Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="not-italic mb-4">
                <p>123 Auto Drive</p>
                <p>Cartown, CT 12345</p>
                <p className="mt-2">Phone: (555) 123-4567</p>
                <p>Email: info@cardealership.com</p>
              </address>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400 mb-4 md:mb-0">© 2025 CarDealership. All rights reserved.</p>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a>
                <a href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</a>
                <a href="#" className="text-sm text-gray-400 hover:text-white">Sitemap</a>
                <a href="#" className="text-sm text-gray-400 hover:text-white">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
