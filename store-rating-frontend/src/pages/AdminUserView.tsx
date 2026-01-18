// Path: src/pages/AdminUserView.tsx
import React, { useEffect, useState } from 'react';
import { adminApi } from '../services/adminService';
import { Search, ArrowUpDown, Star, X, User, Shield, Briefcase, UserCheck, Mail, MapPin } from 'lucide-react';

const ROLE_CONFIG: Record<string, { label: string; icon: any; color: string }> = {
  SYSTEM_ADMIN: { label: 'Admin', icon: Shield, color: 'bg-rose-50 text-rose-600 border-rose-100' },
  USER: { label: 'Member', icon: UserCheck, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  STORE_OWNER: { label: 'Owner', icon: Briefcase, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
};

const AdminUserView = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [filters, setFilters] = useState({ search: '', role: '', sortBy: 'name', order: 'ASC' });

  useEffect(() => {
    adminApi.getUsers(filters)
      .then((res) => setUsers(res?.data?.data || []))
      .catch(() => setUsers([]));
  }, [filters]);

  const toggleSort = (field: string) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: field,
      order: prev.sortBy === field && prev.order === 'ASC' ? 'DESC' : 'ASC',
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
        {/* Filter Bar */}
        <div className="p-6 bg-slate-50/30 border-b border-slate-100 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input
              placeholder="Search by name, email, or address..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          <select
            className="px-6 py-3 rounded-2xl border border-slate-200 bg-white font-bold text-slate-600 outline-none focus:border-indigo-500 transition-all cursor-pointer appearance-none"
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          >
            <option value="">All User Types</option>
            <option value="USER">Normal Users</option>
            <option value="STORE_OWNER">Store Owners</option>
            <option value="SYSTEM_ADMIN">Administrators</option>
          </select>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-black tracking-widest border-b border-slate-100">
              <tr>
                {['name', 'email', 'address', 'role'].map((field) => (
                  <th
                    key={field}
                    className="p-6 cursor-pointer hover:bg-slate-100/50 transition-colors group"
                    onClick={() => toggleSort(field)}
                  >
                    <div className="flex items-center gap-2">
                      {field} <ArrowUpDown size={12} className="opacity-30 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                ))}
                <th className="p-6">Control</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {users.map((user) => {
                const config = ROLE_CONFIG[user.role] || { label: user.role, icon: User, color: 'bg-slate-50 text-slate-600' };
                const Icon = config.icon;

                return (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-all group">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 border border-slate-200">
                          {user.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-6 text-slate-600 font-medium">{user.email}</td>
                    <td className="p-6 text-sm text-slate-500 max-w-xs truncate">{user.address}</td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase border ${config.color}`}>
                          <Icon size={12} /> {config.label}
                        </span>
                        {user.role === 'STORE_OWNER' && user.averageRating !== undefined && (
                          <span className="flex items-center gap-1 text-amber-600 font-black text-xs">
                            <Star size={12} className="fill-amber-500" /> {user.averageRating}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-0 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 text-slate-500 rounded-full transition-all z-20"
            >
              <X size={20} />
            </button>

            {/* Modal Header/Avatar */}
            <div className="bg-slate-900 p-10 flex flex-col items-center text-center">
               <div className="h-24 w-24 rounded-[2rem] bg-indigo-500 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-indigo-500/40 mb-4 border-4 border-white/10">
                 {selectedUser.name.charAt(0)}
               </div>
               <h2 className="text-2xl font-black text-white">{selectedUser.name}</h2>
               <p className="text-indigo-300 font-bold uppercase text-[10px] tracking-widest mt-1">
                 {ROLE_CONFIG[selectedUser.role]?.label || 'Member'}
               </p>
            </div>

            <div className="p-10 space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-indigo-600 transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                  <p className="font-bold text-slate-700">{selectedUser.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-indigo-600 transition-colors">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registered Address</p>
                  <p className="font-bold text-slate-700 leading-tight">{selectedUser.address}</p>
                </div>
              </div>

              {selectedUser.role === 'STORE_OWNER' && (
                <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Star className="text-amber-500 fill-amber-500" size={24} />
                    <p className="font-black text-amber-900">Current Rating</p>
                  </div>
                  <span className="text-2xl font-black text-amber-600">
                    {selectedUser.averageRating ?? 'N/A'}
                  </span>
                </div>
              )}

              <button 
                onClick={() => setSelectedUser(null)}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserView;