// Path: src/pages/AdminUserView.tsx
import { useEffect, useState } from 'react';
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
        <div className="flex flex-col gap-4 p-6 border-b bg-slate-50/30 border-slate-100 md:flex-row">
          <div className="relative flex-1 group">
            <Search className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-slate-400 group-focus-within:text-indigo-600" size={18} />
            <input
              placeholder="Search by name, email, or address..."
              className="w-full py-3 pl-12 pr-4 font-medium transition-all border outline-none rounded-2xl border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
          <select className="px-6 py-3 font-bold transition-all bg-white border outline-none appearance-none cursor-pointer rounded-2xl border-slate-200 text-slate-600 focus:border-indigo-500" value={filters.role} onChange={(e) => setFilters({ ...filters, role: e.target.value })}>
            <option value="">All User Types</option>
            <option value="USER">Normal Users</option>
            <option value="STORE_OWNER">Store Owners</option>
            <option value="SYSTEM_ADMIN">Administrators</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-black tracking-widest border-b border-slate-100">
              <tr>
                {['name', 'email', 'address', 'role'].map((field) => (
                  <th key={field} className="p-6 transition-colors cursor-pointer hover:bg-slate-100/50 group" onClick={() => toggleSort(field)}>
                    <div className="flex items-center gap-2">{field} <ArrowUpDown size={12} className="transition-opacity opacity-30 group-hover:opacity-100" /></div>
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
                  <tr key={user.id} className="transition-all hover:bg-slate-50/80 group">
                    <td className="p-6"><div className="flex items-center gap-3"><div className="flex items-center justify-center w-10 h-10 font-black border rounded-full bg-slate-100 text-slate-400 border-slate-200">{user.name.charAt(0)}</div><span className="font-bold text-slate-900">{user.name}</span></div></td>
                    <td className="p-6 font-medium text-slate-600">{user.email}</td>
                    <td className="max-w-xs p-6 text-sm truncate text-slate-500">{user.address}</td>
                    <td className="p-6"><div className="flex items-center gap-3"><span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase border ${config.color}`}><Icon size={12} /> {config.label}</span>{user.role === 'STORE_OWNER' && user.averageRating !== undefined && (<span className="flex items-center gap-1 text-xs font-black text-amber-600"><Star size={12} className="fill-amber-500" /> {user.averageRating}</span>)}</div></td>
                    <td className="p-6"><button onClick={() => setSelectedUser(user)} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200">Details</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-0 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            <button onClick={() => setSelectedUser(null)} className="absolute z-20 p-2 transition-all rounded-full top-6 right-6 bg-white/20 hover:bg-white/40 text-slate-500"><X size={20} /></button>
            <div className="flex flex-col items-center p-10 text-center bg-slate-900">
               <div className="h-24 w-24 rounded-[2rem] bg-indigo-500 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-indigo-500/40 mb-4 border-4 border-white/10">{selectedUser.name.charAt(0)}</div>
               <h2 className="text-2xl font-black text-white">{selectedUser.name}</h2>
               <p className="text-indigo-300 font-bold uppercase text-[10px] tracking-widest mt-1">{ROLE_CONFIG[selectedUser.role]?.label || 'Member'}</p>
            </div>
            <div className="p-10 space-y-6">
              <div className="flex items-center gap-4 group"><div className="p-3 transition-colors bg-slate-50 rounded-2xl text-slate-400 group-hover:text-indigo-600"><Mail size={20} /></div><div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p><p className="font-bold text-slate-700">{selectedUser.email}</p></div></div>
              <div className="flex items-center gap-4 group"><div className="p-3 transition-colors bg-slate-50 rounded-2xl text-slate-400 group-hover:text-indigo-600"><MapPin size={20} /></div><div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registered Address</p><p className="font-bold leading-tight text-slate-700">{selectedUser.address}</p></div></div>
              {selectedUser.role === 'STORE_OWNER' && (<div className="flex items-center justify-between p-6 border bg-amber-50 rounded-3xl border-amber-100"><div className="flex items-center gap-3"><Star className="text-amber-500 fill-amber-500" size={24} /><p className="font-black text-amber-900">Current Rating</p></div><span className="text-2xl font-black text-amber-600">{selectedUser.averageRating ?? 'N/A'}</span></div>)}
              <button onClick={() => setSelectedUser(null)} className="w-full py-4 text-xs font-black tracking-widest text-white uppercase transition-all bg-slate-900 rounded-2xl hover:bg-slate-800">Close Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserView;