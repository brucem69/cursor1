'use client';

import { useState, useEffect } from 'react';

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApiKeys = async () => {
    try {
      const response = await fetch('/api/keys');
      const data = await response.json();
      setApiKeys(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async (name) => {
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      const data = await response.json();
      setApiKeys(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const deleteApiKey = async (id) => {
    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setApiKeys(prev => prev.filter(key => key.id !== id));
      }
      return data;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  return { apiKeys, loading, error, createApiKey, deleteApiKey, fetchApiKeys };
} 