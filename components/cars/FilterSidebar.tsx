// components/car/FilterSidebar.tsx
import React from "react";

type ArrayFilterKeys = 'brands' | 'bodyTypes' | 'fuelTypes' | 'transmissions';

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

interface FilterSidebarProps {
  filters: FilterState;
  onCheckboxFilter: (key: ArrayFilterKeys, value: string) => void;
  onRangeChange: (key: keyof FilterState, value: number) => void;
  onReset: () => void;
  allBrands: string[];
  allBodyTypes: string[];
  allFuelTypes: string[];
  allTransmissions: string[];
  formatPrice: (price: number) => string;
}

export default function FilterSidebar({
  filters,
  onCheckboxFilter,
  onRangeChange,
  onReset,
  allBrands,
  allBodyTypes,
  allFuelTypes,
  allTransmissions,
  formatPrice,
}: FilterSidebarProps) {
  const checkboxGroups: { label: string; options: string[]; key: ArrayFilterKeys }[] = [
    { label: 'Brand', options: allBrands, key: 'brands' },
    { label: 'Body Type', options: allBodyTypes, key: 'bodyTypes' },
    { label: 'Fuel Type', options: allFuelTypes, key: 'fuelTypes' },
    { label: 'Transmission', options: allTransmissions, key: 'transmissions' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={onReset}
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
          onChange={(e) => onRangeChange('maxPrice', parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Year Range */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Year Range</h3>
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">Min: {filters.minYear}</span>
          <span className="text-sm text-gray-600">Max: {filters.maxYear}</span>
        </div>
        <div className="flex gap-2">
          <input
            type="range"
            min="2015"
            max="2025"
            value={filters.minYear}
            onChange={(e) => onRangeChange('minYear', parseInt(e.target.value))}
            className="w-full"
          />
          <input
            type="range"
            min="2015"
            max="2025"
            value={filters.maxYear}
            onChange={(e) => onRangeChange('maxYear', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Dynamic Checkbox Groups */}
      {checkboxGroups.map((group) => (
        <div key={group.key} className="mb-6">
          <h3 className="font-medium mb-3">{group.label}</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {group.options.map((option: string) => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${group.key}-${option}`}
                  checked={filters[group.key].includes(option)}
                  onChange={() => onCheckboxFilter(group.key, option)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor={`${group.key}-${option}`} className="ml-2 text-sm text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
