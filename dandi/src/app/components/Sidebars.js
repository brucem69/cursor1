'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome,
  FiFileText,
  FiCode,
  FiCreditCard,
  FiBook,
  FiMenu,
  FiX 
} from 'react-icons/fi';
import { HiLightBulb } from 'react-icons/hi';
import { useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Overview', path: '/', icon: <FiHome className="w-5 h-5" /> },
    { name: 'Research Assistant', path: '/assistant', icon: <HiLightBulb className="w-5 h-5" /> },
    { name: 'Research Reports', path: '/reports', icon: <FiFileText className="w-5 h-5" /> },
    { name: 'API Playground', path: '/playground', icon: <FiCode className="w-5 h-5" /> },
    { name: 'Invoices', path: '/invoices', icon: <FiCreditCard className="w-5 h-5" /> },
    { name: 'Documentation', path: '/docs', icon: <FiBook className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Menu button (visible only when sidebar is hidden) */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed top-6 left-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-purple-500 text-white shadow-lg"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 h-screen bg-white shadow-lg
          transition-transform duration-300 ease-in-out
          ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}
          w-64 z-40
        `}
      >
        {/* Logo */}
        <div className="h-20 px-6 border-b border-gray-200 flex items-center">
          <Link href="/" className="text-xl text-gray-900 font-semibold">
            Dani AI
          </Link>
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsCollapsed(true)}
          className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-purple-500 text-white shadow-lg"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`
                flex items-center gap-4 px-4 py-3 rounded-lg
                text-[15px] font-medium transition-colors
                ${pathname === item.path 
                  ? 'bg-purple-50 text-purple-700' 
                  : 'text-[#475467] hover:bg-gray-50'
                }
              `}
            >
              <div className={`${pathname === item.path ? 'text-purple-700' : 'text-[#475467]'}`}>
                {item.icon}
              </div>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}
