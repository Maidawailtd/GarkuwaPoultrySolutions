import { ReactNode } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardNavbar } from './DashboardNavbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardNavbar />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}