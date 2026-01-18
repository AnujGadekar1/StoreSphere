// src/components/Layout.tsx
import React, { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  Users, 
  LogOut, 
  UserCircle, 
  Settings as SettingsIcon 
} from 'lucide-react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  // Requirement: Redirect to login if no user is found in local storage [cite: 8, 9]
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 text-slate-500 font-medium">
        Redirecting to login...
      </div>
    );
  }

  // Helper function to handle active link styling
  const isActive = (path: string) => location.pathname === path;
  const linkClass = (path: string) => `
    flex items-center p-3 rounded-xl transition-all duration-200
    ${isActive(path) 
      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
      : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
  `;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar navigation */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-20">
        <div className="p-8 text-2xl font-extrabold border-b border-slate-800 tracking-tight">
          Store<span className="text-indigo-400">Sphere</span>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {/* Requirement: System Administrator Navigation [cite: 16] */}
          {user.role === 'System Administrator' && (
            <>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">
                Management
              </p>
              <Link to="/admin" className={linkClass('/admin')}>
                <LayoutDashboard className="mr-3 h-5 w-5" /> Admin Panel
              </Link>
              <Link to="/admin/users" className={linkClass('/admin/users')}>
                <Users className="mr-3 h-5 w-5" /> User Directory
              </Link>
              {/* Requirement: System Administrator can view store list [cite: 28, 30] */}
              <Link to="/admin/stores" className={linkClass('/admin/stores')}>
                <Store className="mr-3 h-5 w-5" /> Store Directory
              </Link>
            </>
          )}

          {/* Requirement: Normal User Navigation [cite: 36, 44] */}
          {user.role === 'Normal User' && (
            <>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">
                Shopping
              </p>
              <Link to="/stores" className={linkClass('/stores')}>
                <Store className="mr-3 h-5 w-5" /> Explore Stores
              </Link>
            </>
          )}

          {/* Requirement: Store Owner Navigation [cite: 55, 58] */}
          {user.role === 'Store Owner' && (
            <>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">
                Business
              </p>
              <Link to="/owner-dashboard" className={linkClass('/owner-dashboard')}>
                <LayoutDashboard className="mr-3 h-5 w-5" /> My Store Stats
              </Link>
            </>
          )}

          {/* Shared Routes */}
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-6 mb-2 px-3">
            Account
          </p>
          {/* Requirement: All users can update their password  */}
          <Link to="/settings" className={linkClass('/settings')}>
            <SettingsIcon className="mr-3 h-5 w-5" /> Settings
          </Link>
        </nav>

        {/* Sidebar Footer with User Info and Logout */}
        <div className="p-6 bg-slate-950/40 border-t border-slate-800">
          <div className="flex items-center mb-6 px-2">
            <div className="h-10 w-10 bg-indigo-500 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-indigo-500/20">
              <UserCircle className="text-white h-6 w-6" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate text-white">{user.name}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase truncate">
                {user.role}
              </p>
            </div>
          </div>
          <button 
            onClick={() => { localStorage.clear(); navigate('/login'); }} 
            className="w-full p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold flex items-center justify-center text-sm group"
          >
            <LogOut className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};