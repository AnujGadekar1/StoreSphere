// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, allowedRoles }: { children: any, allowedRoles: string[] }) => {
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/login" replace />;

  return children;
};