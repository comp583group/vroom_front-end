import { Mail, Phone, MoreVertical } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { LeadMessagePopup } from './LeadsMessagePopup';

export type Lead = {
  id: number;
  name: string;
  email: string;
  vehicle: string;
  status: 'Open' | 'In Progress' | 'Contacted';
  message: string;
  date: string;
  assignedTo: string | null;
};

export function LeadTable({ leads, onStatusChange, onDeleteLead }: { leads: Lead[], onStatusChange: (leadId: number, newStatus: Lead['status']) => void, onDeleteLead: (leadId: number) => void }) {
  const statusColors = {
    Open: 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-orange-100 text-orange-800',
    Contacted: 'bg-green-100 text-green-800',
  };

  const statusOptions: Lead['status'][] = ['Open', 'In Progress', 'Contacted'];

  // Map display statuses to backend values
  const statusToBackendMap: { [key in Lead['status']]: string } = {
    Open: 'open',
    'In Progress': 'in_progress',
    Contacted: 'contacted',
  };

  const [expandedLead, setExpandedLead] = useState<number | null>(null);
  const [editingStatusLeadId, setEditingStatusLeadId] = useState<number | null>(null);
  const [leadData, setLeadData] = useState<Lead[]>(leads);
  const [moreOptionsLeadId, setMoreOptionsLeadId] = useState<number | null>(null);

  const messageRefs = useRef<Record<number, HTMLTableCellElement | null>>({});
  const moreOptionsRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Update local state when leads prop changes
  useEffect(() => {
    setLeadData(leads);
  }, [leads]);

  // Close more options dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreOptionsLeadId !== null) {
        const ref = moreOptionsRefs.current[moreOptionsLeadId];
        if (ref && !ref.contains(event.target as Node)) {
          setMoreOptionsLeadId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [moreOptionsLeadId]);

  const handleStatusChange = async (leadId: number, newStatus: Lead['status']) => {
    try {
      const backendStatus = statusToBackendMap[newStatus];
      console.log('Updating lead', leadId, 'to status', backendStatus);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/${leadId}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: backendStatus }),
      });

      console.log('Update Lead Status Response Status:', response.status);

      if (!response.ok) {
        const error = await response.json();
        console.log('Error Response:', error);
        throw new Error(`Failed to update status: ${error.detail || 'Unknown error'}`);
      }

      // Update local state to reflect the change
      setLeadData((prevLeads) => {
        const updatedLeads = prevLeads.map((lead) => {
          if (lead.id === leadId) {
            console.log(`Updating lead ${leadId} from ${lead.status} to ${newStatus}`);
            return { ...lead, status: newStatus };
          }
          return lead;
        });
        console.log('Updated Leads:', updatedLeads);
        return updatedLeads;
      });

      // Notify parent component of the status change
      onStatusChange(leadId, newStatus);
    } catch (error) {
      console.error('Error updating lead status:', error);
      alert('Failed to update lead status. Please try again.');
    } finally {
      setEditingStatusLeadId(null); // Close the dropdown
    }
  };

  const handleEmailClick = (email: string, name: string, vehicle: string) => {
    const subject = encodeURIComponent(`Follow-Up on Your Inquiry About ${vehicle}`);
    const body = encodeURIComponent(
      `Dear ${name},\n\nThank you for your interest in the ${vehicle}. I'm reaching out to follow up on your inquiry and provide more information.\n\nBest regards,\n[Your Name]`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleDeleteLead = async (leadId: number) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    try {
      console.log('Deleting lead with ID:', leadId); // Debug log

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/${leadId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Delete Lead Response Status:', response.status); // Debug log

      if (!response.ok) {
        const error = await response.json();
        console.log('Error Response:', error); // Debug log
        throw new Error(`Failed to delete lead: ${error.detail || 'Unknown error'}`);
      }

      // Remove the lead from local state
      setLeadData((prevLeads) => {
        const updatedLeads = prevLeads.filter((lead) => lead.id !== leadId);
        console.log('Updated Leads after deletion:', updatedLeads); // Debug log
        return updatedLeads;
      });

      // Notify parent to update its state
      onDeleteLead(leadId);
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert('Failed to delete lead. Please try again.');
    } finally {
      setMoreOptionsLeadId(null); // Close the dropdown
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Vehicle Interest</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Assigned To</th>
            <th className="px-6 py-3">Message</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leadData.map((lead) => (
            <tr
              key={lead.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <p className="font-medium text-black">{lead.name}</p>
                <p className="text-sm text-blue-500">{lead.email}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{lead.vehicle}</td>
              <td className="px-6 py-4 whitespace-nowrap relative">
                {editingStatusLeadId === lead.id ? (
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value as Lead['status'])}
                    className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-800"
                    autoFocus
                    onBlur={() => setEditingStatusLeadId(null)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span
                    onClick={() => setEditingStatusLeadId(lead.id)}
                    className={`cursor-pointer px-2 py-1 rounded-full text-xs font-medium ${statusColors[lead.status] || 'bg-gray-100 text-gray-800'}`}
                  >
                    {lead.status}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {lead.assignedTo ? (
                  <span className="text-sm text-gray-800">{lead.assignedTo}</span>
                ) : (
                  <span className="text-sm text-gray-400 italic">Unassigned</span>
                )}
              </td>

              <td
                ref={(el) => {
                    messageRefs.current[lead.id] = el;
                }}
                className="px-6 py-4 text-black relative max-w-xs"
              >
                <p className="truncate whitespace-nowrap overflow-hidden">{lead.message}</p>
                <button
                    onClick={() => setExpandedLead(lead.id)}
                    className="text-xs text-blue-600 hover:underline mt-1"
                >
                    View
                </button>

                {/* Expanded message popup */}
                {expandedLead === lead.id && (
                    <LeadMessagePopup
                    anchorRef={{ current: messageRefs.current[lead.id]! }}
                    message={lead.message}
                    onClose={() => setExpandedLead(null)}
                  />
                )}
              </td>

              <td className="px-6 py-4 text-black">{new Date(lead.date).toLocaleDateString()}</td>
            
              <td className="px-6 py-4 gap-2 text-gray-600">
                <div className="flex items-center gap-2 h-full relative">
                    <Mail 
                      size={16} 
                      className="hover:text-black cursor-pointer" 
                      onClick={() => handleEmailClick(lead.email, lead.name, lead.vehicle)}
                    />
                    <div
                      ref={(el) => {
                        moreOptionsRefs.current[lead.id] = el;
                      }}
                      className="relative"
                    >
                      <MoreVertical 
                        size={16} 
                        className="hover:text-black cursor-pointer" 
                        onClick={() => setMoreOptionsLeadId(lead.id === moreOptionsLeadId ? null : lead.id)}
                      />
                      {moreOptionsLeadId === lead.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}