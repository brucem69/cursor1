'use client';

import { useState, useEffect } from 'react';
import { FiEye, FiEyeOff, FiCopy, FiEdit, FiTrash2, FiMoreVertical } from 'react-icons/fi';

export function ApiKeysTable({ apiKeys, onDelete, onUpdate, onCopy }) {
  const [visibleKeys, setVisibleKeys] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId && !event.target.closest('.mobile-menu')) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const handleEditClick = (key) => {
    setEditingId(key.id);
    setEditName(key.name);
  };

  const handleSave = async (id) => {
    const result = await onUpdate(id, editName);
    if (result.success) {
      setEditingId(null);
      setEditName('');
    }
  };

  const maskKey = (key) => {
    const maskedKey = '•'.repeat(key.length);
    return maskedKey.match(/.{1,20}/g)?.join('\n') || maskedKey;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">NAME</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">KEY</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 hidden md:table-cell">USAGE</th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 w-20">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {apiKeys.map((key) => (
            <tr key={key.id} className="hover:bg-gray-50">
              <td className="px-4 py-4">
                {editingId === key.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                    <button
                      onClick={() => handleSave(key.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <div className="text-sm text-gray-900">{key.name}</div>
                    <div className="text-xs text-gray-500 md:hidden mt-1">
                      <div className="font-mono whitespace-pre-wrap">
                        {visibleKeys[key.id] 
                          ? key.value.match(/.{1,20}/g)?.join('\n') 
                          : maskKey(key.value)
                        }
                      </div>
                      <div className="mt-1">Usage: {key.usage}</div>
                    </div>
                  </div>
                )}
              </td>
              <td className="px-4 py-4 hidden md:table-cell">
                <div className="text-sm font-mono">
                  {visibleKeys[key.id] ? key.value : maskKey(key.value)}
                </div>
              </td>
              <td className="px-4 py-4 hidden md:table-cell">
                <div className="text-sm text-gray-500">{key.usage}</div>
              </td>
              <td className="px-4 py-4 text-right">
                {/* Desktop view */}
                <div className="hidden md:flex justify-end gap-2">
                  <button
                    onClick={() => toggleKeyVisibility(key.id)}
                    className="text-blue-500 hover:text-blue-600"
                    title={visibleKeys[key.id] ? "Hide" : "Show"}
                  >
                    {visibleKeys[key.id] ? 
                      <FiEyeOff className="w-5 h-5" /> : 
                      <FiEye className="w-5 h-5" />
                    }
                  </button>
                  <button
                    onClick={() => onCopy(key.value)}
                    className="text-green-500 hover:text-green-600"
                  >
                    <FiCopy className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleEditClick(key)}
                    className="text-purple-500 hover:text-purple-600"
                  >
                    <FiEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(key.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Mobile view */}
                <div className="block md:hidden mobile-menu relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === key.id ? null : key.id)}
                    className="p-2 hover:bg-purple-100 rounded-full"
                  >
                    <FiMoreVertical className="w-6 h-6 text-purple-600" />
                  </button>
                  
                  {openMenuId === key.id && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1" role="menu">
                        <button
                          onClick={() => {
                            toggleKeyVisibility(key.id);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-blue-500 hover:bg-blue-50 flex items-center"
                        >
                          {visibleKeys[key.id] ? 
                            <><FiEyeOff className="w-4 h-4 mr-2" /> Hide Key</> : 
                            <><FiEye className="w-4 h-4 mr-2" /> Show Key</>
                          }
                        </button>
                        <button
                          onClick={() => {
                            onCopy(key.value);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-green-500 hover:bg-green-50 flex items-center"
                        >
                          <FiCopy className="w-4 h-4 mr-2" /> Copy Key
                        </button>
                        <button
                          onClick={() => {
                            handleEditClick(key);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-purple-500 hover:bg-purple-50 flex items-center"
                        >
                          <FiEdit className="w-4 h-4 mr-2" /> Edit
                        </button>
                        <button
                          onClick={() => {
                            onDelete(key.id);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                        >
                          <FiTrash2 className="w-4 h-4 mr-2" /> Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 