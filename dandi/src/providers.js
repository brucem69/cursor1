'use client';

import { NotificationProvider } from '@/contexts/NotificationContext';
import { SidebarProvider } from '@/contexts/SidebarContext';

export function Providers({ children }) {
  return (
    <NotificationProvider>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </NotificationProvider>
  );
} 