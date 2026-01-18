// src/pages/ChangePassword.tsx
import React, { useState } from 'react';
import api from '../services/api';
import { Lock } from 'lucide-react';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Requirement: Update password logic 
      await api.patch('/users/change-password', { newPassword });
      alert('Password updated successfully!');
    } catch (err) { alert('Update failed. Ensure password is 8-16 chars with 1 Uppercase & 1 Special char.'); }
  };

  return (
    <div className="max-w-md bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Lock className="text-indigo-600"/> Change Password</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input 
          type="password" 
          placeholder="New Password (8-16 chars)" 
          className="w-full p-3 bg-slate-50 rounded-xl outline-none"
          required 
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold">Update Password</button>
      </form>
    </div>
  );
};
export default ChangePassword;