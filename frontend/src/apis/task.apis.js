import API from "@/utills/axiosClient.util";
export const createTaskMutationFn = async ({
  workspaceId,
  projectId,
  data,
}) => {
  const res = await API.post(
    `/task/project/${projectId}/workspace/${workspaceId}/create`,
    data
  );
  return res.data;
};
export const getAllTasksQueryFn = async ({
  workspaceId,
  keyword,
  projectId,
  assignedTo,
  priority,
  status,
  dueDate,
  pageNumber,
  pageSize,
}) => {
  const baseUrl = `/task/workspace/${workspaceId}/all`;
  const queryParams = new URLSearchParams();
  if (keyword) queryParams.append("keyword", keyword);
  if (projectId) queryParams.append("projectId", projectId);
  if (assignedTo) queryParams.append("assignedTo", assignedTo);
  if (priority) queryParams.append("priority", priority);
  if (status) queryParams.append("status", status);
  if (dueDate) queryParams.append("dueDate", dueDate);
  if (pageNumber) queryParams.append("pageNumber", pageNumber?.toString());
  if (pageSize) queryParams.append("pageSize", pageSize?.toString());

  const url = queryParams.toString() ? `${baseUrl}?${queryParams}` : baseUrl;
  const res = await API.get(url);
  return res.data;
};
export const deleteTaskMutationFn = async ({
  workspaceId,
  taskId,
}) => {
  const res = await API.delete(`task/${taskId}/workspace/${workspaceId}/delete`);
  return res.data;
};