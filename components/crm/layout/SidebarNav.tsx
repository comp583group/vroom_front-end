// Vertical navigation menu

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Car, BarChart } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/crm/dashboard', icon: <Home size={18} /> },
  { label: 'Leads', href: '/crm/leads', icon: <Users size={18} /> },
  { label: 'Inventory', href: '/crm/inventory', icon: <Car size={18} /> },
  { label: 'Reports', href: '/crm/reports', icon: <BarChart size={18} /> },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white border-r p-4 flex flex-col">
      <div className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
        🚘 <span>Carvantage</span>
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
              pathname === item.href
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
