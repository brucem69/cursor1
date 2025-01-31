'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/contexts/SidebarContext';
import { FiHome, FiKey, FiPlayCircle } from 'react-icons/fi';

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggleSidebar } = useSidebar();

  const links = [
    { href: '/', label: 'Home', icon: FiHome },
    { href: '/api-keys', label: 'API Keys', icon: FiKey },
    { href: '/playground', label: 'API Playground', icon: FiPlayCircle },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity lg:hidden
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      />
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r transform transition-transform duration-200 ease-in-out z-30
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-16 flex items-center px-6 border-b">
          <span className="text-xl font-semibold">Dandi</span>
        </div>
        <nav className="p-4">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center px-4 py-2 mb-2 rounded-md transition-colors
                ${pathname === href 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
} 