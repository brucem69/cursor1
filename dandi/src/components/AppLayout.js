'use client';

import { Sidebar } from './Sidebar';
import { SidebarToggle } from './SidebarToggle';

export function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="lg:ml-64">
        <nav className="sticky top-0 z-40 bg-white border-b h-16 flex items-center px-4 shadow-sm">
          <div className="block lg:hidden">
            <SidebarToggle />
          </div>
          <div className="ml-4 text-lg font-semibold">Dandi</div>
        </nav>
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
} 