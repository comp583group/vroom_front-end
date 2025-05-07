'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { label: 'New Cars', href: '/browse-cars' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Login', href: '/login' },
];


export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/browse-cars?search=${encodeURIComponent(searchTerm)}`);
    }
  };

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

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`hover:underline ${pathname === href ? 'font-bold underline' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden md:block relative">
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-full bg-white px-4 py-2 pl-10 text-black placeholder-gray-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        </form>

        {/* Mobile menu toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-orange-500 px-6 pb-4 space-y-2">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="block py-2 border-b border-orange-300"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <form onSubmit={handleSearch} className="relative mt-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full bg-white px-4 py-2 pl-10 text-black placeholder-gray-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          </form>
        </div>
      )}
    </header>
  );
}
