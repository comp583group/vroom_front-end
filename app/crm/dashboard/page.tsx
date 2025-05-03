'use client';
import { useEffect, useState } from 'react';
import { MetricCard } from '@/components/crm/dashboard/MetricCard';
import { LeadList, Lead } from '@/components/crm/dashboard/LeadList';
import { TopInventoryList, InventoryItem } from '@/components/crm/dashboard/TopInventoryList';

import { UserPlus, CircleDollarSign, Car, Handshake } from 'lucide-react';

interface LeadApiResponse {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  message: string;
  status: string;
  created_at: string;
  assigned_to: string | null;
  vehicle_interest: {
    brand: string;
    model: string;
    year: number;
  };
}

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

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [topInventory, setTopInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access')}`,
            },
          });
        const data = await res.json();
        
        console.log('LEADS RESPONSE:', data);
        const formatted = data.map((lead: LeadApiResponse) => ({
          name: lead.name,
          inquiry: lead.message || `Interested in ${lead.vehicle_interest?.brand} ${lead.vehicle_interest?.model}`,
          status: capitalize(lead.status),
        }));
        setLeads(formatted);
      } catch (err) {
        console.error('Failed to fetch leads:', err);
      }
    };

    const fetchInventory = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/`);
        const data = await res.json();
        const top = data.slice(0, 3).map((car: CarApiResponse) => ({
          manufacturer: car.brand,
          model: car.model,
          trim: '', // Optional if you're not storing trim
          year: car.year,
          numStock: Math.floor(Math.random() * 20) + 1, // Placeholder stock count
          type: car.body_type,
          status: capitalize(car.status),
        }));
        setTopInventory(top);
      } catch (err) {
        console.error('Failed to fetch inventory:', err);
      }
    };

    fetchLeads();
    fetchInventory();
  }, []);

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="New Leads" 
          value={leads.length.toString()} 
          trend="+12%" 
          trendColor="green" 
          icon={<UserPlus size={28} color="blue" />}
        />
        <MetricCard 
          title="Sales" 
          value="$842K" 
          trend="+8%" 
          trendColor="green" 
          icon={<CircleDollarSign size={28} color="green" />} 
        />
        <MetricCard 
          title="Cars in Inventory" 
          value={topInventory.length.toString()} 
          trend="-3%" 
          trendColor="red" 
          icon={<Car size={28} color="purple" />} 
        />
        <MetricCard 
          title="Deals Closed" 
          value="42" 
          trend="+15%" 
          trendColor="green"
          icon={<Handshake size={28} color="orange" />}     
        />
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LeadList leads={leads} />
        <TopInventoryList cars={topInventory} />
      </div>
    </div>
  );
}
