import API from "@/utills/axiosClient.util";
export const createWorkspaceMutationFn = async (data) => {
  const res = await API.post(`/workspace/create/new`, data);
  return res.data;
};
export const getWorkspaceByIdQueryFn = async workspaceId => {
  const res = await API.get(`/workspace/${workspaceId}`);
  return res.data;
};
export const getMembersInWorkspaceQueryFn = async workspaceId => {
  const res = await API.get(`/workspace/members/${workspaceId}`);
  return res.data;
};
export const changeWorkspaceMemberRoleMutationFn = async ({ workspaceId, data }) => {
  const res = await API.put(`/workspace/change/member/role/${workspaceId}`, data);
  return res.data;
};
export const deleteWorkspaceMutationFn = async (workspaceId) => {
  const res = await API.delete(`/workspace/delete/${workspaceId}`);
  return res.data;
};
export const editWorkspaceMutationFn = async ({
  workspaceId,
  data,
}) => {
  const res = await API.put(`/workspace/update/${workspaceId}`, data);
  return res.data;
};
export const getAllWorkspacesUserIsMemberQueryFn = async () => {
  const res = await API.get(`/workspace/all`);
  return res.data;
};
export const getWorkspaceAnalyticsQueryFn = async (workspaceId) => {
  const res = await API.get(`/workspace/analytics/${workspaceId}`);
  return res.data;
};