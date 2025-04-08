// Top inventory block
import { CarFront } from 'lucide-react';

export type InventoryItem = {
    manufacturer: string;
    model: string;
    trim: string;
    year: number;
    numStock: number;
    type: string;
    status: 'Available' | 'Low Stock';
  };
  
  const statusStyles = {
    Available: 'text-green-600',
    'Low Stock': 'text-red-600',
  };
  
  export function TopInventoryList({ cars }: { cars: InventoryItem[] }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold text-black mb-4">Top Inventory</h3>
        <ul className="space-y-4">
          {cars.map((car, i) => (
            <li key={i} className="flex justify-between text-black font-medium hover:bg-gray-100 rounded-md transition">
                <div className="flex items-center gap-4">
                    {/* Car icon block */}
                    <div className="bg-gray-100 p-2 rounded-lg">
                        <CarFront size={24} className="text-gray-700" />
                    </div>

                    {/* Text block */}  
                    <div>
                        <p className="font-semibold text-sm text-black">{`${car.year} ${car.manufacturer} ${car.model} ${car.trim}`}</p>
                        <p className="text-sm text-gray-500"> {car.type} • {car.numStock} in stock </p>
                    </div>
                </div>

                <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusStyles[car.status]}`}>
                    {car.status}
                </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  