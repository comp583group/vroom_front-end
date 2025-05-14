'use client';

import { useState, Dispatch, SetStateAction } from 'react';
import { Car } from './InventoryTable';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setInventory: Dispatch<SetStateAction<Car[]>>;
}

export function AddVehicleModal({ isOpen, onClose, setInventory }: Props) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    stock_number: '',
    body_type: '',
    price: '',
    status: 'available',
    mileage: '',
    fuel_type: '',
    transmission: '',
    color: '',
    features: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brand: formData.brand,
          model: formData.model,
          year: parseInt(formData.year),
          stock_number: formData.stock_number,
          body_type: formData.body_type,
          price: parseFloat(formData.price),
          status: formData.status.toLowerCase(),
          mileage: parseInt(formData.mileage),
          fuel_type: formData.fuel_type,
          transmission: formData.transmission,
          color: formData.color,
          features: formData.features ? formData.features.split(',').map(item => item.trim()) : [],
          name: `${formData.brand} ${formData.model}`, // Derive name from brand and model
          date_added: new Date().toISOString().split('T')[0], // Current date
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to add vehicle');
      }

      const newCar = await response.json();
      setInventory((prev) => [
        ...prev,
        {
          id: newCar.id,
          year: newCar.year,
          manufacturer: newCar.brand,
          model: newCar.model,
          trim: '',
          stockNumber: newCar.stock_number,
          type: newCar.body_type,
          price: newCar.price,
          status: newCar.status.charAt(0).toUpperCase() + newCar.status.slice(1),
          dateAdded: newCar.date_added,
        },
      ]);

      onClose(); // Close the modal on success
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch inventory';

      console.error('Error adding vehicle:', error);
      setError(errorMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add New Vehicle</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock Number</label>
            <input
              type="text"
              name="stock_number"
              value={formData.stock_number}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Body Type</label>
            <input
              type="text"
              name="body_type"
              value={formData.body_type}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
            >
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mileage</label>
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
            <input
              type="text"
              name="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Transmission</label>
            <input
              type="text"
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Features (comma-separated)</label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
              placeholder="e.g., Sunroof, Navigation, Leather Seats"
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}