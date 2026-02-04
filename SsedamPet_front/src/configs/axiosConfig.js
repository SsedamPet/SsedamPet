import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 50000
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("AccessToken");
  console.log("AccessToken:", localStorage.getItem("AccessToken"));

  

  if (accessToken && accessToken !== "null") {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
