import { api } from "../../configs/axiosConfig"

export const getMypage = async () => {
    return await api.get("/api/mypage/user");
};

export const getMySummary = async () => {
    return await api.get("/api/mypage/summary")
}

export const getMyPets = async () => {
    return await api.get("/api/mypage/pets")
}

export const getMyPosts = async ({ year, month }) => {
    const res = await api.get("/api/mypage/my-posts", {
        params: {year, month},
    });
    return res.data;
};

export const getLikedPosts = async ({ year, month }) => {
    const res = await api.get("/api/mypage/my-posts", {
        params: {year, month},
    });
    return res.data;
};
