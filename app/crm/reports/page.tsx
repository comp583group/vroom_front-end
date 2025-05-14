'use client';

import { useState, useEffect } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

// Define interfaces for API responses
interface MetricData {
  total_sales: number;
  new_leads: number;
  cars_in_inventory: number;
  deals_closed: number;
}

interface SalesOverTimeData {
  date: string;
  total: number;
}

interface LeadStatusData {
  status: string;
  count: number;
}

interface TopVehiclesData {
  vehicle: string;
  lead_count: number;
}

export default function ReportsPage() {
  const [metrics, setMetrics] = useState<MetricData>({ total_sales: 0, new_leads: 0, cars_in_inventory: 0, deals_closed: 0 });
  const [salesOverTime, setSalesOverTime] = useState<SalesOverTimeData[]>([]);
  const [leadStatusBreakdown, setLeadStatusBreakdown] = useState<LeadStatusData[]>([]);
  const [topVehicles, setTopVehicles] = useState<TopVehiclesData[]>([]);

  useEffect(() => {
    
    const fetchMetrics = async () => {
      try {
        const endpoints = [
          '/api/metrics/sales/',
          '/api/metrics/new-leads/',
          '/api/metrics/cars-in-inventory/',
          '/api/metrics/deals-closed/',
        ];

        const responses = await Promise.all(
          endpoints.map((endpoint) =>
            fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
              },
            }).then((res) => {
              if (!res.ok) throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
              return res.json();
            })
          )
        );

        setMetrics({
          total_sales: responses[0].total_sales || 0,
          new_leads: responses[1].new_leads || 0,
          cars_in_inventory: responses[2].cars_in_inventory || 0,
          deals_closed: responses[3].deals_closed || 0,
        });
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    // Fetch sales over time data
    const fetchSalesOverTime = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reports/sales-over-time/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch sales over time');
        const data = await response.json();
        setSalesOverTime(data);
      } catch (error) {
        console.error('Error fetching sales over time:', error);
        setSalesOverTime([]);
      }
    };

    // Fetch lead status breakdown
    const fetchLeadStatusBreakdown = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reports/lead-status-breakdown/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch lead status breakdown');
        const data = await response.json();
        setLeadStatusBreakdown(data);
      } catch (error) {
        console.error('Error fetching lead status breakdown:', error);
      }
    };

    // Fetch top vehicles by leads
    const fetchTopVehicles = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reports/top-vehicles-by-leads/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch top vehicles by leads');
        const data = await response.json();
        setTopVehicles(data);
      } catch (error) {
        console.error('Error fetching top vehicles by leads:', error);
      }
    };

    // Fetch all data on mount
    fetchMetrics();
    fetchSalesOverTime();
    fetchLeadStatusBreakdown();
    fetchTopVehicles();
  }, []);

  // Prepare data for charts
  const salesOverTimeData = {
    labels: salesOverTime.map(item => item.date),
    datasets: [
      {
        label: 'Total Sales ($)',
        data: salesOverTime.map(item => item.total),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const leadStatusData = {
    labels: leadStatusBreakdown.map(item => item.status),
    datasets: [
      {
        label: 'Lead Count',
        data: leadStatusBreakdown.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',  // Red for Open
          'rgba(54, 162, 235, 0.6)',  // Blue for In Progress
          'rgba(255, 206, 86, 0.6)',  // Yellow for Contacted
          'rgba(75, 192, 192, 0.6)',  // Teal for Converted
          'rgba(153, 102, 255, 0.6)', // Purple for Lost
        ],
      },
    ],
  };

  const topVehiclesData = {
    labels: topVehicles.map(item => item.vehicle),
    datasets: [
      {
        label: 'Number of Leads',
        data: topVehicles.map(item => item.lead_count),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black mb-4">Reports</h1>
      <p className="text-md text-gray-600 mb-7">Insights into your dealership's performance</p>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
          <p className="text-xl font-bold text-black">${metrics.total_sales.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">New Leads</h3>
          <p className="text-xl font-bold text-black">{metrics.new_leads}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Cars in Inventory</h3>
          <p className="text-xl font-bold text-black">{metrics.cars_in_inventory}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Deals Closed</h3>
          <p className="text-xl font-bold text-black">{metrics.deals_closed}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Over Time */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold text-black mb-4">Sales Over Time</h3>
          <div className="h-64">
            <Line data={salesOverTimeData} options={{ maintainAspectRatio: false, responsive: true }} />
          </div>
        </div>

        {/* Lead Status Breakdown */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold text-black mb-4">Lead Status Breakdown</h3>
          <div className="h-64">
          {salesOverTime.length > 0 ? (
              <Line data={salesOverTimeData} options={{ maintainAspectRatio: false, responsive: true }} />
          ) : (
              <p>No sales data available.</p>
          )}
          </div>
        </div>

        {/* Top Vehicles by Leads */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold text-black mb-4">Top Vehicles by Leads</h3>
          <div className="h-64">
            <Bar data={topVehiclesData} options={{ 
              maintainAspectRatio: false, 
              responsive: true, 
              indexAxis: 'y', 
              scales: {
                x: {
                    ticks: {
                        stepSize: 1, // Forces whole number increments
                    },
                    suggestedMin: 0, // Start at 0
                    suggestedMax: Math.max(...topVehicles.map(item => item.lead_count)) + 1, // Dynamic max based on data
                },
              },
            }}   
            />
          </div>
        </div>
      </div>
    </div>
  );
}