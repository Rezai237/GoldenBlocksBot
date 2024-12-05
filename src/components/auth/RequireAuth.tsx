import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import LoadingSpinner from '../LoadingSpinner';

interface Props {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const RequireAuth: React.FC<Props> = ({ children, requireAdmin = false }) => {
  const { user, initialized, isAdmin } = useUserStore();
  const location = useLocation();

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;