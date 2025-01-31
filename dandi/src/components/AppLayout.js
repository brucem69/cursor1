'use client';

import { Sidebar } from './Sidebar';
import { SidebarToggle } from './SidebarToggle';
import { useSidebar } from '@/contexts/SidebarContext';

export function AppLayout({ children }) {
  const { isOpen } = useSidebar();
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className={`transition-all duration-300 ${isOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <nav className="sticky top-0 z-40 bg-gray-100 h-16 flex items-center px-4">
          <div className="flex items-center">
            <SidebarToggle />
          </div>
        </nav>
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
} 