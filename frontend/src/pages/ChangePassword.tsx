// Path: src/pages/ChangePassword.tsx
// Fix: Use named import for api based on build error TS2613
import { useState } from 'react';
import { api } from '../services/api';
import { Lock, CheckCircle } from 'lucide-react';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch('/users/change-password', { newPassword });
      setSuccess(true);
      setNewPassword('');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="flex items-center justify-center w-16 h-16 mb-8 bg-indigo-50 rounded-2xl"><Lock className="text-indigo-600" size={32} /></div>
        <h2 className="mb-2 text-3xl font-black text-slate-900">Security</h2>
        <p className="mb-8 text-slate-500">Change your password below.</p>
        <form onSubmit={handleUpdate} className="space-y-6">
          <input type="password" placeholder="New Password (8-16 characters)" className="w-full p-4 transition outline-none bg-slate-50 rounded-2xl focus:ring-2 focus:ring-indigo-500" required onChange={(e) => setNewPassword(e.target.value)} />
          <button className="w-full py-4 font-bold text-white transition-all bg-slate-900 rounded-2xl hover:bg-slate-800">Update Security Settings</button>
        </form>
        {success && <div className="flex items-center gap-2 p-4 mt-6 font-bold text-green-600 bg-green-50 rounded-2xl"><CheckCircle size={20} /> Password updated successfully!</div>}
      </div>
    </div>
  );
};

export default ChangePassword;