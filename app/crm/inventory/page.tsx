'use client';

import { useState } from 'react';
import { Car, InventoryTable } from '@/components/crm/inventory/InventoryTable';
import { InventoryFilters } from '@/components/crm/inventory/InventoryFilters';

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
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  const [inventory, setInventory] = useState<Car[]>([]);

  const fetchInventory = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/`);
      const data = await res.json();

      const formatted = data.map((car: CarApiResponse) => ({
        id: car.id,
        year: car.year,
        manufacturer: car.brand,
        model: car.model,
        trim: '', // Optional: store or infer from name?
        stockNumber: car.stock_number,
        type: car.body_type,
        price: car.price,
        status: capitalize(car.status),
        dateAdded: car.date_added,
      }));

      setInventory(formatted);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    }
  };

  fetchInventory();
//}, []);

  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInventory = inventory.filter((car) => {
    const matchesStatus = selectedStatus === 'All' || car.status === selectedStatus;

    const matchesSearch = `${car.manufacturer} ${car.model} ${car.trim}`
    .toLowerCase()
    .includes(searchQuery.toLowerCase());
   
    return matchesStatus && matchesSearch;
  });

  const handleAddVehicle = () => {
    // placeholder — replace with modal or routing later
    alert('Add New Vehicle modal coming soon!');
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-black">Inventory</h1>

      <InventoryFilters
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddClick={handleAddVehicle}
      />

      <InventoryTable cars={filteredInventory} />
    </div>
  );
}
