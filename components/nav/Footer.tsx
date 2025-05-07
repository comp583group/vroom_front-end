// components/layout/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Carvantage</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-300">Our Story</a></li>
              <li><a href="#" className="hover:text-blue-300">Meet The Team</a></li>
              <li><a href="#" className="hover:text-blue-300">Careers</a></li>
              <li><a href="#" className="hover:text-blue-300">News & Events</a></li>
              <li><a href="#" className="hover:text-blue-300">Customer Reviews</a></li>
            </ul>
          </div>

          {/* Vehicles */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Vehicles</h3>
            <ul className="space-y-2">
              <li><a href="/browse-cars" className="hover:text-blue-300">New Inventory</a></li>
              <li><a href="#" className="hover:text-blue-300">Featured Vehicles</a></li>
              <li><a href="#" className="hover:text-blue-300">Compare Models</a></li>
              <li><a href="#" className="hover:text-blue-300">Current Offers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic mb-4 text-sm">
              <p>123 Auto Drive</p>
              <p>Cartown, CT 12345</p>
              <p className="mt-2">Phone: (555) 123-4567</p>
              <p>Email: info@carvantage.com</p>
            </address>
            <div className="flex space-x-4 mt-4">
              {/* Icons (unchanged) */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2025 Carvantage. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-end">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Sitemap</a>
            <a href="#" className="hover:text-white">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
