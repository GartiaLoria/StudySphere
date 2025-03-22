import { useQuery } from "@tanstack/react-query";
import { getMembersInWorkspaceQueryFn } from "@/apis/workspace.apis";
const useGetWorkspaceMembers = workspaceId => {
  const query = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: () => getMembersInWorkspaceQueryFn(workspaceId),
    staleTime: Infinity,
  });
  return query;
};
export default useGetWorkspaceMembers;