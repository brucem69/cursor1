'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApiKeys(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async (name) => {
    try {
      const value = `dandi-${uuidv4()}`;
      const { data, error } = await supabase
        .from('api_keys')
        .insert([{ name, value, usage: 0 }])
        .select()
        .single();

      if (error) throw error;
      setApiKeys(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const deleteApiKey = async (id) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setApiKeys(prev => prev.filter(key => key.id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const updateApiKey = async (id, name) => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .update({ name })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setApiKeys(prev => prev.map(key => key.id === id ? data : key));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  return {
    apiKeys,
    loading,
    error,
    fetchApiKeys,
    createApiKey,
    deleteApiKey,
    updateApiKey
  };
} 