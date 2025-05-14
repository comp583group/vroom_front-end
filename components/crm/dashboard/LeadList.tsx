// Recent leads list
//import Link from 'next/link';

export type Lead = {
    name: string;
    inquiry: string;
    status: 'Open' | 'In Progress' | 'Contacted' | 'Converted' | 'Lost';
}

const badgeColor = {
  Open: 'bg-blue-100 text-blue-800',
  'In Progress': 'bg-orange-100 text-orange-800',
  Contacted: 'bg-yellow-100 text-yellow-800',
  Converted: 'bg-green-100 text-green-800',
  Lost: 'bg-red-100 text-red-800',
}


export function LeadList({ leads }: { leads: Lead[] }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold text-black mb-4">Recent Leads</h3>
      <ul className="space-y-4">
        {leads.map((lead, i) => (
          <li key={i} className="flex justify-between items-center hover:bg-gray-100 rounded-md transition cursor-pointer">
            <div className="flex-1">
              <p className="font-semibold text-sm text-black">{lead.name}</p>
              <p className="text-sm text-gray-500">{lead.inquiry}</p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColor[lead.status]}`}
            >
              {lead.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}