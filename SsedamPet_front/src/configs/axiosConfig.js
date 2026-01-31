import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("AccessToken");

  if (accessToken && accessToken !== "null") {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

  return config;
});

// 응답 인터셉터: 토큰 만료 및 예외처리
api.interceptors.response.use((response) => response, (error) => {
  if (error.response && error.response.status !== 200) {
    alert("세션이 만료되었습니다. 다시 로그인해주세요");
    localStorage.removeItem("AccessToken");
    window.location.href = "/auth/login";
  }
  return Promise.reject(error);
})
