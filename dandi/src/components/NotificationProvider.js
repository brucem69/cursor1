'use client';

import React from 'react';
import { useNotification } from '@/hooks/useNotification';

export function NotificationProvider({ children }) {
  const { notification } = useNotification();

  return (
    <>
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
            notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          } text-white`}
        >
          {notification.message}
        </div>
      )}
      {children}
    </>
  );
} 