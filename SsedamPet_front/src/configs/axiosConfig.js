import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 50000,
});

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("AccessToken");

    if (accessToken && accessToken !== "null") {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response, // 성공하면 통과
    (error) => {
        // 서버가 401(Unauthorized)을 뱉으면 토큰이 잘못된 것임
        if (error.response && error.response.status === 401) {
            console.error("인증 실패! 로그인 페이지로 강제 이동합니다.");

            // 잘못된 토큰 청소
            localStorage.removeItem("AccessToken");

            // 리액트 외부(js 파일)이므로 window.location으로 강제 이동
            // 이렇게 하면 무한 로딩 없이 바로 로그인 페이지로 튕깁니다.
            // window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    },
);
