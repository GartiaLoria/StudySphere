import API from "@/utills/axiosClient.util"
export const getCurrentUserQueryFn = async () => {
  const res = await API.get(`/user/current`)
  console.log("Current user query function", res.data)
}