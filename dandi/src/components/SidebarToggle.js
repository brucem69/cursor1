'use client';

import { useSidebar } from '@/contexts/SidebarContext';

export function SidebarToggle() {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggleSidebar();
      }}
      className="p-2 rounded-md hover:bg-gray-100 flex items-center justify-center"
      aria-label="Toggle Sidebar"
    >
      {isOpen ? (
        // Ikona X (Close)
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-6 h-6 text-gray-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      ) : (
        // Ikona Menu (Hamburger)
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-6 h-6 text-gray-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 6h16M4 12h16M4 18h16" 
          />
        </svg>
      )}
    </button>
  );
} 