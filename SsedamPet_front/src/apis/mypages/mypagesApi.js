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

export const getMyPosts = async () => {
    return await api.get("/api/mypage/my-posts")
}

export const getLikedPosts = async () => {
    return await api.get("/api/mypage/liked-posts")
}
