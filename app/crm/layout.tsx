import SidebarNav from '@/components/crm/layout/SidebarNav';
import TopBar from '@/components/crm/layout/TopBar';

import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex">
        <SidebarNav />
        <div className="flex-1 flex flex-col"> 
          <TopBar />
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
