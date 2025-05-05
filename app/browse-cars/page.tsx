"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
//import Dropdown from '../components/Dropdown'; // not being read
import Navbar from '@/components/nav/NavigationBar';
import CarListing from "@/components/cars/CarListing";


// Define car interface
interface Car {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  color: string;
  image: string;
  features: string[];
}

// Define filter state interface
interface FilterState {
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
  brands: string[];
  bodyTypes: string[];
  fuelTypes: string[];
  transmissions: string[];
}

export default function BrowseCars() {
  // Navigation menu state
  /*
  const [isMenuOpen, setIsMenuOpen] = useState({
    newCars: false,
    usedCars: false,
    services: false,
    finance: false,
  });
  */

  // Filter panel toggle state (for mobile)
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Cars data state
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 200000,
    minYear: 2015,
    maxYear: 2025,
    brands: [],
    bodyTypes: [],
    fuelTypes: [],
    transmissions: [],
  });

  // Sorting state
  const [sortOption, setSortOption] = useState<string>("price-low");

  // Available filter options
  const allBrands = ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Tesla", "Chevrolet"];
  const allBodyTypes = ["Sedan", "SUV", "Truck", "Coupe", "Convertible", "Hatchback", "Wagon"];
  const allFuelTypes = ["Gasoline", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"];
  const allTransmissions = ["Automatic", "Manual", "CVT", "Dual-Clutch"];

  // Toggle nav menu
  /*
  const toggleMenu = (menu: keyof typeof isMenuOpen) => {
    setIsMenuOpen((prev) => ({
      newCars: false,
      usedCars: false,
      services: false,
      finance: false,
      [menu]: !prev[menu],
    }));
  };
  */
  

  // Simple login handler
  /*
  const handleLogin = () => {
    console.log("Login clicked");
    window.location.href = "/login";
  };
  */

  // Car categories for dropdown
  /*
  const carCategories = [
    { name: "Sedans", image: "/api/placeholder/120/80" },
    { name: "SUVs", image: "/api/placeholder/120/80" },
    { name: "Trucks", image: "/api/placeholder/120/80" },
    { name: "Sports Cars", image: "/api/placeholder/120/80" },
    { name: "Electric", image: "/api/placeholder/120/80" },
    { name: "Hybrids", image: "/api/placeholder/120/80" },
  ];*/

  // Load car data
  useEffect(() => {
  const fetchCars = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/cars/`); //JUST FOR TESTING
      if (!response.ok) throw new Error("Failed to fetch cars");

      const data = await response.json();
      console.log(data);
      setCars(data);
      setFilteredCars(data);
    } catch (error) {
      console.error("Error loading car data:", error);
    }
  };

  fetchCars();
}, []);


  // Apply filters and sorting
  useEffect(() => {
    let results = [...cars];

    // Apply filters
    results = results.filter(car => {
      const priceMatch = car.price >= filters.minPrice && car.price <= filters.maxPrice;
      const yearMatch = car.year >= filters.minYear && car.year <= filters.maxYear;
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(car.brand);
      const bodyTypeMatch = filters.bodyTypes.length === 0 || filters.bodyTypes.includes(car.bodyType);
      const fuelTypeMatch = filters.fuelTypes.length === 0 || filters.fuelTypes.includes(car.fuelType);
      const transmissionMatch = filters.transmissions.length === 0 || filters.transmissions.includes(car.transmission);
      
      return priceMatch && yearMatch && brandMatch && bodyTypeMatch && fuelTypeMatch && transmissionMatch;
    });

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "year-new":
        results.sort((a, b) => b.year - a.year);
        break;
      case "year-old":
        results.sort((a, b) => a.year - b.year);
        break;
      case "name-asc":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredCars(results);
  }, [cars, filters, sortOption]);

  type ArrayFilterKeys = 'brands' | 'bodyTypes' | 'fuelTypes' | 'transmissions';

  // Toggle filter checkbox
  const handleCheckboxFilter = (filterType: ArrayFilterKeys, value: string) => {
    setFilters(prev => {
      const currentValues = [...prev[filterType]]; // now TypeScript knows this is a string[]
  
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [filterType]: currentValues.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [filterType]: [...currentValues, value]
        };
      }
    });
  };
  

  // Handle slider changes
  const handleRangeChange = (filterType: string, value: number) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // View car details
  const handleViewCarDetails = (car: Car) => {
    setSelectedCar(car);
    // In a real app, you might navigate to a detail page instead
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close car details modal
  const closeCarDetails = () => {
    setSelectedCar(null);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 200000,
      minYear: 2015,
      maxYear: 2025,
      brands: [],
      bodyTypes: [],
      fuelTypes: [],
      transmissions: [],
    });
  };

  // Format price display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Navigation Bar */}
      <Navbar />


      {/* Car Detail Modal */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedCar.name}</h2>
                <button 
                  onClick={closeCarDetails} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="relative h-64 md:h-80 mb-6">
                <Image
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Car Details</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Price:</span> {formatPrice(selectedCar.price)}</p>
                    <p><span className="font-medium">Year:</span> {selectedCar.year}</p>
                    <p><span className="font-medium">Brand:</span> {selectedCar.brand}</p>
                    <p><span className="font-medium">Model:</span> {selectedCar.model}</p>
                    <p><span className="font-medium">Body Type:</span> {selectedCar.bodyType}</p>
                    <p><span className="font-medium">Mileage:</span> {selectedCar.mileage.toLocaleString()} miles</p>
                    <p><span className="font-medium">Fuel Type:</span> {selectedCar.fuelType}</p>
                    <p><span className="font-medium">Transmission:</span> {selectedCar.transmission}</p>
                    <p><span className="font-medium">Color:</span> {selectedCar.color}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Features</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedCar.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-2">Interested?</h3>
                    <div className="flex flex-wrap gap-3 mt-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                        Schedule Test Drive
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                        Get Price Quote
                      </button>
                      <button className="border border-gray-300 hover:bg-gray-100 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors">
                        Contact Dealer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-grow bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Browse Our Inventory</h1>
            <p className="text-gray-600">Find your perfect vehicle from our extensive collection.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter sidebar - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button 
                    onClick={resetFilters}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Reset All
                  </button>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">{formatPrice(filters.minPrice)}</span>
                    <span className="text-sm text-gray-600">{formatPrice(filters.maxPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="5000"
                    value={filters.maxPrice}
                    onChange={(e) => handleRangeChange('maxPrice', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Year Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Year Range</h3>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">{filters.minYear}</span>
                    <span className="text-sm text-gray-600">{filters.maxYear}</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="range"
                      min="2015"
                      max="2025"
                      value={filters.minYear}
                      onChange={(e) => handleRangeChange('minYear', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="2015"
                      max="2025"
                      value={filters.maxYear}
                      onChange={(e) => handleRangeChange('maxYear', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Brand</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {allBrands.map(brand => (
                      <div key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`brand-${brand}`}
                          checked={filters.brands.includes(brand)}
                          onChange={() => handleCheckboxFilter('brands', brand)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-700">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Body Type Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Body Type</h3>
                  <div className="space-y-2">
                    {allBodyTypes.map(type => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`body-${type}`}
                          checked={filters.bodyTypes.includes(type)}
                          onChange={() => handleCheckboxFilter('bodyTypes', type)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor={`body-${type}`} className="ml-2 text-sm text-gray-700">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fuel Type Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Fuel Type</h3>
                  <div className="space-y-2">
                    {allFuelTypes.map(type => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`fuel-${type}`}
                          checked={filters.fuelTypes.includes(type)}
                          onChange={() => handleCheckboxFilter('fuelTypes', type)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor={`fuel-${type}`} className="ml-2 text-sm text-gray-700">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transmission Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Transmission</h3>
                  <div className="space-y-2">
                    {allTransmissions.map(type => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`transmission-${type}`}
                          checked={filters.transmissions.includes(type)}
                          onChange={() => handleCheckboxFilter('transmissions', type)}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <label htmlFor={`transmission-${type}`} className="ml-2 text-sm text-gray-700">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center w-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            {/* Mobile Filter Panel */}
            {isFilterOpen && (
              <div className="lg:hidden bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button 
                    onClick={resetFilters}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Reset All
                  </button>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">{formatPrice(filters.minPrice)}</span>
                    <span className="text-sm text-gray-600">{formatPrice(filters.maxPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="5000"
                    value={filters.maxPrice}
                    onChange={(e) => handleRangeChange('maxPrice', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Year Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Year Range</h3>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">{filters.minYear}</span>
                    <span className="text-sm text-gray-600">{filters.maxYear}</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="range"
                      min="2015"
                      max="2025"
                      value={filters.minYear}
                      onChange={(e) => handleRangeChange('minYear', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="2015"
                      max="2025"
                      value={filters.maxYear}
                      onChange={(e) => handleRangeChange('maxYear', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Simple Filter Groups for Mobile */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Brand Filter */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Brand</h3>
                    <select 
                      className="w-full p-2 border rounded-md"
                      multiple={false}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                          setFilters(prev => ({
                            ...prev,
                            brands: [...prev.brands, value]
                          }));
                        }
                      }}
                    >
                      <option value="">Select Brand</option>
                      {allBrands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>

                  {/* Body Type Filter */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Body Type</h3>
                    <select 
                      className="w-full p-2 border rounded-md"
                      multiple={false}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                          setFilters(prev => ({
                            ...prev,
                            bodyTypes: [...prev.bodyTypes, value]
                          }));
                        }
                      }}
                    >
                      <option value="">Select Body Type</option>
                      {allBodyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Fuel Type Filter */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Fuel Type</h3>
                    <select 
                      className="w-full p-2 border rounded-md"
                      multiple={false}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                          setFilters(prev => ({
                            ...prev,
                            fuelTypes: [...prev.fuelTypes, value]
                          }));
                        }
                      }}
                    >
                      <option value="">Select Fuel Type</option>
                      {allFuelTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Transmission Filter */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Transmission</h3>
                    <select 
                      className="w-full p-2 border rounded-md"
                      multiple={false}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value) {
                          setFilters(prev => ({
                            ...prev,
                            transmissions: [...prev.transmissions, value]
                          }));
                        }
                      }}
                    >
                      <option value="">Select Transmission</option>
                      {allTransmissions.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Selected Filters */}
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Selected Filters:</h3>
                  <div className="flex flex-wrap gap-2">
                    {filters.brands.map(brand => (
                      <span key={brand} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                        {brand}
                        <button 
                          onClick={() => handleCheckboxFilter('brands', brand)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {filters.bodyTypes.map(type => (
                      <span key={type} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                        {type}
                        <button 
                          onClick={() => handleCheckboxFilter('bodyTypes', type)}
                          className="ml-1 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {filters.fuelTypes.map(type => (
                      <span key={type} className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                        {type}
                        <button 
                          onClick={() => handleCheckboxFilter('fuelTypes', type)}
                          className="ml-1 text-yellow-600 hover:text-yellow-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {filters.transmissions.map(type => (
                      <span key={type} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center">
                        {type}
                        <button 
                          onClick={() => handleCheckboxFilter('transmissions', type)}
                          className="ml-1 text-purple-600 hover:text-purple-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-grow">
              {/* Results Controls */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <p className="mb-4 sm:mb-0 text-gray-600">
                    Showing <span className="font-medium">{filteredCars.length}</span> vehicles
                  </p>
                  <div className="flex items-center">
                    <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
                    <select 
                      id="sort"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="year-new">Year: Newest First</option>
                      <option value="year-old">Year: Oldest First</option>
                      <option value="name-asc">Name: A to Z</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Car Grid */}
{filteredCars.length > 0 ? (
  <CarListing
    cars={filteredCars}
    onViewDetails={handleViewCarDetails}
    formatPrice={formatPrice}
  />
) : (
  <div className="bg-white rounded-lg shadow-md p-8 text-center">
    {/* ...no cars message... */}
  </div>
)}              
              {/*
              {filteredCars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCars.map((car) => (
                    <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg">
                      <div className="relative h-48">
                        { // COMMENTED OUT FOR testing
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          className="object-cover"
                        /> }
                        {car.mileage === 0 && (
                          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-1">{car.name}</h3>
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-gray-600">{car.year} • {car.transmission}</p>
                          <p className="text-gray-600">{car.name}</p>
                          <p className="text-blue-600 font-bold">{formatPrice(car.price)}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{car.bodyType}</span>
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{car.fuelType}</span>
                          {car.mileage > 0 && (
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{car.mileage.toLocaleString()} mi</span>
                          )}
                        </div>
                        <button 
                          onClick={() => handleViewCarDetails(car)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">No cars match your criteria</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                  <button 
                    onClick={resetFilters}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
              */}
              {/* Pagination */}
              {filteredCars.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center">
                    <button className="px-3 py-1 border rounded-l-md border-r-0 bg-gray-100 text-gray-600 hover:bg-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="px-4 py-1 border border-r-0 bg-blue-600 text-white">1</button>
                    <button className="px-4 py-1 border border-r-0 bg-gray-100 text-gray-600 hover:bg-gray-200">2</button>
                    <button className="px-4 py-1 border border-r-0 bg-gray-100 text-gray-600 hover:bg-gray-200">3</button>
                    <span className="px-4 py-1 border border-r-0 bg-gray-100">...</span>
                    <button className="px-4 py-1 border border-r-0 bg-gray-100 text-gray-600 hover:bg-gray-200">8</button>
                    <button className="px-3 py-1 border rounded-r-md bg-gray-100 text-gray-600 hover:bg-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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