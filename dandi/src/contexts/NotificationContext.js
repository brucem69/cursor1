'use client';

import React, { createContext, useContext, useState } from 'react';

// Inicjalizacja z domyślnymi wartościami
const NotificationContext = createContext({
  showNotification: () => {},
});

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 rounded-md shadow-lg ${
              notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
            } text-white min-w-[200px]`}
          >
            {notification.message}
          </div>
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    console.error('NotificationContext is null!');
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
} 