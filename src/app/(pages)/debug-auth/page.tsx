"use client";

import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import { useAuthStore } from '@/store/authStore';

const inter = Inter({ subsets: ['latin'] });

export default function DebugAuth() {
  const { user, isAuthenticated, fetchUser } = useAuthStore();
  const [apiUser, setApiUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      await fetchUser();
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        setApiUser(data);
      } catch (e) {
        setApiUser({ error: e });
      }
      setLoading(false);
    };
    check();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className={`${inter.className} text-2xl font-bold mb-6`}>Auth Debug Info</h1>
        
        <div className="space-y-4">
          <div className="border p-4 rounded">
            <h2 className="font-semibold mb-2">Zustand Store:</h2>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
              {JSON.stringify({ user, isAuthenticated }, null, 2)}
            </pre>
          </div>

          <div className="border p-4 rounded">
            <h2 className="font-semibold mb-2">API Response (/api/auth/me):</h2>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
              {loading ? 'Loading...' : JSON.stringify(apiUser, null, 2)}
            </pre>
          </div>

          <div className="border p-4 rounded">
            <h2 className="font-semibold mb-2">LocalStorage:</h2>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
              {localStorage.getItem('auth-storage') || 'empty'}
            </pre>
          </div>

          <div className="border p-4 rounded">
            <h2 className="font-semibold mb-2">User Role Check:</h2>
            <p className={`${inter.className} text-lg`}>
              Role: <span className={`font-bold ${user?.role === 'admin' ? 'text-green-600' : 'text-red-600'}`}>
                {user?.role || 'unknown'}
              </span>
            </p>
            {user?.role === 'admin' ? (
              <a href="/admin" className="text-blue-600 underline mt-2 inline-block">Go to Admin Dashboard →</a>
            ) : (
              <p className="text-red-600 mt-2">❌ Not an admin. Run: <code className="bg-gray-100 px-2 py-1 rounded">npm run promote-admin your@email.com</code></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
