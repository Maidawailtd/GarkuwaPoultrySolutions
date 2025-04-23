import { ReactNode } from 'react';
import { MainNavbar } from './MainNavbar';
import { MainFooter } from './MainFooter';

interface MainLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function MainLayout({ 
  children, 
  showFooter = true 
}: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavbar />
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <MainFooter />}
    </div>
  );
}