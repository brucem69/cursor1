'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApiKeyState } from '@/hooks/useApiKeyState';
import Cookies from 'js-cookie';

export function ProtectedContent() {
  const router = useRouter();
  const [apiKey] = useApiKeyState();

  useEffect(() => {
    const storedApiKey = Cookies.get('api-key');
    if (!storedApiKey) {
      router.push('/playground');
    }
  }, [router]);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Protected Page</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700 mb-4">
          This is a protected page that can only be accessed with a valid API key.
        </p>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-600">Your API Key:</p>
          <code className="block mt-2 text-sm bg-gray-100 p-2 rounded">
            {apiKey}
          </code>
        </div>
      </div>
    </div>
  );
} 