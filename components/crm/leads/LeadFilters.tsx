'use client';

import { Dispatch, SetStateAction } from 'react';

const statuses = ['All', 'Open', 'In Progress', 'Contacted'] as const;

type Props = {
  selectedStatus: string;
  setSelectedStatus: Dispatch<SetStateAction<string>>;
};

export function LeadFilters({ selectedStatus, setSelectedStatus }: Props) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <label htmlFor="status" className="text-sm text-gray-600 font-medium">
        Filter by Status:
      </label>
      <select
        id="status"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="text-sm px-3 py-2 border border-gray-300 rounded-md text-black"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}
