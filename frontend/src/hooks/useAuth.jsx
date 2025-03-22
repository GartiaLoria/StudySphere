import { useQuery } from "@tanstack/react-query";
import { getCurrentUserQueryFn } from "@/apis/user.apis";
const useAuth = ({ enabled = true } = {}) => {
  const query = useQuery({
    enabled: enabled,
    queryKey: ["authUser"],
    queryFn: getCurrentUserQueryFn,
    staleTime: 0,
    retry: 2,
  });
  return query;
};
export default useAuth;