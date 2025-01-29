'use client';

import React from 'react';

export default function ApiKeysPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">API Keys Management</h1>
        <div className="flex justify-center mb-8">
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Create New API Key
          </button>
        </div>
      </div>
    </div>
  );
}