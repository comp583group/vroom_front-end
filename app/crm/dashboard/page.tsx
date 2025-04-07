import { MetricCard } from '@/components/crm/dashboard/MetricCard';
//import { LeadList } from '@/components/crm/dashboard/LeadList';
//import { InventoryList } from '@/components/crm/dashboard/InventoryList';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="New Leads" value="284" trend="+12%" />
        <MetricCard title="Sales" value="$842K" trend="+8%" />
        <MetricCard title="Cars in Inventory" value="156" trend="-3%" />
        <MetricCard title="Deals Closed" value="42" trend="+15%" />
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* <LeadList />
        <InventoryList /> */}
      </div>
    </div>
  );
}
