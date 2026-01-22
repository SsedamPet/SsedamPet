import { api } from "../../configs/axiosConfig";

export const requestMe = () => {
  return api.get("/api/users/me");
};