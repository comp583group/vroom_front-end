'use client';

import { Dispatch, SetStateAction } from 'react';

type Props = {
  selectedStatus: string;
  setSelectedStatus: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  onAddClick: () => void;
};

const statuses = ['All', 'Available', 'Pending', 'Sold'];

export function InventoryFilters({ 
    selectedStatus, 
    setSelectedStatus, 
    onAddClick, 
    searchQuery, 
    setSearchQuery,
 }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
      {/* Filter + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="status" className="text-sm text-gray-600 font-medium">
            Status:
          </label>
          <select
            id="status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-sm px-3 py-2 border border-gray-300 rounded-md text-black"
          >
            {['All', 'Available', 'Pending Sale', 'Sold'].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Search inventory..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-sm px-3 py-2 border border-gray-300 rounded-md w-64 text-black"
        />
      </div>

      {/* Add Button */}
      <button
        onClick={onAddClick}
        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
      >
        + Add New Vehicle
      </button>
    </div>
  );
}
