/**
 * Demo mode - Creates demo admin user in localStorage
 * Open browser console and run: demoAdmin()
 */

// Add this to browser console to create demo admin
const demoAdminScript = `
(function() {
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
  console.log('🌐 Refresh the page and go to /admin');
  return authState;
})();
`;

console.log('📝 To create demo admin, run this in browser console:');
console.log('');
console.log(demoAdminScript);

// For programmatic use
export function createDemoAdmin() {
  if (typeof window !== 'undefined') {
    const demoUser = {
      id: 'demo-admin-' + Date.now(),
      name: 'Demo Admin',
      email: 'demo@brand.com',
      role: 'admin' as const,
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
    console.log('🌐 Refresh the page and go to /admin');
    return authState;
  }
}
