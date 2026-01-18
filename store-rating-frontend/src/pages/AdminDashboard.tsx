// Path: src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { adminApi } from '../services/adminService';
import { 
  Users, 
  Store, 
  Star, 
  PlusCircle, 
  UserPlus, 
  Mail, 
  MapPin, 
  Key, 
  ShieldCheck,
  TrendingUp,
  Activity
} from 'lucide-react';

/* ---------- TYPES ---------- */
type UserRole = 'Normal User' | 'System Administrator' | 'Store Owner';

const AdminDashboard: React.FC = () => {
  /* ---------- STATE ---------- */
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [loading, setLoading] = useState(false);
  const [storeForm, setStoreForm] = useState({ name: '', email: '', address: '', ownerId: '' });
  const [userForm, setUserForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    address: '', 
    role: 'Normal User' as UserRole 
  });

  /* ---------- LOAD DASHBOARD ---------- */
  const loadStats = async () => {
    try {
      const res = await adminApi.getDashboardStats();
      setStats(res.data);
    } catch (error) { 
      console.error('Stats fetch error:', error); 
    }
  };

  useEffect(() => { 
    loadStats(); 
  }, []);

  /* ---------- HANDLERS ---------- */
  const handleAddStore = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminApi.addStore({
        ...storeForm,
        ownerId: Number(storeForm.ownerId),
      });
      alert('Store registered successfully');
      setStoreForm({ name: '', email: '', address: '', ownerId: '' });
      loadStats();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error adding store');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminApi.addUser(userForm);
      alert('User created successfully');
      setUserForm({ 
        name: '', 
        email: '', 
        password: '', 
        address: '', 
        role: 'Normal User' 
      });
      loadStats();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error creating user');
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI COMPONENTS ---------- */
  const StatCard = ({ title, value, icon: Icon, colorClass, trend }: any) => (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={`p-4 rounded-2xl ${colorClass}`}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-slate-500 text-sm font-medium">{title}</p>
          <h2 className="text-3xl font-black text-slate-900">{value}</h2>
        </div>
      </div>
      <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-lg">
        <TrendingUp size={12} /> {trend}%
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      {/* ---------- HEADER ---------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Control</h1>
          <p className="text-slate-500 font-medium">Global platform overview and entity management.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-slate-600 font-bold text-sm">
          <Activity size={16} className="text-indigo-600" />
          System Status: Online
        </div>
      </div>

      {/* ---------- DASHBOARD STATS ---------- */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} icon={Users} colorClass="bg-blue-50 text-blue-600" trend="12" />
        <StatCard title="Total Stores" value={stats.totalStores} icon={Store} colorClass="bg-indigo-50 text-indigo-600" trend="5" />
        <StatCard title="Total Ratings" value={stats.totalRatings} icon={Star} colorClass="bg-amber-50 text-amber-600" trend="18" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* ---------- REGISTER STORE ---------- */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-600 text-white rounded-2xl">
              <PlusCircle size={24} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Register Store</h3>
          </div>
          
          <form onSubmit={handleAddStore} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Store Name</label>
                <input 
                  className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-medium" 
                  placeholder="20-60 chars" 
                  required 
                  value={storeForm.name} 
                  onChange={e => setStoreForm({ ...storeForm, name: e.target.value })} 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Business Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-medium" 
                    placeholder="store@domain.com" 
                    type="email" 
                    required 
                    value={storeForm.email} 
                    onChange={e => setStoreForm({ ...storeForm, email: e.target.value })} 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Physical Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-5 text-slate-300" size={18} />
                <textarea 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-medium min-h-[100px] resize-none" 
                  placeholder="Max 400 characters..." 
                  required 
                  value={storeForm.address} 
                  onChange={e => setStoreForm({ ...storeForm, address: e.target.value })} 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Assigned Owner ID</label>
              <input 
                className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-medium" 
                placeholder="User database ID" 
                type="number" 
                required 
                value={storeForm.ownerId} 
                onChange={e => setStoreForm({ ...storeForm, ownerId: e.target.value })} 
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Deploy New Store'}
            </button>
          </form>
        </section>

        {/* ---------- REGISTER USER ---------- */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-slate-900 text-white rounded-2xl">
              <UserPlus size={24} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Create Account</h3>
          </div>
          
          <form onSubmit={handleAddUser} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
                <input 
                  className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-900 transition-all font-medium" 
                  placeholder="Legal Name" 
                  required 
                  value={userForm.name} 
                  onChange={e => setUserForm({ ...userForm, name: e.target.value })} 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Access</label>
                <input 
                  className="w-full p-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-900 transition-all font-medium" 
                  placeholder="user@domain.com" 
                  type="email" 
                  required 
                  value={userForm.email} 
                  onChange={e => setUserForm({ ...userForm, email: e.target.value })} 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Security Key</label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-900 transition-all font-medium" 
                  placeholder="8-16 chars, Uppercase, Special" 
                  type="password" 
                  required 
                  value={userForm.password} 
                  onChange={e => setUserForm({ ...userForm, password: e.target.value })} 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Account Role</label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                <select 
                  className="w-full pl-12 pr-10 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-slate-900 transition-all font-bold text-slate-700 appearance-none" 
                  value={userForm.role} 
                  onChange={e => setUserForm({ ...userForm, role: e.target.value as UserRole })}
                >
                  <option value="Normal User">Normal User</option>
                  <option value="System Administrator">System Administrator</option>
                  <option value="Store Owner">Store Owner</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  ▼
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Finalize User Creation'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;