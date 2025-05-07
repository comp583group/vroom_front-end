'use client';

import { useState, useEffect } from 'react';
import { Lead, LeadTable } from '@/components/crm/leads/LeadTable';
import { LeadFilters } from '@/components/crm/leads/LeadFilters';


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

export default function LeadsPage() {
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

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

          const formattedLeads = data.map((lead: LeadApiResponse) => {
            const vehicleInfo = lead.vehicle_interest
              ? `${lead.vehicle_interest.year} ${lead.vehicle_interest.brand} ${lead.vehicle_interest.model}`
              : 'No vehicle selected';

            return {
              id: lead.id,
              name: lead.name,
              email: lead.email,
              vehicle: vehicleInfo,
              status: capitalize(lead.status) as Lead['status'], 
              message: lead.message,
              date: lead.created_at.split('T')[0],
              assignedTo: lead.assigned_to || null,
            };
          });


        setLeads(formattedLeads);
      } catch (error) {
        console.error("Failed to load leads:", error);
      }
    };

    fetchLeads();
  }, []);
  
    //const [selectedStatus, setSelectedStatus] = useState<string>('All');

    const filteredLeads = selectedStatus === 'All'
      ? leads
      : leads.filter((lead) => lead.status === selectedStatus);
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-black">Leads</h1>
        <p className="text-md text-gray-600 mb-7">Manage your customer inquiries</p>
        <LeadFilters selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
        <LeadTable leads={filteredLeads} />
      </div>
    );
  }