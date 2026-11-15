import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectToken } from '@/entities/session';

export function RequireAuth() {
  const token = useSelector(selectToken);
  const location = useLocation();
  if (!token) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}

export function GuestOnly() {
  const token = useSelector(selectToken);
  if (token) return <Navigate to="/" replace />;
  return <Outlet />;
}
