'use client';

export const useApiKeyValidation = () => {
  const validateApiKey = async (key) => {
    const response = await fetch('/api/validate-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: key })
    });
    return response.json();
  };

  return { validateApiKey };
}; 