import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type{ ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    const token = sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to='/signin' replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
