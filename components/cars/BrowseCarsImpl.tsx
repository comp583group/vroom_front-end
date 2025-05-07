"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
//import Dropdown from '../components/Dropdown'; // not being read
import Navbar from '@/components/nav/NavigationBar';
import CarListing from "@/components/cars/CarListing";
import FilterSidebar from "@/components/cars/FilterSidebar";
import MobileFilterPanel from "@/components/cars/MobileFilterPanel";
import Footer from "@/components/nav/Footer";
import LeadForm from "@/components/forms/LeadForm";
import { useSearchParams } from 'next/navigation';



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

export default function BrowseCars({ searchQuery }: { searchQuery: string }) {
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

  const searchParams = useSearchParams();

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

        const searchMatch = car.name.toLowerCase().includes(searchQuery) || car.brand.toLowerCase().includes(searchQuery) || car.model.toLowerCase().includes(searchQuery);
      
      return priceMatch && yearMatch && brandMatch && bodyTypeMatch && fuelTypeMatch && transmissionMatch && searchMatch;
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
              
              <div className="text-black grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  
                  <div className="mt-8 border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4">Interested in this car?</h3>
                      <LeadForm vehicleId={selectedCar.id} onSuccess={() => { alert("Your interest has been sent! We'll be in touch soon.");}}/>
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
            <h1 className="text-black text-3xl font-bold mb-2">Browse Our Inventory</h1>
            <p className="text-gray-600">Find your perfect vehicle from our extensive collection.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter sidebar - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onCheckboxFilter={handleCheckboxFilter}
                onRangeChange={handleRangeChange}
                onReset={resetFilters}
                allBrands={allBrands}
                allBodyTypes={allBodyTypes}
                allFuelTypes={allFuelTypes}
                allTransmissions={allTransmissions}
                formatPrice={formatPrice}
              />
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
            <MobileFilterPanel
              isOpen={isFilterOpen}
              filters={filters}
              allBrands={allBrands}
              allBodyTypes={allBodyTypes}
              allFuelTypes={allFuelTypes}
              allTransmissions={allTransmissions}
              onCheckboxFilter={handleCheckboxFilter}
              onRangeChange={handleRangeChange}
              onReset={resetFilters}
              formatPrice={formatPrice}
            />


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


            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />


    </div>
  );
}