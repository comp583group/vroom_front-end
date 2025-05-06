// components/car/MobileFilterPanel.tsx
import React from "react";

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

interface MobileFilterPanelProps {
  isOpen: boolean;
  filters: FilterState;
  allBrands: string[];
  allBodyTypes: string[];
  allFuelTypes: string[];
  allTransmissions: string[];
  onCheckboxFilter: (type: "brands" | "bodyTypes" | "fuelTypes" | "transmissions", value: string) => void;
  onRangeChange: (type: string, value: number) => void;
  onReset: () => void;
  formatPrice: (price: number) => string;
}

export default function MobileFilterPanel({
  isOpen,
  filters,
  allBrands,
  allBodyTypes,
  allFuelTypes,
  allTransmissions,
  onCheckboxFilter,
  onRangeChange,
  onReset,
  formatPrice,
}: MobileFilterPanelProps) {
  if (!isOpen) return null;

  const renderSelect = (label: string, options: string[], type: "brands" | "bodyTypes" | "fuelTypes" | "transmissions") => (
    <div className="mb-6">
      <h3 className="font-medium mb-3">{label}</h3>
      <select
        className="w-full p-2 border rounded-md"
        multiple={false}
        onChange={(e) => {
          const value = e.target.value;
          if (value) onCheckboxFilter(type, value);
        }}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="lg:hidden bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button onClick={onReset} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
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
          onChange={(e) => onRangeChange("maxPrice", parseInt(e.target.value))}
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
            onChange={(e) => onRangeChange("minYear", parseInt(e.target.value))}
            className="w-full"
          />
          <input
            type="range"
            min="2015"
            max="2025"
            value={filters.maxYear}
            onChange={(e) => onRangeChange("maxYear", parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Dynamic Selects */}
      <div className="text-gray-600 grid grid-cols-2 gap-4">
        {renderSelect("Brand", allBrands, "brands")}
        {renderSelect("Body Type", allBodyTypes, "bodyTypes")}
        {renderSelect("Fuel Type", allFuelTypes, "fuelTypes")}
        {renderSelect("Transmission", allTransmissions, "transmissions")}
      </div>
    </div>
  );
}
