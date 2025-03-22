import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthRoute } from "./routePaths";
import useAuthStore from "@/store/useAuthStore"; // Import Zustand store

const AuthRoute = () => {
  const location = useLocation();
  const { isLoggedIn, user } = useAuthStore();

  const _isAuthRoute = isAuthRoute(location.pathname);

  // If user is not logged in, allow access to auth routes (e.g., login, register)
  if (!isLoggedIn) {
    return _isAuthRoute ? <Outlet /> : <Navigate to="/login" replace />;
  }

  // Redirect authenticated users to their workspace
  return (
    <Navigate
      to={`workspace/${user?.currentWorkspace?._id || "default"}`} 
      replace
    />
  );
};

export default AuthRoute;