import API from "@/utills/axiosClient.util";
export const getProjectsInWorkspaceQueryFn = async ({
  workspaceId,
  pageSize = 10,
  pageNumber = 1,
}) => {
  const res = await API.get(
    `/project/workspace/${workspaceId}/all?pageSize=${pageSize}&pageNumber=${pageNumber}`
  );
  return res.data;
};
export const createProjectMutationFn = async ({
  workspaceId,
  data,
}) => {
  const res = await API.post(`/project/workspace/${workspaceId}/create`, data);
  return res.data;
};
export const editProjectMutationFn = async ({
  projectId,
  workspaceId,
  data,
}) => {
  const res = await API.put(
    `/project/${projectId}/workspace/${workspaceId}/update`,
    data
  );
  return res.data;
};
export const getProjectAnalyticsQueryFn = async ({
  workspaceId,
  projectId,
}) => {
  const res = await API.get(
    `/project/${projectId}/workspace/${workspaceId}/analytics`
  );
  return res.data;
};
export const getProjectByIdQueryFn = async ({
  workspaceId,
  projectId,
}) => {
  const res = await API.get(
    `/project/${projectId}/workspace/${workspaceId}`
  );
  return res.data;
};
export const deleteProjectMutationFn = async ({ workspaceId, projectId }) => {
  const res = await API.delete(`/project/${projectId}/workspace/${workspaceId}/delete`);
  return res.data;
};