// import { DashboardSkeleton } from "@/components/skeleton-loaders/dashboard-skeleton";
import { useAuthContext } from "@/context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "@/hooks/useToast";
import { getToken } from "@/utills/token.util";
const ProtectedRoute = () => {
  // const { data: authData, isLoading } = useAuth();
  const  token  = getToken();

  // if (isLoading) {
  //   // return <DashboardSkeleton />;
  // }
  // while(isLoading)
  if(!token) {
    toast({
      title: "Authentication Failed",
      description: "You need to Login first",
      variant: "destructive",
    });
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;