'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useApiKeyState = () => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const storedKey = Cookies.get('api-key');
    if (storedKey) setApiKey(storedKey);
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