import { Mail, Phone, MoreVertical } from 'lucide-react';

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

export function LeadTable({ leads }: { leads: Lead[] }) {
  const statusColors = {
    Open: 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    Contacted: 'bg-green-100 text-green-800',
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
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <p className="font-medium text-black">{lead.name}</p>
                <p className="text-sm text-blue-500">{lead.email}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{lead.vehicle}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[lead.status]}`}
                >
                  {lead.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {lead.assignedTo ? (
                  <span className="text-sm text-gray-800">{lead.assignedTo}</span>
                ) : (
                  <span className="text-sm text-gray-400 italic">Unassigned</span>
                )}
              </td>
              <td className="px-6 py-4 text-black">{lead.message}</td>
              <td className="px-6 py-4 text-black">{new Date(lead.date).toLocaleDateString()}</td>
            
              <td className="px-6 py-4 gap-2 text-gray-600">
                <div className="flex items-center gap-2 h-full">
                    <Phone size={16} className="hover:text-black cursor-pointer" />
                    <Mail size={16} className="hover:text-black cursor-pointer" />
                    <MoreVertical size={16} className="hover:text-black cursor-pointer" />
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
