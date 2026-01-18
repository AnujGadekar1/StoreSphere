// Path: src/services/authService.ts
import { api } from './api';

export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),

  signup: (data: {
    name: string;
    email: string;
    password: string;
    address: string;
  }) => api.post('/auth/signup', data),
};
