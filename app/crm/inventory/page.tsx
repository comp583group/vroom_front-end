'use client';

import { useState } from 'react';
import { Car, InventoryTable } from '@/components/crm/inventory/InventoryTable';
import { InventoryFilters } from '@/components/crm/inventory/InventoryFilters';

export default function InventoryPage() {
  const inventory: Car[] = [
    {
      id: 1,
      year: 2025,
      manufacturer: 'Tesla',
      model: 'Model 3',
      trim: 'Performance',
      stockNumber: 'TSL-9935',
      type: 'Electric',
      price: 54900,
      status: 'Available',
      dateAdded: '2025-03-20',
    },
    {
      id: 2,
      year: 2025,
      manufacturer: 'Toyota',
      model: 'RAV4',
      trim: 'XLE',
      stockNumber: 'TYT-2284',
      type: 'SUV',
      price: 31250,
      status: 'Pending',
      dateAdded: '2024-12-05',
    },
    {
      id: 3,
      year: 2024,
      manufacturer: 'Ford',
      model: 'F-150',
      trim: 'Lariat',
      stockNumber: 'FRD-1177',
      type: 'Truck',
      price: 47500,
      status: 'Available',
      dateAdded: '2025-01-10',
    },
    {
        id: 4,
        year: 2025,
        manufacturer: 'Honda',
        model: 'Civic',
        trim: 'Type R',
        stockNumber: 'HND-1269',
        type: 'Hatchback',
        price: 47045,
        status: 'Sold',
        dateAdded: '2024-10-21',
      },
      {
        id: 5,
        year: 2025,
        manufacturer: 'Toyota',
        model: 'Sienna',
        trim: 'XLE',
        stockNumber: 'TYT-1432',
        type: 'Minivan',
        price: 45899,
        status: 'Sold',
        dateAdded: '2025-2-23',
      },
  ];

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
