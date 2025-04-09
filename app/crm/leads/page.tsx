'use client';

import { useState } from 'react';
import { Lead, LeadTable } from '@/components/crm/leads/LeadTable';
import { LeadFilters } from '@/components/crm/leads/LeadFilters';

export default function LeadsPage() {
    const leads: Lead[] = [
      {
        id: 1,
        name: 'Sarah Wilson',
        email: 'sarah@email.com',
        vehicle: '2025 BMW X5',
        status: 'Contacted',
        message: 'Interested in a luxury SUV.',
        date: '2025-01-15',
        assignedTo: 'John Smith',
      },
      {
        id: 2,
        name: 'Michael Brown',
        email: 'michael@email.com',
        vehicle: '2025 Toyota Sienna',
        status: 'Open',
        message: 'I want a good family car.',
        date: '2025-01-14',
        assignedTo: null,
      },
      {
        id: 3,
        name: 'Emily Davis',
        email: 'emily@email.com',
        vehicle: '2025 Ford F150',
        status: 'In Progress',
        message: 'I need a good truck for work.',
        date: '2025-01-13',
        assignedTo: 'Joe Schmoe',
      },
      {
        id: 4,
        name: 'Donald Trump',
        email: 'donnyt@email.com',
        vehicle: '2025 Tesla Model S Plaid',
        status: 'Contacted',
        message: 'I gotta go fast.',
        date: '2025-01-20',
        assignedTo: 'Elon Musk',
      },
      {
        id: 5,
        name: 'Douglas Adams',
        email: 'douglasadams@email.com',
        vehicle: '2024 Subaru Outback',
        status: 'Open',
        message: 'I\'m looking for an all wheel drive car for the mountains.',
        date: '2025-03-20',
        assignedTo: null,
      },
    ];
  
    const [selectedStatus, setSelectedStatus] = useState<string>('All');

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