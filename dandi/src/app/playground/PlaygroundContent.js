'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/contexts/NotificationContext';
import { useApiKeyValidation } from '@/hooks/useApiKeyValidation';
import Cookies from 'js-cookie';

export function PlaygroundContent() {
  const [apiKey, setApiKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { showNotification } = useNotification();
  const { validateApiKey, validating } = useApiKeyValidation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const isValid = await validateApiKey(apiKey);
      
      if (isValid) {
        Cookies.set('api-key', apiKey, { path: '/' });
        showNotification('Valid API Key, /protected can be accessed', 'success');
        
        setTimeout(() => {
          router.push('/protected');
        }, 2000);
      } else {
        showNotification('Invalid API Key', 'error');
      }
    } catch (err) {
      console.error('Validation error:', err);
      showNotification('Error validating API key', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your API Key
          </label>
          <input
            id="apiKey"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="dandi-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            required
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || validating}
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 
            ${(isSubmitting || validating) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Processing...' : validating ? 'Validating...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}