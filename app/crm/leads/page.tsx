'use client';

import { useState, useEffect } from 'react';
import { Lead, LeadTable } from '@/components/crm/leads/LeadTable';
import { LeadFilters } from '@/components/crm/leads/LeadFilters';
import { useSearchParams } from 'next/navigation';

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

interface User {
  id: number;
  name: string;
}

export default function LeadsPage() {
  const searchParams = useSearchParams();
  const highlightedLeadId = searchParams.get('highlight') ? Number(searchParams.get('highlight')) : null;

  const capitalize = (str: string) => {
    const statusMap: { [key: string]: Lead['status'] } = {
      'open': 'Open',
      'in_progress': 'In Progress',
      'contacted': 'Contacted',
    };
    return statusMap[str] || str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [user, setUser] = useState<User | null>(null);
  const [showAssignedToMe, setShowAssignedToMe] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('No access token found');

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const endpoint = showAssignedToMe
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/leads/assigned/`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/leads/detailed/`;

        const res = await fetch(endpoint, {
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

        console.log('Raw API Data:', data);

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
            assignedTo: lead.assigned_to,
          };
        });

        setLeads(formattedLeads);
      } catch (error) {
        console.error("Failed to load leads:", error);
      }
    };

    fetchLeads();
  }, [showAssignedToMe]);
  
  const handleStatusChange = (leadId: number, newStatus: Lead['status']) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
  };

  const handleDeleteLead = (leadId: number) => {
    setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId));
  };

  const filteredLeads = selectedStatus === 'All'
    ? leads
    : leads.filter((lead) => lead.status === selectedStatus);

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-black">Leads</h1>
        <p className="text-md text-gray-600 mb-7">Manage your customer inquiries</p>
        <LeadFilters 
          selectedStatus={selectedStatus} 
          setSelectedStatus={setSelectedStatus} 
          showAssignedToMe={showAssignedToMe}
          setShowAssignedToMe={setShowAssignedToMe}
        />
        <LeadTable 
          leads={filteredLeads} 
          onStatusChange={handleStatusChange} 
          onDeleteLead={handleDeleteLead} 
          highlightedLeadId={highlightedLeadId}
        />
      </div>
    );
  }