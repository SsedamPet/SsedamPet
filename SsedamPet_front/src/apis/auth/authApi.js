import { api } from "../../configs/axiosConfig";

export const logout = async () => {
    const res = await api.post("/api/auth/logout");
    return res.data;
};