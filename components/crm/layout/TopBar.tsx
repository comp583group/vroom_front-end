'use client';

import { useState, useEffect } from 'react';
import { Bell, ChevronDown, LogOut } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
}

interface Lead {
  id: number;
  name: string;
  vehicle_interest: { year: number; brand: string; model: string } | null;
}

export default function TopBar() {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Lead[]>([]);
  const router = useRouter();

  // Fetch user data on component mount
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

        if (!response.ok) {
          console.error('Fetch user failed with status:', response.status, response.statusText);
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // Fetch notifications (leads assigned to the user)
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error('No access token found');

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/assigned/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch notifications');
        const leads = await response.json();

        // Fetch vehicle details for each lead
        const leadsWithVehicles = await Promise.all(
          leads.map(async (lead: Lead) => {
            if (lead.vehicle_interest) {
              const vehicleResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars/${lead.vehicle_interest}/`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              });
              if (vehicleResponse.ok) {
                const vehicleData = await vehicleResponse.json();
                return { ...lead, vehicle: vehicleData };
              }
            }
            return lead;
          })
        );

        setNotifications(leadsWithVehicles);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotifications([]);
      }
    };
  
    fetchNotifications();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // Clear the token
    router.push('/login'); // Redirect to login page
  };

  // Get the first letter of the user's name for the avatar
  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <header className="w-full h-16 px-6 flex items-center justify-between border-b bg-white">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Welcome back, {user?.name || 'User'} 👋 </h2>
        <p className="text-sm text-gray-500">Here&apos;s what&apos;s happening in your dealership today.</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Bell with Dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} className="text-gray-600" />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {notifications.length}
              </span>
            )}
          </Menu.Button>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto">
              <div className="py-1">
                {notifications.length > 0 ? (
                  notifications.map((lead) => (
                    <Menu.Item key={lead.id}>
                      {({ active }) => (
                        <div
                          onClick={() => router.push(`/crm/leads?highlight=${lead.id}`)}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } px-4 py-2 text-sm text-gray-700`}
                        >
                          <p className="font-medium">{lead.name}</p>
                          <p className="text-gray-500">
                          {lead.vehicle_interest
                            ? `Interested in: ${lead.vehicle_interest.year} ${lead.vehicle_interest.brand} ${lead.vehicle_interest.model}`
                            : 'No vehicle interest'}
                          </p>
                        </div>
                      )}
                    </Menu.Item>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-700">No new leads assigned.</div>
                )}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        {/* Profile Avatar with Dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center font-bold text-white focus:outline-none">
            {user ? getInitial(user.name) : 'U'}
          </Menu.Button>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                    >
                      <LogOut size={16} className="mr-2" />
                      Log Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
}
