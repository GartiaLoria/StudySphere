import API from "@/utills/axiosClient.util";
export const invitedUserJoinWorkspaceMutationFn = async (iniviteCode) => {
  const res = await API.post(`/member/workspace/${iniviteCode}/join`);
  return res.data;
};