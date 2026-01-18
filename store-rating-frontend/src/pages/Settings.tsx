// store-rating-frontend/src/pages/Settings.tsx

import React, { useState } from 'react';
import { api } from '../services/api';
import { Lock, CheckCircle, ShieldAlert, KeyRound } from 'lucide-react';

const Settings = () => {
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch('/users/change-password', { newPassword });
      setSuccess(true);
      setNewPassword('');
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-8 text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black italic tracking-tight">SECURITY CENTER</h2>
            <p className="text-slate-400 text-sm">Protect your account with a strong password.</p>
          </div>
          <div className="h-12 w-12 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
            <Lock className="text-indigo-400" size={24} />
          </div>
        </div>

        <div className="p-10">
          <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100 mb-8">
            <ShieldAlert className="text-amber-600 mt-1" size={20} />
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Tip:</strong> Avoid using common passwords or information like your birthday. Use a mix of symbols and letters.
            </p>
          </div>
          
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="relative">
              <KeyRound className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isFocused ? 'text-indigo-600' : 'text-slate-400'}`} size={20} />
              <input 
                type="password" 
                placeholder="Enter new strong password"
                className="w-full pl-12 pr-4 py-5 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-medium"
                required
                value={newPassword}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-[0.99]">
              Update Security Settings
            </button>
          </form>

          {success && (
            <div className="mt-8 flex items-center gap-3 text-emerald-700 font-bold bg-emerald-50 p-5 rounded-2xl border border-emerald-100 animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-emerald-500 text-white p-1 rounded-full">
                <CheckCircle size={18} />
              </div>
              Password updated successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;