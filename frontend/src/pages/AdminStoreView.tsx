// Path: src/pages/AdminStoreView.tsx
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Search, ArrowUp, ArrowDown, Star, Mail, MapPin, Store as StoreIcon } from 'lucide-react';

const AdminStoreView = () => {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ search: '', sortBy: 'name', order: 'ASC' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        const res = await api.get('/stores', { params: filters });
        setStores(res.data);
      } catch (err) {
        console.error("Store load error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, [filters]);

  const toggleSort = (field: string) => {
    setFilters(prev => ({
      ...prev,
      sortBy: field,
      order: prev.sortBy === field && prev.order === 'ASC' ? 'DESC' : 'ASC'
    }));
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (filters.sortBy !== field) return <ArrowUp size={12} className="opacity-20" />;
    return filters.order === 'ASC' ? <ArrowUp size={12} className="text-indigo-600" /> : <ArrowDown size={12} className="text-indigo-600" />;
  };

  const SkeletonRow = () => (
    <tr className="animate-pulse">
      {[1, 2, 3, 4].map(i => (
        <td key={i} className="p-6"><div className="w-3/4 h-4 rounded-full bg-slate-100"></div></td>
      ))}
    </tr>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Store Directory</h2>
          <p className="text-sm font-medium text-slate-500">Manage and monitor {stores.length} registered locations</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-6 border-b bg-slate-50/30 border-slate-100">
          <div className="relative max-w-md group">
            <Search className="absolute transition-colors -translate-y-1/2 left-4 top-1/2 text-slate-400 group-focus-within:text-indigo-600" size={20} />
            <input 
              placeholder="Filter by name or address..." 
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all bg-white font-medium"
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-black tracking-widest border-b border-slate-100">
              <tr>
                {[
                  { label: 'Store Name', key: 'name' },
                  { label: 'Contact Email', key: 'email' },
                  { label: 'Location', key: 'address' },
                  { label: 'Performance', key: 'overallRating' }
                ].map((col) => (
                  <th key={col.key} className="p-6 transition-colors cursor-pointer hover:bg-slate-100/50 group" onClick={() => toggleSort(col.key)}>
                    <div className="flex items-center gap-2">{col.label} <SortIcon field={col.key} /></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? [...Array(5)].map((_, i) => <SkeletonRow key={i} />) : stores.length > 0 ? stores.map((store: any) => (
                <tr key={store.id} className="transition-all hover:bg-slate-50/80 group">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 text-indigo-600 transition-colors bg-indigo-50 rounded-xl group-hover:bg-indigo-600 group-hover:text-white"><StoreIcon size={18} /></div>
                      <span className="font-bold text-slate-900">{store.name}</span>
                    </div>
                  </td>
                  <td className="p-6 font-medium text-slate-600"><Mail size={14} className="inline mr-2 text-slate-300"/> {store.email}</td>
                  <td className="p-6 text-sm font-medium text-slate-500"><MapPin size={14} className="inline mr-2 text-slate-300 shrink-0"/> <span className="truncate max-w-[180px]">{store.address}</span></td>
                  <td className="p-6"><div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 font-black px-3 py-1.5 rounded-xl text-xs w-fit"><Star size={14} className="fill-amber-500 text-amber-500" />{store.overallRating?.toFixed(1) ?? '0.0'}</div></td>
                </tr>
              )) : <tr><td colSpan={4} className="p-24 italic font-bold text-center text-slate-400">No stores match your current filters.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStoreView;