// Path: src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import AdminUserView from './pages/AdminUserView';
import AdminStoreView from './pages/AdminStoreView'; // Added import
import StoreList from './pages/StoreList';
import OwnerDashboard from './pages/OwnerDashboard';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* System Administrator Routes [cite: 16] */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['System Administrator']}><Layout><AdminDashboard /></Layout></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['System Administrator']}><Layout><AdminUserView /></Layout></ProtectedRoute>} />
        <Route path="/admin/stores" element={<ProtectedRoute allowedRoles={['System Administrator']}><Layout><AdminStoreView /></Layout></ProtectedRoute>} />

        {/* Normal User Routes [cite: 36] */}
        <Route path="/stores" element={<ProtectedRoute allowedRoles={['Normal User']}><Layout><StoreList /></Layout></ProtectedRoute>} />

        {/* Store Owner Routes [cite: 55] */}
        <Route path="/owner-dashboard" element={<ProtectedRoute allowedRoles={['Store Owner']}><Layout><OwnerDashboard /></Layout></ProtectedRoute>} />

        <Route path="/settings" element={<Layout><Settings /></Layout>} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
export default App;