'use client';

import { useState, useEffect } from 'react';
import { Car, InventoryTable } from '@/components/crm/inventory/InventoryTable';
import { InventoryFilters } from '@/components/crm/inventory/InventoryFilters';
import { AddVehicleModal } from '@/components/crm/inventory/AddVehicleModal';

interface CarApiResponse {
  id: number;
  brand: string;
  model: string;
  year: number;
  stock_number: string;
  body_type: string;
  price: number;
  status: string;
  date_added: string;
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add modal state

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Failed to fetch inventory: ${errorData.detail || res.statusText}`);
      }

      const data = await res.json();
      const formatted = data.map((car: CarApiResponse) => ({
        id: car.id,
        year: car.year,
        manufacturer: car.brand,
        model: car.model,
        trim: '', 
        stockNumber: car.stock_number,
        type: car.body_type,
        price: car.price,
        status: capitalize(car.status),
        dateAdded: car.date_added,
      }));

      setInventory(formatted);
      setError(null); 
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch inventory';
      console.error("Failed to fetch inventory:", error);
      setError(errorMessage);    }
  };

  useEffect(() => {
    fetchInventory();
  }, []); // Fetch only on mount

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const filteredInventory = inventory.filter((car) => {
    const matchesStatus = selectedStatus === 'All' || car.status === selectedStatus;

    const matchesSearch = `${car.manufacturer} ${car.model} ${car.trim}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
   
    return matchesStatus && matchesSearch;
  });

  const handleAddVehicle = () => {
    setIsAddModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-black">Inventory</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <InventoryFilters
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddClick={handleAddVehicle}
      />
      <InventoryTable cars={filteredInventory} />
      <AddVehicleModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        setInventory={setInventory} 
      />
    </div>
  );
}