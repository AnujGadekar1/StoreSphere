// src/components/StoreCard.tsx
import { MapPin, Star, ArrowRight, Store } from 'lucide-react';

export const StoreCard = ({ store, onRate }: { store: any, onRate: () => void }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Store className="text-blue-600 h-6 w-6" />
        </div>
        <div className="flex items-center text-amber-500">
          <Star className="fill-current h-4 w-4 mr-1" />
          <span className="font-bold">4.5</span> 
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-gray-900 mb-1">{store.name}</h3>
      <div className="flex items-center text-gray-500 text-sm mb-6">
        <MapPin className="h-4 w-4 mr-1" /> {store.address}
      </div>

      <button 
        onClick={onRate}
        className="w-full flex justify-center items-center py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
      >
        Submit Rating <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );
};