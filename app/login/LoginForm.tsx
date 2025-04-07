// app/login/LoginForm.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize the router

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }

    // Placeholder for login logic (e.g., API call)
    console.log('Login attempt:', { email, password });

    // On successful login (replace with actual login check)
    // Redirect to the CRM dashboard 
    router.push('../'); // Placeholder route to home screen for now
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#FEBA33" }}>
      <h1 className="text-6xl my-6 font-extrabold text-white">Login</h1>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* Error message */}
          
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="name@autodrive.com"
            />
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />

            <div className="text-sm my-3">
              <Link href="/forgot-password" className="font-medium text-black hover:text-blue-500">Forgot password?</Link>
            </div>
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
