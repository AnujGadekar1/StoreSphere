//

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, MapPin, Lock, Check, X } from 'lucide-react';
import { authApi } from '../services/authService';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', address: '', password: '' });
  const [loading, setLoading] = useState(false);

  // Password validation state
  const isLengthValid = formData.password.length >= 8 && formData.password.length <= 16;
  const hasUpper = /[A-Z]/.test(formData.password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLengthValid || !hasUpper || !hasSpecial) {
      alert("Please meet all password requirements.");
      return;
    }
    setLoading(true);
    try {
      await authApi.signup(formData);
      alert('Signup successful. Please login.');
      navigate('/login');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ icon: Icon, label, ...props }: any) => (
    <div className="space-y-1">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
        <input 
          {...props}
          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 w-full max-w-xl flex flex-col md:flex-row overflow-hidden">
        <div className="bg-indigo-600 p-10 md:w-1/3 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-black mb-4">Join Us.</h2>
          <p className="text-indigo-100 text-sm leading-relaxed">
            Start managing your stores and collecting feedback in minutes.
          </p>
        </div>

        <form onSubmit={handleSignup} className="p-10 md:w-2/3 space-y-4">
          <InputField 
            label="Full Name" icon={User} type="text" placeholder="John Doe" 
            value={formData.name} onChange={(e:any) => setFormData({...formData, name: e.target.value})} required 
          />
          <InputField 
            label="Email" icon={Mail} type="email" placeholder="john@example.com" 
            value={formData.email} onChange={(e:any) => setFormData({...formData, email: e.target.value})} required 
          />
          <InputField 
            label="Address" icon={MapPin} type="text" placeholder="123 Street, City" 
            value={formData.address} onChange={(e:any) => setFormData({...formData, address: e.target.value})} required 
          />
          <InputField 
            label="Password" icon={Lock} type="password" placeholder="••••••••" 
            value={formData.password} onChange={(e:any) => setFormData({...formData, password: e.target.value})} required 
          />

          {/* Password Checklist */}
          <div className="grid grid-cols-1 gap-2 p-3 bg-slate-50 rounded-xl text-[11px] font-bold">
            <div className={`flex items-center gap-2 ${isLengthValid ? 'text-green-600' : 'text-slate-400'}`}>
              {isLengthValid ? <Check size={14} /> : <X size={14} />} 8-16 Characters
            </div>
            <div className={`flex items-center gap-2 ${hasUpper ? 'text-green-600' : 'text-slate-400'}`}>
              {hasUpper ? <Check size={14} /> : <X size={14} />} One Uppercase Letter
            </div>
            <div className={`flex items-center gap-2 ${hasSpecial ? 'text-green-600' : 'text-slate-400'}`}>
              {hasSpecial ? <Check size={14} /> : <X size={14} />} One Special Character
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <p className="text-center text-sm font-medium text-slate-500">
            Already a member? <Link to="/login" className="text-indigo-600 font-bold">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;