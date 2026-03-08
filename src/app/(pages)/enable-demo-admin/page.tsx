"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function EnableDemoAdmin() {
  const router = useRouter();

  useEffect(() => {
    // Create demo admin in localStorage
    const demoUser = {
      id: 'demo-admin-' + Date.now(),
      name: 'Demo Admin',
      email: 'demo@brand.com',
      role: 'admin',
      avatar: ''
    };
    
    const authState = {
      user: demoUser,
      token: 'demo-token-' + Date.now(),
      isAuthenticated: true
    };
    
    localStorage.setItem('auth-storage', JSON.stringify({
      state: authState,
      version: 0
    }));
    
    console.log('✅ Demo admin created!');
    console.log('📝 Email: demo@brand.com');
    console.log('🌐 Redirecting to admin dashboard...');
    
    // Redirect to admin dashboard
    setTimeout(() => {
      router.push('/admin');
    }, 2000);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className={`${inter.className} text-[24px] font-bold text-[#1C1C1C] mb-4`}>
          Enabling Demo Admin Mode
        </h1>
        <p className={`${inter.className} text-[16px] text-[#8B96A5]`}>
          Creating demo admin account...
        </p>
        <p className={`${inter.className} text-[14px] text-[#0D6EFD] mt-4`}>
          Redirecting to admin dashboard...
        </p>
      </div>
    </div>
  );
}
