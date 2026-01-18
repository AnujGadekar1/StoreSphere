// Path: src/services/userService.ts
import { api } from './api';

export const userApi = {
  // ✅ UPDATED: Accept search parameter for filtering
  // Updated to support full sorting requirements 
getStores: async (search?: string, sortBy?: string, order?: string) => {
  const response = await api.get('/stores', {
    params: { search, sortBy, order }
  });
  return response.data;
},

  // Submit or update rating (1–5)
  submitRating: async (data: {
    storeId: number;
    rating: number;
    feedback?: string;
  }) => {
    const response = await api.post('/ratings', data);
    return response.data;
  },
};