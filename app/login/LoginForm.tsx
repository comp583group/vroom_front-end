"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  // Function to sanitize inputs
  const sanitizeInput = (input: string) => {
    return input.trim().replace(/[^\w\s@.]/gi, ''); // Remove unwanted characters
  };

  // Function to validate email format
  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    // Clear previous errors
    setEmailError('');
    setPasswordError('');
    setFormError('');

    let isValid = true;

    // Validate email
    if (!sanitizedEmail) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(sanitizedEmail)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    // Validate password
    if (!sanitizedPassword) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (!isValid) return;

    // Simulate a login attempt (replace this with an API call)
    if (sanitizedEmail === 'example@autodrive.com' && sanitizedPassword === 'password123') {
      console.log('Login successful');
      // Redirect or handle successful login
    } else {
      setFormError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#FEBA33" }}>
      <h1 className="text-6xl my-6 font-extrabold text-white">Login</h1>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${emailError ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="name@autodrive.com"
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${passwordError ? 'border-red-500' : 'border-gray-300'}`}
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <div className="text-sm my-3">
            <Link href="/forgot-password" className="font-medium text-black hover:text-blue-500">Forgot password?</Link>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              style={{ backgroundColor: "#1a535c" }}
            >
              Sign in
            </button>
          </div>

          {formError && <div className="mt-4 text-red-500 text-center">{formError}</div>}
        </form>
      </div>

      <div className="mt-6 text-center">
        <Link href="/register" className="font-medium text-white hover:text-blue-500">
          Create an account
        </Link>
      </div>

      <footer className="mt-8 text-center text-sm text-grey-600">
        &copy; {new Date().getFullYear()} Carvantage. All rights reserved.
      </footer>
    </div>
  );
}
