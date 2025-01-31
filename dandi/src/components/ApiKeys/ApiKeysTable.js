'use client';

import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiCopy, FiEdit, FiTrash2 } from 'react-icons/fi';

export function ApiKeysTable({ apiKeys, onDelete, onUpdate, onCopy }) {
  const [visibleKeys, setVisibleKeys] = useState({});
  const [editingKey, setEditingKey] = useState(null);
  const [editingName, setEditingName] = useState('');

  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const startEditing = (key) => {
    setEditingKey(key.id);
    setEditingName(key.name);
  };

  const cancelEditing = () => {
    setEditingKey(null);
    setEditingName('');
  };

  const handleSave = async (keyId) => {
    const result = await onUpdate(keyId, editingName);
    if (result.success) {
      cancelEditing();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              API Key
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {apiKeys.map((key) => (
            <tr key={key.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {editingKey === key.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                    <button
                      onClick={() => handleSave(key.id)}
                      className="text-green-600 hover:text-green-800 px-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="text-gray-600 hover:text-gray-800 px-2"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  key.name
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                {visibleKeys[key.id] ? 
                  key.value : 
                  `${key.value.substring(0, 10)}${'*'.repeat(20)}`
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(key.created_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => toggleKeyVisibility(key.id)}
                  className="text-gray-600 hover:text-gray-900 mx-2"
                  title={visibleKeys[key.id] ? "Hide" : "Show"}
                >
                  {visibleKeys[key.id] ? 
                    <FiEyeOff className="w-5 h-5" /> : 
                    <FiEye className="w-5 h-5" />
                  }
                </button>
                <button
                  onClick={() => onCopy(key.value)}
                  className="text-blue-600 hover:text-blue-900 mx-2"
                  title="Copy API Key"
                >
                  <FiCopy className="w-5 h-5" />
                </button>
                <button
                  onClick={() => startEditing(key)}
                  className="text-yellow-600 hover:text-yellow-900 mx-2"
                  title="Edit Name"
                >
                  <FiEdit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(key.id)}
                  className="text-red-600 hover:text-red-900 mx-2"
                  title="Delete API Key"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 