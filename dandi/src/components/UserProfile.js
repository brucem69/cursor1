'use client';

import { useSession, signOut } from "next-auth/react";

export function UserProfile() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="absolute top-4 right-4 flex items-center gap-3">
      <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm">
        <img 
          src={session.user.image} 
          alt={session.user.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-gray-700">{session.user.name}</span>
        <button
          onClick={() => signOut()}
          className="text-sm text-red-500 hover:text-red-600 font-medium"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
} 