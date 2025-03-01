'use client';

import React, { useState, useEffect } from 'react';
import { ApiKeysTable } from './ApiKeysTable';
import { CreateApiKeyModal } from './CreateApiKeyModal';
import { Overview } from '@/components/Overview';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useNotification } from '@/contexts/NotificationContext';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

export function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { apiKeys, createApiKey, deleteApiKey, updateApiKey } = useApiKeys();
  const { showNotification } = useNotification();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const handleCreate = async (name) => {
    try {
      await createApiKey(name);
      setIsModalOpen(false);
      showNotification('API Key created successfully', 'success');
    } catch {
      showNotification('Error creating API Key', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteApiKey(id);
      showNotification('API Key deleted successfully', 'success');
    } catch {
      showNotification('Error deleting API Key', 'error');
    }
  };

  const handleUpdate = async (id, name) => {
    try {
      const result = await updateApiKey(id, name);
      if (result.success) {
        showNotification('API Key updated successfully', 'success');
      }
      return result;
    } catch {
      showNotification('Error updating API Key', 'error');
      return { success: false };
    }
  };

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    showNotification('API Key copied to clipboard', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Overview usage={24} limit={1000} />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">API_ Keys</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          + Create New Key
        </button>
      </div>

      <ApiKeysTable
        apiKeys={apiKeys}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onCopy={handleCopy}
      />

      <CreateApiKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
} 