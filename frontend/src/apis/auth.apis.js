import API from "@/utills/axiosClient.util";
export const registerUserMutationFn = async user => {
  await API.post(`/auth/register`, user);
};
export const loginUserMutationFn = async user => {
  let res = await API.post(`/auth/login`, user);
  return res
}
