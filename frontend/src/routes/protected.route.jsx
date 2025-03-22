// import { DashboardSkeleton } from "@/components/skeleton-loaders/dashboard-skeleton";
import { useAuthContext } from "@/context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "@/hooks/useToast";
const ProtectedRoute = () => {
  // const { data: authData, isLoading } = useAuth();
  const { user } = useAuthContext()

  // if (isLoading) {
  //   // return <DashboardSkeleton />;
  // }
  // while(isLoading)
  if(!user) {
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