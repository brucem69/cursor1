'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import { v4 as uuidv4 } from 'uuid';
import { FiEye, FiEyeOff, FiCopy, FiEdit, FiTrash2, FiCheck } from 'react-icons/fi';

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState([]);
  const [error, setError] = useState(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [loading, setLoading] = useState(true);
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState({});
  const [editingKey, setEditingKey] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  // Fetching API keys
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

  // Update notification helper
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  // Adding new API key
  const addApiKey = async (e) => {
    e.preventDefault();
    try {
      const value = `tvly-${uuidv4()}`;
      const { data, error } = await supabase
        .from('api_keys')
        .insert([
          {
            name: newKeyName,
            value: value,
            usage: 0
          }
        ])
        .select();

      if (error) throw error;
      setApiKeys([...apiKeys, data[0]]);
      setNewKeyName('');
      setShowNewKeyForm(false);
      showNotification('API Key created successfully');
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
    }
  };

  // Deleting API key
  const deleteApiKey = async (id) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setApiKeys(apiKeys.filter(key => key.id !== id));
      showNotification('API Key deleted successfully', 'error');
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
    }
  };

  // Function to toggle key visibility
  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  // Function to copy to clipboard
  const copyToClipboard = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      showNotification('Copied API Key to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
      showNotification('Failed to copy to clipboard', 'error');
    }
  };

  // Function to start editing
  const startEditing = (key) => {
    setEditingKey(key.id);
    setEditingName(key.name);
  };

  // Function to cancel editing
  const cancelEditing = () => {
    setEditingKey(null);
    setEditingName('');
  };

  // Function to save edit changes
  const saveEdit = async (keyId) => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .update({ name: editingName })
        .eq('id', keyId)
        .select();

      if (error) throw error;

      setApiKeys(apiKeys.map(key => 
        key.id === keyId ? { ...key, name: editingName } : key
      ));
      setEditingKey(null);
      setEditingName('');
      showNotification('API Key updated successfully');
    } catch (err) {
      setError(err.message);
      showNotification(err.message, 'error');
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Replace old notification with new unified notification system */}
      {notification.show && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 
          ${notification.type === 'error' ? 'bg-red-600' : 'bg-green-600'} 
          text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2 
          animate-fade-in-out z-50`}
        >
          <FiCheck className="w-4 h-4" />
          {notification.message}
          <button 
            onClick={() => setNotification({ show: false, message: '', type: 'success' })}
            className="ml-2 hover:text-green-200"
          >
            ×
          </button>
        </div>
      )}

      {/* Gradient banner */}
      <div className="mb-8 rounded-lg p-8 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white">
        <div className="mb-2 text-sm font-medium">CURRENT PLAN</div>
        <h1 className="text-3xl font-bold mb-4">Researcher</h1>
        <div className="mb-2">API Limit</div>
        <div className="flex items-center gap-2">
          <div className="w-full bg-white/30 rounded-full h-2">
            <div className="bg-white rounded-full h-2 w-[10%]"></div>
          </div>
          <span className="text-sm">24 / 1,000 Requests</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">API Keys</h2>
        <button 
          onClick={() => setShowNewKeyForm(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          + Create New Key
        </button>
      </div>

      {showNewKeyForm && (
        <div className="mb-6">
          <form onSubmit={addApiKey} className="flex gap-2">
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="API Key name"
              className="border p-2 rounded flex-1"
              required
            />
            <button 
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add
            </button>
            <button 
              type="button"
              onClick={() => setShowNewKeyForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <p className="text-gray-600 mb-6">
        The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
      </p>

      {/* API keys table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">NAME</th>
              <th className="text-left py-3 px-4">USAGE</th>
              <th className="text-left py-3 px-4">KEY</th>
              <th className="text-right py-3 px-4">OPTIONS</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map(key => (
              <tr key={key.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  {editingKey === key.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="border rounded px-2 py-1"
                      />
                      <button
                        onClick={() => saveEdit(key.id)}
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
                <td className="py-3 px-4">{key.usage}</td>
                <td className="py-3 px-4 font-mono">
                  {visibleKeys[key.id] ? key.value : `${key.value.substring(0, 10)}${'*'.repeat(20)}`}
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => toggleKeyVisibility(key.id)}
                      className="p-2 hover:bg-gray-100 rounded-full" 
                      title={visibleKeys[key.id] ? "Hide" : "Show"}
                    >
                      {visibleKeys[key.id] ? 
                        <FiEyeOff className="w-5 h-5 text-gray-600" /> : 
                        <FiEye className="w-5 h-5 text-gray-600" />
                      }
                    </button>
                    <button 
                      onClick={() => copyToClipboard(key.value)}
                      className="p-2 hover:bg-gray-100 rounded-full" 
                      title="Copy"
                    >
                      <FiCopy className="w-5 h-5 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => startEditing(key)}
                      className="p-2 hover:bg-gray-100 rounded-full" 
                      title="Edit"
                    >
                      <FiEdit className="w-5 h-5 text-gray-600" />
                    </button>
                    <button 
                      onClick={() => deleteApiKey(key.id)}
                      className="p-2 hover:bg-gray-100 rounded-full" 
                      title="Delete"
                    >
                      <FiTrash2 className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {apiKeys.length === 0 && (
        <p className="text-center text-gray-500 py-8">No API keys found</p>
      )}
    </div>
  );
}