import { Outlet } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

export default function AdminLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}