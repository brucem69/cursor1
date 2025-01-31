'use client';

import { NotificationProvider } from '@/contexts/NotificationContext';

export function ClientLayout({ children }) {
  return (
    <NotificationProvider>
      {children}
    </NotificationProvider>
  );
} 