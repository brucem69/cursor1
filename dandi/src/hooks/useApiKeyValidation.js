'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const useApiKeyValidation = () => {
  const [validating, setValidating] = useState(false);

  const validateApiKey = async (key) => {
    setValidating(true);
    
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('id')
        .eq('value', key)
        .single();

      if (error) {
        // Jeśli błąd to "No rows found", to znaczy że klucz jest nieprawidłowy
        if (error.code === 'PGRST116') {
          return false;
        }
        // Dla innych błędów, logujemy je ale nie pokazujemy użytkownikowi
        console.log('Supabase error:', error);
        return false;
      }

      return !!data;
    } catch (err) {
      // Dla nieoczekiwanych błędów, logujemy je ale nie pokazujemy użytkownikowi
      console.log('Unexpected error:', err);
      return false;
    } finally {
      setValidating(false);
    }
  };

  return {
    validateApiKey,
    validating
  };
}; 