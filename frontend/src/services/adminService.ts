// Path: src/services/adminService.ts
import { api } from './api';

export const adminApi = {
  // Requirement: Dashboard Aggregate Stats [cite: 18]
  getDashboardStats() {
    return api.get('/admin/dashboard');
  },

  // =========================
  // Users (Admin)
  // =========================
  
  // ✅ ADDED: This method is required by AdminUserView.tsx
  getUsers(params: { search?: string; role?: string; sortBy?: string; order?: string }) {
    return api.get('/admin/users', { params });
  },

  addUser(payload: {
    name: string;
    email: string;
    password: string;
    address?: string;
    role: 'Normal User' | 'System Administrator' | 'Store Owner';
  }) {
    return api.post('/admin/users', payload);
  },

  // =========================
  // Stores (Admin)
  // =========================
  addStore(payload: {
    name: string;
    email: string;
    address: string;
    ownerId: number;
  }) {
    // Corrected to match backend StoresController endpoint
    return api.post('/stores', payload); 
  },
};