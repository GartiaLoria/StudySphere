import { getToken } from "./token.util";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};
const API = axios.create(options);
// Function to get token (modify based on your auth implementation)

// Request interceptor to add the token dynamically
API.interceptors.request.use(
  (config) => {
    const token = getToken(); // ✅ Fetch token inside the function
    if (token) {
      config.headers.Authorization = `StudySphere ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (same as before)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { data, status } = error.response;
    if (data === "Unauthorized" && status === 401) {
      window.location.href = "/";
    }
    const customError = {
      ...error,
      errorCode: data?.errorCode || "UNKNOWN_ERROR",
    };
    return Promise.reject(customError);
  }
);
export default API;
