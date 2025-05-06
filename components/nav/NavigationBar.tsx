'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';

const navLinks = [
  { label: 'New Cars', href: '/browse-cars' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Login', href: '/login' },
];

// NEED MOBILE VIEW!!! have a burger menu

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-orange-400 text-white shadow">
      <div className="mx-auto max-w-screen-xl px-6 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <Link href="/">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm">
            CD
          </div>
          <span className="text-xl font-semibold">Carvantage</span>
        </div>
        </Link>

        {/* Nav Links */}
        <nav className="flex gap-6 items-center">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`hover:underline ${pathname === href ? 'font-bold underline-offset-4' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search inventory..."
            className="rounded-full bg-white px-4 py-2 pl-10 text-black placeholder-gray-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        </div>
      </div>
    </header>
  );
}
