"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function InterestForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    preferredContact: "email",
    interestedIn: "newCars"
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    // Message validation (optional but with min length if provided)
    if (formData.message.trim() && formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For phone field, format as user types
    if (name === "phone") {
      // Remove all non-digits
      const cleaned = value.replace(/\D/g, "");
      let formatted = cleaned;
      
      // Format as (XXX) XXX-XXXX
      if (cleaned.length > 0) {
        if (cleaned.length <= 3) {
          formatted = cleaned;
        } else if (cleaned.length <= 6) {
          formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
        } else {
          formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
        }
      }
      
      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Here you would make the API call to your backend
        // Since backend is undefined, we're just simulating a submission
        console.log("Form data submitted:", formData);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        setSubmitSuccess(true);
        
        // Reset form after submission
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          preferredContact: "email",
          interestedIn: "newCars"
        });
        
        // Redirect to landing page after 2 seconds
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
        
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors({ submit: "Failed to submit form. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Navigation Bar */}
      <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg" style={{ backgroundColor: "#ff9d00" }}>
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
            <div className="hidden md:flex items-center space-x-16">
              <Link href="/" className="hover:text-blue-300">Home</Link>
              <Link href="#" className="hover:text-blue-300">New Cars</Link>
              <Link href="#" className="hover:text-blue-300">About Us</Link>
              <Link href="#" className="hover:text-blue-300">Contact</Link>
            </div>

            <a href="/login" className="hover:text-blue-300">Login</a>

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

      {/* Form Section */}
      <section className="py-16 bg-white flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-center">Contact Us</h1>
            <p className="text-gray-600 mb-8 text-center">Let us know how we can help you find your perfect vehicle</p>
            
            {submitSuccess ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-8 text-center">
                <p className="font-medium">Thank you for your interest!</p>
                <p>We've received your information and will contact you shortly.</p>
                <p className="mt-2 text-sm">Redirecting to homepage...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* First Name */}
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.firstName ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
                  {/* Last Name */}
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                      Last Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.lastName ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="(123) 456-7890"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.phone ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
                
                {/* Interest */}
                <div className="mb-6">
                  <label htmlFor="interestedIn" className="block text-gray-700 font-medium mb-2">
                    I'm interested in:
                  </label>
                  <select
                    id="interestedIn"
                    name="interestedIn"
                    value={formData.interestedIn}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newCars">New Cars</option>
                    <option value="usedCars">Pre-Owned Vehicles</option>
                    <option value="testDrive">Test Drive</option>
                    <option value="financing">Financing Options</option>
                    <option value="service">Service Department</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                {/* Preferred Contact Method */}
                <div className="mb-6">
                  <p className="block text-gray-700 font-medium mb-2">Preferred Contact Method:</p>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === "email"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Email
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === "phone"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Phone
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="text"
                        checked={formData.preferredContact === "text"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Text
                    </label>
                  </div>
                </div>
                
                {/* Message */}
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about your vehicle needs, questions, or preferred time to contact you..."
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.message ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1">{errors.message}</p>
                  )}
                </div>
                
                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full inline-block transition-colors ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    style={{ backgroundColor: isSubmitting ? "#757575" : "#004a82" }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  </button>
                  
                  {errors.submit && (
                    <p className="text-red-600 text-sm mt-4">{errors.submit}</p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-40 mb-12">
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