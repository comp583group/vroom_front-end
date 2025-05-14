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
  const [newLeads, setNewLeads] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<string>("$0");
  const [carsInInventory, setCarsInInventory] = useState<number>(0);
  const [dealsClosed, setDealsClosed] = useState<number>(0);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(`API returned ${res.status}: ${error.detail || 'Unknown error'}`);
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
          throw new Error("API returned malformed data: expected results[] array.");
        }

        const formatted = data.map((lead: LeadApiResponse) => ({
          name: lead.name,
          inquiry: lead.message || `Interested in ${lead.vehicle_interest?.brand} ${lead.vehicle_interest?.model}`,
          status: capitalize(lead.status) as Lead["status"],
        }));
        setLeads(formatted);
      } catch (err) {
        console.error('Failed to fetch leads:', err);
      }
    };

    const fetchInventory = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        const top = data.slice(0, 3).map((car: CarApiResponse) => ({
          manufacturer: car.brand,
          model: car.model,
          trim: '', 
          year: car.year,
          numStock: 1, 
          type: car.body_type,
          status: capitalize(car.status) as InventoryItem["status"],
        }));
        setTopInventory(top);
      } catch (err) {
        console.error('Failed to fetch inventory:', err);
      }
    };

    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
        const fetchWithDefault = async (url: string) => {
          const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
          });
          console.log(`${url}: ${res.status}`);
          return res.ok ? await res.json() : {};
        };
    
        const [newLeadsData, salesData, inventoryData, dealsData] = await Promise.all([
          fetchWithDefault(`${baseUrl}/api/metrics/new-leads/`),
          fetchWithDefault(`${baseUrl}/api/metrics/sales/`),
          fetchWithDefault(`${baseUrl}/api/metrics/cars-in-inventory/`),
          fetchWithDefault(`${baseUrl}/api/metrics/deals-closed/`),
        ]);
    
        setNewLeads(newLeadsData.new_leads || 0);
        setTotalSales(`$${(salesData.total_sales || 0).toLocaleString()}`);
        setCarsInInventory(inventoryData.cars_in_inventory || 0);
        setDealsClosed(dealsData.deals_closed || 0);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchLeads();
    fetchInventory();
    fetchMetrics();
  }, []);

  const capitalize = (str: string) => {
    if (str === 'in_progress') return 'In Progress';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="New Leads" 
          value={newLeads.toString()} 
          trend="" 
          trendColor="green" 
          icon={<UserPlus size={28} color="blue" />}
        />
        <MetricCard 
          title="Sales" 
          value={totalSales} 
          trend="" 
          trendColor="green" 
          icon={<CircleDollarSign size={28} color="green" />} 
        />
        <MetricCard 
          title="Cars in Inventory" 
          value={carsInInventory.toString()} 
          trend="" 
          trendColor="red" 
          icon={<Car size={28} color="purple" />} 
        />
        <MetricCard 
          title="Deals Closed" 
          value={dealsClosed.toString()} 
          trend="" 
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