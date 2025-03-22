import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import useWorkspaceId from "@/hooks/useWorkspaceId";
import useAuth from "@/hooks/useAuth";
import useGetWorkspaceQuery from "@/hooks/useGetWorkspace";
import usePermissions from "@/hooks/usePermissions";
import { getToken, getTokenName } from "@/utills/token.util";

// Create Auth Context
const AuthContext = createContext(undefined);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const workspaceId = useWorkspaceId();
  const [token, setToken] = useState(getToken()); // Initialize with stored token
  const [user, setUser] = useState(null);
  const [workspace, setWorkspace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [workspaceLoading, setWorkspaceLoading] = useState(false);
  const [error, setError] = useState(null);

  // Decode token and set user data
  useEffect(() => {
    setToken(getToken())
    console.log("Token status: Auth Provider ", token)
    if (token) {
      const decodedData = decodeToken(token);
      console.log(decodedData.currentWorkspace)
      if (decodedData) {
        setUser({
          _id: decodedData._id,
          name: decodedData.name,
          email: decodedData.email,
          profilePicture: decodedData.profilePicture || null,
          isActive: decodedData.isActive ?? false,
          lastLogin: decodedData.lastLogin || null,
          createdAt: decodedData.createdAt,
          updatedAt: decodedData.updatedAt,
          currentWorkspace: decodedData.currentWorkspace || null,
        });
      }
    } else {
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    console.log(user)
  }, [user])
  

  // Fetch user authentication data (Only if token exists)
  const {
    data: authData,
    error: authError,
    isLoading: authLoading,
    isFetching: authFetching,
    refetch: refetchAuth,
  } = useAuth({ enabled: !!token }); // Fetch only when token exists
  
  // Fetch workspace data (Only if token and workspaceId exist)
  const {
    data: workspaceData,
    isLoading: workspaceLoadingStatus,
    error: workspaceError,
    refetch: refetchWorkspace,
  } = useGetWorkspaceQuery(workspaceId, { enabled: !!token && !!workspaceId });

  // Update state when auth and workspace data change
  useEffect(() => {
    if (token) {
      setIsLoading(authLoading);
      setIsFetching(authFetching);
      setWorkspaceLoading(workspaceLoadingStatus);
      setError(authError || workspaceError);

      if (authData?.user) {
        setUser(authData.user);
      }
      if (workspaceData?.workspace) {
        setWorkspace(workspaceData.workspace);
      }
    }
  }, [authData, workspaceData, authLoading, authFetching, workspaceLoadingStatus, authError, workspaceError, token]);

  // Handle workspace access error
  useEffect(() => {
    if (workspaceError?.errorCode === "ACCESS_UNAUTHORIZED") {
      return <Navigate to="/login" replace />;
    }
  }, [ workspaceError]);

  // Check if the user has a specific permission
  const hasPermission = (permission) => {
    if (!user || !workspace) return false; // Ensure user and workspace exist
    const permissions = usePermissions(user, workspace);
    return permissions.includes(permission);
  };

  // Login Function
  const login = (jwtToken) => {
    localStorage.setItem(getTokenName(), jwtToken);
    setToken(jwtToken);
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem(getTokenName());
    setToken(null);
    setUser(null);
    setWorkspace(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        workspace,
        token,
        hasPermission,
        isLoading,
        isFetching,
        workspaceLoading,
        error,
        refetchAuth,
        refetchWorkspace,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};