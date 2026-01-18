// Path: src/pages/OwnerDashboard.tsx
import { useEffect, useState } from 'react'; // Removed unused 'React' import
import { ownerApi } from '../services/ownerService';
import { 
  Star, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Calendar, 
  RefreshCw, 
  ArrowUpRight,
  ChevronRight,
  BarChart3
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

  const getInitials = (name?: string) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const getDistribution = (rating: number) => {
    if (!data) return 0;
    const count = data.reviewers.filter(r => r.rating === rating).length;
    return (count / data.reviewers.length) * 100;
  };

  if (loading) return (
    <div className="p-8 mx-auto space-y-8 max-w-7xl animate-pulse">
      <div className="w-48 h-10 bg-slate-200 rounded-xl"></div>
      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-100 rounded-[2rem]"></div>)}
      </div>
      <div className="h-96 bg-slate-100 rounded-[2.5rem]"></div>
    </div>
  );

  if (!data) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
      <div className="p-6 text-red-500 rounded-full bg-red-50">
        <RefreshCw size={48} onClick={fetchDashboardData} className="cursor-pointer" />
      </div>
      <h2 className="text-2xl font-black text-slate-900">Sync Interrupted</h2>
      <p className="text-slate-500">We couldn't reach the store servers. Check your connection.</p>
    </div>
  );

  return (
    <div className="p-6 mx-auto space-y-10 font-sans max-w-7xl">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Store Insights</h1>
          <p className="flex items-center gap-2 font-medium text-slate-500">
            <Calendar size={16} className="text-indigo-500" /> Live performance tracking
          </p>
        </div>
        <button 
          onClick={fetchDashboardData}
          className="flex items-center gap-2 px-6 py-3 font-bold transition-all bg-white border shadow-sm border-slate-200 rounded-2xl text-slate-600 hover:border-indigo-200 hover:text-indigo-600 active:scale-95"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          Refresh Stats
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 relative overflow-hidden">
          <div className="absolute top-[-10px] right-[-10px] p-4 opacity-5">
            <Star size={120} className="fill-amber-500 text-amber-500" />
          </div>
          <div className="p-3 mb-6 w-fit rounded-2xl bg-amber-50 text-amber-500">
            <Star className="fill-current" size={28} />
          </div>
          <p className="mb-1 text-xs font-black tracking-widest uppercase text-slate-400">Avg Rating</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-4xl font-black text-slate-900">{data.averageRating.toFixed(1)}</h2>
            <span className="font-bold text-slate-400">/ 5.0</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20">
          <div className="p-3 mb-6 text-indigo-600 w-fit rounded-2xl bg-indigo-50">
            <Users size={28} />
          </div>
          <p className="mb-1 text-xs font-black tracking-widest uppercase text-slate-400">Total Reviewers</p>
          <h2 className="text-4xl font-black text-slate-900">{data.reviewers.length}</h2>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20">
          <div className="p-3 mb-6 w-fit rounded-2xl bg-emerald-50 text-emerald-600">
            <TrendingUp size={28} />
          </div>
          <p className="mb-1 text-xs font-black tracking-widest uppercase text-slate-400">Store Status</p>
          <div className="flex items-center gap-3">
            <h2 className="text-4xl font-black text-slate-900">Active</h2>
            <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 h-fit space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="text-indigo-600" size={20} />
            <h3 className="text-xl font-bold text-slate-900">Distribution</h3>
          </div>
          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="space-y-1">
                <div className="flex justify-between mb-1 text-xs font-bold text-slate-500">
                  <span>{star} Stars</span>
                  <span>{Math.round(getDistribution(star))}%</span>
                </div>
                <div className="w-full h-2 overflow-hidden rounded-full bg-slate-50">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${star >= 4 ? 'bg-amber-400' : 'bg-slate-300'}`} 
                    style={{ width: `${getDistribution(star)}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
          <div className="flex items-center justify-between p-8 border-b border-slate-50 bg-slate-50/20">
            <div className="flex items-center gap-3">
              <MessageSquare className="text-indigo-600" size={22} />
              <h3 className="text-xl font-bold text-slate-900">Customer Sentiment</h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              Show All <ChevronRight size={14} />
            </div>
          </div>

          <div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto">
            {data.reviewers.length > 0 ? (
              data.reviewers.map((r) => (
                <div key={r.id} className="flex flex-col gap-6 p-8 transition-all hover:bg-slate-50/50 md:flex-row group">
                  <div className="flex items-center gap-4 md:items-start md:w-1/3 shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 text-sm font-black text-white transition-colors rounded-2xl bg-slate-900 group-hover:bg-indigo-600">
                      {getInitials(r.user?.name)}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold truncate text-slate-900">{r.user?.name || 'Anonymous Guest'}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                        {new Date(r.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < r.rating ? 'text-amber-400 fill-current' : 'text-slate-100'} />
                      ))}
                    </div>
                    <p className="text-sm italic font-medium leading-relaxed text-slate-600">
                      "{r.feedback || 'The customer opted not to leave written feedback.'}"
                    </p>
                  </div>

                  <div className="items-center hidden md:flex">
                    <button className="p-2 transition-all shadow-sm text-slate-200 hover:text-indigo-600 hover:bg-white rounded-xl">
                      <ArrowUpRight size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-24 space-y-4 text-center">
                <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-slate-50 text-slate-200">
                  <MessageSquare size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">No Feedback Yet</h3>
                <p className="max-w-xs mx-auto text-sm font-medium text-slate-400">Your customers' ratings will appear here once they start reviewing your store.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;