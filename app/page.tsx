"use client";

import Image from "next/image";
//import { useState } from "react";
//import Dropdown from './components/Dropdown';
//import Link from 'next/link';
import Navbar from '@/components/nav/NavigationBar';
import Footer from "@/components/nav/Footer";
import Link from "next/link";


export default function Home() {


  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Navigation Bar */}
      <Navbar />


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
          <h2 className="text-black text-3xl font-bold text-center mb-12">Find Your Perfect Match</h2>
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
                <h3 className="text-black text-xl font-semibold mb-2">New Inventory</h3>
                <p className="text-gray-600 mb-4">Explore our latest models with cutting-edge features and technology.</p>
                <Link href="/browse-cars" className="text-blue-600 font-medium hover:underline">View All New Cars →</Link>
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
                <Link href="/browse-cars" className="text-blue-600 font-medium hover:underline">Browse Used Cars →</Link>
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
                <h3 className="text-black text-xl font-semibold mb-2">Special Offers</h3>
                <p className="text-gray-600 mb-4">Discover current deals, incentives and financing options.</p>
                <Link href="/browse-cars" className="text-blue-600 font-medium hover:underline">See Current Specials →</Link>
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
            <Link href="/contact" className="bg-white text-black hover:bg-gray-100 font-semibold py-3 px-8 rounded-full inline-block transition-colors">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />



    </div>
  );
}
