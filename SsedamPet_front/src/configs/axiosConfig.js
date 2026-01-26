import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("AccessToken");

  if (accessToken && accessToken !== "null") {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

  // config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});
