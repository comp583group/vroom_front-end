// app/login/LoginForm.tsx
"use client";

import { useState } from 'react';
//import Link from 'next/link';
//import { useRouter } from 'next/navigation'; // Import useRouter

import { useAuth } from '@/components/auth/AuthContext'; //useRouter is in this comp

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try { // Store password in localStorage 
      await login(username, password); // This sets tokens & auth context
    } catch (err) {
      console.error(err);
      setError('Login failed. Check your credentials.');
    }
  };



  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#FEBA33" }}>
      <h1 className="text-6xl my-6 font-extrabold text-white">Employee Login</h1>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* Error message */}
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="admin"
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
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />


          {/*
            <div className="text-sm my-3">
              <Link href="/forgot-password" className="font-medium text-black hover:text-blue-500">Forgot password?</Link>
            </div>
          */}
            <div className="text-sm my-3 text-gray-500">
              Any issues logging-in, reach out to IT department.
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

      {/*
      <div className="mt-6 text-center">
        <Link href="/register" className="font-medium text-white hover:text-blue-500">
          Create an account
        </Link>
      </div>
      */}


      <footer className="mt-8 text-center text-sm text-grey-600">
        &copy; {new Date().getFullYear()} Carvantage. All rights reserved. 
      </footer>
    </div>
  );
}
