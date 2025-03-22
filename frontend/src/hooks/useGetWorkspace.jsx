import { useQuery } from "@tanstack/react-query";
// import { getWorkspaceByIdQueryFn } from "@/lib/api";
import { getWorkspaceByIdQueryFn } from "@/apis/workspace.apis";
const useGetWorkspaceQuery = (workspaceId, { enabled = true } = {}) => {
  const query = useQuery({
    enabled,
    queryKey: ["workspace", workspaceId],
    queryFn: () => getWorkspaceByIdQueryFn(workspaceId),
    staleTime: 0,
    retry: 2,
  });
  return query;
};
export default useGetWorkspaceQuery;