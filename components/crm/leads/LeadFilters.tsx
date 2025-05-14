'use client';

import { Dispatch, SetStateAction } from 'react';

const statuses = ['All', 'Open', 'In Progress', 'Contacted'] as const;

type Props = {
  selectedStatus: string;
  setSelectedStatus: Dispatch<SetStateAction<string>>;
  showAssignedToMe: boolean;
  setShowAssignedToMe: Dispatch<SetStateAction<boolean>>;
};

export function LeadFilters({ selectedStatus, setSelectedStatus, showAssignedToMe, setShowAssignedToMe }: Props) {
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
      <label className="text-sm text-gray-600 font-medium flex items-center gap-2">
        <input
          type="checkbox"
          checked={showAssignedToMe}
          onChange={(e) => setShowAssignedToMe(e.target.checked)}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        Assigned to Me
      </label>
    </div>
  );
}
