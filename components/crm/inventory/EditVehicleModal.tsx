'use client';

import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Car } from './InventoryTable';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  car: Car | null;
  setInventory: Dispatch<SetStateAction<Car[]>>;
}

export function EditVehicleModal({ isOpen, onClose, car, setInventory }: Props) {
  const [formData, setFormData] = useState({
    brand: car?.manufacturer || '',
    model: car?.model || '',
    year: car?.year?.toString() || '',
    stock_number: car?.stockNumber || '',
    body_type: car?.type || '',
    price: car?.price?.toString() || '',
    status: car?.status?.toLowerCase() || 'available',
    mileage: '',
    fuel_type: '',
    transmission: '',
    color: '',
    features: '',
  });

  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (!car) return;
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('No access token found');

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/${car.id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch car details');
        const data = await response.json();

        setFormData({
          brand: data.brand,
          model: data.model,
          year: data.year.toString(),
          stock_number: data.stock_number,
          body_type: data.body_type,
          price: data.price.toString(),
          status: data.status,
          mileage: data.mileage.toString(),
          fuel_type: data.fuel_type,
          transmission: data.transmission,
          color: data.color,
          features: data.features ? data.features.join(', ') : '',
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch car details';
        console.error('Error fetching car details:', error);
        setError(errorMessage);
      }
    };

    if (isOpen && car) {
      fetchCarDetails();
    }
  }, [isOpen, car]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!car) return;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');

      const formDataToSend = new FormData();
      formDataToSend.append('brand', formData.brand);
      formDataToSend.append('model', formData.model);
      formDataToSend.append('year', formData.year);
      formDataToSend.append('stock_number', formData.stock_number);
      formDataToSend.append('body_type', formData.body_type);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('mileage', formData.mileage);
      formDataToSend.append('fuel_type', formData.fuel_type);
      formDataToSend.append('transmission', formData.transmission);
      formDataToSend.append('color', formData.color);
      formDataToSend.append('features', JSON.stringify(formData.features ? formData.features.split(',').map(item => item.trim()) : []));
      formDataToSend.append('name', `${formData.brand} ${formData.model}`);

      if (image) {
        formDataToSend.append('image', image);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/${car.id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Update vehicle error response:', errorData);
        throw new Error(JSON.stringify(errorData) || 'Failed to update vehicle');
      }

      const updatedCar = await response.json();
      setInventory((prev) =>
        prev.map((item) =>
          item.id === car.id
            ? {
                id: updatedCar.id,
                year: updatedCar.year,
                manufacturer: updatedCar.brand,
                model: updatedCar.model,
                trim: '',
                stockNumber: updatedCar.stock_number,
                type: updatedCar.body_type,
                price: updatedCar.price,
                status: updatedCar.status.charAt(0).toUpperCase() + updatedCar.status.slice(1),
                dateAdded: updatedCar.date_added,
              }
            : item
        )
      );

      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update vehicle';
      console.error('Error updating vehicle:', error);
      setError(errorMessage);
    }
  };

  if (!isOpen || !car) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl text-blue-800 font-bold mb-4">Edit Vehicle</h2>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-black"
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}