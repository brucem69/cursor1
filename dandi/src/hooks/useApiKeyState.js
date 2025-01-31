'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useApiKeyState = () => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    // Pobierz API key z cookies przy montowaniu komponentu
    const storedApiKey = Cookies.get('api-key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const setStoredApiKey = (key) => {
    if (key) {
      Cookies.set('api-key', key, { path: '/' });
    } else {
      Cookies.remove('api-key', { path: '/' });
    }
    setApiKey(key);
  };

  return [apiKey, setStoredApiKey];
}; 