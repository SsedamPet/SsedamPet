import { api } from "../../configs/axiosConfig"

export const getMypage = () => {
    return api.get("/api/mypage/user");
};

export const getMySummary = () => {
    return api.get("/api/mypage/summary")
}

