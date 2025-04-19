import { MetricCard } from '@/components/crm/dashboard/MetricCard';
import { LeadList } from '@/components/crm/dashboard/LeadList';
import type { Lead } from '@/components/crm/dashboard/LeadList';
import { InventoryItem, TopInventoryList } from '@/components/crm/dashboard/TopInventoryList';

import { UserPlus, CircleDollarSign, Car, Handshake } from 'lucide-react';

// Some mock data for the dashboard
const leads: Lead[] = [
    { name: 'Sarah Wilson', inquiry: 'Interested in Tesla Model 3', status: 'Open' },
    { name: 'Michael Brown', inquiry: 'Looking for BMW X5', status: 'In Progress' },
    { name: 'Emily Davis', inquiry: 'Test drive scheduled', status: 'Contacted' },
  ];

const topInventory: InventoryItem[] = [
    { manufacturer: 'Toyota', model: 'Camry', trim: 'XLE', year: 2022, numStock: 12, type: 'Sedan', status: 'Available' },
    { manufacturer: 'Honda', model: 'Civic', trim: 'Si', year: 2021, numStock: 2, type: 'Sedan', status: 'Low Stock' },
    { manufacturer: 'Tesla', model: 'Model Y', trim: 'LR', year: 2025, numStock: 15, type: 'Electric Crossover', status: 'Available' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
            title="New Leads" 
            value="284" 
            trend="+12%" 
            trendColor="green" 
            icon={<UserPlus size={28} color={"blue"}/>}
        />
        
        <MetricCard 
            title="Sales" 
            value="$842K" 
            trend="+8%" 
            trendColor="green" 
            icon={<CircleDollarSign size={28} color={"green"} />} 
        />
        
        <MetricCard 
            title="Cars in Inventory" 
            value="156" 
            trend="-3%" 
            trendColor="red" 
            icon={<Car size={28} color={"purple"} />} 
        />
        
        <MetricCard 
            title="Deals Closed" 
            value="42" 
            trend="+15%" 
            trendColor="green"
            icon={<Handshake size={28} color={"orange"} />}     
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
