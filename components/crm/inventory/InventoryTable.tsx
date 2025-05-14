import { MoreVertical } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export type Car = {
    id: number;
    year: number;
    manufacturer: string;
    model: string;
    trim: string;
    stockNumber: string;
    type: string;
    price: number;
    status: 'Available' | 'Reserved' | 'Sold';
    dateAdded: string;
  };
  
  export function InventoryTable({ 
    cars,
    onEdit,
    onDelete
}: { 
  cars: Car[],
  onEdit: (car: Car) => void,
  onDelete: (carId: number) => void
}) {
    const statusColors = {
      Available: 'bg-green-100 text-green-800',
      'Reserved': 'bg-yellow-100 text-yellow-800',
      Sold: 'bg-red-100 text-red-800',
    };
  
  const [moreOptionsCarId, setMoreOptionsCarId] = useState<number | null>(null);
  const moreOptionsRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Handle clicking outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreOptionsCarId !== null) {
        const ref = moreOptionsRefs.current[moreOptionsCarId];
        if (ref && !ref.contains(event.target as Node)) {
          setMoreOptionsCarId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [moreOptionsCarId]);

  const handleDeleteClick = (carId: number) => {
    onDelete(carId);
    setMoreOptionsCarId(null); // Close the dropdown after delete
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
          <tr>
            <th className="px-6 py-3">Vehicle</th>
            <th className="px-6 py-3">Stock #</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Date Added</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id} className="border-t hover:bg-gray-50 transition">
              <td className="px-6 py-4 whitespace-nowrap text-black font-bold">
                {car.year} {car.manufacturer} {car.model} {car.trim}
              </td>
              <td className="px-6 py-4 text-black">{car.stockNumber}</td>
              <td className="px-6 py-4 text-black">{car.type}</td>
              <td className="px-6 py-4 text-black">${car.price.toLocaleString()}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[car.status]}`}>
                  {car.status}
                </span>
              </td>
              <td className="px-6 py-4 text-black">{new Date(car.dateAdded).toLocaleDateString()}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(car)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <div
                    ref={(el) => {
                      moreOptionsRefs.current[car.id] = el;
                    }}
                    className="relative"
                  >
                    <MoreVertical
                      size={16}
                      className="hover:text-black cursor-pointer text-red-600"
                      onClick={() => setMoreOptionsCarId(car.id === moreOptionsCarId ? null : car.id)}
                    />
                    {moreOptionsCarId === car.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <button
                          onClick={() => handleDeleteClick(car.id)}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}