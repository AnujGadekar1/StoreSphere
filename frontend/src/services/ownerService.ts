// Path: src/services/ownerService.ts
import { api } from './api';

export const ownerApi = {
  // Get ratings for the store owned by logged-in owner
  getMyStoreRatings: async () => {
    const response = await api.get('/owner/ratings');
    return response.data;
  },
};
