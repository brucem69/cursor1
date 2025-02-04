'use client';

export const useApiKeyValidation = () => {
  const validateApiKey = async (key) => {
    // Zamiast bezpośredniego użycia supabase, używamy API route
    const response = await fetch('/api/validate-key', {
      method: 'POST',
      body: JSON.stringify({ apiKey: key })
    });
    return response.json();
  };
}; 