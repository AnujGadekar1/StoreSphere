import React, { useEffect, useState, useCallback } from 'react';
import { userApi } from '../services/userService';
import { Search, MapPin, Star, Edit3, X, Store as StoreIcon, Loader2 } from 'lucide-react';

interface Store {
  id: number;
  name: string;
  address: string;
  overallRating?: number;
  userRating?: number;
}

const StoreList = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Rating modal state
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); // For rating preview
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchStores = useCallback(async () => {
    try {
      setLoading(true);
      const data = await userApi.getStores(search);
      setStores(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load stores', error);
      setStores([]);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchStores();
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [search, fetchStores]);

  const resetModal = () => {
    setSelectedStore(null);
    setRating(0);
    setHoverRating(0);
    setFeedback('');
  };

  const handleSubmitRating = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStore || rating === 0) return;

    setSubmitting(true);
    try {
      await userApi.submitRating({
        storeId: selectedStore.id,
        rating,
        feedback: feedback.trim() || undefined,
      });
      resetModal();
      fetchStores();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  // Skeleton Loader Component
  const Skeleton = () => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 space-y-4 animate-pulse">
      <div className="h-6 bg-slate-100 rounded-md w-3/4"></div>
      <div className="h-4 bg-slate-50 rounded-md w-1/2"></div>
      <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-2 bg-slate-50 rounded-full w-16"></div>
          <div className="h-4 bg-slate-100 rounded-full w-20"></div>
        </div>
        <div className="h-10 bg-slate-100 rounded-xl w-24"></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Explore Stores</h1>
          <p className="text-slate-500 font-medium">Find and rate the best stores in your area.</p>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
          <input
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
            placeholder="Search by name or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && stores.length === 0 ? (
          [...Array(6)].map((_, i) => <Skeleton key={i} />)
        ) : stores.length > 0 ? (
          stores.map((store) => (
            <div
              key={store.id}
              className="group bg-white p-6 rounded-[2rem] border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-12 w-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-colors">
                  <StoreIcon className="text-slate-400 group-hover:text-indigo-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1 leading-tight">
                  {store.name || 'Unnamed Store'}
                </h3>
                <p className="text-slate-500 text-sm flex items-center gap-1.5 font-medium">
                  <MapPin size={14} className="text-slate-400" />
                  {store.address || 'Address not available'}
                </p>
              </div>

              <div className="flex justify-between items-center mt-8 pt-5 border-t border-slate-50">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    Ratings
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-amber-500 font-black text-lg">
                      <Star size={18} className="fill-current mr-1" />
                      {store.overallRating?.toFixed(1) ?? '0.0'}
                    </div>
                    <div className="h-4 w-[1px] bg-slate-200"></div>
                    <div className="text-xs font-bold text-slate-400">
                      You: <span className={store.userRating ? "text-indigo-600" : ""}>{store.userRating ?? 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedStore(store);
                    setRating(store.userRating || 0);
                  }}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 shadow-lg shadow-slate-200 hover:shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
                >
                  <Edit3 size={14} />
                  {store.userRating ? 'Edit' : 'Rate'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center text-center space-y-4">
            <div className="bg-slate-50 p-6 rounded-full">
              <Search className="text-slate-300" size={48} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">No stores found</h3>
              <p className="text-slate-500">Try adjusting your search or filters.</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal - Modern Overlay */}
      {selectedStore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" onClick={resetModal} />
          
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
            <button
              onClick={resetModal}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={20} className="text-slate-400" />
            </button>

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl mb-4">
                <Star size={32} className="fill-current" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Rate this Store</h2>
              <p className="text-slate-500 font-medium">{selectedStore.name}</p>
            </div>

            <form onSubmit={handleSubmitRating} className="space-y-8">
              {/* Star Input with Hover Effect */}
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onMouseEnter={() => setHoverRating(num)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(num)}
                    className="relative group transition-transform active:scale-75"
                  >
                    <Star
                      size={42}
                      className={`transition-all duration-200 ${
                        num <= (hoverRating || rating)
                          ? 'fill-amber-400 text-amber-400 scale-110'
                          : 'text-slate-200'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Feedback (Optional)</label>
                <textarea
                  className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] outline-none focus:bg-white focus:border-indigo-500 transition-all min-h-[120px] resize-none font-medium"
                  placeholder="What was your experience like?"
                  maxLength={400}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={rating === 0 || submitting}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 disabled:opacity-50 disabled:hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  selectedStore.userRating ? 'Update Review' : 'Post Review'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreList;