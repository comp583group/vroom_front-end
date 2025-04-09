export type Car = {
    id: number;
    year: number;
    manufacturer: string;
    model: string;
    trim: string;
    stockNumber: string;
    type: string;
    price: number;
    status: 'Available' | 'Pending' | 'Sold';
    dateAdded: string;
  };
  
  export function InventoryTable({ cars }: { cars: Car[] }) {
    const statusColors = {
      Available: 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      Sold: 'bg-red-100 text-red-800',
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
                  <button className="text-sm text-blue-600 hover:underline mr-3">Edit</button>
                  <button className="text-sm text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  