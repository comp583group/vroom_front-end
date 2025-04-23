"use client";

import Image from "next/image";
import { useState } from "react";
import Link from 'next/link';

export default function CarListing() {
  const [isMenuOpen, setIsMenuOpen] = useState({
    newCars: false,
    usedCars: false,
    services: false,
    finance: false,
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const carImages = [
    "/images/car-listing-main.jpg",
    "/images/car-listing-interior.jpg",
    "/images/car-listing-rear.jpg",
    "/images/car-listing-side.jpg",
    "/images/car-listing-engine.jpg",
  ];

  const carFeatures = [
    "All-Wheel Drive",
    "Adaptive Cruise Control",
    "Lane Departure Warning",
    "Blind Spot Detection",
    "Apple CarPlay & Android Auto",
    "Power Moonroof",
    "Heated Seats",
    "Backup Camera"
  ];

  const toggleMenu = (menu) => {
    setIsMenuOpen({
      ...Object.fromEntries(
        Object.entries(isMenuOpen).map(([key]) => [key, false])
      ),
      [menu]: !isMenuOpen[menu],
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === carImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? carImages.length - 1 : prevIndex - 1
    );
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
              <div className="w-12 h-12 relative">
                <Image src="/sports-car-icon.svg" alt="Dealership Logo" fill />
              </div>
              <span className="font-semibold text-2xl tracking-tight">Carvantage</span>
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
              <a href="/login" className="hover:text-blue-300">Login</a>

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

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-blue-600 hover:underline">Home</a>
            <span className="text-gray-500">/</span>
            <a href="/browse-cars" className="text-blue-600 hover:underline">Inventory</a>
            <span className="text-gray-500">/</span>
            <span className="text-gray-700">2023 Subaru Forester Premium AWD</span>
          </div>
        </div>
      </div>

      {/* Car Listing Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div>
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
              <Image
                src={carImages[currentImageIndex] || "/api/placeholder/800/600"}
                alt="Car Image"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
              
              {/* Image Navigation Arrows */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-2">
              {carImages.map((image, index) => (
                <div 
                  key={index} 
                  className={`h-20 bg-gray-200 rounded cursor-pointer overflow-hidden ${currentImageIndex === index ? 'ring-2 ring-blue-600' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={image || "/api/placeholder/120/80"}
                      alt={`Car Image ${index + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Car Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">2023 Subaru Forester Premium AWD</h1>
            <div className="flex items-center mb-4">
              <span className="text-3xl font-bold text-blue-600">$32,995</span>
              <span className="ml-2 text-gray-500 line-through">$35,890</span>
              <span className="ml-3 bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">Save $2,895</span>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Mileage:</span>
                <span className="font-medium">4,875 miles</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Year:</span>
                <span className="font-medium">2023</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Condition:</span>
                <span className="font-medium">Certified Pre-Owned</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Warranty:</span>
                <span className="font-medium">5 Year / 60,000 Miles</span>
              </div>
            </div>
            
            <a 
              href="/interest-form" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg inline-block text-center text-lg transition-colors mb-6"
              style={{backgroundColor: "#004a82"}}
            >
              Express Interest
            </a>
            
            <div className="flex space-x-4 mb-6">
              <button className="flex-1 border border-gray-300 hover:bg-gray-100 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Dealer</span>
              </button>
              <button className="flex-1 border border-gray-300 hover:bg-gray-100 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Vehicle Specifications */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Vehicle Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-16">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Exterior Color</span>
              <span className="font-medium">Crystal White Pearl</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Interior Color</span>
              <span className="font-medium">Black</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Body/Seating</span>
              <span className="font-medium">5-Door/5 seats</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Transmission</span>
              <span className="font-medium">Continuously Variable Automatic</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Drivetrain</span>
              <span className="font-medium">All-Wheel Drive</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Engine</span>
              <span className="font-medium">H-4 cyl</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">VIN</span>
              <span className="font-medium">JF1GUABC4S8243983</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Stock Number</span>
              <span className="font-medium">ZL501919</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Fuel Economy</span>
              <span className="font-medium">26 City / 33 Highway</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Fuel Type</span>
              <span className="font-medium">Gasoline</span>
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Features & Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {carFeatures.map((feature, index) => (
              <div key={index} className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Vehicle Description */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Vehicle Description</h2>
          <div className="prose max-w-none">
            <p>This 2023 Subaru Forester Premium AWD is a versatile and capable crossover SUV that combines comfort, technology, and Subaru's renowned all-wheel drive system. With only 4,875 miles, this Certified Pre-Owned vehicle offers exceptional value with the reliability of a nearly new car.</p>
            <p className="mt-4">The Crystal White Pearl exterior paired with Black interior creates a timeless and sophisticated appearance. The Premium trim level includes numerous comfort and convenience features that make every drive enjoyable, including heated front seats, power moonroof, and the latest Subaru STARLINK infotainment system.</p>
            <p className="mt-4">Powered by a fuel-efficient 2.5L horizontally-opposed BOXER engine delivering a perfect balance of power and efficiency, this Forester is ideal for both daily commuting and weekend adventures. The Continuously Variable Transmission (CVT) provides smooth acceleration and excellent fuel economy.</p>
          </div>
        </div>
        
        {/* Similar Vehicles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Vehicles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 relative">
                  <Image
                    src={`/api/placeholder/400/300?text=Similar Vehicle ${item}`}
                    alt={`Similar Vehicle ${item}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">2023 Subaru Outback</h3>
                  <p className="text-gray-600 mb-2">$34,995 • 8,120 miles</p>
                  <a href="#" className="text-blue-600 hover:underline text-sm">View Details</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 mt-12">
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