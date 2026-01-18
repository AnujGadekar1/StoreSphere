// Path: src/pages/OwnerDashboard.tsx
import React, { useEffect, useState } from 'react';
import { ownerApi } from '../services/ownerService';
import { 
  Star, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Calendar, 
  RefreshCw, 
  ArrowUpRight 
} from 'lucide-react';

interface Reviewer {
  id: number;
  rating: number;
  feedback?: string;
  createdAt: string;
  user?: {
    name?: string;
    email?: string;
  };
}

interface DashboardData {
  reviewers: Reviewer[];
  averageRating: number;
}

const OwnerDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = () => {
    setLoading(true);
    ownerApi
      .getMyStoreRatings()
      .then((res) => setData(res))
      .catch((err) => console.error('Error loading dashboard:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Helper for User Avatars
  const getInitials = (name?: string) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  // Skeleton Loader Component
  const Skeleton = () => (
    <div className="space-y-10 animate-pulse">
      <div className="h-12 bg-slate-200 rounded-2xl w-1/4"></div>
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-32 bg-slate-100 rounded-[2rem]"></div>
        ))}
      </div>
      <div className="h-96 bg-slate-100 rounded-[2.5rem]"></div>
    </div>
  );

  if (loading) return <div className="p-8 max-w-7xl mx-auto"><Skeleton /></div>;

  if (!data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-6 bg-red-50 rounded-full text-red-500">
          <RefreshCw size={48} onClick={fetchDashboardData} className="cursor-pointer" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Failed to sync data</h2>
        <p className="text-slate-500">Please check your connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10 font-sans">
      {/* ---------- HEADER ---------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Store Insights</h1>
          <p className="text-slate-500 font-medium flex items-center gap-2">
            <Calendar size={16} /> Real-time performance for your establishment
          </p>
        </div>
        <button 
          onClick={fetchDashboardData}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Refresh Data
        </button>
      </div>

      {/* ---------- STATS GRID ---------- */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Rating Card */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Star size={80} className="fill-amber-500 text-amber-500" />
          </div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="p-3 w-fit rounded-2xl bg-amber-50 text-amber-500 mb-6">
              <Star className="fill-current" size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Average Rating</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-4xl font-black text-slate-900">{data.averageRating.toFixed(1)}</h2>
                <span className="text-slate-400 font-bold">/ 5.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Card */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="p-3 w-fit rounded-2xl bg-indigo-50 text-indigo-600 mb-6">
              <Users size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Total Reviewers</p>
              <h2 className="text-4xl font-black text-slate-900">{data.reviewers.length}</h2>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="p-3 w-fit rounded-2xl bg-emerald-50 text-emerald-600 mb-6">
              <TrendingUp size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Store Status</p>
              <div className="flex items-center gap-3">
                <h2 className="text-4xl font-black text-slate-900">Active</h2>
                <div className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- FEEDBACK SECTION ---------- */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <MessageSquare size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Customer Sentiment</h3>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100">
            Latest {data.reviewers.length} Reviews
          </span>
        </div>

        <div className="divide-y divide-slate-50">
          {data.reviewers.length > 0 ? (
            data.reviewers.map((r) => (
              <div key={r.id} className="p-8 hover:bg-slate-50/80 transition-all flex flex-col md:flex-row gap-6">
                {/* User Info & Avatar */}
                <div className="flex items-center md:items-start gap-4 md:w-1/4">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-100 shrink-0">
                    {getInitials(r.user?.name)}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-slate-900 truncate">
                      {r.user?.name || 'Anonymous Guest'}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                      {new Date(r.createdAt).toLocaleDateString(undefined, {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Rating & Feedback */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < r.rating ? 'text-amber-400 fill-current' : 'text-slate-200'} 
                      />
                    ))}
                    <span className="ml-2 text-xs font-black text-slate-900 bg-amber-50 px-2 py-0.5 rounded-md">
                      {r.rating}.0
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium italic">
                    "{r.feedback || 'The customer opted not to leave written feedback.'}"
                  </p>
                </div>

                {/* Action Arrow (Optional UX Touch) */}
                <div className="hidden md:block">
                  <button className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                    <ArrowUpRight size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-24 flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                <MessageSquare size={40} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">No feedback yet</h3>
                <p className="text-slate-400 max-w-xs">Your customers' ratings and comments will appear here once they start reviewing.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;