// components/car/CarListing.tsx
import { useState } from "react";
import Image from "next/image";

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

interface CarListingProps {
  cars: Car[];
  onViewDetails: (car: Car) => void;
  formatPrice: (price: number) => string;
  itemsPerPage?: number;
}

export default function CarListing({ cars, onViewDetails, formatPrice, itemsPerPage = 9 }: CarListingProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(cars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCars = cars.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCars.map((car) => (
          <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg">
            <div className="relative h-48">
              <Image
                src={car.image && car.image.trim() !== "" ? car.image : "/images/placeholder_car.png"}
                alt={car.name}
                fill
                className="object-cover"
              />
              {car.mileage === 0 && (
                <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
              )}
            </div>
            <div className="p-4">
            <h3 className="text-lg font-semibold mb-1 text-black">{car.name}</h3>
              <div className="flex justify-between items-center mb-3">
                <p className="text-gray-600">{car.year} • {car.transmission}</p>
                <p className="text-blue-600 font-bold">{formatPrice(car.price)}</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{car.bodyType}</span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{car.fuelType}</span>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{car.name}</span>
                {car.mileage > 0 && (
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{car.mileage.toLocaleString()} mi</span>
                )}
              </div>
              <button 
                onClick={() => onViewDetails(car)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => goToPage(index + 1)}
                className={`px-4 py-1 border border-l-0 ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 border-l-0 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
