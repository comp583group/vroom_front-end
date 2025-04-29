// Profile, greeting, and notifications

'use client';

import { Bell } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="w-full h-16 px-6 flex items-center justify-between border-b bg-white">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Welcome back, Sevan 👋</h2>
        <p className="text-sm text-gray-500">Here&apos;s what&apos;s happening in your dealership today.</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
        </button>

        {/* Profile Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white">
          S
        </div>
      </div>
    </header>
  );
}
