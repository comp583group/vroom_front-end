// Recent leads list

export type Lead = {
    name: string;
    inquiry: string;
    status: 'Open' | 'In Progress' | 'Contacted' | 'Closed';
}

const badgeColor = {
    Open: 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    Contacted: 'bg-green-100 text-green-800',
    Closed: 'bg-gray-100 text-gray-800',
}


export function LeadList({ leads }: { leads: Lead[] }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold text-black mb-4">Recent Leads</h3>
        <ul className="space-y-4">
          {leads.map((lead, i) => (
            <li key={i} className="flex justify-around items-start hover:bg-gray-100 rounded-md transition">
              <div>
                <p className="font-medium text-black">{lead.name}</p>
                <p className="text-sm text-gray-400">{lead.inquiry}</p>
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