"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function EmployeeRegistration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    // Optional Password Security Measures, commented out for easier testing

    //  else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
    //   newErrors.password = "Password must include uppercase, lowercase, and numbers";
    // }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        console.log("Registration data submitted:", formData);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSubmitSuccess(true);

        setFormData({
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: ""
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors({ submit: "Failed to register. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        router.push("/"); // adjust route if needed
      }, 2000); // 3 seconds delay
  
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, router]);
  
  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4 flex items-center justify-center" style={{ backgroundColor: "#f5f8fb" }}>
      <div className="max-w-xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50" style={{ backgroundColor: "#004a82" }}>
          <h2 className="text-2xl font-bold text-center text-white">Employee Registration</h2>
          <p className="text-center text-blue-100 mt-1">Create your account</p>
        </div>

        {submitSuccess ? (
            <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Registration Successful!</h3>
                <p className="text-gray-600 mt-2">Redirecting to employee dashboard...</p>
                <button 
                onClick={() => setSubmitSuccess(false)}
                className="mt-6 bg-blue-600 text-white font-medium py-2 px-6 rounded-full hover:bg-blue-700 transition-colors"
                style={{ backgroundColor: "#ff9d00" }}
                >
                Register Another
                </button>
            </div>
            ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.firstName ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                />
                {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.lastName ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                />
                {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                  Password <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                />
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
                  Confirm Password <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                />
                {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {errors.submit && <p className="text-red-600 text-sm text-center">{errors.submit}</p>}

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white font-medium py-2 px-6 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
                style={{ backgroundColor: "#ff9d00" }}
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
